'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import Features from './features'
import FeaturesLight from './features-light'

function FeaturesSwitcher() {
  const { theme } = useTheme()

  // Only swap component based on active theme
  if (theme === 'light') {
    return <FeaturesLight />
  }
  return <Features />
}

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <>
        {/* Render all other children */}
        {children}

        {/* Conditionally render the correct Features variant */}
        <FeaturesSwitcher />
      </>
    </ThemeProvider>
  )
}
