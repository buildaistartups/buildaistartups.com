'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function FeaturesSkeleton() {
  return (
    <section aria-hidden="true" suppressHydrationWarning>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* match the real section paddings */}
        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div className="min-h-[620px] md:min-h-[720px]" />
        </div>
      </div>
    </section>
  )
}

const FeaturesDark = dynamic(() => import('./features'), {
  ssr: false,
  loading: () => <FeaturesSkeleton />,
})
const FeaturesLight = dynamic(() => import('./features-light'), {
  ssr: false,
  loading: () => <FeaturesSkeleton />,
})

export default function ThemeAwareFeatures() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const active = (theme && theme !== 'system') ? theme : resolvedTheme

  // Before mount, still render a skeleton (not null) so layout never collapses
  if (!mounted) return <FeaturesSkeleton />

  return active === 'light'
    ? <FeaturesLight key="features-light" />
    : <FeaturesDark key="features-dark" />
}
