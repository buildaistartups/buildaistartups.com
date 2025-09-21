import Link from 'next/link'

export default function JourneySection() {
  const steps = [
    { num: '1', title: 'Start', desc: 'Find your AI idea', href: '/start' },
    { num: '2', title: 'Validate', desc: 'Test demand', href: '/validate' },
    { num: '3', title: 'Plan', desc: 'Create roadmap', href: '/plan' },
    { num: '4', title: 'Build', desc: 'Ship MVP', href: '/product/builder' },
    { num: '5', title: 'Launch', desc: 'Get customers', href: '/launch' },
    { num: '6', title: 'Grow', desc: 'Scale up', href: '/grow' }
  ]

  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 border-y border-slate-700">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-16 md:py-24">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your journey to $10K MRR
            </h2>
            <p className="text-xl text-slate-400">
              Six proven steps from idea to recurring revenue
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-5xl mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((step) => (
              <Link
                key={step.num}
                href={step.href}
                className="relative group block"
              >
                <div className="h-full bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 text-center hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-150 ease-in-out">
                  <div className="font-bold text-5xl bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text mb-3">
                    {step.num}
                  </div>
                  <div className="font-semibold text-lg text-white mb-2">{step.title}</div>
                  <div className="text-sm text-slate-400">{step.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link 
              href="/start" 
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              <span className="relative inline-flex items-center">
                Start Your Journey
                <span className="ml-1 text-purple-300">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
