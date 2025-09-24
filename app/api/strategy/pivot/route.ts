import { NextRequest, NextResponse } from 'next/server'

interface PivotRequest {
  projectId: string
  pmfScore: number
  marketSignals: string[]
}

interface PivotSuggestion {
  direction: string
  vertical: string
  reasoning: string
  adjacency: number
  marketSignals: string[]
}

// Trend seeds for pivot suggestions
const TREND_SEEDS = {
  'ai-leadgen': {
    adjacent: ['ai-support', 'finance-ops'],
    signals: ['sales-automation-growth', 'outbound-fatigue', 'personalization-demand'],
    reasoning: 'Lead generation tools benefit from AI personalization and automation trends'
  },
  'ai-support': {
    adjacent: ['ai-leadgen', 'social-commerce'],
    signals: ['customer-service-costs', 'deflection-roi', 'self-service-adoption'],
    reasoning: 'Support automation shows strong ROI and adoption in customer service'
  },
  'social-commerce': {
    adjacent: ['ai-support', 'finance-ops'],
    signals: ['live-shopping-growth', 'social-selling', 'creator-economy'],
    reasoning: 'Social commerce leveraging live shopping and creator monetization trends'
  },
  'finance-ops': {
    adjacent: ['ai-leadgen', 'ai-support'],
    signals: ['fintech-automation', 'compliance-burden', 'cash-flow-management'],
    reasoning: 'Financial operations automation addresses compliance and efficiency needs'
  },
  'generic': {
    adjacent: ['ai-leadgen', 'ai-support'],
    signals: ['ai-adoption-increasing', 'dev-tool-consolidation', 'no-code-expansion'],
    reasoning: 'Generic AI tools can pivot to specific verticals with proven demand'
  }
}

function generatePivotSuggestions(
  currentVertical: string, 
  pmfScore: number, 
  marketSignals: string[]
): PivotSuggestion[] {
  const trendData = TREND_SEEDS[currentVertical as keyof typeof TREND_SEEDS] || TREND_SEEDS.generic
  const suggestions: PivotSuggestion[] = []

  // Generate 2 adjacent pivot suggestions
  trendData.adjacent.slice(0, 2).forEach((vertical, index) => {
    const adjacentData = TREND_SEEDS[vertical as keyof typeof TREND_SEEDS]
    const adjacency = 0.8 - (index * 0.1) // Higher adjacency for first suggestion
    
    suggestions.push({
      direction: `Pivot to ${vertical.replace('-', ' ')} vertical`,
      vertical,
      reasoning: adjacentData.reasoning,
      adjacency,
      marketSignals: adjacentData.signals.slice(0, 2)
    })
  })

  return suggestions
}

export async function POST(request: NextRequest) {
  try {
    const body: PivotRequest = await request.json()
    const { projectId, pmfScore, marketSignals } = body

    // Validate input
    if (!projectId || typeof pmfScore !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request: projectId and pmfScore are required' },
        { status: 400 }
      )
    }

    // Determine current vertical (simplified - in real app, fetch from project data)
    const currentVertical = 'generic' // Would fetch from project metadata

    // Generate pivot suggestions
    const pivots = generatePivotSuggestions(currentVertical, pmfScore, marketSignals)

    // Log evidence (simplified - in real app, write to Evidence Ledger)
    const evidence = {
      type: 'strategy:pivotAnalyzed',
      projectId,
      data: {
        pmfScore,
        marketSignals,
        pivotOptions: pivots.length,
        timestamp: new Date().toISOString()
      }
    }

    console.log('Pivot analysis evidence:', evidence)

    return NextResponse.json({
      success: true,
      pivots,
      analysis: {
        currentPMF: pmfScore,
        gateStatus: pmfScore >= 70 ? 'pass' : pmfScore >= 50 ? 'warn' : 'fail',
        recommendedAction: pmfScore < 50 ? 'Consider pivot' : 'Optimize current direction'
      }
    })

  } catch (error) {
    console.error('Error in pivot analysis:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
