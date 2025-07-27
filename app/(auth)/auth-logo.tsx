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
    return <div className="h-12 w-12" />
  }

  // Adjust according to your logo file names and location!
  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <Link href="/" className="flex items-center gap-2" aria-label="BuildAIStartups">
      <Image
        src={logoSrc}
        width={80}
        height={72}
        alt="BuildAIStartups Logo"
        className="h-12 w-12"
        priority
      />
      <span className="ml-2 font-bold text-2xl text-slate-900 dark:text-white">
        BuildAIStartups
      </span>
    </Link>
  )
}
