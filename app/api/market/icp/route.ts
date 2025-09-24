// app/api/market/icp/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { ICPProfile } from '@/types/market'
import { ICPStore } from '@/lib/stores/marketStore'

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

  const profile = ICPStore[projectId]
  
  return ok({
    profile: profile || null
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
  const persona = (body.persona || '').toString().trim()
  
  if (!projectId || !persona) {
    return bad('projectId and persona are required')
  }

  const profile: ICPProfile = {
    projectId,
    persona,
    jobTitle: body.jobTitle?.toString().trim() || undefined,
    company: body.company?.toString().trim() || undefined,
    pain: body.pain?.toString().trim() || undefined,
    budget: body.budget?.toString().trim() || undefined,
    decisionProcess: body.decisionProcess?.toString().trim() || undefined,
    ts: Date.now()
  }

  // Store profile (overwrites existing)
  ICPStore[projectId] = profile

  return ok({
    profile,
    stored: true
  }, 201)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  
  if (!projectId) {
    return bad('projectId is required')
  }

  if (!ICPStore[projectId]) {
    return bad('ICP profile not found', 404)
  }

  // Delete profile
  delete ICPStore[projectId]
  
  return ok({
    deleted: true,
    projectId
  })
}
