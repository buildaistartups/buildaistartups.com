'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

// Dynamic imports for theme-based components
const Features = dynamic(() => import('../components/features'), { ssr: false })
const FeaturesLight = dynamic(() => import('../components/features-light'), { ssr: false })

const TestimonialsCarousel = dynamic(() => import('../components/testimonials-carousel'), { ssr: false })
const TestimonialsCarouselLight = dynamic(() => import('../components/testimonials-carousel-light'), { ssr: false })

function FeaturesSwitcher() {
  const { theme, resolvedTheme } = useTheme()
  const activeTheme = theme ?? resolvedTheme
  return activeTheme === 'light' ? <FeaturesLight /> : <Features />
}

function TestimonialsSwitcher() {
  const { theme, resolvedTheme } = useTheme()
  const activeTheme = theme ?? resolvedTheme
  return activeTheme === 'light' ? <TestimonialsCarouselLight /> : <TestimonialsCarousel />
}

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <>
        {children}
        <FeaturesSwitcher />
        <TestimonialsSwitcher />
      </>
    </ThemeProvider>
  )
}
