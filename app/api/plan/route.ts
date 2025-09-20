import { NextRequest, NextResponse } from 'next/server'
import { validateMiniPlan, ajvErrorsToMessage } from '@/lib/validate'
import type { MiniPlanInput, Forecast } from '@/lib/schemas'

function generateForecast(plan: MiniPlanInput): Forecast {
  // Simple forecast logic based on vertical and features
  const baseRevenue = plan.vertical === 'ai-leadgen' ? 5000 : 3000
  const featureMultiplier = plan.mvpFeatures ? plan.mvpFeatures.length * 0.2 : 1
  const channelBoost = plan.launchChannels ? plan.launchChannels.length * 0.15 : 1
  
  const low = Math.floor(baseRevenue * featureMultiplier * channelBoost)
  const high = Math.floor(low * 2.5)
  
  const timeToFirstCustomer = plan.vertical === 'ai-leadgen' ? 14 : 21
  const confidenceScore = 65 + (plan.mvpFeatures?.length || 0) * 5
  
  return {
    revenueRange: { low, high },
    timeToFirstCustomer,
    confidenceScore: Math.min(confidenceScore, 85),
    assumptions: [
      'Market demand remains stable',
      'MVP launches within 30 days',
      'Basic marketing execution',
      'Average conversion rates for vertical'
    ]
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    if (!validateMiniPlan(body)) {
      return NextResponse.json(
        { error: ajvErrorsToMessage(validateMiniPlan.errors) },
        { status: 400 }
      )
    }
    
    const plan = body as MiniPlanInput
    const forecast = generateForecast(plan)
    
    return NextResponse.json({ forecast })
  } catch (error) {
    console.error('Error in /api/plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    )
  }
}
