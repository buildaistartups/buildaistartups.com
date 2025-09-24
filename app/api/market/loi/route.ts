// app/api/market/loi/route.ts

import { NextRequest, NextResponse } from 'next/server'

type LOIEntry = {
  id: string
  projectId: string
  email: string
  company?: string
  useCase?: string
  budget?: string
  timeline?: string
  source?: string
  ts: number
}

type WaitlistEntry = {
  id: string
  projectId: string
  email: string
  referral?: string
  ts: number
}

// In-memory stores (replace with database later)
const LOIStore: Record<string, LOIEntry[]> = {}
const WaitlistStore: Record<string, WaitlistEntry[]> = {}

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

function bad(error: string, status = 400) {
  return ok({ error }, status)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  
  if (!projectId) {
    return bad('projectId is required')
  }

  const lois = LOIStore[projectId] || []
  const waitlist = WaitlistStore[projectId] || []
  
  return ok({
    lois: {
      count: lois.length,
      entries: lois.map(l => ({
        id: l.id,
        company: l.company,
        useCase: l.useCase,
        budget: l.budget,
        timeline: l.timeline,
        ts: l.ts
      }))
    },
    waitlist: {
      count: waitlist.length,
      entries: waitlist.map(w => ({
        id: w.id,
        referral: w.referral,
        ts: w.ts
      }))
    },
    total: lois.length + waitlist.length
  })
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return bad('Invalid JSON')
  }

  const projectId = (body.projectId || '').toString().trim()
  const email = (body.email || '').toString().trim()
  const type = (body.type || 'waitlist').toString().toLowerCase()
  
  if (!projectId || !email) {
    return bad('projectId and email are required')
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return bad('Invalid email format')
  }

  let entry: LOIEntry | WaitlistEntry
  let store: Record<string, any[]>
  let storeKey: string

  if (type === 'loi') {
    // Letter of Intent entry
    entry = {
      id: 'loi_' + Math.random().toString(36).slice(2),
      projectId,
      email,
      company: body.company?.toString().trim(),
      useCase: body.useCase?.toString().trim(),
      budget: body.budget?.toString().trim(),
      timeline: body.timeline?.toString().trim(),
      source: body.source?.toString().trim(),
      ts: Date.now()
    } as LOIEntry

    store = LOIStore
    storeKey = 'LOI'
  } else {
    // Waitlist entry  
    entry = {
      id: 'wait_' + Math.random().toString(36).slice(2),
      projectId,
      email,
      referral: body.referral?.toString().trim(),
      ts: Date.now()
    } as WaitlistEntry

    store = WaitlistStore
    storeKey = 'waitlist'
  }

  // Check for duplicate email
  const existing = store[projectId] || []
  if (existing.some((e: any) => e.email === email)) {
    return bad(`Email already exists in ${storeKey.toLowerCase()}`)
  }

  // Store entry
  if (!store[projectId]) {
    store[projectId] = []
  }
  store[projectId].push(entry)

  const response = {
    id: entry.id,
    type,
    stored: true,
    counts: {
      loi: (LOIStore[projectId] || []).length,
      waitlist: (WaitlistStore[projectId] || []).length
    }
  }

  return ok(response, 201)
}
