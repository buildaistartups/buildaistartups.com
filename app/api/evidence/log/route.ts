// app/api/evidence/log/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { logEvidence, type EvidenceItem } from '@/lib/evidence'

function ok(data: any, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

export async function POST(req: NextRequest) {
  try {
    let body: any
    try {
      body = await req.json()
    } catch {
      return ok({ error: 'Invalid JSON' }, 400)
    }

    // Validate required fields
    const projectId = (body?.projectId || '').toString().trim()
    const type = body?.type
    const title = (body?.title || '').toString().trim()

    if (!projectId) {
      return ok({ error: 'projectId is required' }, 400)
    }

    if (!type || !['validation', 'deploy', 'signup', 'interview', 'presale', 'payment', 'metric', 'ab_test', 'other'].includes(type)) {
      return ok({ error: 'type must be one of: validation, deploy, signup, interview, presale, payment, metric, ab_test, other' }, 400)
    }

    if (!title) {
      return ok({ error: 'title is required' }, 400)
    }

    // Log the evidence
    const evidence = logEvidence({
      projectId,
      type,
      title,
      detail: body?.detail || undefined,
      url: body?.url || undefined,
      data: body?.data || undefined
    })

    return ok({ 
      success: true, 
      evidence: {
        id: evidence.id,
        projectId: evidence.projectId,
        type: evidence.type,
        title: evidence.title,
        ts: evidence.ts
      }
    }, 201)

  } catch (error) {
    console.error('Evidence log error:', error)
    return ok({ error: 'Internal server error' }, 500)
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  const limit = parseInt(searchParams.get('limit') || '50')

  if (!projectId) {
    return ok({ error: 'projectId query parameter is required' }, 400)
  }

  try {
    const { listEvidence } = await import('@/lib/evidence')
    const evidence = listEvidence(projectId, limit)
    
    return ok({ 
      evidence: evidence.map(e => ({
        id: e.id,
        projectId: e.projectId,
        type: e.type,
        title: e.title,
        detail: e.detail,
        url: e.url,
        ts: e.ts
      }))
    })
  } catch (error) {
    console.error('Evidence list error:', error)
    return ok({ error: 'Internal server error' }, 500)
  }
}
