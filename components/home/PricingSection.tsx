// components/home/PricingSection.tsx
'use client'

import Link from 'next/link'

export default function PricingSection() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Simple, One-Time Pricing
            </h2>
            <p className="text-slate-400">No subscriptions. No hidden fees. Just the code you need to start.</p>
          </div>

          {/* Single Focused Pricing Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow effect behind the card */}
              <div className="absolute top-0 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl rounded-xl -z-10" />
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl overflow-hidden relative">
                
                {/* Popular Badge */}
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  PHASE 1 OFFER
                </div>

                <div className="text-center mb-6">
                  <div className="text-lg font-semibold text-slate-200 mb-2">The Builder Pack</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">$49</span>
                    <span className="text-slate-400">/one-time</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 my-6" />

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-3 text-purple-500 fill-current shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span><strong>15-Page PDF Blueprint</strong> (Architecture, DB, API)</span>
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-3 text-purple-500 fill-current shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span><strong>Golden Template Repo</strong> (Next.js 15, Supabase, Tailwind)</span>
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-3 text-purple-500 fill-current shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span><strong>User Persona Analysis</strong> & Market Gap Report</span>
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 mr-3 text-purple-500 fill-current shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span><strong>24-Hour Turnaround</strong></span>
                  </li>
                </ul>

                <div className="text-center">
                  <Link
                    href="https://buy.stripe.com/your-link-here" // Replace with actual Stripe link
                    className="w-full btn bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg"
                  >
                    Get My Spec Now
                  </Link>
                  <p className="mt-3 text-xs text-slate-500">
                    100% Money-back guarantee if the spec isn't helpful.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
