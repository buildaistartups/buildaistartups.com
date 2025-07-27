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
    <Link href="/" aria-label="BuildAIStartups" className="block mb-8">
      <Image
        src={logoSrc}
        width={80}   // Adjust to match your desired logo width
        height={72}   // Adjust height proportionally to your SVG
        alt="BuildAIStartups Logo"
        priority
      />
    </Link>
  )
}
