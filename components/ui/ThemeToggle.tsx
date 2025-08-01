'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="relative w-7 h-4 flex items-center rounded-full px-[2px] bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      type="button"
      style={{ minWidth: '28px', minHeight: '16px' }} // Ensures tap area for accessibility
    >
      {/* Track background */}
      <span
        className={`absolute inset-0 rounded-full transition-colors duration-300 pointer-events-none ${
          isDark ? 'bg-slate-700' : 'bg-slate-200'
        }`}
        aria-hidden="true"
      />
      {/* Sliding Knob */}
      <span
        className={`z-10 inline-block w-3 h-3 bg-white dark:bg-slate-900 rounded-full shadow-md transform transition-transform duration-300
          ${isDark ? 'translate-x-3' : 'translate-x-0'}
        `}
        style={{ position: 'relative' }}
      >
        <span className="absolute left-0 top-0 flex items-center justify-center w-3 h-3">
          {isDark ? (
            <svg
              className="w-2.5 h-2.5 text-yellow-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              {/* minimal rays for clarity */}
            </svg>
          ) : (
            <svg
              className="w-2.5 h-2.5 text-slate-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          )}
        </span>
      </span>
      {/* Sun/Moon on each end for clarity */}
      <span className="absolute left-[2px] text-yellow-400 text-[10px] select-none pointer-events-none">🌞</span>
      <span className="absolute right-[2px] text-slate-400 dark:text-yellow-300 text-[10px] select-none pointer-events-none">🌙</span>
    </button>
  )
}
