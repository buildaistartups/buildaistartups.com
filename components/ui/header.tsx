// components/ui/header.tsx
import { getSession } from '@/lib/auth'
import HeaderClient from './header-client'

export default async function Header() {
  // getSession uses next/headers (server-only); if this component is
  // ever pulled into a client boundary by mistake, avoid crashing:
  let signedIn = false
  try {
    const session = await getSession()
    signedIn = !!session
  } catch {
    signedIn = false
  }

  return <HeaderClient signedIn={signedIn} />
}
