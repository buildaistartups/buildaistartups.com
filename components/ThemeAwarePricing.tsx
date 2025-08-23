'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState, Suspense } from 'react'

// Dynamically import whole sections (each section imports its own table)
const PricingSectionDark = dynamic(() => import('@/app/(default)/pricing-section'), { ssr: false })
const PricingSectionLight = dynamic(() => import('@/app/(default)/pricing-section-light'), { ssr: false })

export default function ThemeAwarePricing() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const active = theme && theme !== 'system' ? theme : resolvedTheme
  const Section = active === 'light' ? PricingSectionLight : PricingSectionDark

  return (
    <Suspense fallback={null}>
      <Section />
    </Suspense>
  )
}
