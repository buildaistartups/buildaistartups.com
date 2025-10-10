import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/solutions-startups.png'

export const metadata: Metadata = {
  title: 'Startups — Build Your AI Empire, Together | Build AI Startups',
  description:
    'For founding teams ready to ship. Go from aligned vision to paying customers in 12 days. Join 2,847 startups already generating revenue with AI.',
  alternates: { canonical: `${siteUrl}/solutions/startups` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/startups`,
    title: 'Startups — Build Your AI Empire, Together',
    description:
      'The complete platform for founding teams. Spec together, build fast, launch with confidence. Real revenue in 12 days.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — For Founding Teams' }],
    siteName: 'Build AI Startups',
  },
}

// Schema.org structured data
const startupSchemaLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BuildAIStartups for Founding Teams',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    priceValidUntil: '2025-12-31',
  },
}

export default function StartupsPage() {
  return (
    <>
      <Script 
        id="ld-startup" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(startupSchemaLd) }} 
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/10 to-slate-950 text-slate-100">
        {/* Hero Section - Ecosystem Context */}
        <section className="relative px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-blue-600/10" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm mb-6">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse mr-2" />
                  Part of the AI Ecosystem Revolution
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                  Founding Teams: Ship AI Products That Matter
                </h1>
                
                <p className="mt-6 text-xl text-slate-300">
                  You're not just building a startup. You're joining an ecosystem where every success 
                  amplifies everyone else's. From team alignment to first revenue in 12 days.
                </p>

                {/* Live Ecosystem Stats */}
                <div className="mt-8 p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-violet-500/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-violet-400">2,847</div>
                      <div className="text-sm text-slate-400">Active Startups</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">89%</div>
                      <div className="text-sm text-slate-400">Reach Revenue</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-400">12 Days</div>
                      <div className="text-sm text-slate-400">Avg to Launch</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-400">$847K</div>
                      <div className="text-sm text-slate-400">Avg Year 1</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link 
                    href="/start" 
                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg font-semibold hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-600/25"
                  >
                    Start Your Journey
                  </Link>
                  <Link 
                    href="/ecosystem" 
                    className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    Explore Ecosystem
                  </Link>
                </div>
              </div>

              <div className="relative">
                {/* Animated Ecosystem Visualization */}
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-3xl animate-pulse" />
                  <div className="relative z-10 p-8">
                    <img 
                      src="/images/ecosystem-startups.svg" 
                      alt="Startup Ecosystem Network"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-lg text-green-400 text-sm">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                    423 Active Partnerships
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Startup Journey - Reimagined */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Your Path Through the Ecosystem</h2>
              <p className="mt-4 text-xl text-slate-300">
                Every stage connects you with the right people, tools, and opportunities
              </p>
            </div>

            {/* Interactive Journey Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-600 to-blue-600" />
              
              {[
                {
                  day: "Days 1-3",
                  phase: "Align & Connect",
                  description: "Form your team, align on vision, connect with mentors",
                  ecosystem: "🤝 Get matched with 3 expert mentors",
                  tools: ["Team Canvas", "Spec Builder", "Mentor Matching"],
                  stat: "94% teams stay aligned"
                },
                {
                  day: "Days 4-6",
                  phase: "Build & Validate",
                  description: "Generate your MVP, validate with early adopters",
                  ecosystem: "🚀 Access shared components from 2,847 startups",
                  tools: ["AI Builder", "Component Library", "User Testing Pool"],
                  stat: "70% code reuse"
                },
                {
                  day: "Days 7-9",
                  phase: "Launch & Learn",
                  description: "Deploy publicly, gather feedback, iterate fast",
                  ecosystem: "📈 Cross-promotion to 10K+ ecosystem users",
                  tools: ["One-Click Deploy", "Analytics Suite", "A/B Testing"],
                  stat: "First users in 24h"
                },
                {
                  day: "Days 10-12",
                  phase: "Revenue & Growth",
                  description: "Activate payments, acquire customers, scale",
                  ecosystem: "💰 Investor introductions, partnership opportunities",
                  tools: ["Stripe Integration", "Growth Playbook", "Investor Portal"],
                  stat: "$10K MRR average"
                }
              ].map((stage, idx) => (
                <div key={idx} className={`relative flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                  <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-slate-800 rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all">
                      <div className="text-violet-400 font-semibold mb-2">{stage.day}</div>
                      <h3 className="text-2xl font-bold mb-2">{stage.phase}</h3>
                      <p className="text-slate-300 mb-4">{stage.description}</p>
                      
                      <div className="bg-violet-500/10 rounded-lg p-3 mb-4">
                        <div className="text-sm text-violet-300">{stage.ecosystem}</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stage.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 bg-slate-700 rounded-full text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-semibold text-green-400">{stage.stat}</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-violet-600 rounded-full border-4 border-slate-950" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Value Props for Founding Teams */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Founding Teams Choose the Ecosystem
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Alignment Tools */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-violet-500/50 transition-all h-full">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4">Perfect Team Alignment</h3>
                  <p className="text-slate-300 mb-6">
                    No more endless debates. Our Spec DSL keeps technical and non-technical 
                    founders perfectly synchronized.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>✓ Visual team canvas</li>
                    <li>✓ Role-based dashboards</li>
                    <li>✓ Decision tracking</li>
                    <li>✓ Async collaboration</li>
                  </ul>
                </div>
              </div>

              {/* Network Effects */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-violet-500/50 transition-all h-full">
                  <div className="text-4xl mb-4">🌐</div>
                  <h3 className="text-2xl font-bold mb-4">Instant Network Effects</h3>
                  <p className="text-slate-300 mb-6">
                    Launch into an ecosystem where 2,847 other startups become your 
                    distribution, partnerships, and growth.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>✓ Cross-promotion engine</li>
                    <li>✓ Partnership matching</li>
                    <li>✓ Shared user base</li>
                    <li>✓ Ecosystem credits</li>
                  </ul>
                </div>
              </div>

              {/* AI-Powered Everything */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-violet-500/50 transition-all h-full">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold mb-4">AI Does the Heavy Lifting</h3>
                  <p className="text-slate-300 mb-6">
                    Focus on vision and customers. AI handles code, copy, designs, 
                    and even growth experiments.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>✓ Code generation</li>
                    <li>✓ Copy optimization</li>
                    <li>✓ Design systems</li>
                    <li>✓ Growth automation</li>
                  </ul>
                </div>
              </div>

              {/* Mentor Network */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-violet-500/50 transition-all h-full">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold mb-4">2,847 Expert Mentors</h3>
                  <p className="text-slate-300 mb-6">
                    Get matched with founders who've been there. Real advice from 
                    people who've built and exited.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>✓ AI-matched mentors</li>
                    <li>✓ Weekly office hours</li>
                    <li>✓ Private Slack access</li>
                    <li>✓ Exit strategy help</li>
                  </ul>
                </div>
              </div>

              {/* Investor Pipeline */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-violet-500/50 transition-all h-full">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-2xl font-bold mb-4">Investor-Ready Always</h3>
                  <p className="text-slate-300 mb-6">
                    Build Score, Evidence Ledger, and live demos make you fundable 
                    from day one. No more deck theater.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>✓ Auto-generated pitch</li>
                    <li>✓ Live metrics dashboard</li>
                    <li>✓ Investor matching</li>
                    <li>✓ Due diligence ready</li>
                  </ul>
                </div>
              </div>

              {/* Exit Opportunities */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-violet-500/50 transition-all h-full">
                  <div className="text-4xl mb-4">🚪</div>
                  <h3 className="text-2xl font-bold mb-4">Built to Exit</h3>
                  <p className="text-slate-300 mb-6">
                    Clean code, clear documentation, and the Marketplace mean 
                    acquisition opportunities from month one.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>✓ M&A marketplace</li>
                    <li>✓ Acquisition matching</li>
                    <li>✓ Exit readiness score</li>
                    <li>✓ Transfer automation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories with Network Effects */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Real Teams, Real Revenue, Real Impact</h2>
              <p className="mt-4 text-xl text-slate-300">
                Every success story strengthens the entire ecosystem
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "LeadGen AI",
                  founders: "Sarah & Mike",
                  story: "Two marketers with no coding experience",
                  timeline: "Day 6: Launched → Day 12: First customer → Month 3: $47K MRR",
                  ecosystem: "Now powering lead gen for 147 other ecosystem startups",
                  revenue: "$2.1M ARR",
                  badge: "🏆 Top Ecosystem Contributor"
                },
                {
                  name: "DocuMind",
                  founders: "Alex, Jordan & Sam",
                  story: "Former consultants solving document chaos",
                  timeline: "Day 8: MVP ready → Day 15: 10 pilots → Month 2: Series A interest",
                  ecosystem: "Integrated with 89 ecosystem products via API",
                  revenue: "$3.7M ARR",
                  badge: "🤝 Most Integrated"
                },
                {
                  name: "CustomerOS",
                  founders: "The Remote Team",
                  story: "4 founders across 3 continents",
                  timeline: "Day 10: Soft launch → Day 20: Product Hunt #1 → Month 4: Acquired",
                  ecosystem: "Shared components saved 400+ dev hours",
                  revenue: "Acquired for $4.2M",
                  badge: "💎 Fastest Exit"
                }
              ].map((story, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-violet-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-slate-400">{story.founders}</p>
                    </div>
                    <div className="text-2xl">{['🚀', '📊', '💰'][idx]}</div>
                  </div>
                  
                  <p className="text-slate-300 mb-4 text-sm italic">"{story.story}"</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="pb-3 border-b border-slate-700">
                      <div className="text-slate-400 mb-1">Journey</div>
                      <div className="text-slate-200">{story.timeline}</div>
                    </div>
                    
                    <div className="pb-3 border-b border-slate-700">
                      <div className="text-slate-400 mb-1">Ecosystem Impact</div>
                      <div className="text-violet-300">{story.ecosystem}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-green-400">{story.revenue}</div>
                      <div className="px-3 py-1 bg-violet-500/20 rounded-full text-xs text-violet-300">
                        {story.badge}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing that Scales */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Pay Only When You Succeed</h2>
              <p className="mt-4 text-xl text-slate-300">
                Start free. Upgrade after your first revenue. Cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Validate",
                  price: "$0",
                  when: "Forever free",
                  features: [
                    "Team alignment tools",
                    "Basic spec builder",
                    "Community access",
                    "3 mentor sessions"
                  ],
                  cta: "Start Free",
                  highlight: false
                },
                {
                  name: "Launch",
                  price: "$49",
                  when: "After first customer",
                  features: [
                    "Everything in Validate",
                    "AI builder unlimited",
                    "Ecosystem access",
                    "Growth experiments",
                    "Priority support"
                  ],
                  cta: "Most Popular",
                  highlight: true
                },
                {
                  name: "Scale",
                  price: "$249",
                  when: "After $10K MRR",
                  features: [
                    "Everything in Launch",
                    "White-label options",
                    "API access",
                    "Investor intros",
                    "M&A marketplace"
                  ],
                  cta: "Scale Up",
                  highlight: false
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  when: "After $100K MRR",
                  features: [
                    "Everything in Scale",
                    "Custom integrations",
                    "Dedicated CSM",
                    "SLA guarantees",
                    "Acquisition support"
                  ],
                  cta: "Contact Sales",
                  highlight: false
                }
              ].map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`relative rounded-xl p-6 ${
                    plan.highlight 
                      ? 'bg-gradient-to-b from-violet-600/20 to-violet-600/10 border-2 border-violet-500' 
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-violet-600 rounded-full text-sm font-semibold">
                      RECOMMENDED
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-slate-400">/mo</span>}
                  </div>
                  <p className="text-sm text-slate-400 mb-6">{plan.when}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-violet-600 hover:bg-violet-500'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-24 bg-gradient-to-b from-violet-950/20 to-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Your Startup Journey Starts Now
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Join 2,847 founding teams already building the future. The ecosystem is waiting for your contribution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/start" 
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg font-semibold hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-600/25"
              >
                Start Your 12-Day Journey
              </Link>
              <Link 
                href="/demo" 
                className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
              >
                Watch 5-Min Demo
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-slate-400">
              No credit card required • Full access free until revenue • Cancel anytime
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
