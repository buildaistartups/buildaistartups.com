import { NextRequest, NextResponse } from 'next/server';

// Mock funding database - in production, this would connect to real APIs
const FUNDING_SOURCES = [
  // Grants
  {
    id: 'nsf-sbir-2024',
    name: 'NSF SBIR Phase I',
    type: 'grant',
    amount: '$275,000',
    minAmount: 275000,
    maxAmount: 275000,
    timeline: '6-9 months',
    requirements: ['US-based', 'For-profit', 'Less than 500 employees'],
    tags: ['R&D', 'Deep Tech', 'Non-dilutive'],
    stages: ['pre-seed', 'seed'],
    verticals: ['ai', 'biotech', 'cleantech', 'hardware']
  },
  {
    id: 'aws-activate',
    name: 'AWS Activate Credits',
    type: 'grant',
    amount: '$100,000 in credits',
    minAmount: 100000,
    maxAmount: 100000,
    timeline: '2-4 weeks',
    requirements: ['Startup', 'Less than $10M funding'],
    tags: ['Cloud Credits', 'Infrastructure', 'Non-dilutive'],
    stages: ['pre-seed', 'seed', 'series-a'],
    verticals: ['ai', 'saas', 'marketplace', 'developer-tools']
  },
  {
    id: 'openai-startup-fund',
    name: 'OpenAI Startup Fund',
    type: 'investor',
    amount: '$1M - $5M',
    minAmount: 1000000,
    maxAmount: 5000000,
    timeline: '3-6 months',
    requirements: ['AI-focused', 'Strong technical team'],
    tags: ['AI', 'Strategic Partner', 'Follow-on Available'],
    stages: ['seed', 'series-a'],
    verticals: ['ai', 'ml-infrastructure', 'ai-applications']
  },
  // Accelerators
  {
    id: 'yc-w25',
    name: 'Y Combinator W25',
    type: 'accelerator',
    amount: '$500,000',
    minAmount: 500000,
    maxAmount: 500000,
    timeline: 'Application closes Dec 2024',
    requirements: ['Early stage', 'Full-time founders'],
    tags: ['Top Tier', 'Network', 'Standard Deal'],
    stages: ['pre-seed', 'seed'],
    verticals: ['all']
  },
  {
    id: 'techstars-2025',
    name: 'Techstars AI Accelerator',
    type: 'accelerator',
    amount: '$120,000',
    minAmount: 120000,
    maxAmount: 120000,
    timeline: 'Rolling admissions',
    requirements: ['AI/ML focus', '2+ co-founders'],
    tags: ['Mentorship', 'Global Network', '6% equity'],
    stages: ['pre-seed', 'seed'],
    verticals: ['ai', 'ml-infrastructure']
  },
  // Investors
  {
    id: 'sequoia-seed',
    name: 'Sequoia Capital Seed',
    type: 'investor',
    amount: '$500K - $2M',
    minAmount: 500000,
    maxAmount: 2000000,
    timeline: '2-4 months',
    requirements: ['Exceptional team', 'Large market'],
    tags: ['Tier 1 VC', 'Board Seat', 'Multi-stage'],
    stages: ['seed'],
    verticals: ['ai', 'saas', 'fintech', 'marketplace']
  },
  {
    id: 'a16z-seed',
    name: 'Andreessen Horowitz Seed',
    type: 'investor',
    amount: '$1M - $3M',
    minAmount: 1000000,
    maxAmount: 3000000,
    timeline: '2-3 months',
    requirements: ['Technical founders', 'Product-market fit signals'],
    tags: ['Tier 1 VC', 'Operational Support', 'Platform Services'],
    stages: ['seed', 'series-a'],
    verticals: ['ai', 'crypto', 'bio', 'fintech']
  },
  {
    id: 'openai-ventures',
    name: 'OpenAI Ventures',
    type: 'investor',
    amount: '$500K - $10M',
    minAmount: 500000,
    maxAmount: 10000000,
    timeline: '1-3 months',
    requirements: ['AI-native', 'Innovative use of LLMs'],
    tags: ['Strategic', 'API Credits', 'Technical Support'],
    stages: ['seed', 'series-a', 'series-b'],
    verticals: ['ai', 'ai-applications', 'ai-infrastructure']
  },
  {
    id: 'gradient-ventures',
    name: 'Google Gradient Ventures',
    type: 'investor',
    amount: '$1M - $8M',
    minAmount: 1000000,
    maxAmount: 8000000,
    timeline: '2-4 months',
    requirements: ['AI-first', 'Technical differentiation'],
    tags: ['Google Ecosystem', 'Technical Advisors', 'GCP Credits'],
    stages: ['seed', 'series-a'],
    verticals: ['ai', 'ml-infrastructure', 'enterprise-ai']
  },
  {
    id: 'nea-seed',
    name: 'NEA Seed Stage',
    type: 'investor',
    amount: '$500K - $5M',
    minAmount: 500000,
    maxAmount: 5000000,
    timeline: '3-6 months',
    requirements: ['Scalable model', 'Strong team'],
    tags: ['Multi-stage', 'Global', 'Deep Pockets'],
    stages: ['seed', 'series-a'],
    verticals: ['ai', 'saas', 'healthcare', 'fintech']
  }
];

interface MatchRequest {
  projectId: string;
  bassData?: any;
  filters: {
    minAmount?: string;
    maxAmount?: string;
    type?: string;
    stage?: string;
  };
}

interface FundingMatch {
  id: string;
  name: string;
  type: string;
  amount: string;
  timeline: string;
  fitScore: number;
  requirements: string[];
  tags: string[];
}

function calculateFitScore(source: any, bassData: any, filters: any): number {
  let score = 50; // Base score
  
  // Stage match
  if (source.stages.includes(bassData?.stage || 'pre-seed')) {
    score += 20;
  }
  
  // Vertical match
  const vertical = bassData?.vertical || 'ai';
  if (source.verticals.includes('all') || source.verticals.includes(vertical)) {
    score += 15;
  }
  
  // Team size consideration
  if (bassData?.team?.size) {
    const teamSize = parseInt(bassData.team.size);
    if (teamSize >= 2 && teamSize <= 10) score += 10;
  }
  
  // Revenue/traction signals
  if (bassData?.metrics?.mrr > 0) {
    score += 10;
  }
  
  // Previous funding
  if (bassData?.finance?.raised) {
    const raised = parseInt(bassData.finance.raised);
    if (raised > 0 && raised < 1000000) score += 5;
  }
  
  // Random variation for demo
  score += Math.floor(Math.random() * 10) - 5;
  
  return Math.min(Math.max(score, 0), 100);
}

export async function POST(request: NextRequest) {
  try {
    const body: MatchRequest = await request.json();
    const { bassData, filters } = body;
    
    // Filter funding sources
    let matches = FUNDING_SOURCES.filter(source => {
      // Type filter
      if (filters.type && filters.type !== 'all' && source.type !== filters.type) {
        return false;
      }
      
      // Amount range filter
      if (filters.minAmount) {
        const min = parseInt(filters.minAmount);
        if (source.maxAmount < min) return false;
      }
      
      if (filters.maxAmount) {
        const max = parseInt(filters.maxAmount);
        if (source.minAmount > max) return false;
      }
      
      // Stage filter
      if (filters.stage && !source.stages.includes(filters.stage)) {
        return false;
      }
      
      return true;
    });
    
    // Calculate fit scores and sort
    const scoredMatches: FundingMatch[] = matches.map(source => ({
      id: source.id,
      name: source.name,
      type: source.type,
      amount: source.amount,
      timeline: source.timeline,
      fitScore: calculateFitScore(source, bassData, filters),
      requirements: source.requirements,
      tags: source.tags
    }));
    
    // Sort by fit score
    scoredMatches.sort((a, b) => b.fitScore - a.fitScore);
    
    return NextResponse.json({
      success: true,
      matches: scoredMatches.slice(0, 10), // Return top 10 matches
      totalFound: scoredMatches.length
    });
  } catch (error) {
    console.error('Funding match error:', error);
    return NextResponse.json(
      { error: 'Failed to find funding matches' },
      { status: 500 }
    );
  }
}
