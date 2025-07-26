'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle({ small }: { small?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className={`flex items-center px-2 py-1 rounded ${
        small
          ? 'text-base bg-slate-700 hover:bg-slate-500'
          : 'px-3 py-1 text-lg bg-slate-700 hover:bg-slate-500'
      } text-white transition`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark'
        ? small
          ? '☀️'
          : '☀️ Light Mode'
        : small
        ? '🌙'
        : '🌙 Dark Mode'}
    </button>
  )
}
