// lib/changelog.ts
export type SectionKey = 'added' | 'improved' | 'fixed' | 'security' | 'deprecated'

export type Release = {
  id: string
  version: string
  date: string // ISO
  summary: string
  theme: 'Builder' | 'Ecosystem' | 'Marketplace' | 'API' | 'Docs' | 'Integrity'
  sections: Partial<Record<SectionKey, string[]>>
  links?: { label: string; href: string }[]
}

// Prefer setting NEXT_PUBLIC_SITE_URL in Vercel > Settings > Environment Variables
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'

export const releases: Release[] = [
  {
    id: '2025-08-12-gold-templates',
    version: 'v0.3.0',
    date: '2025-08-12',
    summary:
      'Gold Templates for SaaS & API, Build Score v1, and cross-promotions across the ecosystem.',
    theme: 'Builder',
    sections: {
      added: [
        '🚀 **Gold Templates**: SaaS Starter (auth, teams, Stripe, analytics) & API Starter (keys, rate limits, docs).',
        '🧪 **Build Score v1**: composite from lint/types, tests, security, performance, and licenses to gate Autopilot.',
        '🔗 **Ecosystem cross-promos**: opt-in partner surfaces and shared launch feeds.',
      ],
      improved: [
        'Spec DSL presets for pricing and onboarding experiments.',
        'Faster repo generation (-23%) and clearer PR descriptions.',
      ],
      fixed: [
        'Resolved flaky Lighthouse budget check on Vercel preview URLs.',
        'Corrected license scanner allowing Apache-2.0 sub-packages.',
      ],
    },
    links: [
      { label: 'Docs: Builder', href: '/product/builder' },
      { label: 'Docs: Concepts', href: '/resources/docs#concepts' },
    ],
  },
  {
    id: '2025-07-22-api-webhooks-preview',
    version: 'v0.2.2',
    date: '2025-07-22',
    summary:
      'API & webhooks preview, Templates hub, and Marketplace diligence pack scaffolds.',
    theme: 'API',
    sections: {
      added: [
        '🔌 **API preview**: `/api/v1/ideas`, `/builds`, `/experiments`, `/marketplace/listings`.',
        '📬 **Webhooks**: `build.completed`, `build.failed`, `experiment.won`, `marketplace.listed`.',
        '📦 **Templates hub** at `/resources/templates` with 10 starters.',
      ],
      improved: [
        'Clear error types for rate-limit and validation failures.',
        'Webhook signature docs and Node verifier helper.',
      ],
      fixed: ['Handled empty `constraints` map in idea generation endpoint.'],
    },
    links: [
      { label: 'API page', href: '/product/api' },
      { label: 'Templates', href: '/resources/templates' },
    ],
  },
  {
    id: '2025-07-02-docs-and-DSL',
    version: 'v0.2.0',
    date: '2025-07-02',
    summary:
      'Docs hub, Spec DSL structure, and first Marketplace readiness checklist.',
    theme: 'Docs',
    sections: {
      added: [
        '📚 **Docs hub** (`/resources/docs`) with Quick Start, Concepts, API overview, Webhooks, and Security.',
        '🧩 **Spec DSL**: ICP, UX outline, data model, pricing, integrations, and quality gates.',
        '✅ **Marketplace readiness**: preview transfer checklist (domain, billing, analytics, licensing).',
      ],
      improved: ['Cleaner hero copy across product pages and broader examples in Quick Start.'],
      fixed: ['Anchor nav offsets on smaller screens.'],
    },
    links: [
      { label: 'Docs home', href: '/resources/docs' },
      { label: 'Marketplace', href: '/product/marketplace' },
    ],
  },
  {
    id: '2025-06-11-alpha',
    version: 'v0.1.0',
    date: '2025-06-11',
    summary: 'Public alpha: end-to-end build loop from intent → repo → deploy.',
    theme: 'Integrity',
    sections: {
      added: [
        '🎉 **Alpha**: Copilot and Autopilot modes, preview deploys, analytics wiring.',
        '🧰 **Quality gates**: lint/types, tests, security scan, Lighthouse budgets, license checks.',
      ],
      security: ['Secret scrubbing in logs and short-lived tokens for integrations.'],
    },
    links: [{ label: 'About', href: '/about' }],
  },
]

export const themeChip: Record<Release['theme'], string> = {
  Builder: 'from-violet-500 to-fuchsia-500',
  Ecosystem: 'from-teal-400 to-emerald-500',
  Marketplace: 'from-amber-400 to-orange-500',
  API: 'from-sky-400 to-indigo-500',
  Docs: 'from-cyan-400 to-blue-500',
  Integrity: 'from-rose-400 to-red-500',
}

export const sectionTitle: Record<SectionKey, string> = {
  added: 'NEW',
  improved: 'IMPROVED',
  fixed: 'FIXED',
  security: 'SECURITY',
  deprecated: 'DEPRECATED',
}

export function allReleases(): Release[] {
  return [...releases].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getRelease(id: string) {
  return releases.find((r) => r.id === id)
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
