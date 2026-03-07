import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface SLORequest {
  projectId: string;
  targets: {
    uptime: number; // percentage, e.g., 99.9
    ttfb: number; // milliseconds, e.g., 200
    errorRate: number; // percentage, e.g., 0.1
    p95Latency: number; // milliseconds, e.g., 500
  };
  currentMetrics?: {
    uptime: number;
    ttfb: number;
    errorRate: number;
    p95Latency: number;
  };
}

interface SLOStatus {
  metric: string;
  target: number;
  current?: number;
  status: 'passing' | 'warning' | 'failing' | 'unknown';
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SLORequest = await req.json();
    
    if (!body.projectId || !body.targets) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate SLO status for each metric
    const sloStatuses: SLOStatus[] = [
      calculateSLOStatus('uptime', body.targets.uptime, body.currentMetrics?.uptime, '%'),
      calculateSLOStatus('ttfb', body.targets.ttfb, body.currentMetrics?.ttfb, 'ms'),
      calculateSLOStatus('errorRate', body.targets.errorRate, body.currentMetrics?.errorRate, '%'),
      calculateSLOStatus('p95Latency', body.targets.p95Latency, body.currentMetrics?.p95Latency, 'ms')
    ];

    // Determine overall status
    const overallStatus = determineOverallStatus(sloStatuses);

    // Generate SVG badge
    const badgeSvg = generateSLOBadge(overallStatus, sloStatuses);

    // Save badge to public directory
    const publicDir = path.join(process.cwd(), 'public', 'badges');
    await fs.mkdir(publicDir, { recursive: true });
    
    const badgePath = path.join(publicDir, `slo-${body.projectId}.svg`);
    await fs.writeFile(badgePath, badgeSvg);

    // Store SLO configuration
    const sloData = {
      projectId: body.projectId,
      targets: body.targets,
      currentMetrics: body.currentMetrics,
      statuses: sloStatuses,
      overallStatus,
      badgeUrl: `/badges/slo-${body.projectId}.svg`,
      updatedAt: new Date().toISOString()
    };

    // Save to simple file store
    const dataDir = path.join(process.cwd(), 'data', 'slo');
    await fs.mkdir(dataDir, { recursive: true });
    
    const dataPath = path.join(dataDir, `${body.projectId}.json`);
    await fs.writeFile(dataPath, JSON.stringify(sloData, null, 2));

    return NextResponse.json({
      success: true,
      overallStatus,
      statuses: sloStatuses,
      badgeUrl: `/badges/slo-${body.projectId}.svg`,
      targets: body.targets,
      currentMetrics: body.currentMetrics
    });

  } catch (error: any) {
    console.error('SLO configuration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to configure SLO' },
      { status: 500 }
    );
  }
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

    // Read SLO data
    const dataPath = path.join(process.cwd(), 'data', 'slo', `${projectId}.json`);
    
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (e) {
      return NextResponse.json(
        { error: 'SLO data not found' },
        { status: 404 }
      );
    }

  } catch (error: any) {
    console.error('SLO retrieval error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve SLO data' },
      { status: 500 }
    );
  }
}

function calculateSLOStatus(
  metric: string,
  target: number,
  current: number | undefined,
  unit: string
): SLOStatus {
  if (current === undefined) {
    return {
      metric,
      target,
      status: 'unknown',
      message: `No current data for ${metric}`
    };
  }

  let status: 'passing' | 'warning' | 'failing';
  let message: string;

  // Different logic for different metrics
  if (metric === 'uptime') {
    if (current >= target) {
      status = 'passing';
      message = `${current}${unit} meets target of ${target}${unit}`;
    } else if (current >= target * 0.99) {
      status = 'warning';
      message = `${current}${unit} slightly below target of ${target}${unit}`;
    } else {
      status = 'failing';
      message = `${current}${unit} below target of ${target}${unit}`;
    }
  } else if (metric === 'errorRate') {
    if (current <= target) {
      status = 'passing';
      message = `${current}${unit} within target of ${target}${unit}`;
    } else if (current <= target * 1.5) {
      status = 'warning';
      message = `${current}${unit} slightly above target of ${target}${unit}`;
    } else {
      status = 'failing';
      message = `${current}${unit} exceeds target of ${target}${unit}`;
    }
  } else {
    // For latency metrics (lower is better)
    if (current <= target) {
      status = 'passing';
      message = `${current}${unit} within target of ${target}${unit}`;
    } else if (current <= target * 1.2) {
      status = 'warning';
      message = `${current}${unit} slightly above target of ${target}${unit}`;
    } else {
      status = 'failing';
      message = `${current}${unit} exceeds target of ${target}${unit}`;
    }
  }

  return {
    metric,
    target,
    current,
    status,
    message
  };
}

function determineOverallStatus(statuses: SLOStatus[]): 'passing' | 'warning' | 'failing' | 'unknown' {
  const hasFailure = statuses.some(s => s.status === 'failing');
  const hasWarning = statuses.some(s => s.status === 'warning');
  const hasUnknown = statuses.some(s => s.status === 'unknown');
  const allPassing = statuses.every(s => s.status === 'passing');

  if (hasFailure) return 'failing';
  if (hasWarning) return 'warning';
  if (hasUnknown && !allPassing) return 'unknown';
  return 'passing';
}

function generateSLOBadge(
  status: 'passing' | 'warning' | 'failing' | 'unknown',
  statuses: SLOStatus[]
): string {
  const colors = {
    passing: '#10b981',
    warning: '#f59e0b',
    failing: '#ef4444',
    unknown: '#6b7280'
  };

  const statusText = status.charAt(0).toUpperCase() + status.slice(1);
  const color = colors[status];

  // Count passing metrics
  const passingCount = statuses.filter(s => s.status === 'passing').length;
  const totalCount = statuses.length;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" viewBox="0 0 200 20">
  <linearGradient id="gradient">
    <stop offset="0%" style="stop-color:#555;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#444;stop-opacity:1" />
  </linearGradient>
  <rect width="200" height="20" fill="url(#gradient)" rx="3"/>
  <rect x="90" width="110" height="20" fill="${color}" rx="3"/>
  <rect x="90" width="6" height="20" fill="${color}"/>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="45" y="15" fill="#010101" fill-opacity=".3">SLO Status</text>
    <text x="45" y="14">SLO Status</text>
    <text x="145" y="15" fill="#010101" fill-opacity=".3">${statusText} (${passingCount}/${totalCount})</text>
    <text x="145" y="14">${statusText} (${passingCount}/${totalCount})</text>
  </g>
</svg>`;
}
