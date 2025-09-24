// app/api/score/growth/route.ts
import { NextRequest, NextResponse } from 'next/server'

// In-memory stores (would be replaced with actual database)
const GrowthScoreStore: Record<string, {
  projectId: string
  score: number
  timestamp: number
  metrics: {
    contentCadence: number
    leadsCount: number
    winRate: number
    channelDiversity: number
  }
}> = {}

// Mock data for pipeline (in real app, would query the pipeline store)
const mockPipelineData: Record<string, any> = {}

function ok(data: any, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}

function bad(err: string, code = 400) { 
  return NextResponse.json({ error: err }, { status: code }) 
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

async function fetchPipelineData(projectId: string) {
  try {
    // In real implementation, would fetch from pipeline API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/growth/pipeline?projectId=${encodeURIComponent(projectId)}`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch pipeline data:', error)
  }
  
  return { entries: [], stats: {} }
}

function calculateGrowthScore(projectId: string, pipelineData: any): {
  score: number
  metrics: {
    contentCadence: number
    leadsCount: number
    winRate: number
    channelDiversity: number
  }
} {
  const { entries = [], stats = {} } = pipelineData
  
  // Content Cadence Score (0-30 points)
  // Based on assumed content velocity - in real app would track actual content creation
  const contentCadence = clamp(20, 0, 30) // Placeholder - would calculate from calendar completion
  
  // Leads Count Score (0-25 points)
  const totalLeads = stats.total || 0
  const leadsCount = clamp(Math.min(totalLeads * 2.5, 25), 0, 25) // 10 leads = max score
  
  // Win Rate Score (0-25 points)
  const actualWinRate = stats.winRate || 0
  const winRate = clamp(actualWinRate * 0.25, 0, 25) // 100% win rate = max score
  
  // Channel Diversity Score (0-20 points)
  // Would track from calendar/content creation - placeholder for now
  const channelDiversity = clamp(15, 0, 20) // Placeholder
  
  const totalScore = Math.round(contentCadence + leadsCount + winRate + channelDiversity)
  
  return {
    score: totalScore,
    metrics: {
      contentCadence,
      leadsCount,
      winRate,
      channelDiversity
    }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  
  if (!projectId) {
    return bad('projectId is required')
  }
  
  // Check if we have a cached score
  const cached = GrowthScoreStore[projectId]
  const now = Date.now()
  const cacheExpiry = 5 * 60 * 1000 // 5 minutes
  
  if (cached && (now - cached.timestamp) < cacheExpiry) {
    return ok(cached)
  }
  
  // Fetch fresh pipeline data and calculate score
  const pipelineData = await fetchPipelineData(projectId)
  const calculated = calculateGrowthScore(projectId, pipelineData)
  
  const scoreData = {
    projectId,
    timestamp: now,
    ...calculated
  }
  
  // Cache the result
  GrowthScoreStore[projectId] = scoreData
  
  return ok(scoreData)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    if (!body.projectId) {
      return bad('projectId is required')
    }
    
    const projectId = body.projectId
    
    // Manual override or trigger recalculation
    if (body.recalculate) {
      const pipelineData = await fetchPipelineData(projectId)
      const calculated = calculateGrowthScore(projectId, pipelineData)
      
      const scoreData = {
        projectId,
        timestamp: Date.now(),
        ...calculated
      }
      
      GrowthScoreStore[projectId] = scoreData
      
      return ok(scoreData)
    }
    
    // Manual score update (for testing/admin purposes)
    if (body.score !== undefined) {
      const scoreData = {
        projectId,
        score: clamp(Number(body.score)),
        timestamp: Date.now(),
        metrics: body.metrics || {
          contentCadence: 0,
          leadsCount: 0,
          winRate: 0,
          channelDiversity: 0
        }
      }
      
      GrowthScoreStore[projectId] = scoreData
      
      return ok(scoreData)
    }
    
    return bad('Either recalculate=true or score value is required')
    
  } catch (error) {
    return bad('Invalid JSON or server error', 500)
  }
}

// Webhook endpoint for pipeline updates to trigger score recalculation
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    
    if (!body.projectId) {
      return bad('projectId is required')
    }
    
    // This would be called when pipeline entries are added/updated
    const pipelineData = await fetchPipelineData(body.projectId)
    const calculated = calculateGrowthScore(body.projectId, pipelineData)
    
    const scoreData = {
      projectId: body.projectId,
      timestamp: Date.now(),
      ...calculated
    }
    
    GrowthScoreStore[body.projectId] = scoreData
    
    return ok(scoreData)
    
  } catch (error) {
    return bad('Invalid JSON or server error', 500)
  }
}
