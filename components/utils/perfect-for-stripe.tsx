import Link from 'next/link';

export default function PerfectForStripe() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Who it’s perfect for</h3>
            <p className="text-slate-400 text-sm">Works for any startup. Popular solutions below.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/vertical/ai-leadgen" className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 hover:border-slate-700">
              <div className="font-semibold mb-1">Lead Gen Pipeline</div>
              <div className="text-slate-400 text-sm">Launch a capture → score → CRM flow fast.</div>
            </Link>
            <Link href="/vertical/ai-support" className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 hover:border-slate-700">
              <div className="font-semibold mb-1">Support Copilot</div>
              <div className="text-slate-400 text-sm">Deflect tickets and summarize conversations.</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
