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

  // Reserve space so layout doesn't jump before mount
  if (!mounted) {
    return (
      <section aria-hidden="true">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* match the section paddings used by features-light/features */}
          <div className="pt-16 pb-12 md:pt-52 md:pb-20">
            {/* conservative min-height to cover the tabs + art area */}
            <div className="min-h-[620px] md:min-h-[720px]" />
          </div>
        </div>
      </section>
    )
  }

  const active =
    theme && theme !== 'system'
      ? theme
      : resolvedTheme

  return active === 'light'
    ? <FeaturesLight key="features-light" />
    : <FeaturesDark key="features-dark" />
}
