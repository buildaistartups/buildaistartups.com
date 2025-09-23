import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for project metadata
export type ProjectMeta = {
  projectId: string
  vertical?: 'ai-leadgen' | 'ai-support' | 'social-commerce' | 'finance-ops' | 'generic'
  stack?: string[] // e.g. ['nextjs','supabase','stripe']
  displayName?: string
  homepage?: string
  logoUrl?: string
  ts?: number
}

// In-memory store - replace with real database in production
const ProjectMetaStore: Record<string, ProjectMeta> = {}

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId') || ''

  if (projectId) {
    const meta = ProjectMetaStore[projectId]
    if (!meta) return ok({ error: 'not_found' }, 404)
    return ok({ meta })
  }

  // List all (public)
  return ok({ items: Object.values(ProjectMetaStore) })
}

export async function POST(req: NextRequest) {
  let body: Partial<ProjectMeta>
  try { 
    body = await req.json() 
  } catch { 
    return ok({ error: 'invalid_json' }, 400) 
  }

  const projectId = (body.projectId || '').toString()
  if (!projectId) return ok({ error: '`projectId` required' }, 400)

  const prev = ProjectMetaStore[projectId] || { projectId }

  const upd: ProjectMeta = {
    ...prev,
    projectId,
    vertical: body.vertical || prev.vertical || 'generic',
    stack: Array.isArray(body.stack) ? body.stack.slice(0, 12) : prev.stack || [],
    displayName: body.displayName || prev.displayName || projectId,
    homepage: body.homepage || prev.homepage,
    logoUrl: body.logoUrl || prev.logoUrl,
    ts: Date.now(),
  }

  ProjectMetaStore[projectId] = upd
  return ok({ meta: upd }, 201)
}
