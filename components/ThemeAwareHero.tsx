'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// Dynamic hero variants (no SSR so the client theme can decide)
const HeroDark = dynamic(() => import('@/components/hero'), { ssr: false })
const HeroLight = dynamic(() => import('@/components/hero-light'), { ssr: false })

export default function ThemeAwareHero() {
  const { theme, resolvedTheme } = useTheme()
  const active = theme ?? resolvedTheme
  return active === 'light' ? <HeroLight /> : <HeroDark />
}
