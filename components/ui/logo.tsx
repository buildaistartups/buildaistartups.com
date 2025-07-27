'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render logo once theme is known, to avoid SSR mismatch
  if (!mounted) return <div style={{ width: 120, height: 60 }} />  // blank/placeholder

  const logoSrc = resolvedTheme === 'dark'
    ? '/images/logo-dark.svg'
    : '/images/logo-light.svg'

  return (
    <Link href="/" aria-label="BuildAIStartups" className="flex items-center gap-2">
      <Image
        src={logoSrc}
        width={120}
        height={60}
        alt="BuildAIStartups Logo"
        priority
      />
    </Link>
  )
}
