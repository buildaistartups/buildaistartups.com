// app/api/market/pmf/route.ts

import { NextRequest, NextResponse } from 'next/server'

type PMFSurveyResponse = {
  id: string
  projectId: string
  userId?: string
  responses: {
    disappointment: 'very-disappointed' | 'somewhat-disappointed' | 'not-disappointed'
    primaryBenefit: string
    improvement: string
  }
  ts: number
  meta?: Record<string, unknown>
}

type PMFScore = {
  projectId: string
  score: number
  responses: number
  breakdown: {
    veryDisappointed: number
    somewhatDisappointed: number
    notDisappointed: number
  }
  ts: number
}

// In-memory stores (replace with database later)
const PMFSurveyStore: Record<string, PMFSurveyResponse[]> = {}
const PMFScoreStore: Record<string, PMFScore> = {}

function calculatePMFScore(projectId: string): PMFScore | null {
  const responses = PMFSurveyStore[projectId] || []
  if (responses.length === 0) return null

  const breakdown = {
    veryDisappointed: 0,
    somewhatDisappointed: 0,
    notDisappointed: 0
  }

  responses.forEach(response => {
    switch (response.responses.disappointment) {
      case 'very-disappointed':
        breakdown.veryDisappointed++
        break
      case 'somewhat-disappointed':
        breakdown.somewhatDisappointed++
        break
      case 'not-disappointed':
        breakdown.notDisappointed++
        break
    }
  })

  const score = Math.round((breakdown.veryDisappointed / responses.length) * 100)

  const pmfScore: PMFScore = {
    projectId,
    score,
    responses: responses.length,
    breakdown,
    ts: Date.now()
  }

  PMFScoreStore[projectId] = pmfScore
  return pmfScore
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

  const responses = PMFSurveyStore[projectId] || []
  const pmfScore = calculatePMFScore(projectId)
  
  return ok({
    responses: responses.length,
    pmfScore: pmfScore?.score || null,
    breakdown: pmfScore?.breakdown || null,
    lastUpdated: pmfScore?.ts || null
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

  const { disappointment, primaryBenefit, improvement } = body.responses || {}
  
  // Validate required fields
  if (!disappointment || !primaryBenefit || !improvement) {
    return bad('All survey responses are required: disappointment, primaryBenefit, improvement')
  }

  // Validate disappointment value
  const validDisappointment = ['very-disappointed', 'somewhat-disappointed', 'not-disappointed']
  if (!validDisappointment.includes(disappointment)) {
    return bad('Invalid disappointment value. Must be: very-disappointed, somewhat-disappointed, or not-disappointed')
  }

  const response: PMFSurveyResponse = {
    id: 'pmf_' + Math.random().toString(36).slice(2),
    projectId,
    userId: body.userId,
    responses: {
      disappointment,
      primaryBenefit: primaryBenefit.toString().trim(),
      improvement: improvement.toString().trim()
    },
    ts: Date.now(),
    meta: body.meta || {}
  }

  // Store response
  if (!PMFSurveyStore[projectId]) {
    PMFSurveyStore[projectId] = []
  }
  PMFSurveyStore[projectId].push(response)

  // Recalculate PMF score
  const pmfScore = calculatePMFScore(projectId)

  return ok({
    id: response.id,
    pmfScore: pmfScore?.score || 0,
    responses: PMFSurveyStore[projectId].length,
    breakdown: pmfScore?.breakdown,
    stored: true
  }, 201)
}
