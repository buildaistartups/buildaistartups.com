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

          {/* Vision without fake numbers */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 backdrop-blur">
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 text-center">
              Join the AI Revolution
            </h3>
            
            {/* Replace numbers with value propositions */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-bold text-purple-400 mb-2">Launch Fast</h4>
                <p className="text-sm text-slate-400">Go from idea to live product faster than ever before possible</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h4 className="text-xl font-bold text-green-400 mb-2">Scale Smart</h4>
                <p className="text-sm text-slate-400">Built-in tools to grow from zero to revenue efficiently</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h4 className="text-xl font-bold text-blue-400 mb-2">Impact Global</h4>
                <p className="text-sm text-slate-400">Join a community building the future of AI</p>
              </div>
            </div>

            {/* The question */}
            <div className="text-center mb-8">
              <p className="text-2xl md:text-3xl font-semibold text-slate-200">
                Will you be part of the future?
              </p>
              <p className="text-lg text-slate-400 mt-2">
                The tools are ready. The ecosystem is waiting. Your idea deserves to exist.
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
                href="/ecosystem"
                className="btn text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
              >
                Join the Revolution
              </Link>
            </div>
          </div>

          {/* Alternative closing without numbers */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 max-w-2xl mx-auto">
              BuildAIStartups is where ambitious founders, innovative enterprises, and forward-thinking investors come together to build the future. Be among the first to shape this revolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
