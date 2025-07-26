'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle({ small }: { small?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // Smaller button and icon for mobile
  return (
    <button
      className={`flex items-center rounded transition
        ${small ? 'text-base px-1 py-1' : 'text-lg px-3 py-1'}
        bg-slate-700 text-white hover:bg-slate-500
      `}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
    >
      <span className={`${small ? 'text-xl' : 'text-2xl'}`}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      {!small && (
        <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  )
}
