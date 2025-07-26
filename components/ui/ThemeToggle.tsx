'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // Use resolvedTheme for system support
  const currentTheme = resolvedTheme || theme

  return (
    <button
      className="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-500 transition ml-3"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Dark/Light Mode"
      type="button"
    >
      {currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}
