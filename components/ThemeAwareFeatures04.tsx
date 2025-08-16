'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Dynamic imports to avoid pulling both variants into the initial bundle
const Features04Dark = dynamic(() => import('./features-04'), { ssr: false })
const Features04Light = dynamic(() => import('./features-04-light'), { ssr: false })

export default function ThemeAwareFeatures04() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const activeTheme = theme ?? resolvedTheme
  return activeTheme === 'light' ? <Features04Light /> : <Features04Dark />
}
