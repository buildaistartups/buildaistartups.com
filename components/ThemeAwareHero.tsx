'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function HeroSkeleton() {
  return (
    <section aria-hidden="true" suppressHydrationWarning>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          <div className="min-h-[520px] md:min-h-[680px]" />
        </div>
      </div>
    </section>
  )
}

const HeroDark = dynamic(() => import('@/components/hero'), {
  ssr: false,
  loading: () => <HeroSkeleton />,
})
const HeroLight = dynamic(() => import('@/components/hero-light'), {
  ssr: false,
  loading: () => <HeroSkeleton />,
})

export default function ThemeAwareHero() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <HeroSkeleton />

  const active = theme ?? resolvedTheme
  return active === 'light' ? <HeroLight /> : <HeroDark />
}
