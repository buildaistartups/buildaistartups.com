// lib/server/auth.ts
import { cookies, headers } from 'next/headers'

export type Session = {
  user: { id: string; email: string }
}

/**
 * Super-light placeholder auth:
 * - Signed-in if a "sid" cookie exists (or x-mock-user header in dev).
 * Replace with your real provider later.
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const hdrs = await headers()

  const cookieSid = cookieStore.get('sid')?.value
  const devSid = hdrs.get('x-mock-user')
  const sid = cookieSid || devSid
  if (!sid) return null

  return {
    user: {
      id: 'user_' + String(sid).slice(0, 6),
      email: 'user@example.com',
    },
  }
}

/** Optional helper if you want to enforce auth inside a Server Component/Action */
export async function requireSession(): Promise<Session> {
  const s = await getSession()
  if (!s) {
    // In a Server Component you can instead `redirect('/signin?next=/app')`
    throw new Error('UNAUTHENTICATED')
  }
  return s
}
