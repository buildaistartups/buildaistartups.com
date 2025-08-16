export const metadata = {
  title: 'Home - BuildAIStartups',
  description: 'Page description',
}

import ThemeAwareHero from '@/components/ThemeAwareHero'
import Clients from '@/components/clients'
import ThemeAwareFeatures from '@/components/ThemeAwareFeatures'  // ← NEW
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import ThemeAwareTestimonials from '@/components/ThemeAwareTestimonials'
import ThemeAwareFeatures04 from '@/components/ThemeAwareFeatures04'
import Pricing from './pricing-section'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <ThemeAwareHero />
      <Clients />
      <ThemeAwareFeatures />            {/* ← uses light/dark correctly */}
      <Features02 />
      <Features03 />
      <ThemeAwareTestimonials />
      <ThemeAwareFeatures04 />
      <Pricing />
      <Testimonials />
      <Cta />
    </>
  )
}
