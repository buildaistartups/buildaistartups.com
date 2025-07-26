'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // You can use any emoji, SVG or icon here
  const icon =
    theme === 'dark' ? (
      <span role="img" aria-label="Light mode">
        ☀️
      </span>
    ) : (
      <span role="img" aria-label="Dark mode">
        🌙
      </span>
    )

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      // Size: small on desktop, bigger on mobile
      className="
        flex items-center justify-center
        bg-transparent
        p-2
        rounded-full
        hover:bg-slate-700/20
        transition
        text-2xl
        md:text-xl
        md:bg-transparent
        md:shadow-none
      "
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Hide label on desktop, show (smaller) on mobile if you want */}
      <span className="block md:hidden text-base ml-2">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
      <span className="md:block">{icon}</span>
    </button>
  )
}
