'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Lazy-load both variants (no SSR to avoid hydration mismatch)
const FeaturesDark = dynamic(() => import('./features'), { ssr: false })
const FeaturesLight = dynamic(() => import('./features-light'), { ssr: false })

export default function ThemeAwareFeatures() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // Prefer explicit user choice; fall back to resolved system theme
  const active =
    theme && theme !== 'system'
      ? theme
      : resolvedTheme

  return active === 'light'
    ? <FeaturesLight key="features-light" />
    : <FeaturesDark key="features-dark" />
}
