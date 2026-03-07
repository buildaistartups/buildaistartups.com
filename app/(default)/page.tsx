// app/(default)/page.tsx
export const metadata = {
  title: 'Build AI Startups - The Blueprint Engine',
  description: 'Get a CTO-level architectural blueprint and a production-ready Next.js boilerplate in 24 hours.',
}

import Hero from '@/components/home/Hero'
import FeatureHighlight from '@/components/home/FeatureHighlight' // The "Circle Graphic"
import StartupJourney from '@/components/home/StartupJourney' // The "Timeline"
import PricingSection from '@/components/home/PricingSection' // The "Pricing"
import ClosingPromise from '@/components/home/ClosingPromise' // The "Final CTA"

/* PHASE 1: HIDDEN MODULES (Uncomment these later in Phase 2/3)
import StakeholderMatrix from '@/components/home/StakeholderMatrix'
import AIMatchmaking from '@/components/home/AIMatchmaking'
import EnterpriseInnovation from '@/components/home/EnterpriseInnovation'
import AcceleratorCommand from '@/components/home/AcceleratorCommand'
import MentorshipNetwork from '@/components/home/MentorshipNetwork'
import StudentAcademy from '@/components/home/StudentAcademy'
import LegacyIntegration from '@/components/home/LegacyIntegration'
import InvestorPortfolio from '@/components/home/InvestorPortfolio'
import EcosystemMap from '@/components/home/EcosystemMap'
*/

export default function Home() {
  return (
    <>
      {/* 1. HERO: "Turn Idea to Spec" */}
      <Hero />

      {/* 2. VISUAL: Show the Output (PDF + Repo) */}
      <FeatureHighlight />

      {/* 3. PROCESS: How it works (Idea -> Spec -> Repo) */}
      <StartupJourney />

      {/* HIDDEN COMPLEXITY - Keep code clean by commenting out
      <StakeholderMatrix />
      <AIMatchmaking />
      <EnterpriseInnovation />
      <AcceleratorCommand />
      <MentorshipNetwork />
      <StudentAcademy />
      <LegacyIntegration />
      <InvestorPortfolio />
      <EcosystemMap />
      */}

      {/* 4. OFFER: Single Card Pricing */}
      <PricingSection />

      {/* 5. CTA: Final push */}
      <ClosingPromise />
    </>
  )
}
