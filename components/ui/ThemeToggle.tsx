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
    <div className="inline-flex items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full px-[1px] py-0.5 shadow-sm" style={{ minWidth: 18 }}>
      <button
        aria-label="Light mode"
        onClick={() => setTheme('light')}
        className={`w-4 h-4 flex items-center justify-center rounded-full transition text-[8px]
          ${!isDark ? 'bg-gray-100 text-yellow-400' : 'text-gray-400 hover:bg-gray-100'}`}
        tabIndex={0}
        type="button"
      >
        {/* Sun SVG */}
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="5" stroke="currentColor" fill="none"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
      <button
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
        className={`w-4 h-4 flex items-center justify-center rounded-full transition text-[8px]
          ${isDark ? 'bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-yellow-300' : 'text-gray-400 hover:bg-gray-100'}`}
        tabIndex={0}
        type="button"
      >
        {/* Moon SVG */}
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}
