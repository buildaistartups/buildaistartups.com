// modules.config.ts — The Switch Panel
// Enable/disable modules to progressively reveal platform features.
// The header, footer, landing page, and middleware all read this config.

export type ModuleConfig = {
  enabled: boolean
  name: string
  description: string
  routes: string[]
  navItems: { label: string; href: string; parent?: string; desc?: string }[]
  phase: number
}

export const modules: Record<string, ModuleConfig> = {
  // ── Phase 1: LaunchScore (the MVP) ──
  launchscore: {
    enabled: false, // Will flip to true when the product is built
    name: 'LaunchScore',
    description: 'AI startup validation & growth tracker',
    routes: ['/app'],
    navItems: [
      { label: 'Dashboard', href: '/app/dashboard' },
      { label: 'Templates', href: '/app/templates' },
    ],
    phase: 1,
  },

  // ── Phase 2: Builder ──
  builder: {
    enabled: false,
    name: 'Builder',
    description: 'From brief to repo in minutes',
    routes: ['/product/builder', '/generate'],
    navItems: [
      { label: 'Builder', href: '/product/builder', parent: 'Product', desc: 'From brief to repo in minutes' },
    ],
    phase: 2,
  },

  // ── Phase 3: Ecosystem ──
  ecosystem: {
    enabled: false,
    name: 'Ecosystem',
    description: 'Startups that help each other grow',
    routes: ['/product/ecosystem'],
    navItems: [
      { label: 'Ecosystem', href: '/product/ecosystem', parent: 'Product', desc: 'Startups that help each other grow' },
    ],
    phase: 3,
  },

  // ── Phase 4: Marketplace ──
  marketplace: {
    enabled: false,
    name: 'Marketplace',
    description: 'Buy and sell AI ventures',
    routes: ['/product/marketplace'],
    navItems: [
      { label: 'Marketplace', href: '/product/marketplace', parent: 'Product', desc: 'Buy and sell AI ventures' },
    ],
    phase: 4,
  },

  // ── Phase 5: API Platform ──
  apiPlatform: {
    enabled: false,
    name: 'API',
    description: 'Programmatic access to the platform',
    routes: ['/product/api'],
    navItems: [
      { label: 'API', href: '/product/api', parent: 'Product', desc: 'Programmatic access' },
    ],
    phase: 5,
  },

  // ── Content modules (can enable anytime) ──
  blog: {
    enabled: false,
    name: 'Blog',
    description: 'Build-in-public updates',
    routes: ['/blog'],
    navItems: [
      { label: 'Blog', href: '/blog', parent: 'Resources' },
    ],
    phase: 2,
  },

  docs: {
    enabled: false,
    name: 'Docs',
    description: 'Documentation hub',
    routes: ['/docs'],
    navItems: [
      { label: 'Docs', href: '/docs', parent: 'Resources' },
    ],
    phase: 2,
  },
} as const

// Helper: get all enabled modules
export function getEnabledModules() {
  return Object.entries(modules).filter(([, m]) => m.enabled)
}

// Helper: get nav items grouped by parent
export function getNavItems() {
  const items = Object.values(modules)
    .filter(m => m.enabled)
    .flatMap(m => m.navItems)

  const grouped: Record<string, typeof items> = {}
  const topLevel: typeof items = []

  for (const item of items) {
    if (item.parent) {
      if (!grouped[item.parent]) grouped[item.parent] = []
      grouped[item.parent].push(item)
    } else {
      topLevel.push(item)
    }
  }

  return { topLevel, grouped }
}

// Helper: check if a route belongs to a disabled module
export function isRouteDisabled(pathname: string): boolean {
  return Object.values(modules)
    .filter(m => !m.enabled)
    .some(m => m.routes.some(r => pathname.startsWith(r)))
}
