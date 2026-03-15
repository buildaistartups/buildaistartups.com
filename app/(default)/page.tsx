export const metadata = {
  title: 'Build AI Startups — Know if your startup is working',
  description:
    'LaunchScore helps indie makers validate, build, and grow AI-powered micro-SaaS products by replacing guesswork with structured evidence and AI-assisted analysis.',
}

import Hero from '@/components/landing/hero'
import HowItWorks from '@/components/landing/how-it-works'
import Features from '@/components/landing/features'
import PricingTeaser from '@/components/landing/pricing-teaser'
import Cta from '@/components/landing/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <PricingTeaser />
      <Cta />
    </>
  )
}
