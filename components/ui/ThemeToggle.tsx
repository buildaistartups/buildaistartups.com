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
    <div
      className="inline-flex items-center ml-2 px-[1px] py-[1px] rounded-full"
      style={{
        backgroundColor: '#D0CFDD',
        minWidth: 18,
      }}
    >
      <button
        aria-label="Light mode"
        onClick={() => setTheme('light')}
        className={`w-3 h-3 flex items-center justify-center rounded-full transition text-[6px] focus-visible:ring-2 focus-visible:ring-blue-400
          ${!isDark ? 'bg-white shadow-sm' : 'hover:bg-white/70'}
        `}
        style={{
          border: 'none',
        }}
        tabIndex={0}
        type="button"
      >
        {/* Sun SVG (black icon) */}
        <svg width="8" height="8" fill="none" stroke="#000" strokeWidth="0.9" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="5" stroke="#000" fill="none"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#000" />
        </svg>
      </button>
      <button
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
        className={`w-3 h-3 flex items-center justify-center rounded-full transition text-[6px] focus-visible:ring-2 focus-visible:ring-blue-400
          ${isDark ? 'bg-white shadow-sm' : 'hover:bg-white/70'}
        `}
        style={{
          border: 'none',
        }}
        tabIndex={0}
        type="button"
      >
        {/* Moon SVG (black icon) */}
        <svg width="8" height="8" fill="none" stroke="#000" strokeWidth="0.9" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="none"
            stroke="#000"
          />
        </svg>
      </button>
    </div>
  )
}
