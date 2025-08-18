import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing' // keep or remove depending on where you render the table

export default function PricingSection() {
  return (
    <section className="relative">
      {/* Radial gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-20">
            {/* Eyebrow — solid brand purple */}
            <div className="pb-3 text-base md:text-lg font-medium" style={{ color: '#7500D6' }}>
              Pricing plans
            </div>

            {/* Title — match example: slate gray, no gradient, normal size */}
            <h2
              className="font-extrabold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl text-slate-700"
              style={{
                background: 'none',
                WebkitBackgroundClip: 'initial',
                backgroundClip: 'initial',
                WebkitTextFillColor: 'initial',
                textShadow: 'none',
              }}
            >
              Flexible plans and features
            </h2>

            {/* Paragraph — readable grey like the example */}
            <p
              className="mt-6 mx-auto text-lg md:text-xl leading-relaxed text-slate-600 max-w-3xl"
              style={{
                background: 'none',
                WebkitBackgroundClip: 'initial',
                backgroundClip: 'initial',
                WebkitTextFillColor: 'initial',
                textShadow: 'none',
              }}
            >
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the
              first true generator on the Internet.
            </p>
          </div>

          {/* Pricing table (keep if you render it here in light mode) */}
          <Pricing />
        </div>
      </div>
    </section>
  )
}
