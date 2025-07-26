'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { theme } = useTheme()
  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="BuildAI Startups">
      {/* Logo Icon */}
      <Image
        src={logoSrc}
        width={40}
        height={40}
        alt="BuildAI Startups"
        className="w-10 h-10" // 40x40px
        priority
      />
      {/* Text next to icon, smaller and single line on desktop */}
      <span className="ml-2 font-semibold text-lg text-slate-100 hidden md:inline">BuildAI Startups</span>
      <span className="ml-2 font-semibold text-base text-slate-100 md:hidden">BuildAI</span>
    </Link>
  )
}
