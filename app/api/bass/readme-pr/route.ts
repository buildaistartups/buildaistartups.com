import { NextRequest, NextResponse } from 'next/server';
import { BASS, validateBASSData } from '@/lib/bass';

// GitHub API configuration
const GITHUB_API = 'https://api.github.com';
const GH_PAT = process.env.GH_PAT; // GitHub Personal Access Token - set in .env.local

export async function POST(req: NextRequest) {
  try {
    if (!GH_PAT) {
      return NextResponse.json(
        { error: 'GitHub PAT not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { projectId, bassData, repoOwner, repoName } = body;

    if (!projectId || !bassData || !repoOwner || !repoName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate BASS data
    const validation = validateBASSData(bassData);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid BASS data', details: validation.errors },
        { status: 400 }
      );
    }

    const bass = bassData as BASS;

    // Generate README content from BASS
    const readmeContent = generateReadmeFromBASS(bass);

    // Create branch name
    const branchName = `bass-readme-${projectId}-${Date.now()}`;

    // Get default branch
    const repoResponse = await fetch(`${GITHUB_API}/repos/${repoOwner}/${repoName}`, {
      headers: {
        'Authorization': `Bearer ${GH_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();
    const defaultBranch = repoData.default_branch;

    // Get latest commit SHA from default branch
    const refResponse = await fetch(
      `${GITHUB_API}/repos/${repoOwner}/${repoName}/git/refs/heads/${defaultBranch}`,
      {
        headers: {
          'Authorization': `Bearer ${GH_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!refResponse.ok) {
      throw new Error(`Failed to get ref: ${refResponse.status}`);
    }

    const refData = await refResponse.json();
    const baseSha = refData.object.sha;

    // Create new branch
    const createBranchResponse = await fetch(
      `${GITHUB_API}/repos/${repoOwner}/${repoName}/git/refs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GH_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: baseSha,
        }),
      }
    );

    if (!createBranchResponse.ok) {
      throw new Error(`Failed to create branch: ${createBranchResponse.status}`);
    }

    // Check if README exists
    let readmeSha: string | undefined;
    const readmeCheckResponse = await fetch(
      `${GITHUB_API}/repos/${repoOwner}/${repoName}/contents/README.md?ref=${defaultBranch}`,
      {
        headers: {
          'Authorization': `Bearer ${GH_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (readmeCheckResponse.ok) {
      const readmeData = await readmeCheckResponse.json();
      readmeSha = readmeData.sha;
    }

    // Create or update README file
    const fileResponse = await fetch(
      `${GITHUB_API}/repos/${repoOwner}/${repoName}/contents/README.md`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GH_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update README from BASS spec for ${bass.metadata.name}`,
          content: Buffer.from(readmeContent).toString('base64'),
          branch: branchName,
          sha: readmeSha,
        }),
      }
    );

    if (!fileResponse.ok) {
      throw new Error(`Failed to update file: ${fileResponse.status}`);
    }

    // Create pull request
    const prResponse = await fetch(
      `${GITHUB_API}/repos/${repoOwner}/${repoName}/pulls`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GH_PAT}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `📄 Update README for ${bass.metadata.name}`,
          body: generatePRDescription(bass),
          head: branchName,
          base: defaultBranch,
        }),
      }
    );

    if (!prResponse.ok) {
      const errorText = await prResponse.text();
      throw new Error(`Failed to create PR: ${prResponse.status} - ${errorText}`);
    }

    const prData = await prResponse.json();

    return NextResponse.json({
      success: true,
      prUrl: prData.html_url,
      prNumber: prData.number,
      branch: branchName,
    });
  } catch (error) {
    console.error('Error creating README PR:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create PR' },
      { status: 500 }
    );
  }
}

function generateReadmeFromBASS(bass: BASS): string {
  const buildScore = bass.metrics.buildScore.overall;
  const scoreEmoji = buildScore >= 80 ? '🚀' : buildScore >= 60 ? '✅' : buildScore >= 40 ? '🔧' : '🏗️';
  
  let readme = `# ${bass.metadata.name}\n\n`;
  readme += `![Build Score](https://img.shields.io/badge/Build_Score-${buildScore}%25-${getScoreColor(buildScore)})\n`;
  readme += `![Stage](https://img.shields.io/badge/Stage-${bass.metadata.stage}-blue)\n`;
  readme += `![Vertical](https://img.shields.io/badge/Vertical-${bass.metadata.vertical}-purple)\n\n`;
  
  readme += `> ${bass.metadata.description}\n\n`;
  
  readme += `## ${scoreEmoji} Build Score: ${buildScore}/100\n\n`;
  readme += `- **Product**: ${bass.metrics.buildScore.components.product}/100\n`;
  readme += `- **Market**: ${bass.metrics.buildScore.components.market}/100\n`;
  readme += `- **Team**: ${bass.metrics.buildScore.components.team}/100\n`;
  readme += `- **Execution**: ${bass.metrics.buildScore.components.execution}/100\n`;
  readme += `- **Finance**: ${bass.metrics.buildScore.components.finance}/100\n\n`;
  
  readme += `## 🎯 Product\n\n`;
  readme += `### Problem\n${bass.product.problem}\n\n`;
  readme += `### Solution\n${bass.product.solution}\n\n`;
  readme += `### Value Proposition\n${bass.product.valueProposition}\n\n`;
  
  if (bass.product.competitiveAdvantage) {
    readme += `### Competitive Advantage\n${bass.product.competitiveAdvantage}\n\n`;
  }
  
  readme += `## 📊 Market\n\n`;
  readme += `- **TAM**: $${formatNumber(bass.product.targetMarket.tam)}\n`;
  readme += `- **SAM**: $${formatNumber(bass.product.targetMarket.sam)}\n`;
  readme += `- **SOM**: $${formatNumber(bass.product.targetMarket.som)}\n\n`;
  
  if (bass.product.targetMarket.segments.length > 0) {
    readme += `### Target Segments\n`;
    bass.product.targetMarket.segments.forEach(segment => {
      readme += `- ${segment}\n`;
    });
    readme += `\n`;
  }
  
  readme += `## 🤖 AI Stack\n\n`;
  readme += `### Models\n`;
  bass.ai.models.forEach(model => {
    readme += `- **${model.name}** (${model.provider}): ${model.purpose}\n`;
  });
  readme += `\n`;
  
  if (bass.ai.retrieval?.enabled) {
    readme += `### Retrieval System\n`;
    readme += `- **Vector Store**: ${bass.ai.retrieval.vectorStore || 'TBD'}\n`;
    readme += `- **Embedding Model**: ${bass.ai.retrieval.embeddingModel || 'TBD'}\n`;
    if (bass.ai.retrieval.dataSources) {
      readme += `- **Data Sources**: ${bass.ai.retrieval.dataSources.map(ds => ds.name).join(', ')}\n`;
    }
    readme += `\n`;
  }
  
  readme += `### Safety & Evaluation\n`;
  readme += `- **Content Filtering**: ${bass.ai.safety.contentFiltering.enabled ? 'Enabled' : 'Disabled'}\n`;
  readme += `- **Evaluation Frequency**: ${bass.ai.evalPolicy.frequency}\n`;
  readme += `- **Monitored Metrics**: ${bass.ai.evalPolicy.metrics.join(', ')}\n\n`;
  
  if (bass.metrics.financial && Object.keys(bass.metrics.financial).length > 0) {
    readme += `## 💰 Financial Metrics\n\n`;
    if (bass.metrics.financial.mrr !== undefined) {
      readme += `- **MRR**: $${formatNumber(bass.metrics.financial.mrr)}\n`;
    }
    if (bass.metrics.financial.arr !== undefined) {
      readme += `- **ARR**: $${formatNumber(bass.metrics.financial.arr)}\n`;
    }
    if (bass.metrics.financial.runway !== undefined) {
      readme += `- **Runway**: ${bass.metrics.financial.runway} months\n`;
    }
    readme += `\n`;
  }
  
  if (bass.roadmap && bass.roadmap.length > 0) {
    readme += `## 🗺️ Roadmap\n\n`;
    bass.roadmap.slice(0, 5).forEach(item => {
      const statusEmoji = item.status === 'completed' ? '✅' : item.status === 'in-progress' ? '🔄' : '📅';
      readme += `- ${statusEmoji} **${item.milestone}** (${item.targetDate})\n`;
    });
    readme += `\n`;
  }
  
  if (bass.responsibleAI) {
    readme += `## 🛡️ Responsible AI\n\n`;
    if (bass.responsibleAI.principles && bass.responsibleAI.principles.length > 0) {
      readme += `### Principles\n`;
      bass.responsibleAI.principles.forEach(principle => {
        readme += `- ${principle}\n`;
      });
      readme += `\n`;
    }
    if (bass.responsibleAI.biasAudits?.frequency && bass.responsibleAI.biasAudits.frequency !== 'never') {
      readme += `- **Bias Audits**: ${bass.responsibleAI.biasAudits.frequency}\n`;
    }
    if (bass.responsibleAI.transparencyReport) {
      readme += `- **Transparency Report**: Published\n`;
    }
    readme += `\n`;
  }
  
  readme += `---\n\n`;
  readme += `*Generated from BASS (Build AI Startups Spec) v${bass.version}*\n`;
  readme += `*Last updated: ${new Date(bass.metadata.updatedAt).toLocaleDateString()}*\n`;
  
  return readme;
}

function generatePRDescription(bass: BASS): string {
  let description = `## 📄 README Update from BASS\n\n`;
  description += `This PR updates the README.md file based on the latest BASS (Build AI Startups Spec) data.\n\n`;
  
  description += `### 📊 Current Metrics\n`;
  description += `- **Build Score**: ${bass.metrics.buildScore.overall}/100\n`;
  description += `- **Stage**: ${bass.metadata.stage}\n`;
  description += `- **Vertical**: ${bass.metadata.vertical}\n\n`;
  
  description += `### 🤖 AI Configuration\n`;
  description += `- **Models**: ${bass.ai.models.length} configured\n`;
  description += `- **Safety**: ${bass.ai.safety.contentFiltering.enabled ? 'Enabled' : 'Disabled'}\n`;
  description += `- **Evaluation**: ${bass.ai.evalPolicy.frequency}\n\n`;
  
  description += `### ✅ Checklist\n`;
  description += `- [ ] Review README content for accuracy\n`;
  description += `- [ ] Verify all metrics are current\n`;
  description += `- [ ] Check for sensitive information\n`;
  description += `- [ ] Approve for public visibility\n\n`;
  
  description += `---\n`;
  description += `*Auto-generated by Build AI Startups Platform*\n`;
  
  return description;
}

function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'brightgreen';
  if (score >= 60) return 'green';
  if (score >= 40) return 'yellow';
  return 'orange';
}
