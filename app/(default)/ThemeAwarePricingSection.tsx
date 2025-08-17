'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Lazy-load both pricing variants, no SSR to avoid hydration mismatch
const PricingDark = dynamic(() => import('./pricing-section'), { ssr: false })
const PricingLight = dynamic(() => import('./pricing-section-light'), { ssr: false })

export default function ThemeAwarePricingSection() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const activeTheme = theme && theme !== 'system' ? theme : resolvedTheme

  return activeTheme === 'light'
    ? <PricingLight key="pricing-light" />
    : <PricingDark key="pricing-dark" />
}
