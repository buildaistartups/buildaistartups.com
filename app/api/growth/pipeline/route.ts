// app/api/growth/pipeline/route.ts
import { NextRequest, NextResponse } from 'next/server'

export interface PipelineEntry {
  id: string
  projectId: string
  name: string
  email?: string
  company?: string
  stage: 'lead' | 'trial' | 'paid'
  source: string
  value: number
  probability: number
  notes?: string
  createdAt: number
  updatedAt: number
  stageHistory: Array<{
    stage: 'lead' | 'trial' | 'paid'
    timestamp: number
    notes?: string
  }>
}

// In-memory store (replace with actual database in production)
const PipelineStore: Record<string, PipelineEntry> = {}

function ok(data: any, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}

function bad(err: string, code = 400) { 
  return NextResponse.json({ error: err }, { status: code }) 
}

function generateId(): string {
  return `pl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  const stage = searchParams.get('stage') as 'lead' | 'trial' | 'paid' | null
  
  if (!projectId) {
    return bad('projectId is required')
  }
  
  let entries = Object.values(PipelineStore).filter(entry => entry.projectId === projectId)
  
  if (stage) {
    entries = entries.filter(entry => entry.stage === stage)
  }
  
  // Sort by updated date, newest first
  entries.sort((a, b) => b.updatedAt - a.updatedAt)
  
  // Calculate pipeline stats
  const stats = {
    total: entries.length,
    byStage: {
      lead: entries.filter(e => e.stage === 'lead').length,
      trial: entries.filter(e => e.stage === 'trial').length,
      paid: entries.filter(e => e.stage === 'paid').length
    },
    totalValue: entries.reduce((sum, e) => sum + (e.value * e.probability / 100), 0),
    winRate: entries.length > 0 ? (entries.filter(e => e.stage === 'paid').length / entries.length) * 100 : 0,
    avgDeal: entries.length > 0 ? entries.reduce((sum, e) => sum + e.value, 0) / entries.length : 0
  }
  
  return ok({ entries, stats })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    if (!body.projectId) {
      return bad('projectId is required')
    }
    
    if (!body.name) {
      return bad('name is required')
    }
    
    if (!body.stage || !['lead', 'trial', 'paid'].includes(body.stage)) {
      return bad('stage must be lead, trial, or paid')
    }
    
    const now = Date.now()
    const id = generateId()
    
    const entry: PipelineEntry = {
      id,
      projectId: body.projectId,
      name: body.name,
      email: body.email,
      company: body.company,
      stage: body.stage,
      source: body.source || 'manual',
      value: Math.max(0, Number(body.value) || 0),
      probability: Math.max(0, Math.min(100, Number(body.probability) || 50)),
      notes: body.notes,
      createdAt: now,
      updatedAt: now,
      stageHistory: [{
        stage: body.stage,
        timestamp: now,
        notes: `Created as ${body.stage}`
      }]
    }
    
    PipelineStore[id] = entry
    
    return ok(entry, 201)
    
  } catch (error) {
    return bad('Invalid JSON or server error', 500)
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    
    if (!body.id) {
      return bad('id is required')
    }
    
    const existing = PipelineStore[body.id]
    if (!existing) {
      return bad('Entry not found', 404)
    }
    
    const now = Date.now()
    const updates: Partial<PipelineEntry> = {
      updatedAt: now
    }
    
    // Update allowed fields
    if (body.name) updates.name = body.name
    if (body.email !== undefined) updates.email = body.email
    if (body.company !== undefined) updates.company = body.company
    if (body.source) updates.source = body.source
    if (body.value !== undefined) updates.value = Math.max(0, Number(body.value))
    if (body.probability !== undefined) updates.probability = Math.max(0, Math.min(100, Number(body.probability)))
    if (body.notes !== undefined) updates.notes = body.notes
    
    // Handle stage change
    if (body.stage && body.stage !== existing.stage && ['lead', 'trial', 'paid'].includes(body.stage)) {
      updates.stage = body.stage
      updates.stageHistory = [
        ...existing.stageHistory,
        {
          stage: body.stage,
          timestamp: now,
          notes: body.stageNotes || `Moved to ${body.stage}`
        }
      ]
    }
    
    const updated = { ...existing, ...updates }
    PipelineStore[body.id] = updated
    
    return ok(updated)
    
  } catch (error) {
    return bad('Invalid JSON or server error', 500)
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return bad('id is required')
  }
  
  if (!PipelineStore[id]) {
    return bad('Entry not found', 404)
  }
  
  delete PipelineStore[id]
  
  return ok({ success: true, id })
}
