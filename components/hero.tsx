import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom.svg'

export default function Hero() {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 -mx-28 overflow-hidden rounded-b-[3rem]"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 bottom-0 -z-10 -translate-x-1/2">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Hero content */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow / pill */}
            <div className="mb-6" data-aos="fade-down">
              <div className="relative inline-flex before:absolute before:inset-0 before:bg-purple-500 before:blur-md">
                <a
                  className="relative btn-sm py-0.5 text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-purple-500),var(--color-purple-500))_padding-box,linear-gradient(var(--color-purple-500),var(--color-purple-200)_75%,transparent_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/50 shadow-sm"
                  href="/resources/changelog"
                >
                  <span className="relative inline-flex items-center">
                    HyperNova 2.0 is in public beta
                    <span className="ml-1 transition-transform duration-150 ease-in-out text-purple-500 group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="h1 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4"
              data-aos="fade-down"
            >
              Startups that build themselves
            </h1>

            {/* Subcopy */}
            <p
              className="hero-subtext mb-8 text-lg text-slate-300"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Give HyperNova a one-sentence brief. It researches the niche, drafts the spec, scaffolds the repo,
              ships the UI and docs, wires billing/analytics, deploys, and keeps improving from real usage.
              <br className="hidden sm:inline" />
              <span className="text-slate-400">No lock-in — your GitHub, your Vercel, your Stripe.</span>
            </p>

            {/* CTAs */}
            <div
              className="mx-auto max-w-xs space-y-4 sm:inline-flex sm:max-w-none sm:justify-center sm:space-y-0 sm:space-x-4"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <div>
                <a
                  className="cta-primary btn w-full text-slate-900 [background:linear-gradient(white/80,white)_padding-box]"
                  href="/generate"
                >
                  Generate Startup
                  <span className="ml-1 transition-transform duration-150 ease-in-out text-purple-500 group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </a>
              </div>
              <div>
                <a
                  className="btn w-full bg-slate-900/25 text-slate-200 transition duration-150 ease-in-out hover:bg-slate-900/30 hover:text-white"
                  href="/resources/docs"
                >
                  <svg className="mr-3 shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                    <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                  </svg>
                  <span>Read the docs</span>
                </a>
              </div>
            </div>
          </div>
          {/* /Hero content */}
        </div>
      </div>
    </section>
  )
}
