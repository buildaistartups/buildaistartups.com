'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Lazy-load to keep the initial bundle small and avoid SSR/hydration issues
const CtaDark = dynamic(() => import('./cta'), { ssr: false })
const CtaLight = dynamic(() => import('./cta-light'), { ssr: false })

export default function ThemeAwareCTA() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid a mismatch between server and client by waiting for mount
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Render a neutral fallback during SSR (you can change to <CtaDark /> if preferred)
    return null
  }

  return resolvedTheme === 'light' ? <CtaLight /> : <CtaDark />
}
