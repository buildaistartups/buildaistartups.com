"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLogo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: 120, height: 60 }} />
  }

  const logoSrc =
    resolvedTheme === 'dark'
      ? '/images/logo-dark.svg'
      : '/images/logo-light.svg'

  return (
    <Link href="/" aria-label="BuildAIStartups.com" className="inline-flex items-center">
      <Image
        src={logoSrc}
        width={120}
        height={60}
        alt="BuildAIStartups.com Logo"
        priority
      />
    </Link>
  )
}
