'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

// Match your on-disk filenames exactly (lowercase)
const Features = dynamic(() => import('../components/features'), { ssr: false })
const FeaturesLight = dynamic(() => import('../components/features-light'), { ssr: false })

function FeaturesSwitcher() {
  const { theme, resolvedTheme } = useTheme()
  const active = theme ?? resolvedTheme
  return active === 'light' ? <FeaturesLight /> : <Features />
}

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <>
        {children}
        <FeaturesSwitcher />
      </>
    </ThemeProvider>
  )
}
