'use client';

import Image from 'next/image';
import type { Vertical } from '@/lib/verticals';

type Props = { vertical?: Vertical };

export default function Hero({ vertical }: Props) {
  const title = vertical?.title ?? 'From brief to repo in minutes';
  const tagline = vertical?.tagline ?? 'Generate, deploy, and grow AI startups from a sentence.';
  const heroImg = vertical?.heroImg ?? '/images/product/builder/hero.svg';

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="max-w-3xl">
            <h1 className="h1">{title}</h1>
            <p className="text-xl text-slate-300 mt-4">{tagline}</p>
            {vertical?.ctaHref && (
              <div className="mt-6">
                <a href={vertical.ctaHref} className="btn btn-primary">Start with this template</a>
              </div>
            )}
          </div>
          <div className="mt-10">
            <Image src={heroImg} alt="Builder hero" width={1200} height={680} priority />
          </div>
        </div>
      </div>
    </section>
  );
}
