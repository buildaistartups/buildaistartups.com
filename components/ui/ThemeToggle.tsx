'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className="ml-4 p-2 rounded-full bg-slate-800 text-yellow-400 hover:bg-slate-700 transition md:ml-6"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Switch Theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
