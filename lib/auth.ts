// lib/auth.ts
import { cookies, headers } from 'next/headers'

/**
 * Very small placeholder auth:
 * - If a cookie named "sid" exists, we treat the user as signed in.
 * - Otherwise, unauthenticated.
 * Replace with your real session logic later (NextAuth, custom JWT, etc.)
 */
export async function getSession() {
  const cookieSid = cookies().get('sid')?.value
  // Allow an alternate dev header for local testing (optional)
  const devSid = headers().get('x-mock-user')
  const sid = cookieSid || devSid
  if (!sid) return null

  // Minimal session shape
  return {
    user: {
      id: 'user_' + sid.slice(0, 6),
      email: 'user@example.com', // replace with real email from your provider
    },
  }
}
