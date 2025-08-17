export const metadata = {
  title: 'Home - BuildAIStartups',
  description: 'Page description',
}

import ThemeAwareHero from '@/components/ThemeAwareHero'
import Clients from '@/components/clients'
import ThemeAwareFeatures from '@/components/ThemeAwareFeatures'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import ThemeAwareTestimonials from '@/components/ThemeAwareTestimonials'
import ThemeAwareFeatures04 from '@/components/ThemeAwareFeatures04'
import ThemeAwarePricing from './ThemeAwarePricing'   // ⟵ theme-aware pricing
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <ThemeAwareHero />
      <Clients />
      <ThemeAwareFeatures />
      <Features02 />
      <Features03 />

      {/* Renders testimonials with dark/light variants automatically */}
      <ThemeAwareTestimonials />

      {/* Renders features-04 with dark/light variants automatically */}
      <ThemeAwareFeatures04 />

      {/* Pricing section (dark/light) */}
      <ThemeAwarePricing />

      <Testimonials />
      <Cta />
    </>
  )
}
