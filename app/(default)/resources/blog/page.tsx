// app/(default)/resources/blog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/blog`
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Blog - Insights, case studies & updates | Build AI Startups',
  description: 'Read about autonomous venture creation, case studies, product updates, and insights from the Build AI Startups team.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Blog - Insights, case studies & updates | Build AI Startups',
    description: 'Case studies, product updates, and insights from Build AI Startups.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups - Blog' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Insights, case studies & updates | Build AI Startups',
    description: 'Case studies, product updates, and insights from Build AI Startups.',
    images: [ogImage],
  },
}

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  minutes: number
  tags: string[]
  featured?: boolean
  image?: string
}

const posts: BlogPost[] = [
  {
    slug: 'introducing-build-ai-startups',
    title: 'Introducing Build AI Startups',
    excerpt: 'From one-sentence intent to live product. We are building the autonomous venture creation platform.',
    date: '2025-01-15',
    minutes: 5,
    tags: ['Announcement', 'Vision'],
    featured: true,
    image: '/media/blog/introducing-build-ai-startups.png',
  },
  {
    slug: 'the-spec-dsl-explained',
    title: 'The Spec DSL Explained',
    excerpt: 'How we turn natural language requirements into structured specifications that drive code generation.',
    date: '2025-02-20',
    minutes: 8,
    tags: ['Technical', 'Spec DSL'],
    image: '/media/blog/spec-dsl-explained.png',
  },
  {
    slug: 'build-score-quality-gates',
    title: 'Build Score and Quality Gates',
    excerpt: 'How we ensure every generated product meets production standards through automated quality checks.',
    date: '2025-03-10',
    minutes: 6,
    tags: ['Quality', 'Automation'],
    image: '/media/blog/build-score-quality-gates.png',
  },
  {
    slug: 'ecosystem-cross-promotions',
    title: 'Ecosystem Cross-Promotions Launch',
    excerpt: 'How startups built on our platform can cross-promote and compound their distribution efforts.',
    date: '2025-04-05',
    minutes: 7,
    tags: ['Ecosystem', 'Growth'],
    image: '/media/blog/ecosystem-cross-promotions.png',
  },
  {
    slug: 'case-study-24h-micro-saas',
    title: 'Case Study: Shipping a Micro-SaaS in 24 Hours',
    excerpt: 'We generated a working analytics product in one day. Here is the spec, repo diff, experiments, and first user feedback.',
    date: '2025-05-12',
    minutes: 9,
    tags: ['Case Study', 'Builder', 'Growth'],
    featured: true,
    image: '/media/blog/case-study-24h-micro-saas.png',
  },
  {
    slug: 'marketplace-beta-launch',
    title: 'Marketplace Beta: List, License, Transfer',
    excerpt: 'The marketplace for AI-generated startups is live. Create diligence packs and transfer ready projects.',
    date: '2025-06-01',
    minutes: 6,
    tags: ['Marketplace', 'Product'],
    image: '/media/blog/marketplace-beta-launch.png',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Blog', item: pageUrl },
  ],
}

export default function BlogPage() {
  const featuredPosts = posts.filter(post => post.featured)
  const recentPosts = posts.filter(post => !post.featured).slice(0, 6)

  return (
    <>
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Blog - insights and case studies</h1>
              <p className="mt-4 text-lg text-slate-300">
                Read about autonomous venture creation, case studies, product updates, and insights from the Build AI Startups team.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#featured" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Read featured posts
                </a>
                <Link href="/resources/changelog" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  View changelog
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Case studies, technical deep dives, product updates</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/blog/blog-hero.png" alt="Blog overview" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Latest insights and case studies</p>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section id="featured" className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Featured</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="group rounded-2xl border border-white/10 bg-slate-900/40 p-6 hover:border-violet-500/30 transition-colors">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 mb-4">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                  <Link href={`/resources/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-slate-500">{post.minutes} min read</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Recent posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-colors">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 mb-3">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                  <Link href={`/resources/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-slate-400 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div>{post.minutes} min</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter signup */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Stay updated</h2>
            <p className="text-slate-300 mb-6">
              Get the latest case studies, product updates, and insights delivered to your inbox.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/contact?subject=Newsletter%20signup" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Subscribe to updates
              </Link>
              <Link href="/resources/changelog" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                View changelog
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Ready to build?</h2>
            <p className="mt-2 text-slate-300">
              Turn your idea into a live product with Build AI Startups.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Start building
              </Link>
              <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                How it works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
