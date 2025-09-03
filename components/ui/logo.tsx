'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Avoid hydration mismatch: render a fixed-size placeholder until theme is known
  if (!mounted) {
    return <div style={{ width: 120, height: 60 }} aria-hidden />
  }

  const isDark = (resolvedTheme || 'dark') === 'dark'
  // Use light logo on dark backgrounds, dark logo on light backgrounds (consistent with brand assets)
  const logoSrc = isDark ? '/brand/logo-light.svg' : '/brand/logo-dark.svg'

  return (
    <Link href="/" aria-label="Build AI Starups" title="Build AI Starups" className="flex items-center gap-2">
      <Image
        src={logoSrc}
        width={120}
        height={60}
        alt="Build AI Starups logo"
        priority
        sizes="120px"
      />
      <span className="sr-only">Build AI Starups</span>
    </Link>
  )
}
