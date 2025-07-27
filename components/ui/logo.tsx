"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      setFirstLoad(!localStorage.getItem("theme"))
    }
  }, [])

  if (!mounted) {
    return <div style={{ width: 120, height: 60 }} />  // Placeholder
  }

  // Logo selection logic
  let logoSrc = '/images/logo.svg' // Default logo for first load
  if (!firstLoad) {
    logoSrc = resolvedTheme === 'dark'
      ? '/images/logo-dark.svg'
      : '/images/logo-light.svg'
  }

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
