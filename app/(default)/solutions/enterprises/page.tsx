import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/solutions-enterprises.png'

export const metadata: Metadata = {
  title: 'Enterprises — Your AI Innovation Lab, White-Labeled | Build AI Startups',
  description:
    'Deploy a complete innovation lab under your brand. 47 Fortune 500 companies already running internal ventures, generating $47M in new revenue streams.',
  alternates: { canonical: `${siteUrl}/solutions/enterprises` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/enterprises`,
    title: 'Enterprises — Your AI Innovation Lab, White-Labeled',
    description:
      'Transform your organization into an AI powerhouse. White-label venture studio with complete control and enterprise compliance.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Enterprise Innovation Labs' }],
    siteName: 'Build AI Startups',
  },
}

const enterpriseSchemaLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'BuildAIStartups Enterprise Innovation Lab',
  description: 'White-label AI venture studio platform for enterprises',
  brand: {
    '@type': 'Brand',
    name: 'BuildAIStartups',
  },
  offers: {
    '@type': 'Offer',
    price: '25000',
    priceCurrency: 'USD',
    priceValidUntil: '2025-12-31',
  },
}

export default function EnterprisesPage() {
  return (
    <>
      <Script 
        id="ld-enterprise" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enterpriseSchemaLd) }} 
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-slate-100">
        {/* Hero Section - Executive Focus */}
        <section className="relative px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-violet-600/10" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm mb-6">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2" />
                  Trusted by 47 Fortune 500 Companies
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Your Own AI Venture Studio. Completely White-Labeled.
                </h1>
                
                <p className="mt-6 text-xl text-slate-300">
                  Transform your organization into an AI powerhouse. Launch internal ventures, 
                  spin off new business units, and generate new revenue streams—all under your brand, 
                  with your compliance, on your infrastructure.
                </p>

                {/* Enterprise Impact Stats */}
                <div className="mt-8 p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-blue-500/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-blue-400">47</div>
                      <div className="text-sm text-slate-400">Enterprise Labs</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">$47M</div>
                      <div className="text-sm text-slate-400">New Revenue</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-violet-400">423</div>
                      <div className="text-sm text-slate-400">Ventures Launched</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-400">89%</div>
                      <div className="text-sm text-slate-400">Employee NPS</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link 
                    href="/enterprise-demo" 
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25"
                  >
                    Request Executive Demo
                  </Link>
                  <Link 
                    href="/roi-calculator" 
                    className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    Calculate Your ROI
                  </Link>
                </div>
              </div>

              <div className="relative">
                {/* Enterprise Dashboard Preview */}
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl" />
                  <div className="relative z-10 p-8">
                    <div className="bg-slate-900 rounded-xl border border-blue-500/30 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Innovation Lab Dashboard</h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          Live
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                          <span className="text-sm text-slate-300">Active Ventures</span>
                          <span className="text-xl font-bold text-blue-400">12</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                          <span className="text-sm text-slate-300">Revenue Generated</span>
                          <span className="text-xl font-bold text-green-400">$4.7M</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                          <span className="text-sm text-slate-300">Employee Participation</span>
                          <span className="text-xl font-bold text-violet-400">847</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                          <span className="text-sm text-slate-300">Ideas in Pipeline</span>
                          <span className="text-xl font-bold text-orange-400">34</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete White-Label Control */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Complete White-Label Control</h2>
              <p className="mt-4 text-xl text-slate-300">
                Your brand. Your domain. Your rules. Your success.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-slate-800 rounded-xl p-8 border border-blue-500/20">
                  <h3 className="text-2xl font-bold mb-6">What You Control</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: "🏢",
                        title: "Complete Branding",
                        items: ["Custom logos & colors", "Your domain & SSL", "Branded emails", "White-label apps"]
                      },
                      {
                        icon: "🔐",
                        title: "Security & Compliance",
                        items: ["SOC2 Type II", "GDPR/HIPAA ready", "Custom policies", "Audit trails"]
                      },
                      {
                        icon: "🔌",
                        title: "Enterprise Integration",
                        items: ["SSO/SAML", "Active Directory", "SAP/Oracle", "MS365/Slack"]
                      },
                      {
                        icon: "📊",
                        title: "Innovation Metrics",
                        items: ["Custom KPIs", "ROI tracking", "Portfolio view", "Board reports"]
                      }
                    ].map((section, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="text-2xl">{section.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{section.title}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {section.items.map((item) => (
                              <div key={item} className="text-sm text-slate-400">
                                ✓ {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-blue-600/10 to-violet-600/10 rounded-xl p-8 border border-blue-500/20">
                  <h3 className="text-2xl font-bold mb-6">Your Innovation Lab in Action</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Venture Pipeline</span>
                        <span className="text-sm font-semibold text-blue-400">34 ideas</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-violet-600 h-2 rounded-full" style={{width: '70%'}} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Build Progress</span>
                        <span className="text-sm font-semibold text-green-400">12 active</span>
                      </div>
                      <div className="grid grid-cols-6 gap-1">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="h-8 bg-green-500/20 rounded" />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Revenue Impact</span>
                        <span className="text-sm font-semibold text-violet-400">+$4.7M</span>
                      </div>
                      <div className="h-32 flex items-end justify-between gap-2">
                        {[40, 60, 45, 80, 65, 90, 75, 95].map((height, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-violet-600 to-violet-400 rounded-t"
                            style={{height: `${height}%`}}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Features Grid */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Enterprise-Grade Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏭",
                  title: "Innovation Lab Management",
                  description: "Run multiple concurrent innovation programs",
                  features: [
                    "Cohort batch management",
                    "Stage-gate processes",
                    "Portfolio analytics",
                    "Resource allocation"
                  ],
                  color: "blue"
                },
                {
                  icon: "🔒",
                  title: "Enterprise Security",
                  description: "Bank-grade security and compliance",
                  features: [
                    "SOC2 Type II certified",
                    "Zero-trust architecture",
                    "Data residency control",
                    "Encryption at rest/transit"
                  ],
                  color: "green"
                },
                {
                  icon: "🔗",
                  title: "Legacy Integration",
                  description: "Works with your existing stack",
                  features: [
                    "SAP & Oracle connectors",
                    "Salesforce integration",
                    "Microsoft ecosystem",
                    "Custom API endpoints"
                  ],
                  color: "violet"
                },
                {
                  icon: "👥",
                  title: "Employee Engagement",
                  description: "Turn employees into innovators",
                  features: [
                    "Idea submission portal",
                    "Team formation tools",
                    "Skill matching AI",
                    "Innovation credits"
                  ],
                  color: "orange"
                },
                {
                  icon: "📈",
                  title: "Executive Dashboards",
                  description: "Board-ready metrics and reports",
                  features: [
                    "Real-time KPIs",
                    "ROI calculations",
                    "Risk assessment",
                    "Predictive analytics"
                  ],
                  color: "blue"
                },
                {
                  icon: "🌐",
                  title: "Global Deployment",
                  description: "Multi-region, multi-language",
                  features: [
                    "Edge deployment",
                    "15+ languages",
                    "Local compliance",
                    "Regional customization"
                  ],
                  color: "green"
                }
              ].map((feature, idx) => {
                const colorClasses = {
                  blue: "from-blue-600/20 to-blue-600/10 border-blue-500/30",
                  green: "from-green-600/20 to-green-600/10 border-green-500/30",
                  violet: "from-violet-600/20 to-violet-600/10 border-violet-500/30",
                  orange: "from-orange-600/20 to-orange-600/10 border-orange-500/30"
                };
                
                return (
                  <div key={idx} className={`bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl p-8 border`}>
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-start text-sm">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ROI Calculator Preview */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Your Innovation Lab ROI</h2>
              <p className="mt-4 text-xl text-slate-300">
                Average enterprise sees 555% ROI in year one
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Investment */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <h3 className="text-2xl font-bold mb-6 text-red-400">Your Investment</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Platform License</span>
                      <span className="font-semibold">$300K/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Implementation</span>
                      <span className="font-semibold">$150K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Training & Support</span>
                      <span className="font-semibold">$100K</span>
                    </div>
                    <div className="pt-4 border-t border-slate-700">
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Total Year 1</span>
                        <span className="font-bold text-red-400">$550K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Returns */}
                <div className="bg-gradient-to-br from-green-600/10 to-green-600/5 rounded-xl p-8 border border-green-500/30">
                  <h3 className="text-2xl font-bold mb-6 text-green-400">Your Returns (Year 1)</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-300">New Revenue Streams</span>
                      <span className="font-semibold text-green-400">$2.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Operational Savings</span>
                      <span className="font-semibold text-green-400">$800K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Innovation Value</span>
                      <span className="font-semibold text-green-400">$850K</span>
                    </div>
                    <div className="pt-4 border-t border-green-500/30">
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Total Returns</span>
                        <span className="font-bold text-green-400">$4.05M</span>
                      </div>
                      <div className="flex justify-between text-lg mt-2">
                        <span className="font-semibold">ROI</span>
                        <span className="font-bold text-green-400">636%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link 
                  href="/roi-calculator" 
                  className="inline-flex px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg font-semibold hover:from-green-500 hover:to-green-400 transition-all"
                >
                  Calculate Your Custom ROI
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Enterprise Success Stories</h2>
              <p className="mt-4 text-xl text-slate-300">
                How Fortune 500 companies transform with innovation labs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏦",
                  company: "Global Financial Services",
                  size: "50,000+ employees",
                  story: "Launched 15 AI ventures in 6 months, 3 already profitable",
                  metrics: {
                    "Ventures Launched": "15",
                    "New Revenue": "$67M",
                    "Time to Market": "-60%",
                    "Employee Ideas": "1,200+"
                  },
                  quote: "This transformed how we think about innovation. It's not a department anymore—it's our culture."
                },
                {
                  icon: "🏭",
                  company: "Manufacturing Giant",
                  size: "200+ facilities globally",
                  story: "Digitized operations through 8 internal AI ventures",
                  metrics: {
                    "Cost Savings": "$34M",
                    "Efficiency Gain": "+35%",
                    "Safety Incidents": "-45%",
                    "Innovation Speed": "5x"
                  },
                  quote: "Our factory workers are now AI entrepreneurs. The cultural shift alone was worth it."
                },
                {
                  icon: "🏥",
                  company: "Healthcare Network",
                  size: "100+ hospitals",
                  story: "Built 12 patient-facing AI solutions internally",
                  metrics: {
                    "Patient Satisfaction": "+28%",
                    "Op. Savings": "$23M",
                    "Staff Retention": "+52%",
                    "Care Quality": "+31%"
                  },
                  quote: "Doctors and nurses building their own AI tools—game-changing for patient care."
                }
              ].map((story, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                  <div className="text-4xl mb-4">{story.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{story.company}</h3>
                  <p className="text-sm text-slate-400 mb-4">{story.size}</p>
                  
                  <p className="text-slate-300 mb-6">{story.story}</p>
                  
                  <div className="space-y-2 pb-6 border-b border-slate-700">
                    {Object.entries(story.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-slate-400">{key}</span>
                        <span className="font-semibold text-blue-400">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <blockquote className="mt-6 text-sm italic text-slate-300">
                    "{story.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Fast Implementation, Immediate Impact</h2>
              <p className="mt-4 text-xl text-slate-300">
                Your innovation lab live in 4 weeks
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-violet-600" />
                
                {[
                  {
                    week: "Week 1",
                    title: "Discovery & Planning",
                    tasks: ["Stakeholder alignment", "Requirements gathering", "Compliance review", "Branding setup"]
                  },
                  {
                    week: "Week 2",
                    title: "Platform Configuration",
                    tasks: ["White-label deployment", "SSO integration", "System connectors", "Security config"]
                  },
                  {
                    week: "Week 3",
                    title: "Training & Onboarding",
                    tasks: ["Admin training", "Pilot team selection", "First ideas submitted", "Mentor recruitment"]
                  },
                  {
                    week: "Week 4",
                    title: "Launch & Scale",
                    tasks: ["Company-wide launch", "First ventures started", "KPI dashboards live", "Executive briefing"]
                  }
                ].map((phase, idx) => (
                  <div key={idx} className="relative flex items-center mb-12">
                    <div className="absolute left-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-slate-950" />
                    <div className="ml-20">
                      <div className="text-sm text-blue-400 font-semibold mb-2">{phase.week}</div>
                      <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {phase.tasks.map((task) => (
                          <span key={task} className="px-3 py-1 bg-slate-800 rounded-lg text-sm">
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Pricing */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Enterprise Pricing</h2>
              <p className="mt-4 text-xl text-slate-300">
                Flexible plans for every organization size
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Innovation Lab",
                  price: "$25K",
                  period: "/month",
                  description: "For departments and divisions",
                  features: [
                    "Up to 500 users",
                    "10 concurrent ventures",
                    "Basic white-labeling",
                    "Standard integrations",
                    "Quarterly reviews"
                  ],
                  cta: "Start Pilot",
                  highlight: false
                },
                {
                  name: "Enterprise Platform",
                  price: "$75K",
                  period: "/month",
                  description: "For global organizations",
                  features: [
                    "Unlimited users",
                    "Unlimited ventures",
                    "Full white-labeling",
                    "All integrations",
                    "24/7 support",
                    "Dedicated CSM",
                    "Custom training"
                  ],
                  cta: "Most Popular",
                  highlight: true
                },
                {
                  name: "Custom Deployment",
                  price: "Custom",
                  period: "",
                  description: "For unique requirements",
                  features: [
                    "Private cloud option",
                    "Custom development",
                    "On-premise available",
                    "SLA guarantees",
                    "Executive workshops",
                    "Board presentations"
                  ],
                  cta: "Contact Us",
                  highlight: false
                }
              ].map((plan, idx) => (
                <div 
                  key={idx}
                  className={`relative rounded-xl p-8 ${
                    plan.highlight
                      ? 'bg-gradient-to-b from-blue-600/20 to-blue-600/10 border-2 border-blue-500'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                      RECOMMENDED
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-blue-600 hover:bg-blue-500'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Bank-Grade Security & Compliance</h2>
              <p className="mt-4 text-xl text-slate-300">
                Built for the most demanding enterprise requirements
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "🔒", title: "SOC2 Type II", desc: "Annual audits" },
                { icon: "🛡️", title: "ISO 27001", desc: "Certified" },
                { icon: "🔐", title: "GDPR/CCPA", desc: "Compliant" },
                { icon: "🏥", title: "HIPAA", desc: "Available" },
                { icon: "🌐", title: "Zero Trust", desc: "Architecture" },
                { icon: "🔑", title: "E2E Encryption", desc: "AES-256" },
                { icon: "📊", title: "Data Residency", desc: "Your choice" },
                { icon: "✅", title: "99.99% SLA", desc: "Guaranteed" }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-24 bg-gradient-to-b from-blue-950/20 to-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Transform Your Organization Into an AI Powerhouse
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Join 47 Fortune 500 companies already running successful innovation labs. 
              Your competitive advantage starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/enterprise-demo" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25"
              >
                Request Executive Demo
              </Link>
              <Link 
                href="/enterprise-resources" 
                className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
              >
                Download White Paper
              </Link>
            </div>
            
            <p className="text-sm text-slate-400">
              Implementation in 4 weeks • Full support included • Cancel anytime
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
