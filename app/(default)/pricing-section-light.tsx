import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing' // keep as-is if you render table elsewhere

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
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-20">
            {/* Eyebrow — solid purple */}
            <div className="pb-3 text-base md:text-lg font-medium" style={{ color: '#7500D6' }}>
              Pricing plans
            </div>

            {/* Title
                Keep .h2 for the SAME sizes as dark theme.
                Force solid readable color + neutralize any gradient/clip from the global .h2 */}
            <h2 className="h2 !text-slate-700 !bg-none !bg-transparent !bg-clip-border">
              Flexible plans and features
            </h2>

            {/* Paragraph — same size scale as dark, solid readable gray */}
            <p className="text-lg md:text-xl leading-relaxed !text-slate-600">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary,
              making this the first true generator on the Internet.
            </p>
          </div>

          {/* If you’re injecting the pricing table via ThemeAwarePricing elsewhere, remove this */}
          <Pricing />
        </div>
      </div>
    </section>
  )
}
