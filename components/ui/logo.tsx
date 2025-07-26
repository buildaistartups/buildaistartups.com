'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Logo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Keep placeholder size consistent with logo
    return <div className="h-8 w-24" />
  }

  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="flex items-center" aria-label="BuildAI Startups">
      <Image
        src={logoSrc}
        width={96}
        height={32}
        alt="BuildAI Startups Logo"
        className="h-8 w-auto" // Tailwind h-8 for 32px height
        priority
      />
    </Link>
  )
}
