'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-7 h-4 rounded-full bg-[var(--ls-bg-alt)]" />
  }

  const isDark = theme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none"
      style={{ backgroundColor: isDark ? 'rgba(139, 92, 246, 0.5)' : '#94a3b8' }}
    >
      {/* Sun icon (left side) — golden in light, dim in dark */}
      <span className={`absolute left-0.5 transition-opacity duration-200 ${isDark ? 'opacity-30' : 'opacity-100'}`}>
        <svg className="w-2.5 h-2.5 text-yellow-300 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      </span>
      {/* Moon icon (right side) — purple in dark, slate in light (never white) */}
      <span className={`absolute right-0.5 transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-30'}`}>
        <svg className="w-2.5 h-2.5 text-purple-300 [html[data-theme=light]_&]:text-slate-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
      {/* Thumb */}
      <span
        className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow transition-transform duration-300 ${isDark ? 'translate-x-[14px]' : 'translate-x-[2px]'}`}
      />
    </button>
  )
}
