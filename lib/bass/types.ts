// lib/bass/types.ts
// TypeScript types matching the JSON schemas

export type Bass = {
  version: '0.1';
  project: {
    id: string;
    name: string;
    stage?: 'idea' | 'mvp' | 'alpha' | 'beta' | 'prod';
  };
  idea: {
    oneLiner: string;
    problem: string;
    audience: {
      icp: string;
      segments: string[];
    };
    whyNow?: string;
    alternatives?: Array<{
      name: string;
      notes?: string;
    }>;
  };
  vertical: 'ai-leadgen' | 'ai-support' | 'social-commerce' | 'finance-ops' | 'generic';
  integrations?: Array<{
    name: 'github' | 'vercel' | 'stripe' | 'supabase' | 'plausible' | 'posthog' | 'zendesk' | 'intercom' | 'hubspot' | 'salesforce' | 'other';
    details?: string;
    required?: boolean;
  }>;
  plan: {
    pages: Array<{
      path: string;
      purpose: string;
      seo?: {
        title?: string;
        description?: string;
      };
    }>;
    dataModel: Array<{
      entity: string;
      fields: Array<{
        name: string;
        type: 'string' | 'text' | 'number' | 'boolean' | 'date' | 'json';
        required?: boolean;
      }>;
      notes?: string;
    }>;
    pricing: {
      model: 'free' | 'freemium' | 'subscription' | 'usage' | 'one-time';
      tiers: Array<{
        name: string;
        price: number;
        period?: 'month' | 'year' | 'usage' | 'one-time';
        features: string[];
      }>;
    };
    firstDollar: {
      timeline: 'week-1' | 'month-1' | 'month-3' | 'month-6' | 'year-1';
      strategy: string;
      channels?: string[];
    };
  };
  quality?: {
    gates: Array<'spec' | 'code' | 'pricing' | 'deploy'>;
    targets: {
      buildScoreMin?: number;
      kpis?: Array<{
        name: string;
        target: number;
        windowDays?: number;
      }>;
    };
  };
  governance?: {
    enabled?: boolean;
    approvers?: string[];
    journaling?: boolean;
  };
  notes?: string;
};

export type QuizInput = {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  timePerWeek: number;
  budget: 'none' | 'low' | 'medium' | 'high';
  skills: Array<'coding' | 'no-code' | 'design' | 'marketing' | 'sales' | 'writing' | 'data' | 'ops' | 'ai-ml' | 'support'>;
  interests: string[];
  audiences: Array<'consumers' | 'indie-saas' | 'agencies' | 'smb' | 'midmarket' | 'enterprise' | 'creators' | 'nonprofits'>;
  goals: Array<'learn-by-doing' | 'side-income' | 'replace-job' | 'raise-capital' | 'exit'>;
  riskTolerance: 'low' | 'medium' | 'high';
};

export type MiniPlan = {
  idea: {
    oneLiner: string;
    problem: string;
    whyNow: string;
  };
  market: {
    icp: string;
    size: string;
    competition: Array<{
      name: string;
      strength: string;
      weakness: string;
    }>;
  };
  solution: {
    mvp: string;
    pricing: {
      model: 'free' | 'freemium' | 'subscription' | 'usage' | 'one-time';
      amount: number;
      justification?: string;
    };
    tech: string[];
  };
  forecast: {
    timeline: '3-months' | '6-months' | '12-months';
    milestones: Array<{
      month: number;
      goal: string;
      metric: string;
    }>;
    resources: {
      time: string;
      budget: string;
      team: string;
    };
  };
};

export type EvidenceEntry = {
  id: string;
  timestamp: string;
  type: 'interview' | 'survey' | 'analytics' | 'experiment' | 'feedback';
  data: Record<string, any>;
  confidence?: number;
  notes?: string;
};

export type EvidenceLedger = {
  projectId: string;
  entries: EvidenceEntry[];
};
