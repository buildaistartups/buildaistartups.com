// app/(default)/pricing-section-light.tsx
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing-light' // <- use the light table

export default function PricingSection() {
  return (
    <section className="relative">
      {/* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div>
              {/* Eyebrow — solid #7500D6, keep existing font-size from your styles */}
              <div className="inline-flex font-medium pb-3" style={{ color: '#7500D6' }}>
                Pricing plans
              </div>
            </div>

            {/* Title — keep gradient exactly like your reference */}
            <h2 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Flexible plans and features
            </h2>

            {/* Paragraph — same rule as reference */}
            <p className="text-lg text-slate-400">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary,
              making this the first true generator on the Internet.
            </p>
          </div>

          {/* If you’re injecting the pricing table via ThemeAwarePricing elsewhere, you can remove this */}
          <Pricing />
        </div>
      </div>
    </section>
  )
}
