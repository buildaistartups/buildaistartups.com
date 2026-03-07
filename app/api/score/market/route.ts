// app/api/score/market/route.ts

import { NextRequest, NextResponse } from 'next/server'

type DemandMetrics = {
  projectId: string
  landingViews: number
  signups: number
  ctaClicks: number
  shareCount: number
  period: 'week' | 'month' | 'quarter'
  ts: number
}

type MarketScore = {
  projectId: string
  score: number
  components: {
    pmf: number
    demand: number
    traction: number
  }
  weights: {
    pmf: number
    demand: number
    traction: number
  }
  evidence: {
    pmfScore?: number
    loiCount: number
    waitlistCount: number
    landingCTR?: number
  }
  ts: number
}

// In-memory stores
const MarketScoreStore: Record<string, MarketScore> = {}
const DemandMetricsStore: Record<string, DemandMetrics[]> = {}

// Mock external stores (in a real app, these would be shared)
const PMFScoreStore: Record<string, any> = {}
const LOIStore: Record<string, any[]> = {}
const WaitlistStore: Record<string, any[]> = {}

function calculateMarketScore(projectId: string): MarketScore {
  const weights = { pmf: 0.4, demand: 0.4, traction: 0.2 }
  
  // PMF component (0-100)
  const pmfScore = PMFScoreStore[projectId]?.score || 0
  const pmfComponent = pmfScore
  
  // Demand component (LOIs + waitlist)
  const lois = LOIStore[projectId] || []
  const waitlist = WaitlistStore[projectId] || []
  const totalDemand = lois.length + waitlist.length
  
  // Scale demand: 0-10 entries = 0-100 score (capped at 100)
  const demandComponent = Math.min(100, totalDemand * 10)
  
  // Traction component (basic landing CTR proxy)
  const latestMetrics = DemandMetricsStore[projectId]?.slice(-1)[0]
  let tractionComponent = 0
  if (latestMetrics && latestMetrics.landingViews > 0) {
    const ctr = (latestMetrics.ctaClicks / latestMetrics.landingViews) * 100
    tractionComponent = Math.min(100, ctr * 20) // 5% CTR = 100 score
  }
  
  const score = Math.round(
    pmfComponent * weights.pmf +
    demandComponent * weights.demand +
    tractionComponent * weights.traction
  )

  const marketScore: MarketScore = {
    projectId,
    score,
    components: {
      pmf: Math.round(pmfComponent),
      demand: Math.round(demandComponent),
      traction: Math.round(tractionComponent)
    },
    weights,
    evidence: {
      pmfScore: pmfScore,
      loiCount: lois.length,
      waitlistCount: waitlist.length,
      landingCTR: latestMetrics ? (latestMetrics.ctaClicks / latestMetrics.landingViews) * 100 : undefined
    },
    ts: Date.now()
  }

  MarketScoreStore[projectId] = marketScore
  return marketScore
}

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

  // Force recalculation
  const marketScore = calculateMarketScore(projectId)
  
  return ok({
    score: marketScore.score,
    components: marketScore.components,
    weights: marketScore.weights,
    evidence: marketScore.evidence,
    lastUpdated: marketScore.ts,
    breakdown: {
      pmf: {
        score: marketScore.components.pmf,
        weight: Math.round(marketScore.weights.pmf * 100),
        contribution: Math.round(marketScore.components.pmf * marketScore.weights.pmf)
      },
      demand: {
        score: marketScore.components.demand,
        weight: Math.round(marketScore.weights.demand * 100),
        contribution: Math.round(marketScore.components.demand * marketScore.weights.demand)
      },
      traction: {
        score: marketScore.components.traction,
        weight: Math.round(marketScore.weights.traction * 100),
        contribution: Math.round(marketScore.components.traction * marketScore.weights.traction)
      }
    }
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
  if (!projectId) {
    return bad('projectId is required')
  }

  // Update demand metrics if provided
  if (body.demandMetrics) {
    const { landingViews, signups, ctaClicks, shareCount, period } = body.demandMetrics
    
    if (typeof landingViews !== 'number' || landingViews < 0) {
      return bad('landingViews must be a non-negative number')
    }

    const metrics: DemandMetrics = {
      projectId,
      landingViews,
      signups: Math.max(0, signups || 0),
      ctaClicks: Math.max(0, ctaClicks || 0),
      shareCount: Math.max(0, shareCount || 0),
      period: ['week', 'month', 'quarter'].includes(period) ? period : 'month',
      ts: Date.now()
    }

    // Store metrics
    if (!DemandMetricsStore[projectId]) {
      DemandMetricsStore[projectId] = []
    }
    DemandMetricsStore[projectId].push(metrics)

    // Keep only last 12 entries per project
    if (DemandMetricsStore[projectId].length > 12) {
      DemandMetricsStore[projectId] = DemandMetricsStore[projectId].slice(-12)
    }
  }

  // Recalculate market score
  const marketScore = calculateMarketScore(projectId)
  
  return ok({
    score: marketScore.score,
    components: marketScore.components,
    evidence: marketScore.evidence,
    updated: true,
    ts: marketScore.ts
  })
}
