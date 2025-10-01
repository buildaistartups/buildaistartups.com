// lib/verticals.ts
export type VerticalId = 'ai-leadgen' | 'ai-support';

export type Vertical = {
  id: VerticalId;
  title: string;
  tagline: string;
  bullets: string[];
  heroImg: string;
  flows: { research: string; generate: string; deploy: string };
  ctaHref: string;
};

export const verticals: Record<VerticalId, Vertical> = {
  'ai-leadgen': {
    id: 'ai-leadgen',
    title: 'Lead gen pipeline — from capture to close',
    tagline: 'Generate a complete lead management system: forms, scoring, CRM sync, email drips, and Stripe checkout. Ship a revenue-generating pipeline this weekend.',
    bullets: [
      'Forms → enrichment → CRM in minutes',
      'Email/SMS drips pre-wired with sequences',
      'Stripe checkout for immediate monetization',
      'Lead scoring and qualification automation',
      'Analytics dashboard with funnel tracking',
      'HubSpot, Salesforce, Pipedrive integrations ready',
    ],
    heroImg: '/images/product/builder/verticals/ai-leadgen/hero.svg',
    flows: {
      research: '/images/product/builder/verticals/ai-leadgen/flow-research-spec.svg',
      generate: '/images/product/builder/verticals/ai-leadgen/flow-generate-ui.svg',
      deploy: '/images/product/builder/verticals/ai-leadgen/flow-deploy-iterate.svg',
    },
    ctaHref: '/generate?vertical=ai-leadgen',
  },
  'ai-support': {
    id: 'ai-support',
    title: 'Support copilot — deflect tickets, scale support',
    tagline: 'Generate an AI support system that handles common queries, summarizes conversations, and escalates safely. Reduce support load while improving response times.',
    bullets: [
      'Docs ingestion + smart retrieval out of the box',
      'Zendesk, Intercom, Freshdesk integrations',
      'Safe escalation with confidence thresholds',
      'Conversation summarization for agents',
      'Analytics + deflection rate tracking',
      'Custom knowledge base with auto-updates',
    ],
    heroImg: '/images/product/builder/verticals/ai-support/hero.svg',
    flows: {
      research: '/images/product/builder/verticals/ai-support/flow-research-spec.svg',
      generate: '/images/product/builder/verticals/ai-support/flow-generate-ui.svg',
      deploy: '/images/product/builder/verticals/ai-support/flow-deploy-iterate.svg',
    },
    ctaHref: '/generate?vertical=ai-support',
  },
};
