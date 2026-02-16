# US-001: Project Initialization

**Epic:** [01 — Foundation & Design System](README.md)
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Initialize the Next.js 15 project with the full tech stack defined in PLAN.md Section 4. This includes setting up the repository, configuring the Vercel deployment pipeline, provisioning the Supabase project, installing all core dependencies, establishing the directory structure, and wiring up analytics. This story produces the running skeleton that every subsequent story builds on.

---

## Acceptance Criteria

### Project Setup
- [ ] Next.js 15 project initialized with App Router and TypeScript (strict mode)
- [ ] Tailwind CSS v4 installed and configured with a base `tailwind.config.ts`
- [ ] ESLint configured with Next.js recommended rules and TypeScript support
- [ ] Prettier configured with consistent formatting rules (`.prettierrc`)
- [ ] `tsconfig.json` configured with strict mode, path aliases (`@/` for `src/`)

### Deployment & CI/CD
- [ ] Vercel project created and linked to Git repository
- [ ] Push to `main` triggers production deployment
- [ ] Push to feature branches creates preview deployments with unique URLs
- [ ] Build completes with zero errors and zero warnings

### Supabase
- [ ] Supabase project provisioned with PostgreSQL database
- [ ] Supabase Auth configured (email/password for admin, anonymous for visitors)
- [ ] Supabase Storage configured with a public bucket for images
- [ ] Supabase client utility created in `src/lib/supabase.ts` (server + client instances)
- [ ] Database types generated and accessible via TypeScript

### Core Dependencies
- [ ] Framer Motion installed and importable
- [ ] Radix UI primitives installed (at minimum: Dialog, Accordion, Tabs, Select, Checkbox, Radio, Toast)
- [ ] React Hook Form installed with Zod resolver
- [ ] Zod installed for schema validation
- [ ] Vercel AI SDK installed (`ai` package)
- [ ] `clsx` and `tailwind-merge` installed for class composition utility

### Environment Configuration
- [ ] `.env.example` created documenting all required environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST`
  - `OPENAI_API_KEY`
  - `RESEND_API_KEY`
  - `HONEYBOOKWEBHOOK_URL`
  - `CMS_API_URL` (or CMS-specific vars)
  - `CMS_API_TOKEN`
  - `REVALIDATION_SECRET`
- [ ] `.env.local` added to `.gitignore`
- [ ] Environment variables set in Vercel project settings for production and preview

### Analytics
- [ ] PostHog SDK installed and initialized in a provider component
- [ ] Vercel Analytics enabled via `@vercel/analytics`
- [ ] Both analytics tools fire `page_view` events on navigation
- [ ] Analytics wrapped in consent check placeholder (for future cookie consent)

### Directory Structure
- [ ] Directory structure matches PLAN.md conventions:
  ```
  src/
  ├── app/
  │   ├── (marketing)/          # Marketing pages route group
  │   │   ├── layout.tsx
  │   │   └── page.tsx          # Homepage
  │   ├── api/
  │   │   ├── health/
  │   │   └── revalidate/
  │   ├── layout.tsx            # Root layout
  │   ├── not-found.tsx
  │   ├── sitemap.ts
  │   ├── robots.ts
  │   └── manifest.ts
  ├── components/
  │   ├── ui/                   # Design system primitives
  │   └── layout/               # Header, Footer, Container, Section
  ├── lib/
  │   ├── supabase.ts           # Supabase client utilities
  │   ├── utils.ts              # cn() helper, shared utilities
  │   └── content.ts            # CMS fetching (placeholder)
  ├── hooks/                    # Custom React hooks
  ├── types/                    # Shared TypeScript types
  └── styles/
      └── globals.css           # Global styles + Tailwind directives
  ```
- [ ] `/api/health` endpoint returns `{ status: "ok", timestamp }` for uptime monitoring

---

## Technical Notes

- Use `create-next-app` with the `--app` and `--typescript` flags as the starting point, then layer in additional configuration
- Use the `cn()` utility pattern (clsx + tailwind-merge) for all component class composition — set this up in `src/lib/utils.ts`
- Supabase client should expose both a server-side client (for RSC/Route Handlers) and a browser client (for client components)
- PostHog should use the `posthog-js` package with a React provider; wrap in `"use client"` boundary
- Vercel Analytics uses `@vercel/analytics/react` — add the `<Analytics />` component to the root layout
- Consider adding `@vercel/speed-insights` for Web Vitals reporting
- The `(marketing)` route group keeps marketing pages organized without affecting URL structure

---

## Dependencies

- None — this is the first story in the first epic
- Vercel account with Pro plan ($20/mo) must be active
- Supabase account with project provisioned

---

## Definition of Done

- [ ] Project builds locally with `npm run build` — zero errors, zero warnings
- [ ] Project deploys to Vercel production — accessible at project URL
- [ ] Preview deployments generate automatically on feature branch pushes
- [ ] All environment variables documented in `.env.example`
- [ ] Supabase connection verified (health check endpoint queries database)
- [ ] PostHog and Vercel Analytics fire page view events on the placeholder homepage
- [ ] Directory structure established and matches specification
- [ ] Code passes ESLint and Prettier checks
- [ ] README in project root documents local development setup (`npm install`, `npm run dev`, required env vars)
