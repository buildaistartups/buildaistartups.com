'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-white text-black dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        {children}
      </div>
    </ThemeProvider>
  )
}
