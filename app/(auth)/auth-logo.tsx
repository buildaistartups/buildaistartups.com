'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function AuthLogo() {
  const { resolvedTheme } = useTheme()

  const logoSrc =
    resolvedTheme === 'dark'
      ? '/images/logo-dark.svg'
      : '/images/logo-light.svg'

  return (
    <Link href="/" className="flex items-center gap-2 mb-8" aria-label="BuildAIStartups">
      <Image
        src={logoSrc}
        width={80}
        height={72}
        alt="BuildAIStartups"
        className="h-12 w-12"
        priority
      />
      <span className="ml-2 font-bold text-2xl text-slate-900 dark:text-white">
        BuildAI Startups
      </span>
    </Link>
  )
}
