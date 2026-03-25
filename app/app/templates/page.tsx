'use client'

import { useState } from 'react'
import { IconValidate, IconBuild, IconLaunch, IconDocument, IconDownload } from '@/components/app/icons'

const TEMPLATES = [
  {
    name: 'Idea Brief', stage: 'Validate', Icon: IconValidate, color: 'text-emerald-500', bg: 'bg-emerald-500/10',
    desc: 'One-pager: problem, solution, ICP, why now, risks.',
    content: `# Idea Brief

## Problem
[What specific problem are you solving? Who has this problem?]

## Solution
[How does your product solve it? What's the core mechanism?]

## Ideal Customer
[Who is the ideal buyer? Job title, company size, budget, pain level.]

## Why Now?
[Why is this the right time to build this? What changed recently?]

## Revenue Model
[How will you make money? Subscription, usage-based, transaction fee?]

## Key Risks
1. [Risk #1 and how you'd mitigate it]
2. [Risk #2 and how you'd mitigate it]
3. [Risk #3 and how you'd mitigate it]

## Competition
[Who are the top 3 alternatives? What's your unfair advantage?]

## Success Metric
[What single metric proves this idea is working? e.g., "10 paying customers in 30 days"]`,
  },
  {
    name: 'Competitor Matrix', stage: 'Validate', Icon: IconValidate, color: 'text-emerald-500', bg: 'bg-emerald-500/10',
    desc: 'Compare competitors: pricing, strengths, weaknesses.',
    content: `# Competitor Matrix

| Feature | Your Product | Competitor 1 | Competitor 2 | Competitor 3 |
|---------|-------------|--------------|--------------|--------------|
| Name | [Your name] | [Name] | [Name] | [Name] |
| URL | [URL] | [URL] | [URL] | [URL] |
| Pricing | [Price] | [Price] | [Price] | [Price] |
| Target Customer | [Who] | [Who] | [Who] | [Who] |
| Core Feature | [What] | [What] | [What] | [What] |
| Strength #1 | [What] | [What] | [What] | [What] |
| Strength #2 | [What] | [What] | [What] | [What] |
| Weakness #1 | [What] | [What] | [What] | [What] |
| Weakness #2 | [What] | [What] | [What] | [What] |
| Market Position | [Position] | [Position] | [Position] | [Position] |

## Your Differentiator
[What can you do that none of them can? What's your "10x better" angle?]

## Gap in the Market
[What are all competitors missing? What do customers complain about?]`,
  },
  {
    name: 'Customer Interview Script', stage: 'Validate', Icon: IconDocument, color: 'text-violet-500', bg: 'bg-violet-500/10',
    desc: '10 questions for problem discovery interviews.',
    content: `# Customer Interview Script

## Before the Interview
- Don't pitch your solution
- Listen more than you talk (80/20 rule)
- Record the call (with permission)
- Take notes on exact words they use

## Opening (2 min)
"Thanks for your time. I'm researching [problem space]. There are no right or wrong answers — I just want to understand your experience."

## Questions (20 min)

1. "Tell me about the last time you dealt with [problem]. Walk me through what happened."

2. "How are you currently solving this? What tools or processes do you use?"

3. "What's the most frustrating part of your current approach?"

4. "How much time do you spend on this per week?"

5. "Have you tried other solutions? What happened?"

6. "If you could wave a magic wand and fix one thing about this, what would it be?"

7. "How much would you pay for a solution that [your value prop]?"

8. "Who else in your organization cares about this problem?"

9. "If I built something to solve this, would you be willing to try it?"

10. "Is there anything else about this problem I should know?"

## Closing (3 min)
"This was incredibly helpful. Would you be open to trying an early version when it's ready? Can I follow up with you?"

## After the Interview
- [ ] Transcribe key quotes
- [ ] Identify patterns across interviews
- [ ] Update your ICP based on findings
- [ ] Log this as a demand signal in LaunchScore`,
  },
  {
    name: 'PRD Template', stage: 'Build', Icon: IconBuild, color: 'text-blue-500', bg: 'bg-blue-500/10',
    desc: 'Structured spec: problem, solution, user stories.',
    content: `# Product Requirements Document (PRD)

## Overview
**Product Name:** [Name]
**Author:** [Your name]
**Date:** [Date]
**Status:** Draft / In Review / Approved

## Problem Statement
[2-3 sentences describing the problem you're solving and why it matters]

## Target User
[Who is this for? Reference your ICP.]

## Solution Overview
[How does your product solve the problem? High-level description.]

## User Stories

### Must Have (MVP)
- As a [user], I want to [action] so that [benefit]
- As a [user], I want to [action] so that [benefit]
- As a [user], I want to [action] so that [benefit]

### Nice to Have (v2)
- As a [user], I want to [action] so that [benefit]
- As a [user], I want to [action] so that [benefit]

### Future
- As a [user], I want to [action] so that [benefit]

## Data Model
[What data does the app store? Key entities and relationships.]

## Tech Stack
[Reference your Tech Stack tab in LaunchScore]

## Success Metrics
- [Metric 1: e.g., 100 signups in first month]
- [Metric 2: e.g., 30% week-1 retention]
- [Metric 3: e.g., 5 paying customers]

## Timeline
- Week 1: [Milestone]
- Week 2: [Milestone]
- Week 3: [Milestone]
- Week 4: Launch

## Out of Scope
[What are you NOT building? Be explicit.]`,
  },
  {
    name: 'Launch Announcement', stage: 'Launch', Icon: IconLaunch, color: 'text-violet-500', bg: 'bg-violet-500/10',
    desc: 'Templates for Product Hunt, X, Indie Hackers, Reddit.',
    content: `# Launch Announcement Templates

## Product Hunt
**Tagline (60 chars):** [Your one-liner]
**Description:**
Hey everyone! I built [Product Name] because [problem].

After [X weeks/months] of building and talking to [Y] potential users, I'm excited to share it with you.

What it does:
- [Feature 1 — the main thing]
- [Feature 2]
- [Feature 3]

I'd love your feedback. What would make this more useful for you?

## X / Twitter Thread
1/ I just launched [Product Name] — [one-liner].

After [X] weeks of building, it's live.

Here's the story 🧵

2/ The problem: [Describe the pain point in relatable terms]

3/ Existing solutions [suck because / miss the mark because]: [What's wrong with them]

4/ So I built [Product Name]. It [core value prop].

5/ Here's what it looks like: [Screenshot or demo link]

6/ It's free to start. Try it here: [URL]

Would love your honest feedback. What's missing?

## Indie Hackers
**Title:** I launched [Product Name] — [result or metric]

**Post:**
Hey IH! Just launched my latest project and wanted to share the journey.

**What I built:** [Product description]
**Tech stack:** [Your stack]
**Time to build:** [X weeks]
**Current status:** [Users, revenue, etc.]

**What worked:** [1-2 things]
**What didn't:** [1-2 things]
**What's next:** [Your plan]

Happy to answer any questions about the build or launch!

## Reddit (r/SideProject or relevant subreddit)
**Title:** I built [Product Name] to solve [problem] — looking for feedback

After [time] of building, I launched [Product Name]. It helps [who] do [what].

I'm not trying to sell anything — I genuinely want feedback on whether this solves a real problem.

Link: [URL]

What do you think? What would you change?`,
  },
]

export default function TemplatesPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  function copyTemplate(content: string) {
    navigator.clipboard.writeText(content)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Templates</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Ready-to-use templates for every stage of your startup journey. Click to preview, copy, or download.</p>

      {selected === null ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((t, i) => (
            <button key={t.name} onClick={() => setSelected(i)}
              className="text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-violet-300 dark:hover:border-violet-500/50 transition">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${t.bg} flex items-center justify-center`}><t.Icon className={`w-4.5 h-4.5 ${t.color}`} /></div>
                <span className="text-xs text-violet-500 dark:text-violet-400 font-medium">{t.stage}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{t.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-violet-500 hover:text-violet-600 mb-4 inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to templates
          </button>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${TEMPLATES[selected].bg} flex items-center justify-center`}>
                  {(() => { const Icon = TEMPLATES[selected].Icon; return <Icon className={`w-4.5 h-4.5 ${TEMPLATES[selected].color}`} /> })()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{TEMPLATES[selected].name}</h2>
                  <span className="text-xs text-violet-500">{TEMPLATES[selected].stage} stage</span>
                </div>
              </div>
              <button onClick={() => copyTemplate(TEMPLATES[selected].content)}
                className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-4 py-2 flex items-center gap-2">
                <IconDownload className="w-4 h-4" /> {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono leading-relaxed bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-100 dark:border-gray-700/30 overflow-x-auto">
              {TEMPLATES[selected].content}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
