// app/api/generate/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'edge'

type Payload = {
  intent: string
  audience?: string
  niche?: string
  monetization?: string
  mode?: 'autopilot' | 'copilot'
  template?: string
  stack?: string
  integrations?: Record<string, boolean>
}

function toTitle(str: string) {
  const s = (str || 'Nova').replace(/[^a-z0-9\s-]/gi, ' ').trim()
  if (!s) return 'Nova'
  return s
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

function slugify(str: string) {
  return (str || 'nova').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload
    const intent = data?.intent?.trim()
    if (!intent) {
      return NextResponse.json(
        { ok: false, error: 'Missing intent' },
        { status: 400 },
      )
    }

    const name = `${toTitle(intent)}`
    const slug = slugify(name)
    const audience = data.audience || 'Early adopters in your niche'
    const niche = data.niche || 'Micro-SaaS'
    const stack = data.stack || 'Next.js + Supabase'
    const monetization = data.monetization || 'Subscription'
    const template = data.template || 'SaaS App'
    const mode = data.mode === 'autopilot' ? 'Autopilot' : 'Copilot'

    const project = {
      name,
      slug,
      oneLiner: `${template} for ${audience.toLowerCase()}`,
      summary: `HyperNova turns “${intent}” into a production-ready ${template.toLowerCase()} targeting ${audience.toLowerCase()} in ${niche.toLowerCase()}. Mode: ${mode}.`,
      problem:
        'Builders waste weeks stitching boilerplate, infra, pricing, and growth. Most ideas die before users ever see them.',
      solution:
        'A full-loop builder that plans, scaffolds, deploys, prices, and instruments a real product—so you can validate with users immediately.',
      features: [
        'Structured PRD (Spec DSL) with user stories & data model',
        'Repo scaffold with auth, UI shell, emails, and tests',
        'Landing page, pricing page, and docs prewired',
        'Deploy to Vercel with analytics and SEO',
        'Growth experiments: waitlist, onboarding, and A/B slots',
      ],
      stack: `${stack} • Tailwind • Stripe (optional)`,
      monetization: `${monetization} with upgrade path and trials`,
      domainSuggestion: `${slug}-app.com`,
      nextSteps: [
        'Review the PRD and accept suggested scope',
        'Connect GitHub, Vercel, DB, and Stripe',
        'Generate the repo and run first CI',
        'Deploy, seed analytics, and open early access',
        'Iterate with Autopilot or review gates in Copilot mode',
      ],
      links: {
        repo: undefined, // wire after OAuth
        landing: undefined,
      },
    }

    return NextResponse.json({ ok: true, project }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 },
    )
  }
}
