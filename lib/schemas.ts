// lib/schemas.ts
// JSON Schema definitions (draft-07) using Ajv instead of Zod

// Build AI Startups Schema (BASS) - Core project definition
export const bassSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://buildaistartups.com/schemas/bass.json',
  type: 'object',
  additionalProperties: false,
  required: ['version', 'project', 'idea', 'vertical', 'plan'],
  properties: {
    version: { type: 'string', enum: ['0.1'] },
    project: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        name: { type: 'string', minLength: 1, maxLength: 60 },
        stage: { type: 'string', enum: ['idea', 'mvp', 'alpha', 'beta', 'prod'], default: 'idea' }
      },
      additionalProperties: false
    },
    idea: {
      type: 'object',
      required: ['oneLiner', 'problem', 'audience'],
      properties: {
        oneLiner: { type: 'string', minLength: 10, maxLength: 160 },
        problem: { type: 'string', minLength: 50, maxLength: 600 },
        audience: {
          type: 'object',
          required: ['icp', 'segments'],
          properties: {
            icp: { type: 'string', minLength: 20, maxLength: 300 },
            segments: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 6 }
          },
          additionalProperties: false
        },
        whyNow: { type: 'string', maxLength: 400 },
        alternatives: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
              notes: { type: 'string' }
            },
            additionalProperties: false
          },
          maxItems: 10
        }
      },
      additionalProperties: false
    },
    vertical: {
      type: 'string',
      enum: ['ai-leadgen', 'ai-support', 'social-commerce', 'finance-ops', 'generic'],
      default: 'generic'
    },
    integrations: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { 
            type: 'string', 
            enum: ['github', 'vercel', 'stripe', 'supabase', 'plausible', 'posthog', 'zendesk', 'intercom', 'hubspot', 'salesforce', 'other'] 
          },
          details: { type: 'string' },
          required: { type: 'boolean', default: false }
        },
        additionalProperties: false
      },
      maxItems: 12,
      default: []
    },
    plan: {
      type: 'object',
      required: ['pages', 'dataModel', 'pricing', 'firstDollar'],
      properties: {
        pages: {
          type: 'array',
          items: {
            type: 'object',
            required: ['path', 'purpose'],
            properties: {
              path: { type: 'string', pattern: '^/[a-z0-9\\-/]*$' },
              purpose: { type: 'string' },
              seo: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' }
                },
                additionalProperties: false
              }
            },
            additionalProperties: false
          },
          maxItems: 30
        },
        dataModel: {
          type: 'array',
          items: {
            type: 'object',
            required: ['entity', 'fields'],
            properties: {
              entity: { type: 'string' },
              fields: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['name', 'type'],
                  properties: {
                    name: { type: 'string' },
                    type: { type: 'string', enum: ['string', 'text', 'number', 'boolean', 'date', 'json'] },
                    required: { type: 'boolean', default: false }
                  },
                  additionalProperties: false
                },
                maxItems: 40
              },
              notes: { type: 'string' }
            },
            additionalProperties: false
          },
          maxItems: 20
        },
        pricing: {
          type: 'object',
          required: ['model', 'tiers'],
          properties: {
            model: { type: 'string', enum: ['free', 'freemium', 'subscription', 'usage', 'one-time'] },
            tiers: {
              type: 'array',
              items: {
                type: 'object',
                required: ['name', 'price', 'features'],
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number', minimum: 0 },
                  period: { type: 'string', enum: ['month', 'year', 'usage', 'one-time'], default: 'month' },
                  features: { type: 'array', items: { type: 'string' }, maxItems: 15 }
                },
                additionalProperties: false
              },
              minItems: 1,
              maxItems: 6
            }
          },
          additionalProperties: false
        },
        firstDollar: {
          type: 'object',
          required: ['timeline', 'strategy'],
          properties: {
            timeline: { type: 'string', enum: ['week-1', 'month-1', 'month-3', 'month-6', 'year-1'] },
            strategy: { type: 'string', maxLength: 400 },
            channels: { type: 'array', items: { type: 'string' }, maxItems: 8 }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    },
    quality: {
      type: 'object',
      required: ['gates', 'targets'],
      properties: {
        gates: {
          type: 'array',
          minItems: 1,
          maxItems: 8,
          items: { type: 'string', enum: ['spec', 'code', 'pricing', 'deploy'] }
        },
        targets: {
          type: 'object',
          properties: {
            buildScoreMin: { type: 'integer', minimum: 0, maximum: 100, default: 75 },
            kpis: {
              type: 'array',
              items: {
                type: 'object',
                required: ['name', 'target'],
                properties: {
                  name: { type: 'string' },
                  target: { type: 'number' },
                  windowDays: { type: 'integer', minimum: 1, maximum: 180, default: 30 }
                },
                additionalProperties: false
              },
              maxItems: 12
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    },
    governance: {
      type: 'object',
      properties: {
        enabled: { type: 'boolean', default: false },
        approvers: { type: 'array', items: { type: 'string', format: 'email' }, maxItems: 10 },
        journaling: { type: 'boolean', default: true }
      },
      additionalProperties: false
    },
    notes: { type: 'string' }
  }
};

// Quiz Schema for the /start flow
export const quizSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://buildaistartups.com/schemas/quiz.json',
  type: 'object',
  additionalProperties: false,
  required: ['experienceLevel', 'timePerWeek', 'budget', 'skills', 'interests', 'audiences', 'goals', 'riskTolerance'],
  properties: {
    experienceLevel: {
      type: 'string',
      enum: ['beginner', 'intermediate', 'advanced'],
      description: 'How comfortable are you with startups and shipping software?'
    },
    timePerWeek: {
      type: 'integer',
      minimum: 1,
      maximum: 80,
      description: 'Available time per week (hours)'
    },
    budget: {
      type: 'string',
      enum: ['none', 'low', 'medium', 'high'],
      description: 'Rough budget for tools/infra (monthly)'
    },
    skills: {
      type: 'array',
      minItems: 0,
      uniqueItems: true,
      items: {
        type: 'string',
        enum: ['coding', 'no-code', 'design', 'marketing', 'sales', 'writing', 'data', 'ops', 'ai-ml', 'support']
      },
      description: 'What can you contribute right now?'
    },
    interests: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: { type: 'string' },
      description: 'Topics that excite you (e.g., fitness, real estate, creators, legal, education)'
    },
    audiences: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        enum: ['consumers', 'indie-saas', 'agencies', 'smb', 'midmarket', 'enterprise', 'creators', 'nonprofits']
      },
      description: 'Who do you want to help?'
    },
    goals: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        enum: ['learn-by-doing', 'side-income', 'replace-job', 'raise-capital', 'exit']
      },
      description: 'What outcome are you targeting?'
    },
    riskTolerance: {
      type: 'string',
      enum: ['low', 'medium', 'high'],
      description: 'How much uncertainty can you handle?'
    }
  }
};

// Mini Plan Schema for the /plan step
export const miniPlanSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://buildaistartups.com/schemas/mini-plan.json',
  type: 'object',
  additionalProperties: false,
  required: ['idea', 'market', 'solution', 'forecast'],
  properties: {
    idea: {
      type: 'object',
      required: ['oneLiner', 'problem', 'whyNow'],
      properties: {
        oneLiner: { type: 'string', minLength: 10, maxLength: 160 },
        problem: { type: 'string', minLength: 50, maxLength: 600 },
        whyNow: { type: 'string', minLength: 20, maxLength: 400 }
      },
      additionalProperties: false
    },
    market: {
      type: 'object',
      required: ['icp', 'size', 'competition'],
      properties: {
        icp: { type: 'string', minLength: 20, maxLength: 300 },
        size: { type: 'string', minLength: 20, maxLength: 200 },
        competition: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'strength', 'weakness'],
            properties: {
              name: { type: 'string' },
              strength: { type: 'string' },
              weakness: { type: 'string' }
            },
            additionalProperties: false
          },
          maxItems: 6
        }
      },
      additionalProperties: false
    },
    solution: {
      type: 'object',
      required: ['mvp', 'pricing', 'tech'],
      properties: {
        mvp: { type: 'string', minLength: 50, maxLength: 400 },
        pricing: {
          type: 'object',
          required: ['model', 'amount'],
          properties: {
            model: { type: 'string', enum: ['free', 'freemium', 'subscription', 'usage', 'one-time'] },
            amount: { type: 'number', minimum: 0 },
            justification: { type: 'string', maxLength: 200 }
          },
          additionalProperties: false
        },
        tech: {
          type: 'array',
          items: { type: 'string' },
          maxItems: 8
        }
      },
      additionalProperties: false
    },
    forecast: {
      type: 'object',
      required: ['timeline', 'milestones', 'resources'],
      properties: {
        timeline: { type: 'string', enum: ['3-months', '6-months', '12-months'] },
        milestones: {
          type: 'array',
          items: {
            type: 'object',
            required: ['month', 'goal', 'metric'],
            properties: {
              month: { type: 'integer', minimum: 1, maximum: 12 },
              goal: { type: 'string' },
              metric: { type: 'string' }
            },
            additionalProperties: false
          },
          maxItems: 12
        },
        resources: {
          type: 'object',
          required: ['time', 'budget', 'team'],
          properties: {
            time: { type: 'string' },
            budget: { type: 'string' },
            team: { type: 'string' }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    }
  }
};

// Evidence Ledger Schema
export const evidenceSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://buildaistartups.com/schemas/evidence.json',
  type: 'object',
  additionalProperties: false,
  required: ['projectId', 'entries'],
  properties: {
    projectId: { type: 'string' },
    entries: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'timestamp', 'type', 'data'],
        properties: {
          id: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          type: { type: 'string', enum: ['interview', 'survey', 'analytics', 'experiment', 'feedback'] },
          data: { type: 'object' },
          confidence: { type: 'integer', minimum: 1, maximum: 10 },
          notes: { type: 'string' }
        },
        additionalProperties: false
      }
    }
  }
};
