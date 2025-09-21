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
    <section className="relative bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your journey to $10K MRR
            </h2>
            <p className="text-xl text-gray-400">
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
                <div className="h-full bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition duration-150 ease-in-out">
                  <div className="font-bold text-4xl text-purple-600 mb-3">{step.num}</div>
                  <div className="font-semibold text-lg text-white mb-2">{step.title}</div>
                  <div className="text-sm text-gray-400">{step.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link 
              href="/start" 
              className="inline-flex items-center px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-full font-medium transition duration-150 ease-in-out"
            >
              Start Your Journey
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
