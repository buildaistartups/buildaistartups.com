// app/api/founder/focus/route.ts
import { NextRequest, NextResponse } from 'next/server'

type FocusData = {
  projectId: string
  week: string // YYYY-WW format
  focus1: string
  focus2: string
  focus3: string
  ts: number
}

// Simple in-memory store - current week focus per project
const FocusStore: Record<string, FocusData> = {}

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

function bad(err: string, code = 400) {
  return ok({ error: err }, code)
}

function getCurrentWeek(): string {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
  const week = Math.ceil((days + start.getDay() + 1) / 7)
  return `${now.getFullYear()}-${week.toString().padStart(2, '0')}`
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return bad('Invalid JSON')
  }

  const { projectId, focus1, focus2, focus3 } = body

  // Validation
  if (!projectId || typeof projectId !== 'string') {
    return bad('projectId is required')
  }
  
  if (!focus1 || typeof focus1 !== 'string' || focus1.trim().length === 0) {
    return bad('focus1 is required')
  }
  
  if (!focus2 || typeof focus2 !== 'string' || focus2.trim().length === 0) {
    return bad('focus2 is required')
  }
  
  if (!focus3 || typeof focus3 !== 'string' || focus3.trim().length === 0) {
    return bad('focus3 is required')
  }

  const week = getCurrentWeek()
  const focus: FocusData = {
    projectId,
    week,
    focus1: focus1.trim(),
    focus2: focus2.trim(),
    focus3: focus3.trim(),
    ts: Date.now()
  }

  // Store current week focus (overwrites if exists)
  const key = `${projectId}-${week}`
  FocusStore[key] = focus

  return ok({ ok: true, stored: focus }, 201)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return bad('projectId query param required')
  }

  const week = getCurrentWeek()
  const key = `${projectId}-${week}`
  const current = FocusStore[key]

  return ok({ 
    current,
    week,
    hasThisWeek: !!current
  })
}
