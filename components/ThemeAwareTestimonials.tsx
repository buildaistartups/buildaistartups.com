'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function TestimonialsSkeleton() {
  return (
    <section aria-hidden="true" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="min-h-[520px] md:min-h-[560px]" />
        </div>
      </div>
    </section>
  )
}

const TestimonialsCarousel = dynamic(() => import('./testimonials-carousel'), {
  ssr: false,
  loading: () => <TestimonialsSkeleton />,
})
const TestimonialsCarouselLight = dynamic(
  () => import('./testimonials-carousel-light'),
  { ssr: false, loading: () => <TestimonialsSkeleton /> },
)

export default function ThemeAwareTestimonials() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <TestimonialsSkeleton />

  const active = theme ?? resolvedTheme
  return active === 'light' ? <TestimonialsCarouselLight /> : <TestimonialsCarousel />
}
