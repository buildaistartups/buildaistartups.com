'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { theme } = useTheme()

  // Pick logo source based on theme
  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="BuildAI Startups">
      <Image
        src={logoSrc}
        width={48}    // Increased size
        height={48}
        alt="BuildAI Startups"
        className="w-12 h-12" // Tailwind for 48px x 48px
        priority
      />
      {/* If you want the text next to the logo icon, keep this: */}
      <span className="ml-2 font-bold text-xl text-slate-100 hidden sm:inline">BuildAI<br/>Startups</span>
    </Link>
  )
}
