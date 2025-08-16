'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Load both versions client-side (no SSR) so we can switch by theme
const TestimonialsCarousel = dynamic(() => import('./testimonials-carousel'), { ssr: false })
const TestimonialsCarouselLight = dynamic(() => import('./testimonials-carousel-light'), { ssr: false })

export default function ThemeAwareTestimonials() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <section aria-hidden="true">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* section spacing used by testimonials */}
          <div className="pt-12 md:pt-20">
            <div className="min-h-[520px] md:min-h-[560px]" />
          </div>
        </div>
      </section>
    )
  }

  const active = theme ?? resolvedTheme
  return active === 'light'
    ? <TestimonialsCarouselLight />
    : <TestimonialsCarousel />
}
