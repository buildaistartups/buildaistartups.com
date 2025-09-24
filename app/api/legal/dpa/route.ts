import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Octokit } from '@octokit/rest';

interface DPARequest {
  projectId: string;
  repoOwner: string;
  repoName: string;
  processorInfo: {
    companyName: string;
    contactEmail: string;
    dpoEmail: string;
    address: string;
  };
  processingDetails: {
    purposes: string[];
    dataTypes: string[];
    subProcessors: Array<{
      name: string;
      location: string;
      service: string;
    }>;
    technicalMeasures: string[];
    organizationalMeasures: string[];
    retentionPeriod: string;
    deletionProcess: string;
  };
  transferMechanisms: {
    sccs: boolean;
    bcrs: boolean;
    adequacyDecision: boolean;
    other: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const body: DPARequest = await req.json();
    
    if (!body.projectId || !body.repoOwner || !body.repoName || !body.processorInfo || !body.processingDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate DPA content
    const dpaContent = generateDPAMarkdown(body);

    // Create PR using GitHub API
    const octokit = new Octokit({
      auth: process.env.GH_PAT // GitHub Personal Access Token
    });

    // Create a new branch
    const branchName = `dpa-${body.projectId}-${Date.now()}`;
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

    // Create or update dpa.md file
    const filePath = 'legal/dpa.md';
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

    const fileContent = Buffer.from(dpaContent).toString('base64');
    
    await octokit.repos.createOrUpdateFileContents({
      owner: body.repoOwner,
      repo: body.repoName,
      path: filePath,
      message: `Update Data Processing Agreement for ${body.projectId}`,
      content: fileContent,
      branch: branchName,
      sha: existingFile ? (existingFile.data as any).sha : undefined
    });

    // Create pull request
    const pr = await octokit.pulls.create({
      owner: body.repoOwner,
      repo: body.repoName,
      title: `Data Processing Agreement Update - ${body.projectId}`,
      body: generateDPAPRDescription(body),
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
    console.error('DPA PR creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create DPA PR' },
      { status: 500 }
    );
  }
}

function generateDPAMarkdown(data: DPARequest): string {
  const today = new Date().toISOString().split('T')[0];
  
  return `# Data Processing Agreement (DPA)

**Effective Date:** ${today}

## 1. Parties

**Data Controller:** [Customer Name]  
**Data Processor:** ${data.processorInfo.companyName}

### Processor Contact Information
- **Company:** ${data.processorInfo.companyName}
- **Address:** ${data.processorInfo.address}
- **Contact Email:** ${data.processorInfo.contactEmail}
- **Data Protection Officer:** ${data.processorInfo.dpoEmail}

## 2. Processing Details

### 2.1 Purpose of Processing
The Processor shall process Personal Data only for the following purposes:
${data.processingDetails.purposes.map(p => `- ${p}`).join('\n')}

### 2.2 Types of Personal Data
The following types of Personal Data may be processed:
${data.processingDetails.dataTypes.map(t => `- ${t}`).join('\n')}

### 2.3 Duration of Processing
- **Retention Period:** ${data.processingDetails.retentionPeriod}
- **Deletion Process:** ${data.processingDetails.deletionProcess}

## 3. Sub-processors

${data.processingDetails.subProcessors.length > 0 ? `The Processor engages the following sub-processors:

| Sub-processor | Location | Service |
|--------------|----------|---------|
${data.processingDetails.subProcessors.map(sp => 
  `| ${sp.name} | ${sp.location} | ${sp.service} |`
).join('\n')}` : 'No sub-processors are currently engaged.'}

The Controller consents to the engagement of the sub-processors listed above.

## 4. Security Measures

### 4.1 Technical Measures
The Processor implements the following technical security measures:
${data.processingDetails.technicalMeasures.map(m => `- ${m}`).join('\n')}

### 4.2 Organizational Measures
The Processor implements the following organizational security measures:
${data.processingDetails.organizationalMeasures.map(m => `- ${m}`).join('\n')}

## 5. International Data Transfers

For transfers of Personal Data outside the EEA, the following safeguards apply:

${data.transferMechanisms.sccs ? '- ✅ Standard Contractual Clauses (SCCs)' : ''}
${data.transferMechanisms.bcrs ? '- ✅ Binding Corporate Rules (BCRs)' : ''}
${data.transferMechanisms.adequacyDecision ? '- ✅ Adequacy Decision' : ''}
${data.transferMechanisms.other ? `- ${data.transferMechanisms.other}` : ''}

## 6. Processor Obligations

The Processor shall:
1. Process Personal Data only on documented instructions from the Controller
2. Ensure persons authorized to process Personal Data are bound by confidentiality
3. Implement appropriate technical and organizational measures
4. Assist the Controller in responding to data subject requests
5. Make available all information necessary to demonstrate compliance
6. Allow for and contribute to audits and inspections
7. Notify the Controller without undue delay of any Personal Data breach

## 7. Controller Obligations

The Controller shall:
1. Ensure that the processing of Personal Data is lawful
2. Provide clear and documented instructions
3. Ensure appropriate safeguards for international transfers
4. Make decisions regarding sub-processors within reasonable time

## 8. Data Subject Rights

The Processor shall assist the Controller in fulfilling obligations to respond to requests for:
- Access to Personal Data
- Rectification of Personal Data
- Erasure of Personal Data
- Restriction of processing
- Data portability
- Objection to processing

## 9. Audit Rights

The Controller has the right to:
- Conduct audits of the Processor's compliance
- Request evidence of compliance with this DPA
- Inspect processing facilities with reasonable notice

## 10. Liability and Indemnification

Each party shall be liable for its own breaches of data protection law. The Processor shall indemnify the Controller for damages resulting from the Processor's breach of this DPA.

## 11. Term and Termination

This DPA shall remain in effect for the duration of the Processing of Personal Data. Upon termination, the Processor shall, at the Controller's option, delete or return all Personal Data.

## 12. Governing Law

This DPA shall be governed by the laws of [Jurisdiction].

---

**Signatures**

_Controller:_ _______________________ Date: _______

_Processor:_ _______________________ Date: _______

---

*This DPA was automatically generated on ${today} based on processing requirements.*`;
}

function generateDPAPRDescription(data: DPARequest): string {
  return `## Data Processing Agreement Update

This PR adds/updates the Data Processing Agreement (DPA) for GDPR compliance.

### Key Details
- **Processor:** ${data.processorInfo.companyName}
- **Sub-processors:** ${data.processingDetails.subProcessors.length} entities
- **Data Types:** ${data.processingDetails.dataTypes.length} categories
- **Retention:** ${data.processingDetails.retentionPeriod}

### Transfer Mechanisms
${data.transferMechanisms.sccs ? '- ✅ SCCs implemented' : '- ⚠️ SCCs not implemented'}
${data.transferMechanisms.bcrs ? '- ✅ BCRs in place' : '- ⚠️ BCRs not in place'}
${data.transferMechanisms.adequacyDecision ? '- ✅ Adequacy decision applicable' : '- ⚠️ No adequacy decision'}

### Review Checklist
- [ ] Legal review completed
- [ ] Sub-processor list verified
- [ ] Security measures validated
- [ ] Transfer mechanisms confirmed
- [ ] Controller approval obtained

### Compliance Impact
This DPA ensures GDPR Article 28 compliance for data processing activities.

cc: @legal-team @dpo @compliance`;
}
