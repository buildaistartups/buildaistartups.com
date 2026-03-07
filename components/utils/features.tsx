'use client';

import type { Vertical } from '@/lib/verticals';

export default function Features({ vertical }: { vertical?: Vertical }) {
  const bullets = vertical?.bullets ?? [
    'Spec Studio: turn intent into a spec',
    'Repo Forge: code + tests + docs',
    'UI Workshop: production UI scaffolds',
  ];

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-3xl">
          <h2 className="h2">Everything you need to ship</h2>
          <p className="text-slate-300 mt-3">
            Research, generate, deploy, then learn and iterate with Autopilot.
          </p>
        </header>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {bullets.map((b) => (
            <li key={b} className="rounded-2xl p-5 bg-slate-900/60 border border-slate-800">{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
