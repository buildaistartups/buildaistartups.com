'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="buildaistartups-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
