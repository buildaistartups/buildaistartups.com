'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Load both sections, but we'll force the light one
const PricingSectionDark = dynamic(() => import('@/app/(default)/pricing-section'), { ssr: false })
const PricingSectionLight = dynamic(() => import('@/app/(default)/pricing-section-light'), { ssr: false })

export default function ThemeAwarePricing() {
  // 🔒 Force the LIGHT section regardless of theme so we see your light table
  const Section = PricingSectionLight
  return (
    <Suspense fallback={null}>
      <Section />
    </Suspense>
  )
}
