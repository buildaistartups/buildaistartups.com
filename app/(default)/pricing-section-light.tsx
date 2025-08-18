import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import ThemeAwarePricing from '@/components/ThemeAwarePricing'

export default function PricingSectionLight() {
  return (
    <section className="relative bg-white">
      {/* Radial gradient */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-300 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {/* Eyebrow text solid color */}
            <div
              className="inline-flex font-medium pb-3"
              style={{ color: '#7500D6' }}
            >
              Pricing plans
            </div>

            {/* ✅ FIXED: Solid text colors for light theme */}
            <h2 className="h2 text-slate-900 pb-4">
              Flexible plans and features
            </h2>
            <p className="text-lg text-slate-600">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
              making this the first true generator on the Internet.
            </p>
          </div>

          {/* Theme-aware pricing table */}
          <ThemeAwarePricing />
        </div>
      </div>
    </section>
  )
}
