import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface EvidenceEntry {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  verified: boolean;
}

interface BuildScore {
  overall: number;
  finance: number;
  product: number;
  market: number;
  growth: number;
  opsLegal: number;
}

interface EvalResult {
  evalId: string;
  score: number;
  status: 'passed' | 'failed' | 'pending';
  timestamp: string;
}

interface ProjectData {
  name: string;
  description: string;
  stage: string;
  founder: string;
  evidenceLedger: EvidenceEntry[];
  buildScore: BuildScore;
  lastEval?: EvalResult;
  financeReadiness: {
    runway: string;
    burnRate: string;
    revenue: string;
    fundingStage: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // In production, fetch from your data store
    // For now, using mock data structure
    const projectData: ProjectData = {
      name: `Project ${projectId}`,
      description: 'AI-powered startup building the future of automation',
      stage: 'Seed',
      founder: 'John Doe',
      evidenceLedger: [
        {
          id: '1',
          date: '2024-01-15',
          category: 'Product',
          title: 'MVP Launch',
          description: 'Successfully launched MVP with 100 beta users',
          impact: 'high',
          verified: true
        },
        {
          id: '2',
          date: '2024-01-20',
          category: 'Market',
          title: 'Customer Validation',
          description: '85% positive feedback from early adopters',
          impact: 'high',
          verified: true
        },
        {
          id: '3',
          date: '2024-02-01',
          category: 'Finance',
          title: 'First Revenue',
          description: 'Achieved $10K MRR milestone',
          impact: 'medium',
          verified: true
        }
      ],
      buildScore: {
        overall: 78,
        finance: 72,
        product: 85,
        market: 80,
        growth: 75,
        opsLegal: 70
      },
      lastEval: {
        evalId: 'eval_123',
        score: 82,
        status: 'passed',
        timestamp: '2024-02-15T10:30:00Z'
      },
      financeReadiness: {
        runway: '18 months',
        burnRate: '$50K/month',
        revenue: '$10K MRR',
        fundingStage: 'Pre-Seed'
      }
    };

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();

    // Load fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let yPosition = height - 50;

    // Header
    page.drawText('INVESTOR ONE-PAGER', {
      x: 50,
      y: yPosition,
      size: 24,
      font: helveticaBold,
      color: rgb(0, 0, 0)
    });

    yPosition -= 30;

    // Project Info
    page.drawText(projectData.name, {
      x: 50,
      y: yPosition,
      size: 18,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.8)
    });

    yPosition -= 20;
    page.drawText(projectData.description, {
      x: 50,
      y: yPosition,
      size: 11,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3)
    });

    yPosition -= 15;
    page.drawText(`Founder: ${projectData.founder} | Stage: ${projectData.stage}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4)
    });

    yPosition -= 35;

    // Build Score Section
    page.drawText('BUILD SCORE', {
      x: 50,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0)
    });

    // Overall score (large)
    yPosition -= 25;
    page.drawText(`${projectData.buildScore.overall}`, {
      x: 50,
      y: yPosition,
      size: 36,
      font: helveticaBold,
      color: projectData.buildScore.overall >= 70 ? rgb(0, 0.6, 0) : rgb(0.8, 0.4, 0)
    });

    page.drawText('/100', {
      x: 95,
      y: yPosition + 5,
      size: 14,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5)
    });

    // Score breakdown
    yPosition -= 20;
    const scores = [
      { label: 'Finance', value: projectData.buildScore.finance },
      { label: 'Product', value: projectData.buildScore.product },
      { label: 'Market', value: projectData.buildScore.market },
      { label: 'Growth', value: projectData.buildScore.growth },
      { label: 'Ops/Legal', value: projectData.buildScore.opsLegal }
    ];

    let xOffset = 50;
    for (const score of scores) {
      page.drawText(`${score.label}: ${score.value}`, {
        x: xOffset,
        y: yPosition,
        size: 10,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3)
      });
      xOffset += 100;
    }

    yPosition -= 35;

    // AI Eval Status
    if (projectData.lastEval) {
      page.drawText('AI EVALUATION', {
        x: 50,
        y: yPosition,
        size: 14,
        font: helveticaBold,
        color: rgb(0, 0, 0)
      });

      yPosition -= 20;
      const evalColor = projectData.lastEval.status === 'passed' 
        ? rgb(0, 0.6, 0) 
        : projectData.lastEval.status === 'failed' 
        ? rgb(0.8, 0, 0)
        : rgb(0.5, 0.5, 0);

      page.drawText(`Status: ${projectData.lastEval.status.toUpperCase()}`, {
        x: 50,
        y: yPosition,
        size: 11,
        font: helveticaBold,
        color: evalColor
      });

      page.drawText(`Score: ${projectData.lastEval.score}/100`, {
        x: 200,
        y: yPosition,
        size: 11,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3)
      });

      page.drawText(`Last Run: ${new Date(projectData.lastEval.timestamp).toLocaleDateString()}`, {
        x: 320,
        y: yPosition,
        size: 11,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3)
      });

      yPosition -= 35;
    }

    // Finance Readiness
    page.drawText('FINANCE READINESS', {
      x: 50,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0)
    });

    yPosition -= 20;
    const financeItems = [
      { label: 'Runway', value: projectData.financeReadiness.runway },
      { label: 'Burn Rate', value: projectData.financeReadiness.burnRate },
      { label: 'Revenue', value: projectData.financeReadiness.revenue },
      { label: 'Stage', value: projectData.financeReadiness.fundingStage }
    ];

    for (const item of financeItems) {
      page.drawText(`${item.label}:`, {
        x: 50,
        y: yPosition,
        size: 10,
        font: helvetica,
        color: rgb(0.4, 0.4, 0.4)
      });
      page.drawText(item.value, {
        x: 120,
        y: yPosition,
        size: 10,
        font: helveticaBold,
        color: rgb(0.2, 0.2, 0.2)
      });
      yPosition -= 18;
    }

    yPosition -= 20;

    // Evidence Ledger Highlights
    page.drawText('KEY EVIDENCE HIGHLIGHTS', {
      x: 50,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0)
    });

    yPosition -= 25;

    // Show top verified high-impact evidence
    const highlights = projectData.evidenceLedger
      .filter(e => e.verified && e.impact === 'high')
      .slice(0, 4);

    for (const evidence of highlights) {
      // Draw impact indicator
      const impactColor = evidence.impact === 'high' 
        ? rgb(0, 0.6, 0) 
        : evidence.impact === 'medium' 
        ? rgb(1, 0.7, 0)
        : rgb(0.5, 0.5, 0.5);

      page.drawCircle({
        x: 55,
        y: yPosition + 4,
        size: 3,
        color: impactColor
      });

      // Category badge
      page.drawText(`[${evidence.category}]`, {
        x: 65,
        y: yPosition,
        size: 9,
        font: helveticaBold,
        color: rgb(0.4, 0.4, 0.8)
      });

      // Title
      page.drawText(evidence.title, {
        x: 130,
        y: yPosition,
        size: 10,
        font: helveticaBold,
        color: rgb(0.2, 0.2, 0.2)
      });

      yPosition -= 15;

      // Description
      const descriptionLines = wrapText(evidence.description, 60);
      for (const line of descriptionLines) {
        page.drawText(line, {
          x: 130,
          y: yPosition,
          size: 9,
          font: helvetica,
          color: rgb(0.4, 0.4, 0.4)
        });
        yPosition -= 12;
      }

      // Date
      page.drawText(new Date(evidence.date).toLocaleDateString(), {
        x: 130,
        y: yPosition,
        size: 8,
        font: helvetica,
        color: rgb(0.6, 0.6, 0.6)
      });

      yPosition -= 20;
    }

    // Footer
    yPosition = 50;
    page.drawLine({
      start: { x: 50, y: yPosition + 20 },
      end: { x: width - 50, y: yPosition + 20 },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8)
    });

    page.drawText(`Generated: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: yPosition,
      size: 8,
      font: helvetica,
      color: rgb(0.6, 0.6, 0.6)
    });

    page.drawText('Build AI Startups - Investor One-Pager', {
      x: width - 200,
      y: yPosition,
      size: 8,
      font: helvetica,
      color: rgb(0.6, 0.6, 0.6)
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Return PDF as response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="investor-onepager-${projectId}.pdf"`
      }
    });

  } catch (error) {
    console.error('Error generating investor one-pager:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

// Helper function to wrap text
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 2); // Max 2 lines for description
}
