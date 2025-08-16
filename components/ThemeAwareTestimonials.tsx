'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// Load both versions client-side (no SSR) so we can switch by theme
const TestimonialsCarousel = dynamic(() => import('./testimonials-carousel'), { ssr: false })
const TestimonialsCarouselLight = dynamic(() => import('./testimonials-carousel-light'), { ssr: false })

export default function ThemeAwareTestimonials() {
  const { theme, resolvedTheme } = useTheme()
  const active = theme ?? resolvedTheme
  return active === 'light' ? <TestimonialsCarouselLight /> : <TestimonialsCarousel />
}
