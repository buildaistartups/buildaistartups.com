export const metadata = {
  title: 'Integrations - BuildAIStartups.com',
  description: 'Page description',
}

import IntegrationsSection from './integrations-section'
import IntegrationsList from './integrations-list'

export default function Integrations() {
  return (
    <>
      <IntegrationsSection />
      <IntegrationsList />
    </>
  )
}
