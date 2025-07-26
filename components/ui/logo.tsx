'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { theme } = useTheme()

  let logoSrc = '/images/logo.svg' // fallback/default
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link className="inline-flex" href="/" aria-label="BuildAI Startups">
      <Image
        className="max-w-none"
        src={logoSrc}
        width={132}
        height={140}
        priority
        alt="BuildAI Startups Logo"
      />
    </Link>
  )
}
