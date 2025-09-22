import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import bassSchema from './bass.schema.json';

// Initialize Ajv with draft-07 support
const ajv = new Ajv({
  strict: false,
  allErrors: true,
  verbose: true,
  schemaId: 'auto',
  discriminator: true,
});

// Add format validators
addFormats(ajv);

// Compile the schema
export const validateBASS = ajv.compile(bassSchema);

// TypeScript types derived from schema
export interface BASS {
  version: '0.1';
  projectId: string;
  metadata: BASSMetadata;
  product: BASSProduct;
  ai: BASSAI;
  pages?: BASSPages;
  metrics: BASSMetrics;
  finance?: BASSFinance;
  roadmap?: BASSRoadmap[];
  responsibleAI?: BASSResponsibleAI;
}

export interface BASSMetadata {
  name: string;
  description: string;
  stage: 'ideation' | 'validation' | 'mvp' | 'growth' | 'scale' | 'maturity';
  vertical: 'ai-leadgen' | 'ai-support' | 'ai-analytics' | 'ai-automation' | 'ai-content' | 'ai-finance' | 'ai-health' | 'ai-education' | 'other';
  teamSize?: number;
  fundingStage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'ipo' | 'bootstrapped';
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface BASSProduct {
  problem: string;
  solution: string;
  targetMarket: {
    segments: string[];
    tam: number;
    sam: number;
    som: number;
    geography?: string[];
  };
  valueProposition: string;
  competitiveAdvantage?: string;
  businessModel?: 'b2b-saas' | 'b2c-subscription' | 'marketplace' | 'api' | 'freemium' | 'enterprise' | 'usage-based' | 'hybrid';
  pricing?: {
    model?: 'subscription' | 'usage' | 'flat' | 'tiered' | 'freemium' | 'custom';
    tiers?: Array<{
      name: string;
      price: number;
      features?: string[];
    }>;
  };
}

export interface BASSAI {
  models: Array<{
    name: string;
    provider: 'openai' | 'anthropic' | 'google' | 'meta' | 'mistral' | 'cohere' | 'huggingface' | 'replicate' | 'custom';
    purpose: string;
    version: string;
    fineTuned?: boolean;
    deployment?: 'api' | 'self-hosted' | 'edge' | 'embedded';
    costPerMillionTokens?: {
      input?: number;
      output?: number;
    };
  }>;
  retrieval?: {
    enabled?: boolean;
    vectorStore?: 'pinecone' | 'weaviate' | 'chroma' | 'qdrant' | 'milvus' | 'pgvector' | 'redis' | 'custom';
    embeddingModel?: string;
    chunkSize?: number;
    topK?: number;
    dataSources?: Array<{
      type: 'documents' | 'api' | 'database' | 'web' | 'custom';
      name: string;
      updateFrequency?: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'manual';
    }>;
  };
  dataStrategy: {
    collection: 'minimal' | 'standard' | 'comprehensive';
    privacy: {
      gdprCompliant: boolean;
      ccpaCompliant: boolean;
      dataEncryption: boolean;
      anonymization?: boolean;
    };
    retention: {
      days: number;
      policy?: string;
    };
    training?: {
      userDataForTraining?: boolean;
      syntheticDataGeneration?: boolean;
    };
  };
  evalPolicy: {
    frequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
    metrics: Array<'accuracy' | 'latency' | 'cost' | 'user-satisfaction' | 'safety' | 'bias' | 'hallucination' | 'relevance' | 'coherence' | 'custom'>;
    thresholds?: {
      accuracy?: number;
      latencyMs?: number;
      costPerRequest?: number;
      safetyScore?: number;
    };
    humanInLoop?: boolean;
    automatedTesting?: boolean;
  };
  safety: {
    contentFiltering: {
      enabled: boolean;
      categories: Array<'hate' | 'violence' | 'sexual' | 'self-harm' | 'pii' | 'misinformation' | 'copyright' | 'custom'>;
      threshold?: 'strict' | 'moderate' | 'minimal';
    };
    monitoring: {
      realtime: boolean;
      logging: 'none' | 'errors' | 'warnings' | 'info' | 'debug' | 'all';
      alerting?: boolean;
    };
    fallback: {
      strategy: 'graceful-degradation' | 'manual-review' | 'alternative-model' | 'error-message';
      message?: string;
    };
    redTeaming?: boolean;
    biasDetection?: boolean;
  };
  agents?: Array<{
    name: string;
    type: 'conversational' | 'task' | 'autonomous' | 'collaborative' | 'specialized';
    capabilities: string[];
    tools?: string[];
    autonomyLevel?: 'none' | 'low' | 'medium' | 'high' | 'full';
  }>;
}

export interface BASSPages {
  frontPorch?: {
    start?: BASSPageStatus;
    validate?: BASSPageStatus;
    plan?: BASSPageStatus;
  };
  core?: {
    builder?: BASSPageStatus;
    ecosystem?: BASSPageStatus;
    marketplace?: BASSPageStatus;
    api?: BASSPageStatus;
  };
  backPorch?: {
    grow?: BASSPageStatus;
    finance?: BASSPageStatus;
    evals?: BASSPageStatus;
    investor?: BASSPageStatus;
  };
  lanes?: {
    product?: BASSPageStatus;
    market?: BASSPageStatus;
    growth?: BASSPageStatus;
    opsLegal?: BASSPageStatus;
  };
}

export interface BASSPageStatus {
  complete?: boolean;
  score?: number;
  lastUpdated?: string;
}

export interface BASSMetrics {
  buildScore: {
    overall: number;
    components: {
      product: number;
      market: number;
      team: number;
      execution: number;
      finance: number;
    };
    trend?: 'up' | 'stable' | 'down';
    lastUpdated?: string;
  };
  financial?: {
    mrr?: number;
    arr?: number;
    burnRate?: number;
    runway?: number;
    ltv?: number;
    cac?: number;
    grossMargin?: number;
  };
  operational?: {
    users?: {
      total?: number;
      active?: number;
      paid?: number;
      churn?: number;
      nps?: number;
    };
    ai?: {
      requestsPerDay?: number;
      avgLatencyMs?: number;
      errorRate?: number;
      tokenUsage?: {
        daily?: number;
        monthly?: number;
      };
      modelCosts?: {
        daily?: number;
        monthly?: number;
      };
    };
  };
  growth?: {
    momGrowth?: number;
    yoyGrowth?: number;
    viralCoefficient?: number;
    referralRate?: number;
  };
}

export interface BASSFinance {
  grants?: Array<{
    name: string;
    provider?: string;
    amount: number;
    status: 'researching' | 'applied' | 'approved' | 'rejected' | 'received';
    deadline?: string;
  }>;
  funding?: {
    raised?: number;
    rounds?: Array<{
      type: string;
      amount: number;
      date: string;
      investors?: string[];
      valuation?: number;
    }>;
  };
  evidence?: Array<{
    type: 'customer' | 'revenue' | 'partnership' | 'award' | 'milestone' | 'press' | 'testimonial';
    title: string;
    description?: string;
    date: string;
    value?: number;
    verified?: boolean;
  }>;
}

export interface BASSRoadmap {
  milestone: string;
  description?: string;
  targetDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  dependencies?: string[];
  kpis?: Array<{
    metric: string;
    target: number;
    current?: number;
  }>;
  }

export interface BASSResponsibleAI {
  principles?: string[];
  ethicsBoard?: boolean;
  transparencyReport?: boolean;
  biasAudits?: {
    frequency?: 'never' | 'quarterly' | 'monthly' | 'continuous';
    lastAudit?: string;
  };
  dataGovernance?: {
    policy?: boolean;
    officer?: boolean;
    training?: boolean;
  };
}

// Validation helper functions
export function validateBASSData(data: unknown): { valid: boolean; errors?: any[] } {
  const valid = validateBASS(data);
  return {
    valid: !!valid,
    errors: valid ? undefined : validateBASS.errors,
  };
}

export function formatValidationErrors(errors: any[]): string[] {
  return errors.map(err => {
    const path = err.instancePath || 'root';
    const message = err.message || 'validation failed';
    return `${path}: ${message}`;
  });
}

// Generate empty BASS template
export function createBASSTemplate(projectId: string, name: string): BASS {
  const now = new Date().toISOString();
  return {
    version: '0.1',
    projectId,
    metadata: {
      name,
      description: '',
      stage: 'ideation',
      vertical: 'other',
      createdAt: now,
      updatedAt: now,
    },
    product: {
      problem: '',
      solution: '',
      targetMarket: {
        segments: [],
        tam: 0,
        sam: 0,
        som: 0,
      },
      valueProposition: '',
    },
    ai: {
      models: [],
      dataStrategy: {
        collection: 'minimal',
        privacy: {
          gdprCompliant: false,
          ccpaCompliant: false,
          dataEncryption: true,
        },
        retention: {
          days: 90,
        },
      },
      evalPolicy: {
        frequency: 'monthly',
        metrics: ['accuracy', 'latency', 'cost', 'safety'],
        automatedTesting: true,
      },
      safety: {
        contentFiltering: {
          enabled: true,
          categories: ['hate', 'violence', 'sexual', 'self-harm', 'pii'],
        },
        monitoring: {
          realtime: true,
          logging: 'errors',
        },
        fallback: {
          strategy: 'error-message',
        },
      },
    },
    metrics: {
      buildScore: {
        overall: 0,
        components: {
          product: 0,
          market: 0,
          team: 0,
          execution: 0,
          finance: 0,
        },
      },
    },
  };
}

// Calculate Build Score from BASS data
export function calculateBuildScore(bass: BASS): number {
  let score = 0;
  const weights = {
    product: 0.25,
    market: 0.20,
    ai: 0.20,
    execution: 0.15,
    finance: 0.10,
    responsible: 0.10,
  };

  // Product score (25%)
  let productScore = 0;
  if (bass.product.problem.length > 50) productScore += 20;
  if (bass.product.solution.length > 50) productScore += 20;
  if (bass.product.valueProposition.length > 20) productScore += 20;
  if (bass.product.competitiveAdvantage) productScore += 20;
  if (bass.product.businessModel) productScore += 20;
  score += productScore * weights.product;

  // Market score (20%)
  let marketScore = 0;
  if (bass.product.targetMarket.segments.length > 0) marketScore += 25;
  if (bass.product.targetMarket.tam > 0) marketScore += 25;
  if (bass.product.targetMarket.sam > 0) marketScore += 25;
  if (bass.product.targetMarket.som > 0) marketScore += 25;
  score += marketScore * weights.market;

  // AI score (20%)
  let aiScore = 0;
  if (bass.ai.models.length > 0) aiScore += 20;
  if (bass.ai.retrieval?.enabled) aiScore += 20;
  if (bass.ai.evalPolicy.metrics.length > 3) aiScore += 20;
  if (bass.ai.safety.contentFiltering.enabled) aiScore += 20;
  if (bass.ai.safety.biasDetection) aiScore += 20;
  score += aiScore * weights.ai;

  // Execution score (15%)
  let execScore = 0;
  if (bass.roadmap && bass.roadmap.length > 0) execScore += 33;
  if (bass.pages?.frontPorch?.validate?.complete) execScore += 33;
  if (bass.pages?.core?.builder?.complete) execScore += 34;
  score += execScore * weights.execution;

  // Finance score (10%)
  let financeScore = 0;
  if (bass.metrics.financial?.mrr) financeScore += 25;
  if (bass.metrics.financial?.runway) financeScore += 25;
  if (bass.finance?.grants && bass.finance.grants.length > 0) financeScore += 25;
  if (bass.finance?.evidence && bass.finance.evidence.length > 0) financeScore += 25;
  score += financeScore * weights.finance;

  // Responsible AI score (10%)
  let responsibleScore = 0;
  if (bass.responsibleAI?.principles && bass.responsibleAI.principles.length > 0) responsibleScore += 25;
  if (bass.responsibleAI?.ethicsBoard) responsibleScore += 25;
  if (bass.responsibleAI?.biasAudits?.frequency && bass.responsibleAI.biasAudits.frequency !== 'never') responsibleScore += 25;
  if (bass.responsibleAI?.dataGovernance?.policy) responsibleScore += 25;
  score += responsibleScore * weights.responsible;

  return Math.round(score);
}
