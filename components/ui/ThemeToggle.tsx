'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle({ small = false }: { small?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // Use icon only for mobile (small)
  if (small) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="flex items-center justify-center rounded p-1 bg-slate-700 hover:bg-slate-600 transition"
        style={{ width: 32, height: 32 }} // much smaller!
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
      </button>
    )
  }

  // Desktop
  return (
    <button
      className="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-500 transition"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}
