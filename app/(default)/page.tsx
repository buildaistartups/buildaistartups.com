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
import ThemeAwarePricing from '@/components/ThemeAwarePricing'
import Testimonials from '@/components/testimonials'

// ⟵ use the theme-aware CTA instead of importing the dark CTA directly
import ThemeAwareCTA from '@/components/ThemeAwareCTA'

export default function Home() {
  return (
    <>
      <ThemeAwareHero />
      <Clients />
      <ThemeAwareFeatures />
      <Features02 />
      <Features03 />

      <ThemeAwareTestimonials />
      <ThemeAwareFeatures04 />
      <ThemeAwarePricing />

      <Testimonials />
      <ThemeAwareCTA />
    </>
  )
}
