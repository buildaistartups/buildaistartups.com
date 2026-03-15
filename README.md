# Build AI Startups

The platform for indie makers to validate, build, and grow AI-powered micro-SaaS products.

## Architecture

This project uses a **modular architecture** built on top of the [Stellar template](https://cruip.com/stellar/) by Cruip.

**Core** (always active): Landing page, pricing, about, contact, legal, auth pages, theme system.

**Modules** (activated via `modules.config.ts`):
- **LaunchScore** — AI startup validation & growth tracker (Phase 1)
- **Builder** — Code generator from spec to repo (Phase 2)
- **Ecosystem** — Cross-promotion network (Phase 3)
- **Marketplace** — Buy/sell AI ventures (Phase 4)
- **API Platform** — Programmatic access (Phase 5)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Theme:** next-themes (dark default, light available)
- **Template:** Cruip Stellar

## Branch Strategy

- `main` — Production (clean, modular)
- `archive` — Previous codebase (frozen reference)
