// app/(default)/solutions/enterprises/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/solutions-enterprises.png'

export const metadata: Metadata = {
  title: 'Enterprises — White-label innovation labs | Build AI Startups',
  description:
    'Launch your own AI venture studio. Build AI Startups provides white-labeled infrastructure for innovation labs: cohort management, quality gates, portfolio tracking, and exit-ready ventures.',
  alternates: { canonical: `${siteUrl}/solutions/enterprises` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/enterprises`,
    title: 'Enterprises — White-label innovation labs | Build AI Startups',
    description:
      'Transform your organization into an AI powerhouse. White-label venture studio with cohort management and portfolio analytics.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Enterprises' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprises — White-label innovation labs | Build AI Startups',
    description:
      'White-label venture studio for enterprises. Launch internal ventures at scale with quality gates and portfolio tracking.',
    images: [ogImage],
  },
}

// JSON-LD Schemas
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Startups',
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-light.svg`,
  sameAs: ['https://x.com/buildaistartups', 'https://github.com/buildaistartups'],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'Enterprises', item: `${siteUrl}/solutions/enterprises` },
  ],
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Enterprise Innovation Lab Platform',
  description: 'White-label AI venture studio infrastructure for large organizations to launch internal innovation labs at scale.',
  provider: { '@type': 'Organization', name: 'Build AI Startups', url: siteUrl },
  serviceType: 'Enterprise Software',
  areaServed: 'Worldwide',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long to deploy an innovation lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most enterprises deploy in 2-4 weeks. We provide white-label setup, SSO integration, compliance configuration, and onboarding for your first cohort.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who owns the IP for ventures?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your organization does. All code lives in your GitHub, deploys to your infrastructure. We provide contributor licenses for the platform itself.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this work with our existing systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We integrate with SAP, Oracle, Salesforce, Workday, Microsoft 365, and other enterprise systems. Custom connectors available.',
      },
    },
    {
      '@type': 'Question',
      name: 'What compliance standards are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOC2 Type II, GDPR, HIPAA compliance options available. Custom compliance requirements can be configured per organization.',
      },
    },
  ],
}

export default function EnterprisesPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-service" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Solutions</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Enterprises — Launch your innovation lab</h1>
              <p className="mt-4 text-lg text-slate-300">
                Deploy a white-labeled AI venture studio in weeks. Run cohorts, track portfolio metrics, and spin off
                AI ventures—all under your brand with enterprise compliance built-in.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Request enterprise demo
                </Link>
                <Link href="#roi" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Calculate ROI
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">White-label · SSO/SAML · SOC2/GDPR · Portfolio tracking</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-8">
                <img
                  src="/images/solutions/enterprises/hero.svg"
                  alt="Enterprise innovation lab dashboard with venture portfolio"
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">White-label platform · Cohort management · Portfolio analytics</p>
            </div>
          </div>
        </section>

        {/* Enterprise Stats */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Innovation labs at scale</h2>
            <p className="mt-2 text-slate-300">Join 47 Fortune 500 companies already running AI venture studios</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '47', label: 'Enterprise Labs' },
              { value: '$47M', label: 'New Revenue Streams' },
              { value: '89%', label: 'Employee Satisfaction' },
              { value: '12', label: 'Avg. Ventures/Lab' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-6 text-center">
                <div className="text-3xl font-bold text-violet-500">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why enterprises choose this */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Why enterprises choose Build AI Startups</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'White-label everything', d: 'Your brand, your domain, your infrastructure. Completely customizable platform.' },
              { t: 'Enterprise security', d: 'SSO/SAML, RBAC, SOC2, GDPR, HIPAA compliance built-in.' },
              { t: 'Legacy integration', d: 'Connect with SAP, Oracle, Salesforce, Workday, and custom systems.' },
              { t: 'Portfolio analytics', d: 'Track venture performance, innovation KPIs, and ROI across your entire portfolio.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* White-Label Platform */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Your own AI venture studio</h3>
              <p className="mt-2 text-slate-300">
                Deploy a fully white-labeled platform under your brand. Custom domain, logos, color schemes,
                and branded email templates—everything matches your corporate identity.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Custom branding:</strong> Your logos, colors, and design system</li>
                <li><strong>Your domain:</strong> innovation.yourcompany.com with SSL</li>
                <li><strong>Branded emails:</strong> All notifications match your corporate templates</li>
                <li><strong>White-label mobile:</strong> Optional iOS/Android apps with your branding</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/enterprises/white-label.svg"
                alt="White-label platform with custom branding"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Cohort Management */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/enterprises/cohort-management.svg"
                alt="Enterprise cohort management dashboard"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Run cohorts at scale</h3>
              <p className="mt-2 text-slate-300">
                Manage multiple cohorts simultaneously. Track each venture's progress, gate approvals,
                and readiness scores from a single dashboard.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Multiple concurrent cohorts with separate branding</li>
                <li>Department-level budget controls and allocation</li>
                <li>Automated team formation and skill matching</li>
                <li>Mentor assignment and review queues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Enterprise Features Grid */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Enterprise-grade features</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🔐',
                title: 'SSO & RBAC',
                items: ['SAML 2.0 integration', 'Active Directory sync', 'Role-based access control', 'Multi-factor authentication'],
              },
              {
                icon: '🛡️',
                title: 'Compliance Framework',
                items: ['SOC2 Type II certified', 'GDPR compliance tools', 'HIPAA compliance options', 'Custom audit trails'],
              },
              {
                icon: '🔌',
                title: 'Legacy Integrations',
                items: ['SAP integration', 'Oracle database sync', 'Salesforce connectors', 'Microsoft 365 integration'],
              },
              {
                icon: '💰',
                title: 'Budget Controls',
                items: ['Department-level billing', 'Budget allocation tools', 'Spend tracking and alerts', 'Cost center reporting'],
              },
              {
                icon: '📊',
                title: 'Portfolio Analytics',
                items: ['Real-time metrics', 'Custom reporting', 'Executive summaries', 'ROI calculations'],
              },
              {
                icon: '🏷️',
                title: 'White-Label Options',
                items: ['Custom branding', 'Your domain and SSL', 'Branded email templates', 'White-label mobile apps'],
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <div className="text-base font-semibold mb-3">{feature.title}</div>
                <ul className="space-y-1 text-sm text-slate-400">
                  {feature.items.map((item, j) => (
                    <li key={j}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Legacy System Integration */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Integrate with your stack</h3>
              <p className="mt-2 text-slate-300">
                Connect Build AI Startups with your existing enterprise systems. No rip-and-replace—
                work with the tools your organization already uses.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>ERP systems (SAP, Oracle)</li>
                <li>CRM platforms (Salesforce, Microsoft Dynamics)</li>
                <li>HR systems (Workday, SuccessFactors)</li>
                <li>BI tools (Tableau, Power BI)</li>
                <li>Communication (Slack, Teams)</li>
                <li>Custom API endpoints</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/enterprises/integrations.svg"
                alt="Enterprise system integrations diagram"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Portfolio Dashboard */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/enterprises/portfolio-dashboard.svg"
                alt="Executive portfolio dashboard with venture metrics"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Executive portfolio view</h3>
              <p className="mt-2 text-slate-300">
                Track innovation KPIs across your entire venture portfolio. Real-time dashboards
                show which ventures are thriving, which need support, and overall ROI.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Ventures launched and in progress</li>
                <li>Build Score distribution across portfolio</li>
                <li>Revenue generated by internal ventures</li>
                <li>Employee satisfaction and retention metrics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section id="roi" className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Innovation lab ROI</h2>
            <p className="mt-2 text-slate-300">Typical first-year returns for enterprise innovation labs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Your Investment</h3>
              <div className="space-y-3">
                {[
                  { item: 'Platform License (Annual)', cost: '$300K' },
                  { item: 'Implementation & Training', cost: '$150K' },
                  { item: 'Dedicated Support', cost: '$100K' },
                ].map((line, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-300">{line.item}</span>
                    <span className="font-semibold">{line.cost}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Investment</span>
                    <span className="text-violet-500">$550K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Your Returns (Year 1)</h3>
              <div className="space-y-3">
                {[
                  { item: 'New Revenue Streams', value: '$2.4M' },
                  { item: 'Cost Savings (Efficiency)', value: '$800K' },
                  { item: 'Employee Retention Value', value: '$400K' },
                ].map((line, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-300">{line.item}</span>
                    <span className="font-semibold text-green-600">{line.value}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Returns</span>
                    <span className="text-green-600">$3.6M</span>
                  </div>
                  <div className="flex justify-between text-base mt-2">
                    <span>ROI</span>
                    <span className="text-green-600 font-bold">555%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
              Calculate your custom ROI
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Enterprise success stories</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🏦',
                name: 'Global Financial Services',
                desc: 'Fortune 100 bank with 50,000+ employees',
                metrics: [
                  { label: 'AI Ventures Launched', value: '15' },
                  { label: 'New Revenue', value: '$67M' },
                  { label: 'Time to Market', value: '-60%' },
                  { label: 'Employee Engagement', value: '+45%' },
                ],
              },
              {
                icon: '🏭',
                name: 'Manufacturing Giant',
                desc: 'Global manufacturer with 200+ facilities',
                metrics: [
                  { label: 'AI Ventures Launched', value: '8' },
                  { label: 'Cost Savings', value: '$34M' },
                  { label: 'Process Efficiency', value: '+35%' },
                  { label: 'Innovation Speed', value: '+80%' },
                ],
              },
              {
                icon: '🏥',
                name: 'Healthcare Network',
                desc: 'Multi-state healthcare provider',
                metrics: [
                  { label: 'AI Ventures Launched', value: '12' },
                  { label: 'Patient Outcomes', value: '+28%' },
                  { label: 'Operational Savings', value: '$23M' },
                  { label: 'Staff Satisfaction', value: '+52%' },
                ],
              },
            ].map((story, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <div className="text-4xl mb-3">{story.icon}</div>
                <div className="text-base font-semibold">{story.name}</div>
                <p className="text-sm text-slate-400 mb-4">{story.desc}</p>
                <div className="space-y-2">
                  {story.metrics.map((metric, j) => (
                    <div key={j} className="flex justify-between text-xs">
                      <span className="text-slate-400">{metric.label}:</span>
                      <span className="font-semibold text-slate-200">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Governance & Compliance */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Enterprise governance built-in</h3>
              <p className="mt-2 text-slate-300">
                Quality gates, approval workflows, and audit trails ensure ventures meet your
                organization's standards before launch.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Multi-stage approval workflows</li>
                <li>Build Score thresholds and quality gates</li>
                <li>Complete audit trails for compliance</li>
                <li>Security vulnerability scanning</li>
                <li>License compliance automation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/enterprises/governance.svg"
                alt="Enterprise governance and approval workflows"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Enterprise Pricing */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Enterprise pricing</h2>
            <p className="mt-2 text-slate-300">Custom deployment for your organization's needs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-violet-600 bg-slate-900/50 p-6">
              <h3 className="text-xl font-semibold mb-3">White-Label Platform</h3>
              <div className="text-3xl font-bold mb-4">$25K<span className="text-lg font-normal">/month</span></div>
              <p className="text-sm text-slate-400 mb-6">Complete innovation lab solution</p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li>✓ Full white-label platform</li>
                <li>✓ Unlimited users and ventures</li>
                <li>✓ Enterprise integrations</li>
                <li>✓ SOC2/GDPR compliance</li>
                <li>✓ 24/7 dedicated support</li>
                <li>✓ Custom training program</li>
                <li>✓ Success manager assigned</li>
              </ul>
              <Link href="/contact" className="block w-full text-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Deploy innovation lab
              </Link>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <h3 className="text-xl font-semibold mb-3">Custom Enterprise</h3>
              <div className="text-3xl font-bold mb-4">Custom</div>
              <p className="text-sm text-slate-400 mb-6">Tailored to your specific requirements</p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li>✓ Everything in White-Label</li>
                <li>✓ Custom feature development</li>
                <li>✓ Private cloud deployment</li>
                <li>✓ Advanced security features</li>
                <li>✓ Custom compliance requirements</li>
                <li>✓ Dedicated development team</li>
                <li>✓ SLA guarantees</li>
              </ul>
              <Link href="/contact" className="block w-full text-center rounded-lg border-2 border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                Contact sales
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Enterprise FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">How long does deployment take?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Most enterprises deploy in 2-4 weeks including white-label setup, SSO integration, and onboarding your first cohort.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can we keep our existing security policies?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes. We configure the platform to match your security requirements, including custom compliance rules and approval workflows.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What happens to venture IP?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Your organization owns all venture IP. Code lives in your GitHub, deploys to your infrastructure, with clear legal templates.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Do you support private cloud deployment?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes. Custom Enterprise tier includes private cloud options (AWS, Azure, GCP) with dedicated instances and data residency controls.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Transform your organization</h2>
            <p className="mt-2 text-slate-300">
              Join 47 Fortune 500 companies already using Build AI Startups to launch internal innovation labs
              and generate new revenue streams.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Request enterprise demo
              </Link>
              <Link href="#roi" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                Calculate ROI
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
