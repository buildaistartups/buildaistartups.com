'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState, Suspense } from 'react'

const PricingSectionDark = dynamic(() => import('@/app/(default)/pricing-section'), { ssr: false })
const PricingSectionLight = dynamic(() => import('@/app/(default)/pricing-section-light'), { ssr: false })

type ForceMode = 'light' | 'dark' | 'auto'

export default function ThemeAwarePricing({ force = 'light' }: { force?: ForceMode }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const active =
    force === 'auto' ? (theme && theme !== 'system' ? theme : resolvedTheme) : force

  const Section = active === 'light' ? PricingSectionLight : PricingSectionDark
  return (
    <Suspense fallback={null}>
      <Section />
    </Suspense>
  )
}
