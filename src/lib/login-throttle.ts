// Simple in-memory throttle for admin login attempts, keyed by client IP.
// Each server instance keeps its own counts, so on Vercel this is best-effort:
// it slows down guessing rather than guaranteeing a hard global limit.

const MAX_FAILURES = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

type Attempts = { failures: number; resetAt: number }

const attempts = new Map<string, Attempts>()

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
}

/** Seconds until this IP may try again, or 0 if it is not locked out. */
export function getLockoutSeconds(ip: string) {
  const record = attempts.get(ip)
  if (!record) return 0

  const now = Date.now()
  if (record.resetAt <= now) {
    attempts.delete(ip)
    return 0
  }

  return record.failures >= MAX_FAILURES ? Math.ceil((record.resetAt - now) / 1000) : 0
}

export function recordFailedLogin(ip: string) {
  const now = Date.now()
  const record = attempts.get(ip)

  if (!record || record.resetAt <= now) {
    attempts.set(ip, { failures: 1, resetAt: now + WINDOW_MS })
  } else {
    record.failures += 1
    // Lock out for a full window from the attempt that hit the limit.
    if (record.failures >= MAX_FAILURES) record.resetAt = now + WINDOW_MS
  }

  if (attempts.size > 1000) {
    for (const [key, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(key)
    }
  }
}

export function clearFailedLogins(ip: string) {
  attempts.delete(ip)
}
