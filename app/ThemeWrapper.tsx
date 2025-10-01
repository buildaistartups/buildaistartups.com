'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Wait until client hydration so theme is available
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return null // 🔥 prevents rendering mismatch (flash)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  )
}
