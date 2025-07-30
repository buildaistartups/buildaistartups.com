import Link from 'next/link'
import Image from 'next/image'
import IntegrationImg01 from '@/public/images/integrations-01.svg'
import IntegrationImg02 from '@/public/images/integrations-02.svg'
import IntegrationImg03 from '@/public/images/integrations-03.svg'
import IntegrationImg04 from '@/public/images/integrations-04.svg'
import IntegrationImg05 from '@/public/images/integrations-05.svg'
import IntegrationImg06 from '@/public/images/integrations-06.svg'
import IntegrationImg07 from '@/public/images/integrations-07.svg'
import IntegrationImg08 from '@/public/images/integrations-08.svg'
import IntegrationImg09 from '@/public/images/integrations-09.svg'
import IntegrationImg10 from '@/public/images/integrations-10.svg'
import IntegrationImg11 from '@/public/images/integrations-11.svg'
import IntegrationImg12 from '@/public/images/integrations-12.svg'

const integrations = [
  { name: 'GitHub', desc: 'Sync your issues and PRs seamlessly.', icon: IntegrationImg08, link: '/integrations/single-post' },
  { name: 'Slack', desc: 'Connect conversations to your workflows.', icon: IntegrationImg07, link: '/integrations/single-post' },
  { name: 'Figma', desc: 'Design and product, always in sync.', icon: IntegrationImg03, link: '/integrations/single-post' },
  { name: 'Notion', desc: 'Documentation meets action.', icon: IntegrationImg01, link: '/integrations/single-post' },
  { name: 'Zapier', desc: 'Automate everything with one click.', icon: IntegrationImg09, link: '/integrations/single-post' },
  { name: 'Jira', desc: 'Enterprise project management, simplified.', icon: IntegrationImg02, link: '/integrations/single-post' },
  { name: 'Linear', desc: 'Modern issue tracking.', icon: IntegrationImg06, link: '/integrations/single-post' },
  { name: 'Vercel', desc: 'Instantly deploy your apps.', icon: IntegrationImg04, link: '/integrations/single-post' },
  { name: 'Sentry', desc: 'Error tracking for everyone.', icon: IntegrationImg05, link: '/integrations/single-post' },
  { name: 'Amplitude', desc: 'Analytics that power growth.', icon: IntegrationImg10, link: '/integrations/single-post' },
  { name: 'Datadog', desc: 'Monitor your cloud infrastructure.', icon: IntegrationImg11, link: '/integrations/single-post' },
  { name: 'Zendesk', desc: 'Customer support, reimagined.', icon: IntegrationImg12, link: '/integrations/single-post' },
]

export default function IntegrationsList() {
  return (
    <section className="relative pb-16 md:pb-32 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {integrations.map((integration, idx) => (
            <Link href={integration.link} key={idx} className="block group">
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-800 rounded-3xl hover:border-purple-300 dark:hover:border-purple-600 transition-colors group relative shadow-md p-8 h-full flex flex-col items-center text-center">
                <Image src={integration.icon} alt={integration.name} width={64} height={64} className="mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-2">{integration.name}</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-2">{integration.desc}</p>
                <span className="inline-flex items-center text-purple-500 font-semibold group-hover:underline mt-auto">
                  Learn more
                  <svg className="ml-1 w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  )
}
