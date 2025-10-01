// lib/trends.ts - Trend seeds + copy for Builder context

export type TrendId = 
  | 'gen-ai' 
  | 'agents' 
  | 'compliance-heavy' 
  | 'low-code-saas' 
  | 'bootstrapper'

export interface TrendPreset {
  id: string
  label: string
  trends: TrendId[]
  description: string
  quizSeeds: {
    // Seeds that influence quiz defaults
    preferredStack?: string[]
    budgetRange?: 'micro' | 'bootstrap' | 'funded'
    timeframe?: 'sprint' | 'quarter' | 'year'
    complianceLevel?: 'basic' | 'enhanced' | 'enterprise'
    marketApproach?: 'product-led' | 'sales-led' | 'community-led'
  }
  planInfluence: {
    // How this affects plan generation
    prioritizeFeatures?: string[]
    suggestIntegrations?: string[]
    recommendChannels?: string[]
    warningFlags?: string[]
  }
}

export const TREND_PRESETS: Record<string, TrendPreset> = {
  'ai-first': {
    id: 'ai-first',
    label: 'AI-First Builder',
    trends: ['gen-ai', 'agents'],
    description: 'Building with GenAI/agents at the core',
    quizSeeds: {
      preferredStack: ['python', 'typescript', 'react', 'fastapi'],
      budgetRange: 'bootstrap',
      timeframe: 'quarter',
      complianceLevel: 'enhanced',
      marketApproach: 'product-led'
    },
    planInfluence: {
      prioritizeFeatures: ['ai-integration', 'prompt-engineering', 'model-monitoring'],
      suggestIntegrations: ['openai', 'anthropic', 'pinecone', 'langchain'],
      recommendChannels: ['product-hunt', 'ai-twitter', 'hacker-news'],
      warningFlags: ['data-privacy', 'model-costs', 'latency-expectations']
    }
  },

  'regulated': {
    id: 'regulated',
    label: 'Compliance-Heavy',
    trends: ['compliance-heavy'],
    description: 'FinTech, HealthTech, or other regulated spaces',
    quizSeeds: {
      preferredStack: ['typescript', 'postgresql', 'aws'],
      budgetRange: 'funded',
      timeframe: 'year',
      complianceLevel: 'enterprise',
      marketApproach: 'sales-led'
    },
    planInfluence: {
      prioritizeFeatures: ['audit-logging', 'encryption', 'role-based-access', 'data-residency'],
      suggestIntegrations: ['auth0', 'vault', 'datadog', 'compliance-apis'],
      recommendChannels: ['industry-events', 'partnerships', 'direct-sales'],
      warningFlags: ['regulatory-requirements', 'certification-timeline', 'audit-readiness']
    }
  },

  'scrappy': {
    id: 'scrappy',
    label: 'Bootstrapper',
    trends: ['bootstrapper', 'low-code-saas'],
    description: 'Lean, fast, revenue-focused approach',
    quizSeeds: {
      preferredStack: ['nextjs', 'typescript', 'supabase', 'vercel'],
      budgetRange: 'micro',
      timeframe: 'sprint',
      complianceLevel: 'basic',
      marketApproach: 'product-led'
    },
    planInfluence: {
      prioritizeFeatures: ['stripe-integration', 'analytics', 'simple-auth', 'landing-page'],
      suggestIntegrations: ['stripe', 'plausible', 'resend', 'vercel'],
      recommendChannels: ['indie-hackers', 'twitter', 'direct-marketing'],
      warningFlags: ['feature-creep', 'premature-optimization', 'tech-debt']
    }
  },

  'enterprise': {
    id: 'enterprise',
    label: 'Enterprise SaaS',
    trends: ['low-code-saas'],
    description: 'B2B SaaS targeting larger organizations',
    quizSeeds: {
      preferredStack: ['typescript', 'react', 'postgresql', 'kubernetes'],
      budgetRange: 'funded',
      timeframe: 'year',
      complianceLevel: 'enterprise',
      marketApproach: 'sales-led'
    },
    planInfluence: {
      prioritizeFeatures: ['sso-integration', 'rbac', 'api-access', 'white-labeling'],
      suggestIntegrations: ['auth0', 'stripe', 'salesforce', 'slack'],
      recommendChannels: ['cold-outreach', 'partnerships', 'content-marketing'],
      warningFlags: ['sales-cycle-length', 'integration-complexity', 'support-overhead']
    }
  }
}

// Helper functions for applying trends
export function getTrendSeeds(trendIds: TrendId[]): TrendPreset['quizSeeds'] {
  // Merge all applicable presets, with later trends overriding earlier ones
  const applicablePresets = Object.values(TREND_PRESETS).filter(preset =>
    preset.trends.some(trend => trendIds.includes(trend))
  )

  return applicablePresets.reduce((merged, preset) => ({
    ...merged,
    ...preset.quizSeeds
  }), {} as TrendPreset['quizSeeds'])
}

export function getTrendInfluence(trendIds: TrendId[]): TrendPreset['planInfluence'] {
  const applicablePresets = Object.values(TREND_PRESETS).filter(preset =>
    preset.trends.some(trend => trendIds.includes(trend))
  )

  // Merge arrays and remove duplicates
  return applicablePresets.reduce((merged, preset) => ({
    prioritizeFeatures: Array.from(new Set([
      ...(merged.prioritizeFeatures || []),
      ...(preset.planInfluence.prioritizeFeatures || [])
    ])),
    suggestIntegrations: Array.from(new Set([
      ...(merged.suggestIntegrations || []),
      ...(preset.planInfluence.suggestIntegrations || [])
    ])),
    recommendChannels: Array.from(new Set([
      ...(merged.recommendChannels || []),
      ...(preset.planInfluence.recommendChannels || [])
    ])),
    warningFlags: Array.from(new Set([
      ...(merged.warningFlags || []),
      ...(preset.planInfluence.warningFlags || [])
    ]))
  }), {} as TrendPreset['planInfluence'])
}

// Prompt seeds for different contexts
export const TREND_PROMPTS = {
  quiz: {
    'gen-ai': `Consider this user is building an AI-powered product. Weight questions toward:
- AI/ML integration complexity
- Data pipeline requirements  
- Model monitoring and evaluation
- Prompt engineering workflows
- API rate limits and costs`,

    'agents': `This user is building agent-based systems. Focus on:
- Multi-step reasoning capabilities
- Tool integration and function calling
- Agent orchestration patterns
- Human-in-the-loop workflows
- Safety and reliability measures`,

    'compliance-heavy': `This user operates in a regulated environment. Emphasize:
- Data governance and privacy
- Audit trail requirements
- Security and encryption
- Role-based access controls
- Regulatory compliance timelines`,

    'low-code-saas': `This user prefers rapid, low-code approaches. Suggest:
- Pre-built components and templates
- Visual workflow builders
- Third-party integrations
- Quick deployment options
- Minimal custom code requirements`,

    'bootstrapper': `This user is bootstrapping with limited resources. Prioritize:
- Cost-effective solutions
- Revenue generation features
- Simple deployment options
- Minimal maintenance overhead
- Fast time-to-market approaches`
  },

  plan: {
    'gen-ai': `For AI-powered products, include sections on:
- Model selection and fine-tuning strategy
- Data collection and labeling pipeline
- Evaluation metrics and monitoring
- Cost optimization and scaling
- Responsible AI considerations`,

    'agents': `For agent-based systems, address:
- Agent architecture and communication patterns
- Tool ecosystem and API integrations
- Error handling and recovery mechanisms
- Performance monitoring and debugging
- Human oversight and control systems`,

    'compliance-heavy': `For regulated environments, ensure coverage of:
- Compliance framework mapping
- Data governance and retention policies
- Security architecture and controls
- Audit and reporting mechanisms
- Risk assessment and mitigation`,

    'low-code-saas': `For low-code SaaS approaches, emphasize:
- Platform selection and vendor evaluation
- Integration patterns and data flow
- Customization vs. configuration trade-offs
- Scalability within platform constraints
- Migration and exit strategy planning`,

    'bootstrapper': `For bootstrapped ventures, focus on:
- Lean MVP definition and validation
- Revenue model and pricing strategy
- Customer acquisition cost optimization
- Operational efficiency and automation
- Growth hacking and viral mechanics`
  }
}

export function getTrendPrompt(context: 'quiz' | 'plan', trendIds: TrendId[]): string {
  const relevantPrompts = trendIds
    .map(id => TREND_PROMPTS[context][id])
    .filter(Boolean)

  if (relevantPrompts.length === 0) return ''

  return `Context: Current trends indicate this user is focused on: ${trendIds.join(', ')}\n\n${relevantPrompts.join('\n\n')}`
}
