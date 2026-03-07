import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'

export const metadata: Metadata = {
  title: 'Enterprises — White-Label Innovation Platform | Build AI Startups',
  description:
    'Deploy your own innovation lab. Complete white-label platform for enterprises to launch internal AI ventures.',
  alternates: { canonical: `${siteUrl}/solutions/enterprises` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/enterprises`,
    title: 'Enterprises — White-Label Innovation Platform',
    description:
      'Transform your organization with a complete innovation platform. White-label, secure, compliant.',
    images: [{ 
      url: '/og/solutions-enterprises.png', 
      width: 1200, 
      height: 630, 
      alt: 'Build AI Startups — Enterprise Solutions' 
    }],
    siteName: 'Build AI Startups',
  },
}

export default function EnterprisesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-violet-600/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2" />
                Enterprise Solutions
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Your Innovation Lab. Your Brand. Your Control.
              </h1>
              
              <p className="mt-6 text-xl text-slate-300">
                Deploy a complete innovation platform under your brand. Enable your teams to 
                build and launch AI ventures with enterprise-grade security and compliance.
              </p>

              {/* Key Benefits */}
              <div className="mt-8 p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-blue-500/20">
                <h3 className="text-sm font-semibold text-blue-400 mb-4">ENTERPRISE BENEFITS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">Complete White-Label</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">SOC2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">SSO/SAML Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">Private Deployment</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25"
                >
                  Schedule Demo
                </Link>
                <Link 
                  href="/enterprise-features" 
                  className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
                >
                  View Features
                </Link>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Implementation support included • Dedicated success manager
              </p>
            </div>

            <div className="relative">
              <div className="bg-slate-900 rounded-xl border border-blue-500/30 p-8">
                <h3 className="text-xl font-semibold mb-6">Innovation Lab Dashboard</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Active Ventures</span>
                      <span className="text-xl font-bold text-blue-400">Configure</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Team Members</span>
                      <span className="text-xl font-bold text-green-400">Unlimited</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Deployment</span>
                      <span className="text-xl font-bold text-violet-400">Your Cloud</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Compliance</span>
                      <span className="text-xl font-bold text-orange-400">Custom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White-Label Features */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Complete White-Label Control</h2>
            <p className="mt-4 text-xl text-slate-300">
              Deploy under your brand with full customization
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-blue-400">🏢︎</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Your Brand Identity</h3>
                    <p className="text-slate-300 text-sm">
                      Custom logos, colors, fonts, and design system. Your domain with SSL certificates. 
                      Branded email communications and notifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-blue-400">🔐︎</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
                    <p className="text-slate-300 text-sm">
                      SOC2 Type II compliance, SSO/SAML integration, role-based access control, 
                      audit trails, and data encryption at rest and in transit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-blue-400">🔌︎</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">System Integration</h3>
                    <p className="text-slate-300 text-sm">
                      Connect with your existing enterprise systems including SAP, Oracle, 
                      Salesforce, Microsoft 365, and custom APIs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-blue-400">☁︎</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Deployment Options</h3>
                    <p className="text-slate-300 text-sm">
                      Choose your deployment: private cloud (AWS, Azure, GCP), on-premises, 
                      or hybrid. Complete data residency control.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-blue-400">📊︎</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Analytics & Reporting</h3>
                    <p className="text-slate-300 text-sm">
                      Custom KPI dashboards, executive reports, innovation metrics, 
                      and ROI tracking tailored to your organization's needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-blue-400">🛡️︎</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Compliance Ready</h3>
                    <p className="text-slate-300 text-sm">
                      Built-in support for GDPR, CCPA, HIPAA, and custom compliance 
                      requirements specific to your industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">How Enterprises Use Our Platform</h2>
            <p className="mt-4 text-xl text-slate-300">
              Transform your organization with internal innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-3xl mb-4 text-blue-400">🚀︎</div>
              <h3 className="text-xl font-bold mb-4">Innovation Labs</h3>
              <p className="text-slate-300 mb-4">
                Run internal accelerators and innovation programs. Enable employees to 
                build and test new ideas quickly.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Idea submission portals</li>
                <li>• Team formation tools</li>
                <li>• Resource allocation</li>
                <li>• Progress tracking</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-3xl mb-4 text-blue-400">🔨︎</div>
              <h3 className="text-xl font-bold mb-4">Digital Transformation</h3>
              <p className="text-slate-300 mb-4">
                Modernize legacy processes with AI-powered solutions built by your 
                teams who understand the business.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Process automation</li>
                <li>• AI integration</li>
                <li>• Rapid prototyping</li>
                <li>• Change management</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-3xl mb-4 text-blue-400">💡︎</div>
              <h3 className="text-xl font-bold mb-4">New Ventures</h3>
              <p className="text-slate-300 mb-4">
                Launch new business units and spin-offs. Test new markets and business 
                models with minimal risk.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Market validation</li>
                <li>• MVP development</li>
                <li>• Customer testing</li>
                <li>• Spin-off support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Implementation Process</h2>
            <p className="mt-4 text-xl text-slate-300">
              Get your innovation lab running in weeks, not months
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Discovery & Planning</h3>
                  <p className="text-slate-300 mb-4">
                    We work with your team to understand requirements, compliance needs, 
                    and integration points.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Requirements gathering</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Stakeholder alignment</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Security review</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Configuration & Setup</h3>
                  <p className="text-slate-300 mb-4">
                    Deploy the platform with your branding, configure security settings, 
                    and integrate with your systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">White-label setup</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">SSO configuration</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">System integration</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Training & Onboarding</h3>
                  <p className="text-slate-300 mb-4">
                    Train your administrators and initial users. Launch pilot programs 
                    with selected teams.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Admin training</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">User workshops</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Documentation</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Launch & Scale</h3>
                  <p className="text-slate-300 mb-4">
                    Roll out to the broader organization. Monitor usage, gather feedback, 
                    and optimize based on results.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Organization rollout</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Success tracking</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm">Ongoing support</span>
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
            Enterprise-Grade Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔒︎", title: "Security", items: ["Zero-trust architecture", "E2E encryption", "Penetration tested"] },
              { icon: "🛡️︎", title: "Compliance", items: ["SOC2 Type II", "GDPR/CCPA", "Custom policies"] },
              { icon: "🔐︎", title: "Authentication", items: ["SSO/SAML", "MFA support", "AD integration"] },
              { icon: "📊︎", title: "Analytics", items: ["Custom dashboards", "Export capabilities", "API access"] },
              { icon: "🌐︎", title: "Global Ready", items: ["Multi-language", "Multi-region", "Local compliance"] },
              { icon: "⚡︎", title: "Performance", items: ["Auto-scaling", "Load balancing", "CDN included"] },
              { icon: "🔧︎", title: "Customization", items: ["Custom workflows", "API extensions", "Plugin system"] },
              { icon: "🤝︎", title: "Support", items: ["24/7 availability", "Dedicated CSM", "SLA guarantees"] }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl mb-3 text-blue-400">{feature.icon}</div>
                <h3 className="font-bold mb-3">{feature.title}</h3>
                <ul className="space-y-1 text-sm text-slate-400">
                  {feature.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Enterprise Pricing</h2>
            <p className="mt-4 text-xl text-slate-300">
              Flexible plans to match your organization's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-2">Department</h3>
              <p className="text-slate-400 mb-6">For teams and departments</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">Contact Us</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Up to 500 users</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Basic white-labeling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Standard integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Business hours support</span>
                </li>
              </ul>
              
              <Link href="/contact" className="block w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-center font-semibold transition-all">
                Get Quote
              </Link>
            </div>

            <div className="bg-gradient-to-b from-blue-600/20 to-blue-600/10 rounded-xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                RECOMMENDED
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Organization</h3>
              <p className="text-slate-400 mb-6">For global enterprises</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom Pricing</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Unlimited users</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Full white-labeling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>All integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Success manager</span>
                </li>
              </ul>
              
              <Link href="/contact" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-center font-semibold transition-all">
                Schedule Demo
              </Link>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-2">Private Cloud</h3>
              <p className="text-slate-400 mb-6">Maximum control & security</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>On-premises option</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Custom development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>SLA guarantees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓︎</span>
                  <span>Executive workshops</span>
                </li>
              </ul>
              
              <Link href="/contact" className="block w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-center font-semibold transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-blue-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Deploy your innovation lab and enable your teams to build the future. 
            Get started with a personalized demo and implementation plan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25"
            >
              Schedule Executive Demo
            </Link>
            <Link 
              href="/resources/white-paper" 
              className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
            >
              Download White Paper
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-slate-400">
            Full implementation support • Dedicated success manager • Flexible contracts
          </p>
        </div>
      </section>
    </main>
  )
}
