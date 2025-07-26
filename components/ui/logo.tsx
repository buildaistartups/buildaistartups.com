'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { theme } = useTheme()

  // Default logo path (fallback)
  let logoSrc = '/images/logo.svg'
  // Adjust to use correct logo for theme
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="inline-flex items-center" aria-label="BuildAI Startups">
      <Image
        src={logoSrc}
        width={72}
        height={80}
        alt="BuildAI Startups"
        className="w-10 h-10"
        priority
      />
    </Link>
  )
}
