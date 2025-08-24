// lib/server/auth.ts
import 'server-only'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Minimal session shape for stubs.
 * Replace with your real lookup (NextAuth, custom JWT, DB) later.
 */
export type Session = {
  sid: string
  user: {
    id: string
    email?: string
    name?: string
    avatarUrl?: string
  } | null
}

/**
 * Reads a session from:
 *  - Cookie `sid`
 *  - or dev override header `x-mock-user` (useful in previews)
 *
 * Next 15 note: cookies()/headers() can be async; we await both.
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const cookieSid = cookieStore.get('sid')?.value

  const hdrs = await headers()
  const devSid = hdrs.get('x-mock-user') ?? undefined

  const sid = cookieSid || devSid
  if (!sid) return null

  // TODO: Replace this static user with a real user lookup by `sid`
  return {
    sid,
    user: {
      id: `user_${sid.slice(0, 6)}`,
      email: 'user@example.com',
      name: 'Demo User',
    },
  }
}

/** Redirects to /signin if no session (use inside Server Components/Route Handlers). */
export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect('/signin')
  return session
}

/** Helper to set a session cookie (when you wire real auth). */
export async function setSessionCookie(sid: string, maxAgeSeconds = 60 * 60 * 24 * 30) {
  const cookieStore = await cookies()
  cookieStore.set('sid', sid, {
    httpOnly: true,
    secure: true,      // set false only on localhost if needed
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  })
}

/** Helper to clear the session cookie. */
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('sid')
}

/** Tiny convenience boolean for guards in Server Components/Actions. */
export async function isSignedIn(): Promise<boolean> {
  return (await getSession()) !== null
}
