// app/api/leaderboard/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAllBuildScores } from '@/lib/buildScore'
import { getAllEvidence } from '@/lib/evidence'

function ok(data: any, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

// Project metadata store (could be moved to separate module)
const ProjectMetaStore: Record<string, {
  projectId: string
  vertical?: 'ai-leadgen' | 'ai-support' | 'social-commerce' | 'finance-ops' | 'generic'
  stack?: string[]
  displayName?: string
  homepage?: string
  logoUrl?: string
}> = {}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const vertical = searchParams.get('vertical')
    const stack = searchParams.get('stack')?.toLowerCase()
    const limit = parseInt(searchParams.get('limit') || '200')

    // Get all build scores
    const buildScores = getAllBuildScores()
    
    // Get all evidence to check for recent evals and finance readiness
    const allEvidence = getAllEvidence()
    
    // Process and enrich the data
    const items = buildScores.map(score => {
      const meta = ProjectMetaStore[score.projectId] || {
        projectId: score.projectId,
        vertical: 'generic',
        stack: [],
        displayName: score.projectId
      }
      
      const evidence = allEvidence[score.projectId] || []
      const now = Date.now()
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
      
      // Check for recent AI evals
      const recentEvals = evidence.filter(e => 
        e.type === 'metric' && 
        e.data?.evalType === 'ai' && 
        (now - e.ts) <= THIRTY_DAYS
      )
      const hasRecentEval = recentEvals.length > 0 && 
        recentEvals.some(e => e.data?.pass === true)
      
      // Check finance readiness (recent financial metrics)
      const recentFinance = evidence.filter(e => 
        (e.type === 'payment' || e.type === 'presale' || 
         (e.type === 'metric' && e.data?.category === 'finance')) &&
        (now - e.ts) <= THIRTY_DAYS
      )
      const financeReadiness = recentFinance.length > 0
      
      return {
        projectId: score.projectId,
        displayName: meta.displayName || score.projectId,
        score: score.score,
        parts: score.parts,
        updatedAt: score.updatedAt,
        commit: score.commit,
        vertical: meta.vertical || 'generic',
        stack: meta.stack || [],
        homepage: meta.homepage,
        logoUrl: meta.logoUrl,
        flags: {
          hasRecentEval,
          financeReadiness
        }
      }
    })
    
    // Apply filters
    const filtered = items
      .filter(item => vertical ? item.vertical === vertical : true)
      .filter(item => stack ? item.stack.some(s => s.toLowerCase().includes(stack)) : true)
      .slice(0, limit)
    
    // Generate facets for filtering
    const facets = {
      verticals: [...new Set(items.map(i => i.vertical))].sort(),
      stacks: [...new Set(items.flatMap(i => i.stack))].sort()
    }
    
    return ok({
      items: filtered,
      facets,
      total: filtered.length,
      query: { vertical, stack, limit }
    })

  } catch (error) {
    console.error('Leaderboard error:', error)
    return ok({ error: 'Internal server error' }, 500)
  }
}

// Allow projects to register their metadata
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const projectId = (body?.projectId || '').toString().trim()
    
    if (!projectId) {
      return ok({ error: 'projectId is required' }, 400)
    }
    
    // Update metadata
    ProjectMetaStore[projectId] = {
      projectId,
      vertical: body.vertical || 'generic',
      stack: Array.isArray(body.stack) ? body.stack : [],
      displayName: body.displayName || projectId,
      homepage: body.homepage,
      logoUrl: body.logoUrl
    }
    
    return ok({ success: true, meta: ProjectMetaStore[projectId] })
    
  } catch (error) {
    console.error('Leaderboard metadata error:', error)
    return ok({ error: 'Internal server error' }, 500)
  }
}
