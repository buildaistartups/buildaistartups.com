export const metadata = {
  title: 'Home - BuildAIStartups',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features from '@/components/features'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
// ❌ Removed: import TestimonialsCarousel from '@/components/testimonials-carousel'
import Features04 from '@/components/features-04'
import Pricing from './pricing-section'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Features />
      <Features02 />
      <Features03 />
      {/* ❌ Removed the inline testimonials carousel to avoid duplication
          ThemeWrapper now injects the correct (dark/light) testimonials section */}
      {/* <TestimonialsCarousel /> */}
      <Features04 />
      <Pricing />
      <Testimonials />
      <Cta />
    </>
  )
}
