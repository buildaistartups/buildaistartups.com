// app/(default)/customers/single-post/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import CustomerBadge from '@/public/images/customer-badge.svg'
import Particles from '@/components/particles'
import RelatedPosts from './related-posts'

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/customers/single-post`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Customer Story — Build AI Startups',
  description:
    'How teams leverage Build AI Startups to accelerate onboarding and ship better user experiences.',
  alternates: { canonical: CANON },
  openGraph: {
    type: 'article',
    url: CANON,
    title: 'Customer Story — Build AI Startups',
    description:
      'How teams leverage Build AI Startups to accelerate onboarding and ship better user experiences.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Story — Build AI Startups',
    description:
      'How teams leverage Build AI Startups to accelerate onboarding and ship better user experiences.',
    images: [OG],
  },
}

export default function CustomerSingle() {
  return (
    <section className="relative">
      {/* Radial gradient */}
      <div
        className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
        aria-hidden="true"
      >
        <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* Particles animation */}
      <Particles className="absolute inset-0 h-96 -z-10" quantity={15} />

      {/* Illustration */}
      <div
        className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          width={1440}
          height={427}
          alt="Background illustration"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-40 border-b [border-image:linear-gradient(to_right,transparent,var(--color-slate-800),transparent)1]">
          <div className="md:flex md:justify-between">
            {/* Page content */}
            <div className="md:grow pb-12 md:pb-20">
              <div className="max-w-3xl">
                <article className="pb-12 mb-12 border-b [border-image:linear-gradient(to_right,transparent,var(--color-slate-800),transparent)1]">
                  <div className="mb-4">
                    <Link
                      className="inline-flex text-sm font-medium text-purple-500 group"
                      href="/customers"
                    >
                      <span className="tracking-normal group-hover:-translate-x-0.5 transition-transform duration-150 ease-in-out mr-1">
                        &lt;-
                      </span>{' '}
                      Go Back
                    </Link>
                  </div>

                  <header>
                    <h1 className="h2 inline-flex bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                      How Airbnb leverages Build AI Startups to onboard new hosts
                    </h1>
                    <div className="text-sm flex items-center space-x-4 mb-8">
                      <img
                        className="rounded-full"
                        src="../images/customer-avatar-03.jpg"
                        width="32"
                        height="32"
                        alt="Customer avatar"
                      />
                      <div>
                        <div className="text-slate-300 font-medium">Becky Taylor</div>
                        <div className="text-slate-500">Product Marketing Manager</div>
                      </div>
                    </div>
                  </header>

                  {/* Post content */}
                  <div className="prose max-w-none text-slate-400 prose-headings:text-slate-50 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-medium prose-blockquote:pl-5 prose-blockquote:xl:-ml-5 prose-blockquote:border-l-2 prose-blockquote:border-purple-500 prose-blockquote:font-medium prose-blockquote:text-slate-300 prose-blockquote:italic">
                    <p>
                      <a href="#0">Airbnb</a> operates a global marketplace for short- and
                      long-term stays and experiences. Operating in a regulated space means
                      compliance, taxes, and local rules are ever-present. To keep growth
                      healthy, the team optimizes onboarding and governance.
                    </p>
                    <p>
                      Regulations for short-term rentals can include licenses, taxes, and
                      adherence to building and zoning standards. Beyond government rules,
                      many homeowner associations place their own restrictions on hosts.
                    </p>
                    <h2>Why invest in web governance policies?</h2>
                    <p>
                      Brian Chesky, Co-founder and CEO at Airbnb:
                    </p>
                    <p>
                      After years of working with hosts, Airbnb saw that weak governance is
                      a common root cause of operational issues. Without clear policy and
                      ownership, teams experience:
                    </p>
                    <ul>
                      <li>Organic content sprawl and bloated sites</li>
                      <li>Inconsistent quality and messaging</li>
                      <li>
                        UX friction that undermines conversion and support goals
                      </li>
                    </ul>
                    <p>
                      When problems grow acute, large redesigns start — but{' '}
                      <strong>
                        without governance, the same problems eventually return
                      </strong>
                      . Airbnb mitigates this risk by baking governance into its process
                      from strategy through launch and beyond.
                    </p>
                    <h2>Good governance → stronger results</h2>
                    <p>
                      With a strong content and UX governance process, benefits are clear
                      for both Airbnb and its community of hosts. Since 2008, the company
                      has scaled globally and reshaped expectations for hospitality.
                    </p>
                    <blockquote>
                      <p>
                        “Strong governance creates consistency and speed. Pairing that with
                        a reliable build loop lets teams ship confidently, learn faster,
                        and improve onboarding outcomes.”
                      </p>
                    </blockquote>
                    <p>
                      Build AI Startups complements this by providing a predictable build
                      pipeline (spec → repo → UI → copy → docs) and quality gates that keep
                      standards high as teams iterate.
                    </p>
                    <h2>How do you get organization-wide buy-in?</h2>
                    <p>
                      The best time to introduce policy is during a relaunch, when energy
                      is already focused on improving UX. Start governance alongside the
                      strategy kick-off and keep ownership explicit as the product ships.
                    </p>
                  </div>
                </article>

                <RelatedPosts />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="md:w-64 lg:w-80 md:shrink-0 md:pt-[3.75rem] lg:pt-0 pb-12 md:pb-20">
              <div className="sticky top-6 md:pl-6 lg:pl-10">
                <div className="space-y-6">
                  {/* Widget */}
                  <div className="bg-linear-to-tr from-slate-800 to-slate-800/25 rounded-3xl border border-slate-800">
                    <div className="px-5 py-6">
                      <div className="mb-5">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={CustomerBadge}
                            width={64}
                            height={64}
                            alt="Customer badge"
                          />
                          <div className="text-lg font-semibold text-slate-100">
                            Airbnb Inc.
                          </div>
                        </div>
                      </div>
                      <ul className="text-sm">
                        <li className="flex items-center justify-between space-x-2 py-3 border-t [border-image:linear-gradient(to_right,--theme(--color-slate-700/.3),--theme(--color-slate-700),--theme(--color-slate-700/.3))1]">
                          <span className="text-slate-400">Location</span>
                          <span className="text-slate-300 font-medium">
                            San Francisco
                          </span>
                        </li>
                        <li className="flex items-center justify-between space-x-2 py-3 border-t [border-image:linear-gradient(to_right,--theme(--color-slate-700/.3),--theme(--color-slate-700),--theme(--color-slate-700/.3))1]">
                          <span className="text-slate-400">Website</span>
                          <a
                            className="text-purple-500 font-medium flex items-center space-x-1"
                            href="#0"
                          >
                            <span>airbnb.com</span>
                            <svg
                              className="fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              width="9"
                              height="9"
                            >
                              <path d="m1.285 8.514-.909-.915 5.513-5.523H1.663l.01-1.258h6.389v6.394H6.794l.01-4.226z" />
                            </svg>
                          </a>
                        </li>
                        <li className="flex items-center justify-between space-x-2 py-3 border-t [border-image:linear-gradient(to_right,--theme(--color-slate-700/.3),--theme(--color-slate-700),--theme(--color-slate-700/.3))1]">
                          <span className="text-slate-400">Industry</span>
                          <span className="text-slate-300 font-medium">
                            Hospitality
                          </span>
                        </li>
                        <li className="flex items-center justify-between space-x-2 py-3 border-t [border-image:linear-gradient(to_right,--theme(--color-slate-700/.3),--theme(--color-slate-700),--theme(--color-slate-700/.3))1]">
                          <span className="text-slate-400">Product</span>
                          <span className="text-slate-300 font-medium">
                            Build AI Startups
                          </span>
                        </li>
                        <li className="flex items-center justify-between space-x-2 py-3 border-t [border-image:linear-gradient(to_right,--theme(--color-slate-700/.3),--theme(--color-slate-700),--theme(--color-slate-700/.3))1]">
                          <span className="text-slate-400">Impact</span>
                          <span className="text-slate-300 font-medium">
                            +7% new hosts
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
