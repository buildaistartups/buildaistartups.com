'use client';

import type { Vertical } from '@/lib/verticals';
import Hero from '@/components/utils/hero';
import Features from '@/components/utils/features';
import Features03 from '@/components/utils/features-03';
import Pricing from '@/components/utils/pricing'; // your existing pricing

export default function BuilderVerticalPage({ vertical }: { vertical?: Vertical }) {
  return (
    <>
      <Hero vertical={vertical} />
      <Features vertical={vertical} />
      <Features03 vertical={vertical} />
      <Pricing />
    </>
  );
}
