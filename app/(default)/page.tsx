// app/(default)/page.tsx
export const metadata = {
  title: 'Build AI Startups - Turn Your Idea into a Tech Spec',
  description: 'Get a CTO-level architectural blueprint and a production-ready Next.js boilerplate in 24 hours.',
}

import Hero from '@/components/home/Hero'
import FeatureHighlight from '@/components/home/FeatureHighlight'
import StartupJourney from '@/components/home/StartupJourney'
import PricingSection from '@/components/home/PricingSection'
import ClosingPromise from '@/components/home/ClosingPromise'

/* PHASE 1 HIDDEN IMPORTS
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
      <Hero />
      
      {/* Use StartupJourney to explain the "3 Steps":
         1. Submit Idea 2. We Generate Spec 3. You Get Repo 
      */}
      <StartupJourney />

      {/* Use FeatureHighlight to show a screenshot of the 
         "Golden Template" code or the PDF Spec 
      */}
      <FeatureHighlight /> 

      {/* PHASE 1 HIDDEN SECTIONS
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

      <PricingSection />
      <ClosingPromise />
    </>
  )
}
