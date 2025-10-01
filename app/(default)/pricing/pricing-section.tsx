// app/(default)/pricing/pricing-section.tsx
import Pricing from '@/components/pricing'

export default function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative">
      {/* Radial gradient */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
        role="presentation"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div className="inline-flex font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-3">
              Pricing plans
            </div>
            <h2
              id="pricing-title"
              className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4"
            >
              Simple, transparent, and scalable
            </h2>
            <p className="text-lg text-slate-400">
              From intent to live product—choose a plan that matches your stage.{' '}
              <span className="text-slate-200 font-medium">20% off with yearly billing.</span>{' '}
              No lock-in; you own your repos, infra, and revenue.
            </p>
          </div>

          <Pricing />
        </div>
      </div>
    </section>
  )
}
