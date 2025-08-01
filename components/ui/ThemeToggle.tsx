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
      className="relative w-14 h-8 flex items-center rounded-full px-1 bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      type="button"
    >
      {/* Track background */}
      <span
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-slate-700' : 'bg-slate-200'
        }`}
        aria-hidden="true"
      />
      {/* Sliding Knob */}
      <span
        className={`z-10 inline-block w-6 h-6 bg-white dark:bg-slate-900 rounded-full shadow-md transform transition-transform duration-300
          ${isDark ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        <span className="absolute left-1 top-1">
          {isDark ? (
            <svg
              className="w-4 h-4 text-yellow-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 6.05L5.636 4.636" />
              <circle cx="12" cy="12" r="5" fill="currentColor" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-slate-600"
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
      {/* Sun/Moon on each end for extra clarity */}
      <span className="absolute left-2 text-yellow-400 text-lg select-none pointer-events-none">🌞</span>
      <span className="absolute right-2 text-slate-400 dark:text-yellow-300 text-lg select-none pointer-events-none">🌙</span>
    </button>
  )
}
