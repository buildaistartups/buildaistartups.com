import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing'

export default function PricingSection() {
  return (
    <section className="relative">
      {/* Radial gradient background */}
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
            {/* Eyebrow — solid brand purple */}
            <div className="inline-flex font-medium pb-3" style={{ color: '#7500D6' }}>
              Pricing plans
            </div>

            {/* TITLE — force solid text (no gradient/transparent) */}
            <h2 className="noGradientTitle pb-4">
              Flexible plans and features
            </h2>

            {/* PARAGRAPH — force readable gray */}
            <p className="noGradientLead">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
            </p>
          </div>

          {/* Pricing table (leave as-is) */}
          <Pricing />
        </div>
      </div>

      {/* Scoped CSS to override any global gradient/transparent text rules */}
      <style jsx>{`
        /* Neutralize gradient/transparent text coming from global utilities */
        .noGradientTitle,
        .noGradientLead {
          background: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          -webkit-text-fill-color: initial !important;
          text-shadow: none !important;
        }

        /* Title style: match the gray used in your reference (strong slate) */
        .noGradientTitle {
          /* sizes roughly equal to your h2 utility without gradient */
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          font-size: clamp(2rem, 3.2vw + 1rem, 3.25rem);
          color: #1e293b; /* slate-800 */
        }

        /* Paragraph style: same gray tone as the “Why trust us?” screenshot */
        .noGradientLead {
          margin: 0 auto;
          font-size: clamp(1.125rem, 0.6vw + 0.9rem, 1.25rem);
          line-height: 1.6;
          color: #64748b; /* slate-500 */
          max-width: 60ch;
        }
      `}</style>
    </section>
  )
}
