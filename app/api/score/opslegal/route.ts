import { NextRequest, NextResponse } from 'next/server';

interface OpsLegalScoreRequest {
  projectId: string;
  privacy: {
    dataFlows: any[];
    dataCategories: string[];
    thirdParties: string[];
    dataSubjects: string[];
    legalBasis: string;
  gdprCompliant: boolean;
    ccpaCompliant: boolean;
  };
  dpa: {
    companyName: string;
    contactEmail: string;
    dpoEmail: string;
    address: string;
    purposes: string[];
    dataTypes: string[];
    subProcessors: any[];
    technicalMeasures: string[];
    organizationalMeasures: string[];
    retentionPeriod: string;
    deletionProcess: string;
    transferMechanisms: {
      sccs: boolean;
      bcrs: boolean;
      adequacyDecision: boolean;
      other: string;
    };
  };
  slo: {
    overallStatus: 'passing' | 'warning' | 'failing' | 'unknown';
    statuses: Array<{
      metric: string;
      status: 'passing' | 'warning' | 'failing' | 'unknown';
    }>;
    targets: {
      uptime: number;
      ttfb: number;
      errorRate: number;
      p95Latency: number;
    };
  } | null;
  cost: {
    monthlyEstimate: number;
    breakdown: {
      infrastructure: number;
      services: number;
      personnel: number;
      licenses: number;
      other: number;
    };
    currency: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: OpsLegalScoreRequest = await req.json();
    
    if (!body.projectId) {
      return NextResponse.json(
        { error: 'Missing projectId' },
        { status: 400 }
      );
    }

    // Calculate individual component scores
    const privacyScore = calculatePrivacyScore(body.privacy);
    const dpaScore = calculateDPAScore(body.dpa);
    const sloScore = calculateSLOScore(body.slo);
    const costScore = calculateCostScore(body.cost);

    // Calculate weighted total score
    const weights = {
      privacy: 0.3,
      dpa: 0.25,
      slo: 0.3,
      cost: 0.15
    };

    const totalScore = Math.round(
      privacyScore * weights.privacy +
      dpaScore * weights.dpa +
      sloScore * weights.slo +
      costScore * weights.cost
    );

    // Prepare detailed breakdown
    const breakdown = {
      privacy: {
        score: privacyScore,
        weight: weights.privacy,
        details: {
          dataFlowsDefined: body.privacy.dataFlows.length > 0,
          gdprCompliant: body.privacy.gdprCompliant,
          ccpaCompliant: body.privacy.ccpaCompliant,
          legalBasisSpecified: !!body.privacy.legalBasis,
          dataCategories: body.privacy.dataCategories.length,
          thirdPartiesDocumented: body.privacy.thirdParties.length > 0
        }
      },
      dpa: {
        score: dpaScore,
        weight: weights.dpa,
        details: {
          processorInfoComplete: !!(body.dpa.companyName && body.dpa.contactEmail && body.dpa.dpoEmail),
          purposesDocumented: body.dpa.purposes.length > 0,
          subProcessorsListed: body.dpa.subProcessors.length >= 0,
          securityMeasures: body.dpa.technicalMeasures.length + body.dpa.organizationalMeasures.length,
          transferMechanisms: Object.values(body.dpa.transferMechanisms).some(v => v === true || (typeof v === 'string' && v.length > 0))
        }
      },
      slo: {
        score: sloScore,
        weight: weights.slo,
        details: {
          status: body.slo?.overallStatus || 'unknown',
          passingMetrics: body.slo?.statuses.filter(s => s.status === 'passing').length || 0,
          totalMetrics: body.slo?.statuses.length || 0,
          uptimeTarget: body.slo?.targets.uptime || 0
        }
      },
      cost: {
        score: costScore,
        weight: weights.cost,
        details: {
          monthlyTotal: calculateTotalCost(body.cost),
          currency: body.cost.currency,
          hasBreakdown: Object.values(body.cost.breakdown).some(v => v > 0),
          categoriesWithCost: Object.values(body.cost.breakdown).filter(v => v > 0).length
        }
      }
    };

    // Determine compliance level
    const complianceLevel = getComplianceLevel(totalScore, breakdown);

    // Generate recommendations
    const recommendations = generateRecommendations(breakdown);

    // Save score to file store
    const { promises: fs } = await import('fs');
    const path = await import('path');
    
    const dataDir = path.join(process.cwd(), 'data', 'scores', 'opslegal');
    await fs.mkdir(dataDir, { recursive: true });
    
    const scoreData = {
      projectId: body.projectId,
      score: totalScore,
      breakdown,
      complianceLevel,
      recommendations,
      timestamp: new Date().toISOString()
    };
    
    const filePath = path.join(dataDir, `${body.projectId}.json`);
    await fs.writeFile(filePath, JSON.stringify(scoreData, null, 2));

    return NextResponse.json({
      success: true,
      score: totalScore,
      breakdown,
      complianceLevel,
      recommendations
    });

  } catch (error: any) {
    console.error('Ops/Legal score calculation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate ops/legal score' },
      { status: 500 }
    );
  }
}

function calculatePrivacyScore(privacy: OpsLegalScoreRequest['privacy']): number {
  let score = 0;
  const maxScore = 100;

  // Data flows documented (25 points)
  if (privacy.dataFlows.length > 0) {
    score += Math.min(25, privacy.dataFlows.length * 5);
    // Additional points for encryption
    const encryptedFlows = privacy.dataFlows.filter(f => f.encryption).length;
    score += Math.min(10, encryptedFlows * 2);
  }

  // Compliance (30 points)
  if (privacy.gdprCompliant) score += 15;
  if (privacy.ccpaCompliant) score += 15;

  // Documentation completeness (35 points)
  if (privacy.legalBasis) score += 10;
  if (privacy.dataCategories.length > 0) score += 10;
  if (privacy.thirdParties.length >= 0) score += 5; // Can be 0 for no third parties
  if (privacy.dataSubjects.length > 0) score += 10;

  return Math.min(maxScore, score);
}

function calculateDPAScore(dpa: OpsLegalScoreRequest['dpa']): number {
  let score = 0;
  const maxScore = 100;

  // Processor information (20 points)
  if (dpa.companyName) score += 5;
  if (dpa.contactEmail) score += 5;
  if (dpa.dpoEmail) score += 5;
  if (dpa.address) score += 5;

  // Processing details (30 points)
  if (dpa.purposes.length > 0) score += 10;
  if (dpa.dataTypes.length > 0) score += 10;
  if (dpa.retentionPeriod) score += 5;
  if (dpa.deletionProcess) score += 5;

  // Security measures (25 points)
  const techMeasures = Math.min(15, dpa.technicalMeasures.length * 3);
  const orgMeasures = Math.min(10, dpa.organizationalMeasures.length * 2);
  score += techMeasures + orgMeasures;

  // Transfer mechanisms (15 points)
  if (dpa.transferMechanisms.sccs) score += 5;
  if (dpa.transferMechanisms.bcrs) score += 5;
  if (dpa.transferMechanisms.adequacyDecision) score += 5;

  // Sub-processors documentation (10 points)
  if (dpa.subProcessors.length === 0 || dpa.subProcessors.every(sp => sp.name && sp.location)) {
    score += 10;
  } else if (dpa.subProcessors.some(sp => sp.name && sp.location)) {
    score += 5;
  }

  return Math.min(maxScore, score);
}

function calculateSLOScore(slo: OpsLegalScoreRequest['slo'] | null): number {
  if (!slo) return 0;

  let score = 0;
  const maxScore = 100;

  // Overall status (40 points)
  switch (slo.overallStatus) {
    case 'passing':
      score += 40;
      break;
    case 'warning':
      score += 25;
      break;
    case 'failing':
      score += 10;
      break;
    case 'unknown':
      score += 5;
      break;
  }

  // Individual metric performance (30 points)
  if (slo.statuses && slo.statuses.length > 0) {
    const passingRatio = slo.statuses.filter(s => s.status === 'passing').length / slo.statuses.length;
    score += Math.round(passingRatio * 30);
  }

  // Ambitious targets (30 points)
  if (slo.targets) {
    // Uptime target
    if (slo.targets.uptime >= 99.99) score += 10;
    else if (slo.targets.uptime >= 99.9) score += 7;
    else if (slo.targets.uptime >= 99) score += 4;

    // TTFB target
    if (slo.targets.ttfb <= 100) score += 10;
    else if (slo.targets.ttfb <= 200) score += 7;
    else if (slo.targets.ttfb <= 500) score += 4;

    // Error rate target
    if (slo.targets.errorRate <= 0.01) score += 5;
    else if (slo.targets.errorRate <= 0.1) score += 3;
    else if (slo.targets.errorRate <= 1) score += 1;

    // P95 latency target
    if (slo.targets.p95Latency <= 200) score += 5;
    else if (slo.targets.p95Latency <= 500) score += 3;
    else if (slo.targets.p95Latency <= 1000) score += 1;
  }

  return Math.min(maxScore, score);
}

function calculateCostScore(cost: OpsLegalScoreRequest['cost']): number {
  let score = 0;
  const maxScore = 100;

  const totalCost = calculateTotalCost(cost);

  // Cost documentation (40 points)
  if (totalCost > 0) {
    score += 20;
    
    // Detailed breakdown bonus
    const categoriesWithCost = Object.values(cost.breakdown).filter(v => v > 0).length;
    score += Math.min(20, categoriesWithCost * 4);
  }

  // Cost optimization indicators (60 points)
  // This is a simplified model - in reality, you'd compare against industry benchmarks
  if (cost.breakdown.infrastructure > 0 && cost.breakdown.services > 0) {
    const infraRatio = cost.breakdown.infrastructure / totalCost;
    
    // Good infrastructure cost ratio (not too high, not too low)
    if (infraRatio >= 0.2 && infraRatio <= 0.5) {
      score += 30;
    } else if (infraRatio >= 0.1 && infraRatio <= 0.6) {
      score += 20;
    } else {
      score += 10;
    }
  }

  // Personnel cost management
  if (cost.breakdown.personnel > 0) {
    const personnelRatio = cost.breakdown.personnel / totalCost;
    
    // Reasonable personnel costs
    if (personnelRatio >= 0.3 && personnelRatio <= 0.6) {
      score += 20;
    } else if (personnelRatio >= 0.2 && personnelRatio <= 0.7) {
      score += 15;
    } else {
      score += 5;
    }
  }

  // License optimization
  if (cost.breakdown.licenses > 0) {
    score += 10; // Points for tracking license costs
  }

  return Math.min(maxScore, score);
}

function calculateTotalCost(cost: OpsLegalScoreRequest['cost']): number {
  return Object.values(cost.breakdown).reduce((sum, val) => sum + val, 0);
}

function getComplianceLevel(score: number, breakdown: any): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Satisfactory';
  if (score >= 40) return 'Needs Improvement';
  return 'Critical';
}

function generateRecommendations(breakdown: any): string[] {
  const recommendations: string[] = [];

  // Privacy recommendations
  if (!breakdown.privacy.details.gdprCompliant) {
    recommendations.push('Achieve GDPR compliance by implementing required data protection measures');
  }
  if (!breakdown.privacy.details.ccpaCompliant) {
    recommendations.push('Implement CCPA compliance measures for California consumer privacy');
  }
  if (breakdown.privacy.details.dataCategories < 3) {
    recommendations.push('Document all data categories being processed');
  }

  // DPA recommendations
  if (!breakdown.dpa.details.processorInfoComplete) {
    recommendations.push('Complete all processor contact information including DPO details');
  }
  if (breakdown.dpa.details.securityMeasures < 5) {
    recommendations.push('Document additional technical and organizational security measures');
  }
  if (!breakdown.dpa.details.transferMechanisms) {
    recommendations.push('Implement appropriate data transfer mechanisms (SCCs, BCRs, or adequacy decisions)');
  }

  // SLO recommendations
  if (breakdown.slo.details.status === 'failing' || breakdown.slo.details.status === 'unknown') {
    recommendations.push('Improve service reliability to meet SLO targets');
  }
  if (breakdown.slo.details.uptimeTarget < 99.9) {
    recommendations.push('Consider setting more ambitious uptime targets (99.9% or higher)');
  }

  // Cost recommendations
  if (!breakdown.cost.details.hasBreakdown) {
    recommendations.push('Provide detailed cost breakdown for better financial visibility');
  }
  if (breakdown.cost.details.categoriesWithCost < 3) {
    recommendations.push('Track costs across more categories for comprehensive budget management');
  }

  // If no recommendations, provide positive feedback
  if (recommendations.length === 0) {
    recommendations.push('Excellent ops/legal compliance! Continue monitoring and updating documentation regularly.');
  }

  return recommendations;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Missing projectId parameter' },
        { status: 400 }
      );
    }

    const { promises: fs } = await import('fs');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'data', 'scores', 'opslegal', `${projectId}.json`);
    
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (e) {
      return NextResponse.json(
        { error: 'Score not found' },
        { status: 404 }
      );
    }

  } catch (error: any) {
    console.error('Score retrieval error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve score' },
      { status: 500 }
    );
  }
}
