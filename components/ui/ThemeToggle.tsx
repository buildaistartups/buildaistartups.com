'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // Just the icon!
  const icon =
    resolvedTheme === 'dark' ? (
      <span role="img" aria-label="Light Mode" className="text-xl md:text-lg">🌞</span>
    ) : (
      <span role="img" aria-label="Dark Mode" className="text-xl md:text-lg">🌙</span>
    )

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="ml-4 p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {icon}
    </button>
  )
}
