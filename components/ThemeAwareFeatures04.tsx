'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function Features04Skeleton() {
  return (
    <section aria-hidden="true" suppressHydrationWarning>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 pb-12 md:pt-32 md:pb-20">
          <div className="min-h-[560px] md:min-h-[620px]" />
        </div>
      </div>
    </section>
  )
}

const Features04Dark = dynamic(() => import('./features-04'), {
  ssr: false,
  loading: () => <Features04Skeleton />,
})
const Features04Light = dynamic(() => import('./features-04-light'), {
  ssr: false,
  loading: () => <Features04Skeleton />,
})

export default function ThemeAwareFeatures04() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <Features04Skeleton />

  const activeTheme = theme ?? resolvedTheme
  return activeTheme === 'light' ? <Features04Light /> : <Features04Dark />
}
