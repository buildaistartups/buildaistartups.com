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
      categories: Array<'hate' | 'violence'
