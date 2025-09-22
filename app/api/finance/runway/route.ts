import { NextRequest, NextResponse } from 'next/server';

interface RunwayRequest {
  projectId: string;
  cashBalance: number;
  monthlyBurn: number;
  monthlyRevenue?: number;
}

interface RunwayResponse {
  monthsRemaining: number;
  burnRate: number;
  cashBalance: number;
  projectedRunout: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  recommendations?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RunwayRequest = await request.json();
    const { cashBalance, monthlyBurn, monthlyRevenue = 0 } = body;
    
    // Calculate net burn rate
    const netBurn = monthlyBurn - monthlyRevenue;
    
    // Calculate months of runway
    let monthsRemaining = 0;
    if (netBurn > 0) {
      monthsRemaining = Math.floor(cashBalance / netBurn);
    } else if (netBurn <= 0) {
      // Company is profitable or break-even
      monthsRemaining = 999; // Effectively infinite
    }
    
    // Calculate projected runout date
    const today = new Date();
    const runoutDate = new Date(today);
    if (monthsRemaining < 999) {
      runoutDate.setMonth(runoutDate.getMonth() + monthsRemaining);
    }
    
    // Determine health status
    let healthStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (monthsRemaining < 3) {
      healthStatus = 'critical';
    } else if (monthsRemaining < 6) {
      healthStatus = 'warning';
    } else if (monthsRemaining >= 12 || netBurn <= 0) {
      healthStatus = 'healthy';
    }
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (healthStatus === 'critical') {
      recommendations.push('Immediate fundraising required - runway under 3 months');
      recommendations.push('Consider bridge financing or revenue-based funding');
      recommendations.push('Implement emergency cost reduction measures');
    } else if (healthStatus === 'warning') {
      recommendations.push('Begin fundraising process now - 6 month lead time recommended');
      recommendations.push('Focus on revenue growth to extend runway');
      recommendations.push('Review and optimize largest expense categories');
    } else {
      if (netBurn <= 0) {
        recommendations.push('Congratulations on reaching profitability!');
        recommendations.push('Consider growth investments to accelerate expansion');
      } else {
        recommendations.push('Healthy runway position - focus on growth metrics');
        recommendations.push('Build relationships with investors for future rounds');
      }
    }
    
    const response: RunwayResponse = {
      monthsRemaining: monthsRemaining === 999 ? 100 : monthsRemaining,
      burnRate: netBurn,
      cashBalance,
      projectedRunout: monthsRemaining === 999 
        ? 'Profitable/Infinite' 
        : runoutDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      healthStatus,
      recommendations
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Runway calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate runway' },
      { status: 500 }
    );
  }
}
