// app/api/market/competitors/route.ts

import { NextRequest, NextResponse } from 'next/server'

type Competitor = {
  id: string
  projectId: string
  name: string
  url?: string
  pricing?: string
  position?: string
  strengths?: string[]
  weaknesses?: string[]
  marketShare?: 'dominant' | 'significant' | 'niche' | 'emerging'
  ts: number
}

// In-memory store (replace with database later)
const CompetitorStore: Record<string, Competitor[]> = {}

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

  const competitors = CompetitorStore[projectId] || []
  
  return ok({
    competitors: competitors.map(c => ({
      id: c.id,
      name: c.name,
      url: c.url,
      pricing: c.pricing,
      position: c.position,
      strengths: c.strengths,
      weaknesses: c.weaknesses,
      marketShare: c.marketShare,
      ts: c.ts
    })),
    count: competitors.length
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
  const name = (body.name || '').toString().trim()
  
  if (!projectId || !name) {
    return bad('projectId and name are required')
  }

  // Check for duplicate name within project
  const existing = CompetitorStore[projectId] || []
  if (existing.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    return bad('Competitor with this name already exists')
  }

  const validMarketShares = ['dominant', 'significant', 'niche', 'emerging']
  const marketShare = validMarketShares.includes(body.marketShare) ? body.marketShare : 'niche'

  const competitor: Competitor = {
    id: 'comp_' + Math.random().toString(36).slice(2),
    projectId,
    name,
    url: body.url?.toString().trim() || undefined,
    pricing: body.pricing?.toString().trim() || undefined,
    position: body.position?.toString().trim() || undefined,
    strengths: Array.isArray(body.strengths) ? body.strengths.filter(Boolean) : [],
    weaknesses: Array.isArray(body.weaknesses) ? body.weaknesses.filter(Boolean) : [],
    marketShare: marketShare as Competitor['marketShare'],
    ts: Date.now()
  }

  // Store competitor
  if (!CompetitorStore[projectId]) {
    CompetitorStore[projectId] = []
  }
  CompetitorStore[projectId].push(competitor)

  return ok({
    id: competitor.id,
    stored: true,
    count: CompetitorStore[projectId].length
  }, 201)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  const competitorId = searchParams.get('competitorId')
  
  if (!projectId || !competitorId) {
    return bad('projectId and competitorId are required')
  }

  const competitors = CompetitorStore[projectId] || []
  const index = competitors.findIndex(c => c.id === competitorId)
  
  if (index === -1) {
    return bad('Competitor not found', 404)
  }

  // Remove competitor
  competitors.splice(index, 1)
  
  return ok({
    deleted: true,
    id: competitorId,
    count: competitors.length
  })
}
