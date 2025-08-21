// app/(default)/pricing-section-light.tsx
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing-light' // <- use the light table

export default function PricingSection() {
  return (
    <section className="relative">
      {/* subtle top glow (optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-6rem] w-[60rem] h-[28rem] rounded-[50%] bg-white/60 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section heading */}
          <div className="max-w-3xl mx-auto text-center pb-10">
            <div className="inline-flex font-medium text-[#7500D6] pb-2">Pricing plans</div>
            <h2 className="h2 text-slate-900 pb-2">Flexible plans and features</h2>
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
