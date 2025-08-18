import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing' // keep as-is if you render the table here

export default function PricingSection() {
  return (
    <section className="relative">
      {/* Radial gradient */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {/* Eyebrow (solid color) */}
            <div className="inline-flex font-medium pb-3" style={{ color: '#7500D6' }}>
              Pricing plans
            </div>

            {/* Title — avoid global .h2 / h2 gradient by using an ARIA heading */}
            <div
              role="heading"
              aria-level={2}
              className="relative z-10 pb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Flexible plans and features
            </div>

            {/* Paragraph — readable on light background */}
            <p className="relative z-10 text-lg md:text-xl text-slate-600">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
            </p>
          </div>

          {/* Pricing table */}
          <Pricing />
        </div>
      </div>
    </section>
  )
}
