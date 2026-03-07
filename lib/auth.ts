// lib/auth.ts
// Re-export server auth helpers so existing imports keep working.
export {
  getSession,
  requireSession,
  isSignedIn,
  setSessionCookie,
  clearSessionCookie,
} from './server/auth'

export type { Session } from './server/auth'
