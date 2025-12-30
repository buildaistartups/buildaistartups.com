'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  const baseBtn =
    'grid h-4 w-4 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70'
  const activeBtn = 'bg-slate-900 shadow-sm'
  const inactiveBtn = 'hover:bg-slate-900/5'

  return (
    <div className="ml-4 inline-flex items-center rounded-full border border-slate-200/70 bg-white/85 p-[2px] backdrop-blur">
      {/* Light */}
      <button
        aria-label="Light mode"
        onClick={() => setTheme('light')}
        className={`${baseBtn} ${!isDark ? activeBtn : inactiveBtn}`}
        type="button"
      >
        <svg
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={!isDark ? 'text-white' : 'text-slate-700'}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {/* Dark */}
      <button
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
        className={`${baseBtn} ${isDark ? activeBtn : inactiveBtn}`}
        type="button"
      >
        <svg
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={isDark ? 'text-white' : 'text-slate-700'}
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>
    </div>
  )
}
