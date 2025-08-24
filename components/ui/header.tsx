// components/ui/header.tsx  (Server Component)
import { getSession } from '@/lib/server/auth'
import HeaderClient from './header-client'

export default async function Header() {
  let signedIn = false
  try {
    const session = await getSession()
    signedIn = !!session
  } catch {
    signedIn = false
  }
  return <HeaderClient signedIn={signedIn} />
}
