import { createHash, createHmac, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_COOKIE = 'admin-auth'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>

// Session tokens are signed with a key derived from ADMIN_PASSWORD, so changing
// the password signs everyone out. scrypt makes it slow to guess the password
// from a stolen cookie. The key is cached per server instance.
let signingKey: { password: string; key: Promise<Buffer> } | null = null

function getSigningKey(password: string) {
  if (signingKey?.password !== password) {
    signingKey = { password, key: scryptAsync(password, 'buildcopilot-admin-session-v1', 32) }
  }
  return signingKey.key
}

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b)
}

function sign(key: Buffer, expiresAt: number) {
  return createHmac('sha256', key).update(`admin-session:${expiresAt}`).digest()
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false

  // Hash both sides so the comparison is constant-time whatever the lengths.
  const a = createHash('sha256').update(password).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

async function createSessionToken() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error('ADMIN_PASSWORD is not set')

  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000
  const signature = sign(await getSigningKey(password), expiresAt)
  return `${expiresAt}.${signature.toString('base64url')}`
}

async function verifySessionToken(token: string | undefined) {
  const password = process.env.ADMIN_PASSWORD
  if (!password || !token) return false

  const [expiresPart, signaturePart, ...rest] = token.split('.')
  if (rest.length > 0 || !/^\d+$/.test(expiresPart) || !signaturePart) return false

  const expiresAt = Number(expiresPart)
  const now = Date.now()
  if (expiresAt <= now || expiresAt > now + SESSION_MAX_AGE * 1000) return false

  const expected = sign(await getSigningKey(password), expiresAt)
  return safeEqual(Buffer.from(signaturePart, 'base64url'), expected)
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, await createSessionToken(), {
    ...adminCookieOptions,
    maxAge: SESSION_MAX_AGE,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, '', { ...adminCookieOptions, maxAge: 0 })
}

export async function isAdmin() {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value)
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect('/admin/login')
  }
}
