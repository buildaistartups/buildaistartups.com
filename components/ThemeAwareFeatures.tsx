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

  const active = theme ?? resolvedTheme
  return active === 'light' ? <FeaturesLight /> : <FeaturesDark />
}
