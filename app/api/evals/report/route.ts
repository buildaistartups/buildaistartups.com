import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

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

interface BuildScore {
  overall: number;
  finance: number;
  product: number;
  market: number;
  growth: number;
  opsLegal: number;
  ai: number;
  timestamp: string;
}

interface EvidenceEntry {
  projectId: string;
  category: 'ai-eval';
  subcategory: 'lead-gen' | 'support' | 'combined';
  value: number;
  metadata: {
    passed: number;
    failed: number;
    total: number;
    timestamp: string;
  };
  timestamp: string;
}

// Store paths
const EVIDENCE_DIR = join(process.cwd(), 'data', 'evidence');
const SCORES_DIR = join(process.cwd(), 'data', 'scores');

function ensureDirectories() {
  if (!existsSync(EVIDENCE_DIR)) {
    mkdirSync(EVIDENCE_DIR, { recursive: true });
  }
  if (!existsSync(SCORES_DIR)) {
    mkdirSync(SCORES_DIR, { recursive: true });
  }
}

function loadEvidence(projectId: string): EvidenceEntry[] {
  const filePath = join(EVIDENCE_DIR, `${projectId}.json`);
  if (!existsSync(filePath)) {
    return [];
  }
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function saveEvidence(projectId: string, entries: EvidenceEntry[]) {
  ensureDirectories();
  const filePath = join(EVIDENCE_DIR, `${projectId}.json`);
  writeFileSync(filePath, JSON.stringify(entries, null, 2));
}

function loadBuildScore(projectId: string): BuildScore | null {
  const filePath = join(SCORES_DIR, `${projectId}.json`);
  if (!existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function saveBuildScore(projectId: string, score: BuildScore) {
  ensureDirectories();
  const filePath = join(SCORES_DIR, `${projectId}.json`);
  writeFileSync(filePath, JSON.stringify(score, null, 2));
}

function calculateAIScore(evalSummary: EvalSummary): number {
  // AI score calculation based on eval performance
  const passRate = evalSummary.passedItems / evalSummary.totalItems;
  const avgScore = evalSummary.averageScore / 100;
  
  // Weight: 60% pass rate, 40% average score
  const aiScore = Math.round((passRate * 0.6 + avgScore * 0.4) * 100);
  return Math.min(100, Math.max(0, aiScore));
}

export async function POST(request: NextRequest) {
  try {
    const summary: EvalSummary = await request.json();
    const { projectId } = summary;
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Load existing evidence
    const evidence = loadEvidence(projectId);
    
    // Add new evidence entries
    const timestamp = new Date().toISOString();
    
    // Combined score
    evidence.push({
      projectId,
      category: 'ai-eval',
      subcategory: 'combined',
      value: summary.averageScore,
      metadata: {
        passed: summary.passedItems,
        failed: summary.failedItems,
        total: summary.totalItems,
        timestamp: summary.timestamp
      },
      timestamp
    });
    
    // Lead-gen score
    if (summary.verticals['lead-gen'].passed + summary.verticals['lead-gen'].failed > 0) {
      evidence.push({
        projectId,
        category: 'ai-eval',
        subcategory: 'lead-gen',
        value: summary.verticals['lead-gen'].avgScore,
        metadata: {
          passed: summary.verticals['lead-gen'].passed,
          failed: summary.verticals['lead-gen'].failed,
          total: summary.verticals['lead-gen'].passed + summary.verticals['lead-gen'].failed,
          timestamp: summary.timestamp
        },
        timestamp
      });
    }
    
    // Support score
    if (summary.verticals['support'].passed + summary.verticals['support'].failed > 0) {
      evidence.push({
        projectId,
        category: 'ai-eval',
        subcategory: 'support',
        value: summary.verticals['support'].avgScore,
        metadata: {
          passed: summary.verticals['support'].passed,
          failed: summary.verticals['support'].failed,
          total: summary.verticals['support'].passed + summary.verticals['support'].failed,
          timestamp: summary.timestamp
        },
        timestamp
      });
    }
    
    // Save evidence
    saveEvidence(projectId, evidence);
    
    // Update Build Score AI lane
    let buildScore = loadBuildScore(projectId);
    if (!buildScore) {
      buildScore = {
        overall: 0,
        finance: 0,
        product: 0,
        market: 0,
        growth: 0,
        opsLegal: 0,
        ai: 0,
        timestamp
      };
    }
    
    // Update AI score
    buildScore.ai = calculateAIScore(summary);
    buildScore.timestamp = timestamp;
    
    // Recalculate overall score (simple average of all lanes)
    const lanes = [
      buildScore.finance,
      buildScore.product,
      buildScore.market,
      buildScore.growth,
      buildScore.opsLegal,
      buildScore.ai
    ].filter(s => s > 0);
    
    buildScore.overall = lanes.length > 0
      ? Math.round(lanes.reduce((a, b) => a + b, 0) / lanes.length)
      : 0;
    
    // Save updated build score
    saveBuildScore(projectId, buildScore);
    
    return NextResponse.json({
      success: true,
      projectId,
      aiScore: buildScore.ai,
      overallScore: buildScore.overall,
      evidenceCount: evidence.length,
      timestamp
    });
    
  } catch (error) {
    console.error('Eval report error:', error);
    return NextResponse.json(
      { error: 'Failed to save eval report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  
  if (!projectId) {
    return NextResponse.json(
      { error: 'Project ID is required' },
      { status: 400 }
    );
  }
  
  try {
    const evidence = loadEvidence(projectId);
    const aiEvals = evidence.filter(e => e.category === 'ai-eval');
    const buildScore = loadBuildScore(projectId);
    
    return NextResponse.json({
      projectId,
      evaluations: aiEvals,
      buildScore: buildScore?.ai || 0,
      overallScore: buildScore?.overall || 0
    });
  } catch (error) {
    console.error('Get eval report error:', error);
    return NextResponse.json(
      { error: 'Failed to get eval reports' },
      { status: 500 }
    );
  }
}
