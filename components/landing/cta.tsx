import Link from 'next/link'

export default function Cta() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-[var(--ls-border)]">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="h2 text-[var(--ls-text)] pb-4"
              data-aos="fade-down"
            >
              Your next startup deserves better than guesswork.
            </h2>
            <p
              className="text-lg text-[var(--ls-text-muted)] mb-8"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Join indie makers who track their startups with evidence, not hope.
              Start with one project — it&apos;s free.
            </p>
            <div data-aos="fade-down" data-aos-delay="400">
              <Link
                className="btn text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] transition duration-150 ease-in-out group shadow-md"
                href="/signup"
              >
                Start Free — No Credit Card{' '}
                <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
