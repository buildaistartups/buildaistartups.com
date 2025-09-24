// app/api/founder/checkin/route.ts
import { NextRequest, NextResponse } from 'next/server'

type CheckinData = {
  projectId: string
  energy: number // 1-10 slider
  clarity: number // 1-10 slider  
  momentum: number // 1-10 slider
  blocker?: string // optional text
  ts: number
}

// Simple in-memory store - last 8 checkins per project
const CheckinStore: Record<string, CheckinData[]> = {}

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

function bad(err: string, code = 400) {
  return ok({ error: err }, code)
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return bad('Invalid JSON')
  }

  const { projectId, energy, clarity, momentum, blocker } = body

  // Validation
  if (!projectId || typeof projectId !== 'string') {
    return bad('projectId is required')
  }
  
  if (typeof energy !== 'number' || energy < 1 || energy > 10) {
    return bad('energy must be a number 1-10')
  }
  
  if (typeof clarity !== 'number' || clarity < 1 || clarity > 10) {
    return bad('clarity must be a number 1-10')
  }
  
  if (typeof momentum !== 'number' || momentum < 1 || momentum > 10) {
    return bad('momentum must be a number 1-10')
  }

  const checkin: CheckinData = {
    projectId,
    energy,
    clarity,
    momentum,
    blocker: blocker || undefined,
    ts: Date.now()
  }

  // Store in memory, keep last 8
  const arr = CheckinStore[projectId] || (CheckinStore[projectId] = [])
  arr.push(checkin)
  
  // Keep only last 8 entries
  if (arr.length > 8) {
    arr.splice(0, arr.length - 8)
  }

  return ok({ ok: true, stored: checkin }, 201)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return bad('projectId query param required')
  }

  const checkins = CheckinStore[projectId] || []
  
  // Calculate trends if we have multiple entries
  let trends: { energy?: string; clarity?: string; momentum?: string } = {}
  
  if (checkins.length >= 2) {
    const recent = checkins.slice(-3) // Last 3 checkins
    const older = checkins.slice(-6, -3) // Previous 3 checkins
    
    if (older.length > 0) {
      const recentAvg = {
        energy: recent.reduce((a, b) => a + b.energy, 0) / recent.length,
        clarity: recent.reduce((a, b) => a + b.clarity, 0) / recent.length,
        momentum: recent.reduce((a, b) => a + b.momentum, 0) / recent.length,
      }
      
      const olderAvg = {
        energy: older.reduce((a, b) => a + b.energy, 0) / older.length,
        clarity: older.reduce((a, b) => a + b.clarity, 0) / older.length,
        momentum: older.reduce((a, b) => a + b.momentum, 0) / older.length,
      }
      
      trends = {
        energy: recentAvg.energy > olderAvg.energy + 0.5 ? 'up' : 
                recentAvg.energy < olderAvg.energy - 0.5 ? 'down' : 'stable',
        clarity: recentAvg.clarity > olderAvg.clarity + 0.5 ? 'up' : 
                recentAvg.clarity < olderAvg.clarity - 0.5 ? 'down' : 'stable',
        momentum: recentAvg.momentum > olderAvg.momentum + 0.5 ? 'up' : 
                 recentAvg.momentum < olderAvg.momentum - 0.5 ? 'down' : 'stable',
      }
    }
  }

  return ok({ 
    checkins: checkins.slice(-8), // Last 8 entries
    trends,
    summary: checkins.length > 0 ? {
      latest: checkins[checkins.length - 1],
      avgEnergy: checkins.reduce((a, b) => a + b.energy, 0) / checkins.length,
      avgClarity: checkins.reduce((a, b) => a + b.clarity, 0) / checkins.length,
      avgMomentum: checkins.reduce((a, b) => a + b.momentum, 0) / checkins.length,
    } : null
  })
}
