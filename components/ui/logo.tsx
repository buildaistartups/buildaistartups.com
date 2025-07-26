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
    // Prevents hydration errors and "missing logo"
    return (
      <div className="h-[48px] w-[160px]" />
    )
  }

  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="flex items-center" aria-label="BuildAI Startups">
      <Image
        src={logoSrc}
        width={80} // or whatever the real width is for your SVG
        height={72}
        alt="BuildAI Startups Logo"
        className="h-12 w-auto"
        priority
      />
    </Link>
  )
}
