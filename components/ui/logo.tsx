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
      <div className="h-[48px] w-[160px]" /> // Reserve space so layout doesn't shift
    )
  }

  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="flex items-center gap-2" aria-label="BuildAI Startups">
      <Image
        src={logoSrc}
        width={48}
        height={48}
        alt="BuildAI Startups Logo"
        className="w-12 h-12"
        priority
      />
      <span className="ml-2 font-bold text-2xl text-slate-900 dark:text-white">BuildAI<br />Startups</span>
    </Link>
  )
}
