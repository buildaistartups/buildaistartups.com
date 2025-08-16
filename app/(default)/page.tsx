// app/(default)/page.tsx
export const metadata = {
  title: 'Home - BuildAIStartups',
  description: 'Page description',
}

import ThemeAwareHero from '@/components/ThemeAwareHero'
import Clients from '@/components/clients'
import Features from '@/components/features'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import ThemeAwareTestimonials from '@/components/ThemeAwareTestimonials'
import Features04 from '@/components/features-04'
import Pricing from './pricing-section'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <ThemeAwareHero />
      <Clients />
      <Features />
      <Features02 />
      <Features03 />
      <ThemeAwareTestimonials />
      <Features04 />
      <Pricing />
      <Testimonials />
      <Cta />
    </>
  )
}
