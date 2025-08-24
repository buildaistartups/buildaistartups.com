// lib/server/auth.ts
// Server utilities only — import these from Server Components or Route Handlers.
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

/** Minimal session shape for stubs. Replace with real lookup later. */
export type Session = {
  sid: string
  user: {
    id: string
    email?: string
    name?: string
    avatarUrl?: string
  } | null
}

/** Read session from cookie `sid` or dev header `x-mock-user`. */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const cookieSid = cookieStore.get('sid')?.value

  const hdrs = await headers()
  const devSid = hdrs.get('x-mock-user') ?? undefined

  const sid = cookieSid || devSid
  if (!sid) return null

  // TODO: swap static user for real lookup by `sid`
  return {
    sid,
    user: {
      id: `user_${sid.slice(0, 6)}`,
      email: 'user@example.com',
      name: 'Demo User',
    },
  }
}

/** Guard: redirect to /signin when not authenticated. */
export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect('/signin')
  return session
}

/** Helpers to set/clear the session cookie — call from server contexts only. */
export async function setSessionCookie(
  sid: string,
  maxAgeSeconds = 60 * 60 * 24 * 30, // 30 days
) {
  const cookieStore = await cookies()
  cookieStore.set('sid', sid, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('sid')
}

/** Convenience boolean for simple guards. */
export async function isSignedIn(): Promise<boolean> {
  return (await getSession()) !== null
}
