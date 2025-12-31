// app/(default)/page.tsx
export const metadata = {
  title: 'Build AI Startups - The Complete AI Business Ecosystem',
  description: 'Where Every Stakeholder Wins. Build, Scale, and Profit from AI with our complete toolkit.',
}

import Hero from '@/components/home/Hero'
import FeatureHighlight from '@/components/home/FeatureHighlight' // ACTION 17 - Feature with animation
import StartupJourney from '@/components/home/StartupJourney'
import StakeholderMatrix from '@/components/home/StakeholderMatrix'
import AIMatchmaking from '@/components/home/AIMatchmaking'
import EnterpriseInnovation from '@/components/home/EnterpriseInnovation'
import AcceleratorCommand from '@/components/home/AcceleratorCommand'
import MentorshipNetwork from '@/components/home/MentorshipNetwork'
import StudentAcademy from '@/components/home/StudentAcademy'
import LegacyIntegration from '@/components/home/LegacyIntegration'
import InvestorPortfolio from '@/components/home/InvestorPortfolio'
import EcosystemMap from '@/components/home/EcosystemMap'
import PricingSection from '@/components/home/PricingSection'
import ClosingPromise from '@/components/home/ClosingPromise'

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureHighlight /> {/* ACTION 17 - Feature section with animation */}
      <StartupJourney />
      <StakeholderMatrix />
      <AIMatchmaking />
      <EnterpriseInnovation />
      <AcceleratorCommand />
      <MentorshipNetwork />
      <StudentAcademy />
      <LegacyIntegration />
      <InvestorPortfolio />
      <EcosystemMap />
      <PricingSection />
      <ClosingPromise />
    </>
  )
}
