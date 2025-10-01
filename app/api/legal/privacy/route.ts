import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Octokit } from '@octokit/rest';

interface PrivacyPRRequest {
  projectId: string;
  repoOwner: string;
  repoName: string;
  bassData: {
    dataFlows: Array<{
      source: string;
      destination: string;
      dataType: string;
      purpose: string;
      retention: string;
      encryption: boolean;
    }>;
    dataCategories: string[];
    thirdParties: string[];
    dataSubjects: string[];
    legalBasis: string;
    gdprCompliant: boolean;
    ccpaCompliant: boolean;
  };
}

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers(); // ✅ Added 'await' here
    const authHeader = headersList.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const body: PrivacyPRRequest = await req.json();
    
    if (!body.projectId || !body.repoOwner || !body.repoName || !body.bassData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate privacy.md content from BASS data
    const privacyContent = generatePrivacyMarkdown(body.bassData);

    // Create PR using GitHub API
    const octokit = new Octokit({
      auth: process.env.GH_PAT // GitHub Personal Access Token
    });

    // Create a new branch
    const branchName = `privacy-policy-${body.projectId}-${Date.now()}`;
    const baseBranch = 'main';

    // Get base branch reference
    const baseRef = await octokit.git.getRef({
      owner: body.repoOwner,
      repo: body.repoName,
      ref: `heads/${baseBranch}`
    });

    // Create new branch
    await octokit.git.createRef({
      owner: body.repoOwner,
      repo: body.repoName,
      ref: `refs/heads/${branchName}`,
      sha: baseRef.data.object.sha
    });

    // Create or update privacy.md file
    const filePath = 'legal/privacy.md';
    let existingFile;
    try {
      existingFile = await octokit.repos.getContent({
        owner: body.repoOwner,
        repo: body.repoName,
        path: filePath,
        ref: baseBranch
      });
    } catch (e) {
      // File doesn't exist, will create it
    }

    const fileContent = Buffer.from(privacyContent).toString('base64');
    
    await octokit.repos.createOrUpdateFileContents({
      owner: body.repoOwner,
      repo: body.repoName,
      path: filePath,
      message: `Update privacy policy for ${body.projectId}`,
      content: fileContent,
      branch: branchName,
      sha: existingFile ? (existingFile.data as any).sha : undefined
    });

    // Create pull request
    const pr = await octokit.pulls.create({
      owner: body.repoOwner,
      repo: body.repoName,
      title: `Privacy Policy Update - ${body.projectId}`,
      body: generatePRDescription(body.bassData),
      head: branchName,
      base: baseBranch
    });

    return NextResponse.json({
      success: true,
      prUrl: pr.data.html_url,
      prNumber: pr.data.number,
      branch: branchName
    });

  } catch (error: any) {
    console.error('Privacy PR creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create privacy PR' },
      { status: 500 }
    );
  }
}

function generatePrivacyMarkdown(bassData: PrivacyPRRequest['bassData']): string {
  const today = new Date().toISOString().split('T')[0];
  
  return `# Privacy Policy

**Last Updated:** ${today}

## 1. Data Collection and Processing

### Data Categories
We collect and process the following categories of personal data:
${bassData.dataCategories.map(cat => `- ${cat}`).join('\n')}

### Data Subjects
This policy applies to:
${bassData.dataSubjects.map(subj => `- ${subj}`).join('\n')}

### Legal Basis
Our legal basis for processing personal data: **${bassData.legalBasis}**

## 2. Data Flows

We process data through the following flows:

${bassData.dataFlows.map((flow, idx) => `
### Flow ${idx + 1}: ${flow.source} → ${flow.destination}
- **Data Type:** ${flow.dataType}
- **Purpose:** ${flow.purpose}
- **Retention Period:** ${flow.retention}
- **Encryption:** ${flow.encryption ? 'Yes (in transit and at rest)' : 'No'}
`).join('\n')}

## 3. Third-Party Sharing

${bassData.thirdParties.length > 0 ? `We share data with the following third parties:
${bassData.thirdParties.map(tp => `- ${tp}`).join('\n')}` : 'We do not share personal data with third parties.'}

## 4. Compliance

### GDPR Compliance
${bassData.gdprCompliant ? `✅ **Compliant** - We meet all GDPR requirements including:
- Right to access
- Right to rectification
- Right to erasure
- Right to data portability
- Right to object
- Rights related to automated decision-making` : '⚠️ **In Progress** - We are working towards full GDPR compliance.'}

### CCPA Compliance
${bassData.ccpaCompliant ? `✅ **Compliant** - We meet all CCPA requirements including:
- Right to know
- Right to delete
- Right to opt-out
- Right to non-discrimination` : '⚠️ **In Progress** - We are working towards full CCPA compliance.'}

## 5. Data Security

We implement appropriate technical and organizational measures to protect personal data:
- Encryption in transit and at rest
- Access controls and authentication
- Regular security audits
- Incident response procedures
- Employee training

## 6. User Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Object to processing
- Request data portability
- Withdraw consent

To exercise these rights, contact: privacy@example.com

## 7. Contact Information

**Data Protection Officer**  
Email: dpo@example.com  
Address: [Your Company Address]

## 8. Changes to This Policy

We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.

---

*This privacy policy was automatically generated from BASS.ai data flows on ${today}.*`;
}

function generatePRDescription(bassData: PrivacyPRRequest['bassData']): string {
  return `## Privacy Policy Update

This PR updates the privacy policy based on the latest BASS.ai data flow analysis.

### Summary of Changes
- Updated data categories (${bassData.dataCategories.length} categories)
- Documented ${bassData.dataFlows.length} data flows
- Updated third-party list (${bassData.thirdParties.length} parties)
- Compliance status:
  - GDPR: ${bassData.gdprCompliant ? '✅ Compliant' : '⚠️ In Progress'}
  - CCPA: ${bassData.ccpaCompliant ? '✅ Compliant' : '⚠️ In Progress'}

### Verification Checklist
- [ ] Review data flow accuracy
- [ ] Verify third-party list completeness
- [ ] Confirm retention periods
- [ ] Validate compliance statements
- [ ] Legal team approval

### Related Issues
- Implements privacy requirements from BASS.ai analysis
- Part of ops/legal compliance track

cc: @legal-team @privacy-officer`;
}
