import { NextRequest, NextResponse } from 'next/server'

type ChecklistProgress = {
  completedCount: number
  totalCount: number
  items: Array<{
    id: string
    done: boolean
    completedAt?: number
  }>
}

type ProductScoreData = {
  projectId: string
  firstDollar?: ChecklistProgress
  firstTen?: ChecklistProgress & { currentUsers: number }
  retention30?: ChecklistProgress & { retentionRate: number }
}

type ProductScore = {
  projectId: string
  score: number
  breakdown: {
    firstDollarScore: number
    firstTenScore: number
    retentionScore: number
  }
  weights: {
    firstDollar: number
    firstTen: number
    retention: number
  }
  meta: {
    totalTasks: number
    completedTasks: number
    completionRate: number
    hasFirstDollar: boolean
    hasReachedTen: boolean
    retentionRate: number
  }
  ts: number
}

// In-memory store (replace with your database)
const ProductScoreStore: Record<string, ProductScore> = {}

function computeProductScore(data: ProductScoreData): ProductScore {
  const weights = {
    firstDollar: 0.4,  // 40% - Most critical milestone
    firstTen: 0.35,    // 35% - Growth validation
    retention: 0.25    // 25% - Sustainability
  }

  // First Dollar Score (0-100)
  const firstDollarProgress = data.firstDollar?.completedCount || 0
  const firstDollarTotal = data.firstDollar?.totalCount || 10
  const firstDollarScore = Math.round((firstDollarProgress / firstDollarTotal) * 100)

  // First Ten Score (0-100) - combines process completion + user count
  const firstTenProgress = data.firstTen?.completedCount || 0
  const firstTenTotal = data.firstTen?.totalCount || 10
  const firstTenUsers = data.firstTen?.currentUsers || 0
  
  const firstTenProcessScore = (firstTenProgress / firstTenTotal) * 50  // 50% for process
  const firstTenUsersScore = Math.min((firstTenUsers / 10) * 50, 50)   // 50% for users
  const firstTenScore = Math.round(firstTenProcessScore + firstTenUsersScore)

  // Retention Score (0-100) - combines process completion + retention rate
  const retentionProgress = data.retention30?.completedCount || 0
  const retentionTotal = data.retention30?.totalCount || 10
  const retentionRate = data.retention30?.retentionRate || 0
  
  const retentionProcessScore = (retentionProgress / retentionTotal) * 40  // 40% for process
  const retentionRateScore = Math.min((retentionRate / 80) * 60, 60)      // 60% for rate (80% = perfect)
  const retentionScoreValue = Math.round(retentionProcessScore + retentionRateScore)

  // Overall weighted score
  const score = Math.round(
    firstDollarScore * weights.firstDollar +
    firstTenScore * weights.firstTen +
    retentionScoreValue * weights.retention
  )

  // Calculate meta information
  const totalTasks = firstDollarTotal + firstTenTotal + retentionTotal
  const completedTasks = firstDollarProgress + firstTenProgress + retentionProgress
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return {
    projectId: data.projectId,
    score,
    breakdown: {
      firstDollarScore,
      firstTenScore,
      retentionScore: retentionScoreValue
    },
    weights,
    meta: {
      totalTasks,
      completedTasks,
      completionRate,
      hasFirstDollar: firstDollarProgress === firstDollarTotal,
      hasReachedTen: firstTenUsers >= 10,
      retentionRate
    },
    ts: Date.now()
  }
}

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { 
    status, 
    headers: { 'Cache-Control': 'no-store' } 
  })
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')?.trim()

  if (!projectId) {
    return bad('projectId is required', 400)
  }

  const score = ProductScoreStore[projectId]
  if (!score) {
    return bad('No product score found for this project', 404)
  }

  return ok(score)
}

export async function POST(req: NextRequest) {
  let data: ProductScoreData
  
  try {
    data = await req.json()
  } catch (error) {
    return bad('Invalid JSON body', 400)
  }

  if (!data.projectId?.trim()) {
    return bad('projectId is required', 400)
  }

  // Validate checklist data structure
  const validateChecklist = (checklist: any, name: string) => {
    if (!checklist) return true // Optional
    if (typeof checklist.completedCount !== 'number' || checklist.completedCount < 0) {
      throw new Error(`${name}.completedCount must be a non-negative number`)
    }
    if (typeof checklist.totalCount !== 'number' || checklist.totalCount <= 0) {
      throw new Error(`${name}.totalCount must be a positive number`)
    }
    if (checklist.completedCount > checklist.totalCount) {
      throw new Error(`${name}.completedCount cannot exceed totalCount`)
    }
    return true
  }

  try {
    validateChecklist(data.firstDollar, 'firstDollar')
    validateChecklist(data.firstTen, 'firstTen')
    validateChecklist(data.retention30, 'retention30')

    // Additional validations for specific fields
    if (data.firstTen?.currentUsers !== undefined) {
      if (typeof data.firstTen.currentUsers !== 'number' || data.firstTen.currentUsers < 0) {
        return bad('firstTen.currentUsers must be a non-negative number', 400)
      }
    }

    if (data.retention30?.retentionRate !== undefined) {
      if (typeof data.retention30.retentionRate !== 'number' || 
          data.retention30.retentionRate < 0 || 
          data.retention30.retentionRate > 100) {
        return bad('retention30.retentionRate must be between 0 and 100', 400)
      }
    }

    const score = computeProductScore(data)
    ProductScoreStore[data.projectId] = score

    return ok(score, 201)
    
  } catch (error) {
    return bad(error instanceof Error ? error.message : 'Invalid data structure', 400)
  }
}

export async function PUT(req: NextRequest) {
  // Same as POST for simplicity - update existing score
  return POST(req)
}

// Helper endpoint to get all scores (for admin/debugging)
export async function OPTIONS(req: NextRequest) {
  const scores = Object.values(ProductScoreStore)
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 50) // Limit to recent 50

  return ok({
    total: Object.keys(ProductScoreStore).length,
    scores
  })
}
