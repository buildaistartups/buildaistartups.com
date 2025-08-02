'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      type="button"
      aria-label="Toggle Dark Mode"
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        // Sun icon
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4V2m0 20v-2m8-8h2M2 12H4m15.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414M18.364 19.778l-1.414-1.414M4.222 4.222l1.414 1.414" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
        </svg>
      ) : (
        // Moon icon
        <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
      )}
    </button>
  )
}
