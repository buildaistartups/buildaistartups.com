'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = resolvedTheme ?? theme
  const isDark = current === 'dark'

  return (
    <div className="ml-4 inline-flex items-center rounded-full border border-slate-200 bg-white p-[2px] shadow-sm">
      <button
        aria-label="Light mode"
        onClick={() => setTheme('light')}
        className={`grid h-4 w-4 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 ${
          !isDark ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
        }`}
        type="button"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[10px] w-[10px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      <button
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
        className={`grid h-4 w-4 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 ${
          isDark ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
        }`}
        type="button"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[10px] w-[10px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>
    </div>
  )
}
