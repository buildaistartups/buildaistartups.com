'use client';

import Image from 'next/image';
import type { Vertical } from '@/lib/verticals';

export default function Features03({ vertical }: { vertical?: Vertical }) {
  const imgResearch = vertical?.flows?.research ?? '/images/product/builder/flow-research-spec.svg';
  const imgGenerate = vertical?.flows?.generate ?? '/images/product/builder/flow-generate-ui.svg';
  const imgDeploy   = vertical?.flows?.deploy   ?? '/images/product/builder/flow-deploy-iterate.svg';

  const steps = [
    { label: 'Research → Spec', src: imgResearch },
    { label: 'Generate UI + Repo', src: imgGenerate },
    { label: 'Deploy → Iterate', src: imgDeploy },
  ];

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h3 className="h3 mb-6">How it works</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.label} className="rounded-2xl p-4 bg-slate-900/60 border border-slate-800">
              <div className="text-sm mb-3 opacity-80">{s.label}</div>
              <Image src={s.src} alt={s.label} width={640} height={360} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
