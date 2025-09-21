import { NextRequest, NextResponse } from 'next/server'

// Define types locally
type MiniPlanInput = {
  ideaId: string
  vertical: 'ai-leadgen' | 'ai-support'
  problemStatement: string
  solution: string
  targetUsers: string
  mvpFeatures?: string[]
  launchChannels?: string[]
}

type Forecast = {
  revenueRange: {
    low: number
    high: number
  }
  timeToFirstCustomer: number
  confidenceScore: number
  assumptions: string[]
}

// Constants for better maintainability
const REVENUE_BASE = {
  'ai-leadgen': { low: 1000, high: 5000 },
  'ai-support': { low: 800, high: 4000 }
}

const TIME_TO_CUSTOMER = {
  'ai-leadgen': 30,
  'ai-support': 45
}

export async function POST(req: NextRequest) {
  try {
    const plan: MiniPlanInput = await req.json()

    // Simple validation
    if (!plan.problemStatement || !plan.solution || !plan.targetUsers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate forecast based on plan
    const baseRevenue = REVENUE_BASE[plan.vertical] || REVENUE_BASE['ai-support']
    const baseTime = TIME_TO_CUSTOMER[plan.vertical] || TIME_TO_CUSTOMER['ai-support']
    
    // Factor in MVP features count
    const featureMultiplier = Math.max(0.5, (plan.mvpFeatures?.length || 1) / 3)
    
    // Factor in launch channels
    const channelMultiplier = Math.max(0.7, (plan.launchChannels?.length || 1) / 2)
    
    const forecast: Forecast = {
      revenueRange: {
        low: Math.round(baseRevenue.low * featureMultiplier * channelMultiplier),
        high: Math.round(baseRevenue.high * featureMultiplier * channelMultiplier)
      },
      timeToFirstCustomer: Math.round(baseTime / channelMultiplier),
      confidenceScore: Math.min(95, Math.max(60, 75 + (plan.mvpFeatures?.length || 0) * 5)),
      assumptions: [
        'Market demand exists for the solution',
        'Execution quality meets user expectations',
        'Competition remains manageable',
        'Pricing strategy is validated',
        'Team can deliver on timeline'
      ]
    }

    return NextResponse.json({ forecast })
  } catch (error) {
    console.error('Plan generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    )
  }
}
