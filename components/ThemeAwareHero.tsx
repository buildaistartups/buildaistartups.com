'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Dynamic hero variants (no SSR so the client theme can decide)
const HeroDark = dynamic(() => import('@/components/hero'), { ssr: false })
const HeroLight = dynamic(() => import('@/components/hero-light'), { ssr: false })

export default function ThemeAwareHero() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <section aria-hidden="true">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* hero paddings */}
          <div className="pt-32 pb-16 md:pt-52 md:pb-32">
            <div className="min-h-[520px] md:min-h-[680px]" />
          </div>
        </div>
      </section>
    )
  }

  const active = theme ?? resolvedTheme
  return active === 'light' ? <HeroLight /> : <HeroDark />
}
