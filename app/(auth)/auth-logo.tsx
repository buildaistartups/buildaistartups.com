'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function AuthLogo() {
  const { theme } = useTheme()
  let logoSrc = '/images/logo.svg'
  if (theme === 'dark') logoSrc = '/images/logo-light.svg'
  else if (theme === 'light') logoSrc = '/images/logo-dark.svg'

  return (
    <div className="flex items-center justify-center mb-5">
      <Link href="/" className="inline-flex items-center gap-2" aria-label="BuildAI Startups">
        <Image
          src={logoSrc}
          width={48}
          height={48}
          alt="BuildAI Startups Logo"
          className="w-12 h-12"
          priority
        />
        <span className="ml-2 font-semibold text-lg text-slate-900 dark:text-white">BuildAI Startups</span>
      </Link>
    </div>
  )
}
