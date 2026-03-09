'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-[15px] h-[8px] rounded-full bg-[var(--ls-bg-alt)]" />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative inline-flex w-[15px] h-[8px] shrink-0 items-center rounded-full overflow-hidden transition-colors duration-300 focus:outline-none ${
        isDark ? 'bg-slate-700' : 'bg-slate-300'
      }`}
    >
      {/* Sun */}
      <span
        className={`absolute left-[1px] transition-all duration-300 ease-in-out ${
          isDark
            ? 'w-[4px] h-[4px] text-slate-400 opacity-40'
            : 'w-[5px] h-[5px] text-amber-500 opacity-100'
        }`}
      >
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm10.28-5.03a.75.75 0 10-1.06-1.06l-1.59 1.59a.75.75 0 101.06 1.06l1.59-1.59zm1.47 4.28a.75.75 0 010 1.5h-2.25a.75.75 0 010-1.5h2.25zM17.78 17.78a.75.75 0 00-1.06-1.06l-1.59 1.59a.75.75 0 101.06 1.06l1.59-1.59zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm-5.03-1.47a.75.75 0 00-1.06 1.06l1.59 1.59a.75.75 0 101.06-1.06l-1.59-1.59zM5.25 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H4.5a.75.75 0 01.75.75zm1.28-5.03a.75.75 0 001.06-1.06L6 4.32a.75.75 0 00-1.06 1.06l1.59 1.59z" />
        </svg>
      </span>

      {/* Moon */}
      <span
        className={`absolute right-[1px] transition-all duration-300 ease-in-out ${
          isDark
            ? 'w-[5px] h-[5px] text-purple-500 opacity-100'
            : 'w-[4px] h-[4px] text-slate-400 opacity-40'
        }`}
      >
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      {/* Thumb */}
      <span
        className={`absolute top-[1px] h-[6px] w-[6px] rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-[8px]' : 'translate-x-[1px]'
        }`}
      />
    </button>
  )
}
