import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import Pricing from '@/components/pricing'

export default function PricingSection() {
  return (
    <section className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-lg mx-2 sm:mx-0 mt-8">
      {/* Radial gradient */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2/3 md:w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-200 dark:bg-purple-500 rounded-full blur-[120px] opacity-40 dark:opacity-50" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div>
              <div className="inline-flex font-medium bg-gradient-to-r from-purple-600 via-purple-400 to-purple-200 bg-clip-text text-transparent pb-3">
                Pricing plans
              </div>
            </div>
            <h2 className="h2 text-slate-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60 pb-4">
              Flexible plans and features
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
            </p>
          </div>
          <Pricing />
        </div>
      </div>
    </section>
  )
}
