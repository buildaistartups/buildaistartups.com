// app/(default)/pricing-section-light.tsx
'use client'

import Pricing from '@/components/pricing-light'

export default function PricingSection() {
  return (
    <section className="relative bg-white">
      {/* soft top glow, very subtle in light mode */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] aspect-square rounded-full bg-purple-500/10 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div className="inline-flex font-medium pb-3 text-[#7500D6]">Pricing plans</div>
            <h2 className="h2 text-slate-900 pb-4">Flexible plans and features</h2>
            <p className="text-lg text-slate-700">
              Simple, transparent pricing for teams of any size.
            </p>
          </div>

          <Pricing />
        </div>
      </div>
    </section>
  )
}
