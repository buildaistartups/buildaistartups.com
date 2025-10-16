import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'

export const metadata: Metadata = {
  title: 'Startups — Build Your AI Business Together | Build AI Startups',
  description:
    'Complete platform for founding teams to validate, build, and launch AI products. Join our growing ecosystem of entrepreneurs.',
  alternates: { canonical: `${siteUrl}/solutions/startups` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/startups`,
    title: 'Startups — Build Your AI Business Together',
    description:
      'The platform for founding teams to build AI products. From idea validation to launch.',
    images: [{ 
      url: '/og/solutions-startups.png', 
      width: 1200, 
      height: 630, 
      alt: 'Build AI Startups — For Founding Teams' 
    }],
    siteName: 'Build AI Startups',
  },
}

export default function StartupsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/10 to-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-blue-600/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm mb-6">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse mr-2" />
                For Founding Teams
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                Build Your AI Startup With Complete Tools
              </h1>
              
              <p className="mt-6 text-xl text-slate-300">
                Everything founding teams need to validate ideas, build products, and launch to market. 
                Join our ecosystem where startups help each other succeed.
              </p>

              {/* Platform Capabilities */}
              <div className="mt-8 p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-violet-500/20">
                <h3 className="text-sm font-semibold text-violet-400 mb-4">PLATFORM CAPABILITIES</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm">Team Alignment Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm">AI Code Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm">Built-in Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm">Payment Integration</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/start" 
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg font-semibold hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-600/25"
                >
                  Get Started
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
                >
                  How It Works
                </Link>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Free to start • Pay as you grow • Cancel anytime
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-3xl animate-pulse" />
                <div className="relative z-10 p-8">
                  <img 
                    src="/images/ecosystem-startups.svg" 
                    alt="Startup Ecosystem Platform"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Startup Journey */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Your Journey Through Our Platform</h2>
            <p className="mt-4 text-xl text-slate-300">
              A structured approach to building your AI startup
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                phase: "Validate",
                description: "Test your idea with real users",
                tools: ["Idea Validation Framework", "User Interview Templates", "Market Research Tools"],
                icon: "🎯"
              },
              {
                phase: "Build",
                description: "Create your MVP with AI assistance",
                tools: ["AI Code Generator", "Component Library", "Testing Suite"],
                icon: "🏗️"
              },
              {
                phase: "Launch",
                description: "Deploy and go to market",
                tools: ["One-Click Deploy", "Marketing Templates", "Analytics Setup"],
                icon: "🚀"
              },
              {
                phase: "Grow",
                description: "Scale with data-driven insights",
                tools: ["Growth Experiments", "A/B Testing", "Customer Insights"],
                icon: "📈"
              }
            ].map((stage, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all">
                <div className="text-3xl mb-4">{stage.icon}</div>
                <h3 className="text-xl font-bold mb-2">{stage.phase}</h3>
                <p className="text-slate-300 mb-4 text-sm">{stage.description}</p>
                <div className="space-y-2">
                  {stage.tools.map((tool) => (
                    <div key={tool} className="text-xs text-slate-400">
                      • {tool}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Built for Founding Teams
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4">Team Alignment</h3>
              <p className="text-slate-300 mb-6">
                Keep technical and non-technical founders synchronized with shared dashboards and clear specs.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ Shared project views</li>
                <li>✓ Role-based access</li>
                <li>✓ Decision tracking</li>
                <li>✓ Progress visibility</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Building</h3>
              <p className="text-slate-300 mb-6">
                Use AI to accelerate development while maintaining control over your product.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ Code generation</li>
                <li>✓ Component suggestions</li>
                <li>✓ Documentation writing</li>
                <li>✓ Test creation</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-4">Ecosystem Benefits</h3>
              <p className="text-slate-300 mb-6">
                Connect with other startups for partnerships, knowledge sharing, and growth.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ Partner matching</li>
                <li>✓ Shared components</li>
                <li>✓ Community support</li>
                <li>✓ Cross-promotion options</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4">Built-in Analytics</h3>
              <p className="text-slate-300 mb-6">
                Understand your users and make data-driven decisions from day one.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ User behavior tracking</li>
                <li>✓ Conversion funnels</li>
                <li>✓ Custom dashboards</li>
                <li>✓ Export capabilities</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-2xl font-bold mb-4">Payment Ready</h3>
              <p className="text-slate-300 mb-6">
                Start accepting payments immediately with integrated billing solutions.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ Stripe integration</li>
                <li>✓ Subscription management</li>
                <li>✓ Usage-based billing</li>
                <li>✓ Invoice generation</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold mb-4">Developer Tools</h3>
              <p className="text-slate-300 mb-6">
                Professional development environment with everything you need.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ CI/CD pipelines</li>
                <li>✓ Testing frameworks</li>
                <li>✓ Version control</li>
                <li>✓ Deployment automation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">How Our Platform Works</h2>
            <p className="mt-4 text-xl text-slate-300">
              From idea to launched product
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Define Your Product</h3>
                <p className="text-slate-300">
                  Use our structured specification tools to align your team on what you're building, 
                  who it's for, and how it will work.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Generate Your Foundation</h3>
                <p className="text-slate-300">
                  Our AI helps create your initial codebase, database schemas, and API endpoints 
                  based on your specifications.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Customize and Iterate</h3>
                <p className="text-slate-300">
                  Work with the generated code, customize it to your needs, and iterate based 
                  on user feedback and testing.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Launch and Grow</h3>
                <p className="text-slate-300">
                  Deploy your product, start acquiring users, and use our growth tools to 
                  optimize and scale your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Transparent Pricing</h2>
            <p className="mt-4 text-xl text-slate-300">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">Perfect for validation</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ Core tools</li>
                <li>✓ Community access</li>
                <li>✓ Basic templates</li>
                <li>✓ Limited AI usage</li>
              </ul>
              <Link href="/signup" className="block w-full mt-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-center font-semibold transition-all">
                Start Free
              </Link>
            </div>

            <div className="bg-gradient-to-b from-violet-600/20 to-violet-600/10 rounded-xl p-6 border-2 border-violet-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-violet-600 rounded-full text-xs font-semibold">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Startup</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$49</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">For building products</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ Everything in Free</li>
                <li>✓ Unlimited AI usage</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <Link href="/signup" className="block w-full mt-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg text-center font-semibold transition-all">
                Choose Startup
              </Link>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$249</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">For scaling teams</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ Everything in Startup</li>
                <li>✓ Team features</li>
                <li>✓ API access</li>
                <li>✓ Custom integrations</li>
              </ul>
              <Link href="/signup" className="block w-full mt-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-center font-semibold transition-all">
                Choose Growth
              </Link>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">For large teams</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ Everything in Growth</li>
                <li>✓ Dedicated support</li>
                <li>✓ SLA guarantees</li>
                <li>✓ Custom development</li>
              </ul>
              <Link href="/contact" className="block w-full mt-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-center font-semibold transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Do I need technical skills to use this?</h3>
              <p className="text-slate-300">
                While technical knowledge helps, our platform is designed to be accessible. 
                The AI assists with code generation, and our templates provide starting points. 
                Many non-technical founders successfully use our tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Who owns the code and IP?</h3>
              <p className="text-slate-300">
                You own everything you build. The code lives in your repositories, deploys to 
                your infrastructure, and all intellectual property belongs to your company.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Can I export my project if I want to leave?</h3>
              <p className="text-slate-300">
                Yes, absolutely. You have full access to all your code, data, and configurations. 
                There's no lock-in - you can export everything and continue development elsewhere.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How is this different from other no-code platforms?</h3>
              <p className="text-slate-300">
                We generate real, production-ready code that you own and can modify. Unlike traditional 
                no-code platforms, you're not limited by platform constraints and can customize everything.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">What kind of support is available?</h3>
              <p className="text-slate-300">
                We offer community support for free users, priority support for paid plans, and 
                dedicated support for enterprise customers. Plus, our ecosystem connects you with 
                other founders who can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-violet-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Build Your AI Startup?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join our growing ecosystem of founders building the future with AI.
            Start with our free tools and upgrade as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg font-semibold hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-600/25"
            >
              Get Started Free
            </Link>
            <Link 
              href="/demo" 
              className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
            >
              Watch Demo
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-slate-400">
            No credit card required • Free tier always available • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  )
}
