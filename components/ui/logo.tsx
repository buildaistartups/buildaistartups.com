'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Logo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Avoid hydration mismatch
  if (!mounted) return null

  let logoSrc = '/images/logo.svg' // fallback
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link className="inline-flex" href="/" aria-label="BuildAI Startups">
      <Image
        className="max-w-none"
        src={logoSrc}
        width={92}    // Twice original size
        height={100}
        priority
        alt="BuildAI Startups Logo"
      />
    </Link>
  )
}
