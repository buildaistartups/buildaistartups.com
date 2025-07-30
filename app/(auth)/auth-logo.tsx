'use client'

import Image from 'next/image'

type AuthLogoProps = {
  className?: string
}

export default function AuthLogo({ className = '' }: AuthLogoProps) {
  return (
    <div className={className}>
      <Image
        src="/images/logo-dark.svg"
        alt="BuildAIStartups.com Logo"
        width={120}
        height={60}
        priority
      />
    </div>
  )
}
