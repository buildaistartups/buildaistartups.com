// components/utils/perfect-for-stripe.tsx
import Link from 'next/link'
import Highlighter, { HighlighterItem } from '../highlighter'

export default function PerfectForStripe() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Ship these this weekend</h2>
        <p className="mt-2 text-slate-300">Works for any startup. Here are two we see indie makers build often.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Lead Gen Pipeline Card */}
        <div data-aos="fade-up" data-aos-delay="100">
          <Highlighter className="group">
            <HighlighterItem>
              <Link 
                href="/vertical/ai-leadgen" 
                className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden block p-6 transition-all duration-300 hover:bg-slate-900/80"
              >
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6 mb-4">
                  <img 
                    src="/images/product/builder/verticals/ai-leadgen/hero.svg" 
                    alt="Lead generation pipeline from capture to revenue" 
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                  Lead Gen Pipeline
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  Capture → qualify → CRM → drip → pay. Complete revenue pipeline with Stripe checkout ready.
                </p>
                <div className="text-violet-400 text-sm font-medium group-hover:text-violet-300">
                  Generate this pipeline →
                </div>
              </Link>
            </HighlighterItem>
          </Highlighter>
        </div>

        {/* Support Copilot Card */}
        <div data-aos="fade-up" data-aos-delay="200">
          <Highlighter className="group">
            <HighlighterItem>
              <Link 
                href="/vertical/ai-support" 
                className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden block p-6 transition-all duration-300 hover:bg-slate-900/80"
              >
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6 mb-4">
                  <img 
                    src="/images/product/builder/verticals/ai-support/hero.svg" 
                    alt="AI support copilot for ticket deflection" 
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                  Support Copilot
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  Deflect tickets, summarize conversations, escalate safely. Zendesk/Intercom ready.
                </p>
                <div className="text-violet-400 text-sm font-medium group-hover:text-violet-300">
                  Generate this copilot →
                </div>
              </Link>
            </HighlighterItem>
          </Highlighter>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-slate-500">
          Both ship with repo, CI, tests, docs, pricing, and deploy. Your GitHub, your revenue.
        </p>
      </div>
    </section>
  )
}
