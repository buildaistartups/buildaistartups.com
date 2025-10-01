// app/(default)/generate/saved/page.tsx
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import SavedDashboard from '@/components/saved-dashboard'

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/generate/saved`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Saved builds — Build AI Startups',
  description:
    'Your saved startup builds, plans, and launch checklists. Review, resume, or ship with Autopilot.',
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: 'Saved builds — Build AI Startups',
    description:
      'Your saved startup builds, plans, and launch checklists. Review, resume, or ship with Autopilot.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saved builds — Build AI Startups',
    description:
      'Your saved startup builds, plans, and launch checklists. Review, resume, or ship with Autopilot.',
    images: [OG],
  },
}

export default async function SavedPage() {
  const session = await getSession()
  if (!session) {
    // Auth gate: bounce to Sign In with a "next" param
    redirect('/signin?next=/generate/saved')
  }

  // Placeholder: no DB yet. You can fetch from your API here later.
  const items: Array<{
    id: string
    name: string
    oneLiner: string
    status: 'draft' | 'planned' | 'deployed'
    stack: string
    updatedAt: string
  }> = []

  return <SavedDashboard items={items} />
}
