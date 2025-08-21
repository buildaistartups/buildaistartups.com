// app/(default)/pricing-section-light.tsx
'use client'

import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing-light'   // ✅ use the light table

export default function PricingSection() {
  return (
    <section className="relative">
      {/* Radial accent kept subtle for light UI */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div className="inline-flex font-medium pb-3 text-[#7500D6]">Pricing plans</div>
            <h2 className="h2 text-slate-900 pb-4">Flexible plans and features</h2>
            <p className="text-lg text-slate-700">
              Simple, transparent pricing for teams of any size.
            </p>
          </div>

          {/* Table */}
          <Pricing />
        </div>
      </div>
    </section>
  )
}
