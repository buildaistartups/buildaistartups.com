'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function AuthLogo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-10 w-10" />
  }

  // Adjust for your file structure and naming!
  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="flex items-center gap-2 mb-8" aria-label="BuildAIStartups">
      <Image
        src={logoSrc}
        width={40}
        height={36}
        alt="BuildAIStartups Logo"
        className="h-10 w-auto"
        priority
      />
      <span className="ml-1 font-bold text-xl text-slate-900 dark:text-white align-middle">
        BuildAI Startups
      </span>
    </Link>
  )
}
