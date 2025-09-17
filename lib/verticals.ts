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
    title: 'Spin up an AI lead-gen machine in a day',
    tagline: 'Capture, enrich, score, and route leads automatically.',
    bullets: [
      'Forms → enrichment → CRM in minutes',
      'Email/SMS drips pre-wired',
      'Stripe checkout optional',
    ],
    heroImg: '/images/product/builder/verticals/ai-leadgen/hero.svg',
    flows: {
      research: '/images/product/builder/verticals/ai-leadgen/flow-research-spec.svg',
      generate: '/images/product/builder/verticals/ai-leadgen/flow-generate-ui.svg',
      deploy:   '/images/product/builder/verticals/ai-leadgen/flow-deploy-iterate.svg',
    },
    ctaHref: '/generate?vertical=ai-leadgen',
  },
  'ai-support': {
    id: 'ai-support',
    title: 'Ship an AI support copilot',
    tagline: 'Deflect tickets and summarize threads with safe escalation.',
    bullets: [
      'Docs ingestion + retrieval out of the box',
      'Zendesk / Intercom integrations',
      'Analytics + guardrails',
    ],
    heroImg: '/images/product/builder/verticals/ai-support/hero.svg',
    flows: {
      research: '/images/product/builder/verticals/ai-support/flow-research-spec.svg',
      generate: '/images/product/builder/verticals/ai-support/flow-generate-ui.svg',
      deploy:   '/images/product/builder/verticals/ai-support/flow-deploy-iterate.svg',
    },
    ctaHref: '/generate?vertical=ai-support',
  },
};
