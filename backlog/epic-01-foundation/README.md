# Epic 01 — Foundation & Design System

**Phase:** 1
**Weeks:** 1-2
**Total Points:** 21
**Status:** Not Started
**Dependencies:** None (this is the foundation epic)

---

## Goal

Set up the Next.js 15 project, establish the design system with "Elevated Warm Minimalism" tokens, build the core UI component library, implement layout components (header, footer, hero), and stand up the content infrastructure (CMS, content models, ISR). Everything built in this epic becomes the foundation that all subsequent epics depend on.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-project-initialization.md) | Project Initialization | P0 | 3 | Not Started |
| [US-002](US-002-design-tokens.md) | Design Tokens & Tailwind Config | P0 | 2 | Not Started |
| [US-003](US-003-ui-component-library.md) | UI Component Library | P0 | 5 | Not Started |
| [US-004](US-004-layout-components.md) | Layout Components | P0 | 3 | Not Started |
| [US-005](US-005-content-infrastructure.md) | Content Infrastructure / CMS | P0 | 8 | Not Started |
| | **Total** | | **21** | |

---

## Epic-Level Acceptance Criteria

- [ ] Next.js 15 App Router project builds and deploys to Vercel with zero errors
- [ ] Supabase project provisioned with database, auth, and storage configured
- [ ] Design tokens (colors, typography, spacing, shadows, radii, transitions) implemented in Tailwind config and match PLAN.md Section 5 specifications
- [ ] All core UI components built, accessible (WCAG 2.2 AA), and responsive
- [ ] Layout shell (header, footer, container, section, hero) renders correctly across all target viewports (375px to 2560px)
- [ ] CMS configured with all content models and content fetching utilities operational
- [ ] ISR working for content pages with on-demand revalidation endpoint
- [ ] Preview mode functional for draft content editing
- [ ] PostHog and Vercel Analytics tracking page views in production
- [ ] `.env.example` documents all required environment variables
- [ ] CI/CD pipeline: push to `main` deploys to production, push to feature branch creates preview deployment
- [ ] Mobile PageSpeed Lighthouse score > 90 on the empty shell (before content pages)

---

## Design Direction

All visual decisions in this epic reference **PLAN.md Section 5 — Design System & Visual Direction**. The design philosophy is **"Elevated Warm Minimalism"** characterized by:

- Warm cream backgrounds (#FAF7F2) with white surface cards
- Terracotta (#C4926E) and sage (#8B9E8B) accent palette
- Serif headings (Playfair Display or Cormorant Garamond) paired with sans-serif body (Inter or Geist)
- Generous whitespace and typography-led layouts
- Subtle texture overlays (paper grain, linen) rather than ornamentation
- Mobile-first responsive design (375px baseline)
- Subtle scroll-triggered motion with `prefers-reduced-motion` respected

---

## Technical Context

- **Framework:** Next.js 15 App Router with React Server Components
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **UI Primitives:** Radix UI / shadcn/ui approach
- **CMS:** Payload CMS (TypeScript-first, embeds into Next.js) or Sanity
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Hosting:** Vercel
- **Analytics:** PostHog + Vercel Analytics
- **Forms:** React Hook Form + Zod validation

See PLAN.md Section 4 for full architecture details.

---

## Dependencies on Subsequent Epics

Every story in **Epic 02 (Core Pages)** and beyond depends on this epic being complete. The design system, component library, layout shell, and content infrastructure established here are prerequisites for all page-level work.

---

## Notes

- Font loading must use `next/font` for optimization — no external stylesheet loading
- All components should be built as React Server Components where possible, with `"use client"` only where interactivity requires it
- Storybook or a documentation page for the component library is a nice-to-have, not a blocker
- The CMS choice (Payload vs. Sanity) should be finalized in an ADR before US-005 begins
