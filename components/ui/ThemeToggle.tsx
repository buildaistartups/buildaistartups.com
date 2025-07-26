'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // You can use emoji or a real SVG icon here
  const icon =
    theme === 'dark' ? (
      <span role="img" aria-label="Light Mode" className="text-2xl md:text-xl">🌞</span>
    ) : (
      <span role="img" aria-label="Dark Mode" className="text-2xl md:text-xl">🌙</span>
    )

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="ml-4 p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {icon}
    </button>
  )
}
