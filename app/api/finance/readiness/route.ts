import { NextRequest, NextResponse } from 'next/server';

interface ReadinessRequest {
  projectId: string;
  bassData?: any;
  financials: {
    cash: number;
    burn: number;
    revenue: number;
  };
}

interface ReadinessResponse {
  score: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  breakdown: {
    financial: number;
    operational: number;
    market: number;
    team: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ReadinessRequest = await request.json();
    const { bassData, financials } = body;
    
    const strengths: string[] = [];
    const gaps: string[] = [];
    const recommendations: string[] = [];
    
    // Calculate sub-scores
    let financialScore = 0;
    let operationalScore = 0;
    let marketScore = 0;
    let teamScore = 0;
    
    // Financial Health Assessment (0-100)
    const netBurn = financials.burn - financials.revenue;
    const runway = financials.cash / (netBurn > 0 ? netBurn : 1);
    
    if (runway >= 12) {
      financialScore += 40;
      strengths.push('Strong cash runway (12+ months)');
    } else if (runway >= 6) {
      financialScore += 25;
      strengths.push('Adequate runway (6-12 months)');
    } else {
      financialScore += 10;
      gaps.push('Limited runway (under 6 months)');
      recommendations.push('Prioritize fundraising or revenue growth to extend runway');
    }
    
    if (financials.revenue > 0) {
      financialScore += 20;
      strengths.push('Revenue generating');
      
      const burnMultiple = financials.burn / financials.revenue;
      if (burnMultiple <= 2) {
        financialScore += 20;
        strengths.push('Efficient burn multiple');
      } else if (burnMultiple <= 5) {
        financialScore += 10;
      }
    } else {
      gaps.push('Pre-revenue stage');
      recommendations.push('Develop revenue generation strategy and timeline');
    }
    
    // Cap scores
    if (bassData?.finance?.cap) {
      financialScore += 10;
      strengths.push('Valuation cap established');
    }
    
    if (bassData?.finance?.raised && parseInt(bassData.finance.raised) > 0) {
      financialScore += 10;
      strengths.push('Previous funding secured');
    }
    
    // Operational Assessment
    if (bassData?.metrics?.users) {
      operationalScore += 25;
      strengths.push('Active user base');
    } else {
      gaps.push('No user metrics tracked');
    }
    
    if (bassData?.metrics?.growth_rate) {
      const growth = parseFloat(bassData.metrics.growth_rate);
      if (growth > 20) {
        operationalScore += 35;
        strengths.push('Strong growth rate (>20% MoM)');
      } else if (growth > 10) {
        operationalScore += 25;
        strengths.push('Solid growth rate (10-20% MoM)');
      } else {
        operationalScore += 15;
      }
    }
    
    if (bassData?.kpis?.length > 0) {
      operationalScore += 20;
      strengths.push('KPIs defined and tracked');
    } else {
      gaps.push('No KPIs defined');
      recommendations.push('Establish 3-5 core KPIs to track progress');
    }
    
    if (bassData?.evidence_count > 5) {
      operationalScore += 20;
      strengths.push('Strong evidence documentation');
    } else if (bassData?.evidence_count > 0) {
      operationalScore += 10;
    } else {
      gaps.push('Limited evidence/documentation');
      recommendations.push('Document customer feedback, metrics, and milestones regularly');
    }
    
    // Market Assessment
    if (bassData?.market?.tam) {
      const tam = parseInt(bassData.market.tam);
      if (tam > 1000000000) {
        marketScore += 40;
        strengths.push('Large TAM ($1B+)');
      } else if (tam > 100000000) {
        marketScore += 30;
        strengths.push('Significant TAM ($100M+)');
      } else {
        marketScore += 20;
      }
    } else {
      gaps.push('TAM not defined');
      recommendations.push('Conduct market sizing analysis');
    }
    
    if (bassData?.market?.growth_rate) {
      const marketGrowth = parseFloat(bassData.market.growth_rate);
      if (marketGrowth > 20) {
        marketScore += 30;
        strengths.push('High-growth market (>20% CAGR)');
      } else if (marketGrowth > 10) {
        marketScore += 20;
      } else {
        marketScore += 10;
      }
    }
    
    if (bassData?.competitive_advantage) {
      marketScore += 30;
      strengths.push('Clear competitive advantage identified');
    } else {
      gaps.push('Competitive advantage unclear');
      recommendations.push('Articulate unique value proposition and defensibility');
    }
    
    // Team Assessment
    if (bassData?.team?.size) {
      const size = parseInt(bassData.team.size);
      if (size >= 2 && size <= 10) {
        teamScore += 30;
        strengths.push('Right-sized team for stage');
      } else if (size === 1) {
        gaps.push('Solo founder');
        recommendations.push('Consider adding co-founder or key hires');
        teamScore += 15;
      } else if (size > 10) {
        teamScore += 20;
      }
    }
    
    if (bassData?.team?.technical_founders > 0) {
      teamScore += 35;
      strengths.push('Technical founder(s) on team');
    } else {
      gaps.push('No technical founders');
      recommendations.push('Recruit technical co-founder or CTO');
    }
    
    if (bassData?.advisors?.length > 0) {
      teamScore += 20;
      strengths.push('Advisory board in place');
    } else {
      gaps.push('No formal advisors');
      recommendations.push('Build advisory board with industry experts');
    }
    
    if (bassData?.team?.experience === 'serial' || bassData?.team?.experience === 'experienced') {
      teamScore += 15;
      strengths.push('Experienced founding team');
    }
    
    // Normalize scores to 0-100
    financialScore = Math.min(100, financialScore);
    operationalScore = Math.min(100, operationalScore);
    marketScore = Math.min(100, marketScore);
    teamScore = Math.min(100, teamScore);
    
    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      (financialScore * 0.35) +
      (operationalScore * 0.25) +
      (marketScore * 0.25) +
      (teamScore * 0.15)
    );
    
    // Add overall recommendations based on score
    if (overallScore >= 80) {
      recommendations.unshift('Strong position for Series A fundraising');
    } else if (overallScore >= 60) {
      recommendations.unshift('Good foundation for seed fundraising');
    } else if (overallScore >= 40) {
      recommendations.unshift('Focus on key improvements before fundraising');
    } else {
      recommendations.unshift('Significant preparation needed before investor outreach');
    }
    
    // Store the finance readiness score in build score
    // This would typically update a database
    // For now, we'll just include it in the response
    
    const response: ReadinessResponse = {
      score: overallScore,
      strengths: strengths.slice(0, 6), // Top 6 strengths
      gaps: gaps.slice(0, 6), // Top 6 gaps
      recommendations: recommendations.slice(0, 5), // Top 5 recommendations
      breakdown: {
        financial: financialScore,
        operational: operationalScore,
        market: marketScore,
        team: teamScore
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Finance readiness error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate finance readiness' },
      { status: 500 }
    );
  }
}
