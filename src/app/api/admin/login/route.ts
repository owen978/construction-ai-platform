import { NextResponse } from 'next/server'
import { checkAdminPassword, setAdminSession } from '@/lib/auth'
import {
  clearFailedLogins,
  getClientIp,
  getLockoutSeconds,
  recordFailedLogin,
} from '@/lib/login-throttle'

export async function POST(request: Request) {
  const ip = getClientIp(request)

  const lockoutSeconds = getLockoutSeconds(ip)
  if (lockoutSeconds > 0) {
    const minutes = Math.ceil(lockoutSeconds / 60)
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}.` },
      { status: 429, headers: { 'Retry-After': String(lockoutSeconds) } }
    )
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const password = body?.password

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
  }

  if (!checkAdminPassword(password)) {
    recordFailedLogin(ip)
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  clearFailedLogins(ip)
  await setAdminSession()

  return NextResponse.json({ success: true })
}
