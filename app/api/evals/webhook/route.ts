import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Use environment variable for webhook secret
const WEBHOOK_SECRET = process.env.BAIS_WEBHOOK_SECRET || 'default-secret-change-me';

interface EvalSummary {
  projectId: string;
  timestamp: string;
  totalItems: number;
  passedItems: number;
  failedItems: number;
  averageScore: number;
  verticals: {
    'lead-gen': { passed: number; failed: number; avgScore: number };
    'support': { passed: number; failed: number; avgScore: number };
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const headersList = headers();
    const authHeader = headersList.get('x-bais-secret');
    
    if (!authHeader || authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse the eval summary
    const summary: EvalSummary = await request.json();
    
    if (!summary.projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Forward to the report endpoint (reuse logic)
    const reportResponse = await fetch(
      new URL('/api/evals/report', request.url).toString(),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(summary)
      }
    );
    
    if (!reportResponse.ok) {
      const error = await reportResponse.json();
      return NextResponse.json(error, { status: reportResponse.status });
    }
    
    const result = await reportResponse.json();
    
    // Log webhook receipt
    console.log(`[Webhook] Eval report saved for project: ${summary.projectId}`);
    console.log(`[Webhook] AI Score: ${result.aiScore}, Overall: ${result.overallScore}`);
    
    // Return success with additional webhook metadata
    return NextResponse.json({
      ...result,
      webhook: true,
      receivedAt: new Date().toISOString(),
      source: headersList.get('x-source') || 'external'
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to verify webhook is active
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/evals/webhook',
    method: 'POST',
    headers: {
      'X-BAIS-Secret': 'Required',
      'Content-Type': 'application/json'
    },
    payload: {
      projectId: 'string (required)',
      timestamp: 'ISO 8601 string',
      totalItems: 'number',
      passedItems: 'number',
      failedItems: 'number',
      averageScore: 'number (0-100)',
      verticals: {
        'lead-gen': '{ passed, failed, avgScore }',
        'support': '{ passed, failed, avgScore }'
      }
    }
  });
}
