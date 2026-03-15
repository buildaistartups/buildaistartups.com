import Image from 'next/image'
import Link from 'next/link'
import Particles from '@/components/particles'
import Illustration from '@/public/images/glow-bottom.svg'

export default function Hero() {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles */}
        <div style={{ opacity: 'var(--ls-particles-opacity)' }}>
          <Particles className="absolute inset-0 -z-10" />
        </div>

        {/* Glow illustration */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
          style={{ opacity: 'var(--ls-glow-opacity)' }}
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="" />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md">
                <span className="btn-sm py-0.5 text-[var(--ls-text-secondary)] [background:linear-gradient(var(--color-purple-500),var(--color-purple-500))_padding-box,linear-gradient(var(--color-purple-500),var(--color-purple-200)_75%,transparent_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow-sm">
                  <span className="relative inline-flex items-center text-sm text-purple-200">
                    LaunchScore — from idea to revenue, measured
                  </span>
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="h1 text-[var(--ls-text)] pb-4"
              data-aos="fade-down"
            >
              Know if your startup is working.
            </h1>

            {/* Subtext */}
            <p
              className="text-lg text-[var(--ls-text-secondary)] mb-8"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              LaunchScore replaces founder gut-feel with structured evidence.
              Track your AI startup from idea to revenue using a 5-stage journey
              with AI-assisted validation at each stage.
            </p>

            {/* CTAs */}
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <div>
                <Link
                  className="btn text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] w-full transition duration-150 ease-in-out group shadow-md"
                  href="/signup"
                >
                  Start Free{' '}
                  <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  className="btn text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] bg-[var(--ls-bg-alt)]/50 hover:bg-[var(--ls-bg-alt)] border border-[var(--ls-border)] w-full transition duration-150 ease-in-out"
                  href="/pricing"
                >
                  See Pricing
                </Link>
              </div>
            </div>

            {/* Trust line — more visible on dark gradient */}
            <p
              className="text-sm font-medium text-white/80 [html[data-theme=light]_&]:text-[var(--ls-text-muted)] mt-6 drop-shadow-sm"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              Free plan available. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
