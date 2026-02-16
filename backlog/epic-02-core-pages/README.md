# Epic 02 — Core Pages

**Phase:** 1
**Weeks:** 2-5
**Total Points:** 40
**Status:** Not Started
**Dependencies:** Epic 01 (Foundation & Design System) must be complete

---

## Goal

Build all core marketing pages that form the website's conversion funnel. Every page in this epic serves a specific role in the visitor journey: attract attention (Homepage), build desire (Portfolio, Services), establish trust (About, Process, FAQ), capture leads (Contact/Inquiry Form), and satisfy compliance (Legal Pages). Together, these pages transform the site from a technical shell into a functioning conversion engine that replaces the current C- graded WordPress site.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-homepage.md) | Homepage | P0 | 8 | Not Started |
| [US-002](US-002-services-and-pricing.md) | Services & Pricing Pages | P0 | 5 | Not Started |
| [US-003](US-003-portfolio-and-case-studies.md) | Portfolio & Case Studies | P0 | 8 | Not Started |
| [US-004](US-004-about-and-trust.md) | About Page & Trust Signals | P0 | 3 | Not Started |
| [US-005](US-005-process-page.md) | Process / How It Works Page | P0 | 3 | Not Started |
| [US-006](US-006-faq-page.md) | FAQ Page | P0 | 3 | Not Started |
| [US-007](US-007-contact-and-inquiry-form.md) | Contact & Multi-Step Inquiry Form | P0 | 8 | Not Started |
| [US-008](US-008-legal-pages.md) | Legal Pages (Privacy & Terms) | P1 | 2 | Not Started |
| | **Total** | | **40** | |

---

## Epic-Level Acceptance Criteria

- [ ] All 8 pages/page systems render correctly across target viewports (375px to 2560px)
- [ ] Mobile-first responsive design verified on iOS Safari and Android Chrome
- [ ] Every page has a clear primary CTA that links to the inquiry form (`/contact/`)
- [ ] Scroll-triggered Framer Motion animations present on Homepage, Portfolio, Process, and About pages
- [ ] All animations respect `prefers-reduced-motion` media query
- [ ] "Elevated Warm Minimalism" design language applied consistently (warm cream backgrounds, serif headings, generous whitespace, subtle textures)
- [ ] Multi-step inquiry form captures data to Supabase, triggers auto-emails via Resend, and syncs to HoneyBook CRM
- [ ] FAQPage schema markup validates on Google Rich Results Test
- [ ] Portfolio case studies include Event + Review schema markup
- [ ] All pages achieve Mobile PageSpeed Lighthouse score > 85
- [ ] Privacy policy addresses AI data processing, cookies, third-party processors, and GDPR/CCPA compliance
- [ ] Content populated with real or approved placeholder content (no lorem ipsum)

---

## Content Dependencies on Stephanie

These items must be gathered from the client before or during this epic. Each is tied to a specific story.

| Item | Needed By | Story | Status |
|------|-----------|-------|--------|
| Hero photography/video (4 seasonal sets) | Week 2 | US-001 | Pending |
| Pricing structure (all tiers, finalized) | Week 2 | US-002 | Pending |
| Service descriptions (inclusions/exclusions per tier) | Week 2 | US-002 | Pending |
| Case study content (5-8 weddings: stories, quotes, photos, vendor credits) | Week 3 | US-003 | Pending |
| Portfolio photography (15-25 curated photos per case study) | Week 3 | US-003 | Pending |
| Stephanie's personal story and bio content | Week 3 | US-004 | Pending |
| Team photos and bios (if applicable) | Week 3 | US-004 | Pending |
| Credentials, awards, and press mentions list | Week 3 | US-004 | Pending |
| Process stage descriptions (what Stephanie does at each stage) | Week 3 | US-005 | Pending |
| FAQ answers (25 questions personalized in Stephanie's voice) | Week 3 | US-006 | Pending |
| Inquiry form field validation rules (budget ranges, guest count thresholds) | Week 4 | US-007 | Pending |
| Privacy policy specifics (data processors, retention periods) | Week 5 | US-008 | Pending |

---

## Relationship to Other Epics

- **Epic 01 (Foundation):** Provides the design system, component library, layout shell, and content infrastructure that all pages in this epic consume.
- **Epic 03 (SEO & Performance):** Builds on these pages with advanced schema markup, performance optimization, and indexing configuration.
- **Epic 04 (Integrations):** Connects the inquiry form to HoneyBook, Instagram feed to the API, Google Reviews widget, and Calendly embed.
- **Epic 05 (Launch & Migration):** Handles 301 redirects from old WordPress URLs to the new pages built here.
- **Epic 06 (Differentiators):** Adds venue guide pages, blog, quiz, and content that link into these core pages.
- **Epic 08 (Content Pipeline):** Uses the case study and blog templates established here for ongoing content.

---

## Technical Context

All pages in this epic use the design system, components, and layout established in Epic 01:

- **Routing:** Next.js 15 App Router with `(marketing)` route group
- **Rendering:** React Server Components by default; `"use client"` only where interactivity requires it (form, carousel, accordions, animations)
- **Styling:** Tailwind CSS v4 with design tokens from Epic 01
- **Animation:** Framer Motion for scroll-triggered reveals, page transitions, and micro-interactions
- **Content:** Fetched from CMS via content utilities (`src/lib/content.ts`) with ISR
- **Forms:** React Hook Form + Zod validation
- **Data:** Supabase for inquiry storage (JSONB), Resend for transactional email
- **Images:** `next/image` with AVIF/WebP optimization, responsive srcset, lazy loading

See PLAN.md Sections 4-6 for full architecture and design details.

---

## Notes

- The Homepage (US-001) and Contact Form (US-007) are the two most critical stories in this epic -- they are the primary entry and conversion points of the entire site.
- Services/Pricing (US-002) must replace the current raw number display with investment framing and value context.
- Portfolio (US-003) transforms a flat gallery into narrative case studies that sell the planning service, not just show photos.
- Several stories can be worked in parallel once Epic 01 is complete (e.g., US-004/US-005/US-006 are independent of each other).
- Legal pages (US-008) are the only P1 story; everything else is P0 and blocks launch.
