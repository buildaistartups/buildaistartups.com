// components/ui/header.tsx
import 'server-only'
import { getSession } from '@/lib/auth'
import HeaderClient from './header-client'

export default async function Header() {
  const session = await getSession()
  return <HeaderClient signedIn={!!session} />
}
