import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface EvalItem {
  id: string;
  type: 'lead-gen' | 'support';
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  score: number;
  passed: boolean;
  error?: string;
}

interface EvalSummary {
  projectId: string;
  timestamp: string;
  totalItems: number;
  passedItems: number;
  failedItems: number;
  averageScore: number;
  items: EvalItem[];
  verticals: {
    'lead-gen': { passed: number; failed: number; avgScore: number };
    'support': { passed: number; failed: number; avgScore: number };
  };
}

// Simple in-repo eval dataset
const EVAL_DATASET: Omit<EvalItem, 'actualOutput' | 'score' | 'passed'>[] = [
  // Lead-gen evals
  {
    id: 'lg-001',
    type: 'lead-gen',
    input: 'I need help growing my e-commerce business',
    expectedOutput: 'qualifying question about business size or industry'
  },
  {
    id: 'lg-002',
    type: 'lead-gen',
    input: 'We have 50 employees and need CRM software',
    expectedOutput: 'enterprise lead qualification and feature discovery'
  },
  {
    id: 'lg-003',
    type: 'lead-gen',
    input: 'Just browsing your pricing',
    expectedOutput: 'soft engagement without being pushy'
  },
  {
    id: 'lg-004',
    type: 'lead-gen',
    input: 'Can you integrate with Salesforce?',
    expectedOutput: 'technical qualification and integration capabilities'
  },
  {
    id: 'lg-005',
    type: 'lead-gen',
    input: 'What ROI can I expect?',
    expectedOutput: 'value proposition with metrics or case studies'
  },
  // Support evals
  {
    id: 'sp-001',
    type: 'support',
    input: 'My account is locked and I cannot reset password',
    expectedOutput: 'immediate help with account recovery steps'
  },
  {
    id: 'sp-002',
    type: 'support',
    input: 'How do I export my data?',
    expectedOutput: 'clear instructions for data export'
  },
  {
    id: 'sp-003',
    type: 'support',
    input: 'The app keeps crashing on iPhone',
    expectedOutput: 'troubleshooting steps and escalation if needed'
  },
  {
    id: 'sp-004',
    type: 'support',
    input: 'I want to cancel my subscription',
    expectedOutput: 'retention attempt then cancellation process'
  },
  {
    id: 'sp-005',
    type: 'support',
    input: 'Can I get a refund for last month?',
    expectedOutput: 'policy explanation and refund process'
  }
];

// Mock AI response generator (replace with actual AI calls)
function generateAIResponse(input: string, type: 'lead-gen' | 'support'): string {
  // This is a mock - replace with actual AI API calls
  if (type === 'lead-gen') {
    if (input.toLowerCase().includes('employees')) {
      return 'Great! With 50 employees, you qualify for our Enterprise plan. What specific CRM features are most important for your team?';
    }
    if (input.toLowerCase().includes('pricing')) {
      return 'I\'d be happy to help you find the right plan. What size is your team and what features are you looking for?';
    }
    return 'Thanks for your interest! To better assist you, could you tell me more about your business needs?';
  } else {
    if (input.toLowerCase().includes('locked')) {
      return 'I can help you recover your account. Please check your email for a password reset link. If you don\'t receive it, try clearing your browser cache.';
    }
    if (input.toLowerCase().includes('crash')) {
      return 'I\'m sorry about the crashes. Please try: 1) Update the app, 2) Restart your iPhone, 3) Reinstall if needed. If issues persist, I\'ll escalate to our technical team.';
    }
    return 'I understand your concern. Let me help you with that right away.';
  }
}

// Simple scoring function (replace with more sophisticated eval)
function scoreResponse(expected: string, actual: string): number {
  const expectedKeywords = expected.toLowerCase().split(' ');
  const actualLower = actual.toLowerCase();
  
  let matches = 0;
  for (const keyword of expectedKeywords) {
    if (actualLower.includes(keyword)) {
      matches++;
    }
  }
  
  // Basic scoring: percentage of expected keywords found
  const score = Math.min(100, Math.round((matches / expectedKeywords.length) * 100));
  return score;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId = 'test-project', templatePath } = body;
    
    // Run evaluations
    const items: EvalItem[] = [];
    let totalScore = 0;
    let passedCount = 0;
    
    const verticalStats = {
      'lead-gen': { passed: 0, failed: 0, totalScore: 0, count: 0 },
      'support': { passed: 0, failed: 0, totalScore: 0, count: 0 }
    };
    
    for (const evalItem of EVAL_DATASET) {
      try {
        // Generate AI response
        const actualOutput = generateAIResponse(evalItem.input, evalItem.type);
        
        // Score the response
        const score = scoreResponse(evalItem.expectedOutput, actualOutput);
        const passed = score >= 70; // 70% threshold for passing
        
        const result: EvalItem = {
          ...evalItem,
          actualOutput,
          score,
          passed
        };
        
        items.push(result);
        totalScore += score;
        
        if (passed) {
          passedCount++;
          verticalStats[evalItem.type].passed++;
        } else {
          verticalStats[evalItem.type].failed++;
        }
        
        verticalStats[evalItem.type].totalScore += score;
        verticalStats[evalItem.type].count++;
        
      } catch (error) {
        items.push({
          ...evalItem,
          score: 0,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        verticalStats[evalItem.type].failed++;
        verticalStats[evalItem.type].count++;
      }
    }
    
    // Calculate summary
    const summary: EvalSummary = {
      projectId,
      timestamp: new Date().toISOString(),
      totalItems: items.length,
      passedItems: passedCount,
      failedItems: items.length - passedCount,
      averageScore: Math.round(totalScore / items.length),
      items,
      verticals: {
        'lead-gen': {
          passed: verticalStats['lead-gen'].passed,
          failed: verticalStats['lead-gen'].failed,
          avgScore: verticalStats['lead-gen'].count > 0 
            ? Math.round(verticalStats['lead-gen'].totalScore / verticalStats['lead-gen'].count)
            : 0
        },
        'support': {
          passed: verticalStats['support'].passed,
          failed: verticalStats['support'].failed,
          avgScore: verticalStats['support'].count > 0
            ? Math.round(verticalStats['support'].totalScore / verticalStats['support'].count)
            : 0
        }
      }
    };
    
    return NextResponse.json(summary);
    
  } catch (error) {
    console.error('Eval run error:', error);
    return NextResponse.json(
      { error: 'Failed to run evaluations' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Return eval dataset info
  return NextResponse.json({
    totalItems: EVAL_DATASET.length,
    verticals: {
      'lead-gen': EVAL_DATASET.filter(e => e.type === 'lead-gen').length,
      'support': EVAL_DATASET.filter(e => e.type === 'support').length
    },
    items: EVAL_DATASET.map(({ id, type, input }) => ({ id, type, input }))
  });
}
