"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLogo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // While theme is unknown on first render, preserve layout to avoid shift
  if (!mounted) {
    return (
      <span className="inline-block w-[120px] h-[60px]" aria-hidden="true" />
    )
  }

  const logoSrc =
    resolvedTheme === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg'

  return (
    <Link href="/" aria-label="Build AI Startups" className="inline-flex items-center" prefetch={false}>
      <Image
        src={logoSrc}
        width={120}
        height={60}
        alt="Build AI Startups logo"
        priority
      />
    </Link>
  )
}
