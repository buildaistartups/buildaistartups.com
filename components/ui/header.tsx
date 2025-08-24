// components/ui/header.tsx
// Server wrapper that reads the session and renders the client header.
import { getSession } from '@/lib/server/auth'
import HeaderClient from './header-client'

export default async function Header() {
  const session = await getSession()
  const signedIn = !!session
  return <HeaderClient signedIn={signedIn} />
}
