// components/home/ClosingPromise.tsx
import Link from 'next/link'

export default function ClosingPromise() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-20 md:py-32">
          {/* Main promise */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-8 max-w-4xl mx-auto">
              This Isn't Just a Platform. It's the Future of How AI Businesses Get Built.
            </h2>
          </div>

          {/* 12-month vision */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 backdrop-blur">
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 text-center">In 12 Months:</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">10,000</div>
                <div className="text-sm text-slate-400">AI businesses will launch here</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">1,000</div>
                <div className="text-sm text-slate-400">will reach $1M ARR</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">100</div>
                <div className="text-sm text-slate-400">will be acquired</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">10</div>
                <div className="text-sm text-slate-400">will become unicorns</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">1</div>
                <div className="text-sm text-slate-400">will change the world</div>
              </div>
            </div>

            {/* Final question */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-semibold text-slate-200 mb-8">
                Will one be yours?
              </p>
            </div>

            {/* Final CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/generate"
                className="btn text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
              >
                Start Your Journey
              </Link>
              <Link
                href="/find-role"
                className="btn text-lg px-8 py-4 bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
              >
                Find Your Role
              </Link>
              <Link
                href="/revolution"
                className="btn text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
              >
                Join the Revolution
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
