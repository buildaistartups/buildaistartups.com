// components/home/PricingSection.tsx
'use client'

import Link from 'next/link'

const pricingPlans = {
  builders: [
    { name: 'Free', price: '0', features: ['Basic tools', 'Community support'] },
    { name: 'Pro', price: '49', features: ['All tools', 'Priority support', 'Analytics'] },
    { name: 'Business', price: '249', features: ['White-label', 'API access', 'Custom domain'] }
  ],
  enablers: [
    { name: 'Accelerator', price: '2K', unit: '/cohort', features: ['50 startups', 'All tools'] },
    { name: 'Investor', price: '500', unit: '/mo', features: ['Portfolio tools', 'Deal flow'] },
    { name: 'Mentor', price: 'Free', features: ['Give back', 'Network access'] }
  ],
  enterprise: [
    { name: 'White-Label', price: '25K', unit: '/mo', features: ['Full platform', 'Your brand'] },
    { name: 'Innovation Lab', price: 'Custom', features: ['Tailored solution', 'Dedicated support'] }
  ]
}

export default function PricingSection() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Pricing That Matches Your Role
            </h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Builders */}
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-6">BUILDERS</h3>
              <div className="space-y-4">
                {pricingPlans.builders.map((plan) => (
                  <div key={plan.name} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-slate-200">{plan.name}</span>
                      <div>
                        <span className="text-2xl font-bold text-slate-200">${plan.price}</span>
                        <span className="text-sm text-slate-400">/mo</span>
                      </div>
                    </div>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="text-xs text-slate-500 italic">*Free until revenue, then upgrade</p>
              </div>
            </div>

            {/* Enablers */}
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-6">ENABLERS</h3>
              <div className="space-y-4">
                {pricingPlans.enablers.map((plan) => (
                  <div key={plan.name} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-slate-200">{plan.name}</span>
                      <div>
                        <span className="text-2xl font-bold text-slate-200">
                          {plan.price === 'Free' ? 'Free' : `$${plan.price}`}
                        </span>
                        {plan.unit && <span className="text-sm text-slate-400">{plan.unit}</span>}
                      </div>
                    </div>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-6">ENTERPRISE</h3>
              <div className="space-y-4">
                {pricingPlans.enterprise.map((plan) => (
                  <div key={plan.name} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-slate-200">{plan.name}</span>
                      <div>
                        <span className="text-2xl font-bold text-slate-200">
                          {plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
                        </span>
                        {plan.unit && <span className="text-sm text-slate-400">{plan.unit}</span>}
                      </div>
                    </div>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="text-xs text-slate-500 italic">*Compliance included</p>
              </div>
            </div>
          </div>

          {/* Additional pricing info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="font-semibold text-slate-200">STUDENTS</div>
              <div className="text-sm text-slate-400">Free + Certification</div>
              <div className="text-xs text-slate-500">University Discounts</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="font-semibold text-slate-200">PRODUCT TEAMS</div>
              <div className="text-sm text-slate-400">$99/seat/mo</div>
              <div className="text-xs text-slate-500">Enterprise: Custom</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="font-semibold text-slate-200">MARKETPLACE</div>
              <div className="text-sm text-slate-400">15% transaction</div>
              <div className="text-xs text-slate-500">Licensing: 30%</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/pricing"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              See Your Pricing
            </Link>
            <Link
              href="/calculator"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              Calculate ROI
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
