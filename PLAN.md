# Party Girl Events — Website Rebuild Master Plan

**Version:** 1.0
**Date:** 2026-02-15
**Client:** Stephanie Fleck / Party Girl Events
**Current Site:** https://www.partygirl.events (WordPress 6.9, Genesis/Imagely Beckstead, Grade: C-)
**Target:** Best-in-class AI-forward wedding planner website for Colorado mountain market

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current State Assessment](#2-current-state-assessment)
3. [Strategic Goals & Success Metrics](#3-strategic-goals--success-metrics)
4. [Tech Stack & Architecture](#4-tech-stack--architecture)
5. [Design System & Visual Direction](#5-design-system--visual-direction)
6. [Information Architecture & Sitemap](#6-information-architecture--sitemap)
7. [Phase 1 — MVP Foundation (Weeks 1-6)](#7-phase-1--mvp-foundation-weeks-1-6)
8. [Phase 2 — Differentiators (Weeks 7-12)](#8-phase-2--differentiators-weeks-7-12)
9. [Phase 3 — AI-Forward (Months 4-8)](#9-phase-3--ai-forward-months-4-8)
10. [Content Strategy & SEO](#10-content-strategy--seo)
11. [Analytics & Measurement](#11-analytics--measurement)
12. [QA & Launch Checklist](#12-qa--launch-checklist)
13. [Post-Launch & Ongoing](#13-post-launch--ongoing)
14. [Dependencies & Risks](#14-dependencies--risks)
15. [Reference Documents](#15-reference-documents)

---

## 1. Project Overview

### What We're Building

A complete ground-up rebuild of partygirl.events — moving from an outdated WordPress site to a modern Next.js application that functions as a **conversion engine wrapped in an emotional experience**. The site will combine luxury-travel-grade visual storytelling with SaaS-level lead capture, differentiated by AI-powered interactive tools that no competitor in the Colorado mountain wedding market offers.

### Why This Matters

- The current site fails the 5-second test — visitors can't understand the USP
- Competitors (Bluebird Events, Calluna, Save the Date) have significantly more polished sites
- Zero Colorado mountain wedding planners use AI, quizzes, or budget tools — first-mover advantage
- The site's single conversion path (navigate to Contact → fill form) captures a fraction of potential leads
- 65%+ of wedding traffic is mobile; the current site is responsive but not mobile-first

### Core Principles

1. **Conversion over aesthetics** — Every design decision must serve lead generation
2. **Transparency builds trust** — Show pricing, process, and real data (the #1 Reddit insight)
3. **Personalization over template** — The site should feel custom to each visitor's wedding vision
4. **Colorado-specific personality** — Mountain-forward, adventure-infused, not generic elegance
5. **AI as augmentation** — AI enhances the human connection with Stephanie, never replaces it
6. **Mobile-first, always** — Design for thumb-first interaction, enhance for desktop

---

## 2. Current State Assessment

### Baseline Audit Summary (from `07-partygirl-baseline-audit.md`)

| Area | Grade | Critical Issues |
|------|-------|----------------|
| Positioning & Messaging | D | No clear USP, "Get Your Party On Now!!" hero CTA, keyword-stuffed title (165+ chars) |
| Design & UX | D | 2015 theme, 4 font families, FlexSlider carousel, cramped whitespace |
| Lead Capture | F | Single contact form, no progressive engagement, no lead magnets |
| Portfolio | C | Decent photos but no narrative structure, no filtering, no vendor credits |
| SEO | D | No keyword strategy, thin meta descriptions, missing schema, no content plan |
| Services/Pricing | C- | Raw prices without value framing, no comparison table, no FAQ |
| Performance | D | Multiple font families, dual Font Awesome, heavy gallery plugin, no CDN |
| Trust Signals | C | Awards carousel exists but Google Reviews, video testimonials, WeddingWire badges all missing |
| Mobile | C- | Responsive but not mobile-first, predates modern patterns |
| Content | D | ~20-30 blog posts with no SEO intent, no guides, no venue content |

### Competitive Landscape (from `01-competitor-matrix.md`)

- **78 sites analyzed** across direct competitors, industry platforms, and adjacent industries
- **15 Colorado mountain planners** reviewed — none use AI, quizzes, or budget tools
- **Key gaps in market:** No venue guide content strategy, no quiz-based lead funnels, no budget estimators, most hide pricing
- **Best-in-class patterns:** Multi-step forms, narrative case studies, process timelines, social proof above the fold

---

## 3. Strategic Goals & Success Metrics

### Primary Goals

1. **3-5x increase in monthly qualified leads** (from ~5-8 to 20-30+)
2. **Become the most innovative wedding planner website in Colorado**
3. **Dominate local SEO for Colorado mountain wedding keywords**
4. **Reduce Stephanie's per-lead time investment** through AI qualification

### Success Metrics Dashboard

| Metric | Current | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|--------|---------|---------------|---------------|---------------|
| Monthly organic sessions | ~200 | 500 | 1,500 | 3,000 |
| Bounce rate | ~65% | < 45% | < 40% | < 35% |
| Inquiry form completion rate | ~8% | > 25% | > 35% | > 40% |
| Avg time on site | ~1:30 | > 2:30 | > 3:00 | > 3:30 |
| Monthly inquiry volume | ~5-8 | 12-15 | 20-25 | 30+ |
| Mobile PageSpeed score | ~40 | > 85 | > 90 | > 95 |
| Pages indexed | ~30 | > 50 | > 80 | > 100 |
| Quiz completions/month | 0 | — | > 50 | > 100 |
| AI tool usage/month | 0 | — | — | > 300 |

---

## 4. Tech Stack & Architecture

### Recommended Stack

```
Framework:      Next.js 15 (App Router, React Server Components)
Language:       TypeScript (strict mode)
Styling:        Tailwind CSS v4
Animation:      Framer Motion + GSAP ScrollTrigger (for scroll narratives)
UI Primitives:  Radix UI / shadcn/ui
CMS:            Payload CMS (TypeScript-first, embeds into Next.js) or Sanity
Database:       Supabase (PostgreSQL + pgvector + Auth + Storage + Realtime)
AI:             Vercel AI SDK + OpenAI GPT-4o + Anthropic Claude
Search:         OpenAI embeddings + Supabase pgvector (portfolio semantic search)
Hosting:        Vercel (primary) + Cloudflare (DNS, CDN, DDoS)
Analytics:      Vercel Analytics + PostHog (product analytics, session replay)
Forms:          React Hook Form + Zod validation
Email:          Resend + React Email (transactional) + ConvertKit (nurture sequences)
CRM:            HoneyBook API (wedding-industry standard)
Scheduling:     Calendly or Cal.com embed
Rate Limiting:  Upstash Redis
Image CDN:      Vercel Image Optimization (built-in with next/image)
Charts:         Recharts (for budget estimator)
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  Next.js 15 (App Router) · RSC · TypeScript         │
│  Tailwind CSS · Framer Motion · Radix UI            │
│  Vercel AI SDK (useChat, useCompletion)              │
├─────────────────────────────────────────────────────┤
│                   API Layer                          │
│  Next.js Route Handlers (/app/api/*)                │
│  Vercel Edge Functions (low-latency AI)             │
│  Middleware (rate limiting, geo, redirects)          │
├─────────────────────────────────────────────────────┤
│                  AI Services                         │
│  OpenAI GPT-4o (concierge, vision, analysis)        │
│  OpenAI GPT-4o-mini (classification, budget calcs)  │
│  OpenAI text-embedding-3-small (semantic search)    │
│  Anthropic Claude 3.5 Sonnet (fallback/alternative) │
├─────────────────────────────────────────────────────┤
│                   Data Layer                         │
│  Supabase PostgreSQL + pgvector                     │
│  Tables: leads, quiz_results, inquiries, vendors,   │
│          budget_ranges, portfolio_tags, chat_logs    │
│  Supabase Storage (images, uploads)                 │
│  Supabase Edge Functions (triggers, notifications)  │
├─────────────────────────────────────────────────────┤
│                Infrastructure                        │
│  Vercel (hosting, edge, serverless, image CDN)      │
│  Cloudflare (DNS, caching, DDoS)                    │
│  Upstash Redis (rate limiting, session caching)     │
│  Resend (transactional email)                       │
│  ConvertKit (email nurture sequences)               │
│  HoneyBook (CRM, contracts, invoicing)              │
└─────────────────────────────────────────────────────┘
```

### ADR Summary

| Decision | Choice | Rationale | See |
|----------|--------|-----------|-----|
| Framework | Next.js 15 App Router | RSC reduces client JS, best SEO, Vercel-native | `docs/adr/0001-nextjs-app-router.md` |
| Content | Payload CMS or MDX hybrid | TypeScript-first, embeds in Next.js, flexible | `docs/adr/0002-content-strategy-mdx-vs-cms.md` |
| Forms & Leads | React Hook Form + Supabase + HoneyBook | Multi-step, adaptive, CRM-synced | `docs/adr/0003-forms-and-leads.md` |
| Analytics | Vercel Analytics + PostHog | Performance + product analytics + privacy | `docs/adr/0004-analytics-stack.md` |

### Estimated Monthly Infrastructure Costs

| Service | Tier 1 Only | Tier 1+2 | All Tiers |
|---------|------------|----------|-----------|
| Vercel Pro | $20 | $20 | $20 |
| Supabase Pro | $25 | $25 | $25 |
| OpenAI API | $5-10 | $15-30 | $25-50 |
| Upstash Redis | $0-10 | $0-10 | $0-10 |
| Resend | $0-20 | $0-20 | $0-20 |
| ConvertKit | $0-29 | $0-29 | $0-29 |
| PostHog | $0 (free tier) | $0 | $0 |
| **Total** | **$50-115/mo** | **$60-135/mo** | **$70-155/mo** |

---

## 5. Design System & Visual Direction

### Design Philosophy

**Elevated Warm Minimalism** — Clean, typographic, textured, and warm. Not cold Scandinavian minimalism, not maximalist wedding-industry clutter. The site should feel "like a calm, organized room" (per 2026 web design research) with the warmth and personality of a Colorado mountain lodge.

### Color Palette

```
Background:     #FAF7F2 (warm cream)
Surface:        #FFFFFF (white cards/containers)
Text Primary:   #2D2A26 (warm near-black)
Text Secondary: #6B645C (warm gray)
Accent:         #C4926E (terracotta / warm copper)
Secondary:      #8B9E8B (sage green)
Mountain:       #5B7B8A (slate blue)
Dark:           #1A1918 (near-black for dark sections)
Error:          #C4534A
Success:        #5C8A5B
```

### Typography

- **Headings:** Serif font (e.g., Playfair Display, Cormorant Garamond, or similar) — conveys sophistication and warmth
- **Body:** Clean sans-serif (e.g., Inter, Source Sans 3, or Geist) — high readability
- **Accent:** Monospace sparingly for data elements (budget numbers, dates)
- **Hero headings:** `clamp(3rem, 8vw, 12rem)` for fluid oversized typography
- **Max 2 font families** (down from current 4)

### Key Visual Principles

1. **Typography-led storytelling** — Bold editorial headings as hero elements, not just photography
2. **Warm minimalism** — Earthy tones, organic textures (paper grain, linen, stone), generous whitespace
3. **Texture over ornamentation** — Subtle grain overlays, material references in UI surfaces
4. **Mobile-first layout** — Design at 375px first, enhance for desktop
5. **Subtle motion** — Scroll-triggered reveals, micro-interactions on CTAs, `prefers-reduced-motion` respected
6. **Photography as design element** — Full-bleed Colorado landscapes, not just portrait shots

### Component Design Tokens

```css
/* Spacing */
--space-xs:   0.25rem;    /* 4px */
--space-sm:   0.5rem;     /* 8px */
--space-md:   1rem;       /* 16px */
--space-lg:   1.5rem;     /* 24px */
--space-xl:   2rem;       /* 32px */
--space-2xl:  3rem;       /* 48px */
--space-3xl:  4rem;       /* 64px */

/* Border Radius */
--radius-sm:  0.375rem;   /* 6px */
--radius-md:  0.75rem;    /* 12px */
--radius-lg:  1rem;       /* 16px */
--radius-full: 9999px;

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
--shadow-md:  0 4px 6px rgba(0,0,0,0.07);
--shadow-lg:  0 10px 15px rgba(0,0,0,0.1);

/* Transitions */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

---

## 6. Information Architecture & Sitemap

### Primary Navigation

```
Party Girl Events
├── Home
├── Services ────────── Mega menu: Full Service / Wedding Management / Elopements / Events
├── Portfolio ───────── Filterable grid of narrative case studies
├── Venues ──────────── Dropdown: Vail / Beaver Creek / Aspen / Breckenridge / Keystone
├── About
├── Blog
└── [CTA] Start Planning
```

### Complete Route Map

```
partygirl.events/
├── /                                    Homepage
├── /services/                           Services overview (comparison table)
│   ├── /services/full-service/          Full service planning
│   ├── /services/wedding-management/    Wedding management
│   ├── /services/elopements/            Elopement planning
│   └── /services/events/               Corporate & social events
├── /portfolio/                          Filterable case study grid
│   └── /portfolio/[slug]/              Individual narrative case study
├── /venues/                             Venue guides hub
│   ├── /venues/vail/                   Vail venue guide
│   ├── /venues/beaver-creek/           Beaver Creek venue guide
│   ├── /venues/aspen/                  Aspen venue guide
│   ├── /venues/breckenridge/           Breckenridge venue guide
│   └── /venues/keystone/              Keystone venue guide
├── /about/                             About Stephanie + team
├── /blog/                              Blog index (paginated)
│   └── /blog/[slug]/                  Individual blog post
├── /contact/                           Contact + multi-step inquiry form
├── /quiz/                              Wedding style quiz (Phase 2)
├── /tools/                             AI tools hub (Phase 3)
│   ├── /tools/budget-estimator/       Budget estimator
│   ├── /tools/vibe-translator/        Vibe translator
│   └── /tools/timeline/               Timeline generator
├── /faq/                               FAQ with accordion (schema markup)
├── /process/                           How it works timeline
├── /privacy/                           Privacy policy
├── /terms/                             Terms of service
├── /sitemap.xml                        Auto-generated XML sitemap
├── /robots.txt                         Robots directives
└── /api/
    ├── /api/health/                    Health check
    ├── /api/lead/                      Lead submission endpoint
    └── /api/revalidate/               On-demand ISR revalidation
```

### URL Redirect Plan

All old WordPress URLs must 301 redirect to new paths. Map to be finalized during build but key redirects:

| Old URL Pattern | New URL |
|----------------|---------|
| `/galleries/` | `/portfolio/` |
| `/galleries/weddings/` | `/portfolio/` |
| `/galleries/events/` | `/portfolio/?category=events` |
| `/services-2/` | `/services/` |
| `/blog/[old-post-slug]/` | `/blog/[new-post-slug]/` (preserve or redirect) |
| `/contact/` | `/contact/` (preserve) |
| `/about/` | `/about/` (preserve) |

---

## 7. Phase 1 — MVP Foundation (Weeks 1-6)

**Goal:** Launch a modern, conversion-optimized site that closes the competitive gap and establishes the foundation for Phases 2-3.

### Week 1-2: Project Setup & Design System

#### 1.1 Project Initialization
- [ ] Initialize Next.js 15 project with TypeScript, Tailwind CSS, ESLint, Prettier
- [ ] Configure Vercel project, connect Git repo, set up preview deployments
- [ ] Set up Supabase project (database, auth, storage)
- [ ] Install and configure core dependencies: Framer Motion, Radix UI, React Hook Form, Zod
- [ ] Create `.env.example` with all required environment variables
- [ ] Set up PostHog + Vercel Analytics

#### 1.2 Design System Implementation
- [ ] Implement design tokens (colors, typography, spacing, shadows, radii) in Tailwind config
- [ ] Build core UI components in `src/components/ui/`:
  - Button (primary, secondary, ghost, outline variants + sizes)
  - Card (with hover states, glass variant)
  - Badge (for tags, categories)
  - Input, Textarea, Select, Checkbox, Radio (form elements)
  - Accordion (for FAQ)
  - Dialog/Modal (for quiz, image lightbox)
  - Tabs
  - Skeleton (loading states)
  - Toast (notifications)
- [ ] Build layout components in `src/components/layout/`:
  - Header/Nav (sticky, transforms on scroll, mobile hamburger)
  - Footer (contact info, nav links, social, newsletter signup)
  - Container (max-width wrapper)
  - Section (full-bleed + contained variants with alternating backgrounds)
  - PageHero (reusable hero with variants)
- [ ] Set up font loading strategy (2 families max, `next/font` for optimization)
- [ ] Create global CSS with base styles, texture overlays, reduced-motion media query
- [ ] Build responsive grid utilities

#### 1.3 Content Infrastructure
- [ ] Set up CMS (Payload or Sanity) with content models:
  - Page (for static pages)
  - CaseStudy (couple name, venue, date, guest count, season, style, narrative sections, gallery, vendor credits, testimonial)
  - BlogPost (title, slug, excerpt, body, category, featured image, SEO fields)
  - Venue (name, location, description, photos, capacity, price range, seasons, style tags)
  - FAQ (question, answer, category, sort order)
  - Testimonial (couple name, quote, photo, venue, date, video URL)
  - Service (name, slug, description, inclusions, pricing, CTA)
- [ ] Create content fetching utilities in `src/lib/content.ts`
- [ ] Set up ISR (Incremental Static Regeneration) for content pages

### Week 2-3: Core Pages — Homepage & Services

#### 2.1 Homepage (`src/app/(marketing)/page.tsx`)

The homepage must accomplish 5 things in order:
1. **5-second clarity:** Who we are, where we serve, why we're different
2. **Emotional hook:** Aspirational imagery that says "this could be your wedding"
3. **Trust signals:** Social proof that reduces skepticism
4. **Engagement paths:** Multiple low-commitment entry points
5. **Clear CTA:** Single primary action (Start Planning)

**Homepage sections (scroll order):**

| # | Section | Content | Components |
|---|---------|---------|-----------|
| 1 | **Hero** | Full-screen image/video with clear value prop headline, single CTA. "Colorado Mountain Wedding Planning — Reimagined." Subhead: "Intimate, elevated, and stress-free. From Vail to Aspen, we make your mountain wedding vision real." CTA: "Start Planning" | PageHero, Button |
| 2 | **Press Bar** | "As Featured In" — logos: Martha Stewart, Brides, The Knot, Buzzfeed, The Sun | LogoBar |
| 3 | **Services Preview** | 3 cards (Full Service / Wedding Management / Elopements) with one-line description + "Starting at $X" + "Learn More" | ServiceCard x3 |
| 4 | **Featured Weddings** | 3-4 narrative case study previews in bento grid — couple photo, venue name, style tag, "View Story" | CaseStudyCard, BentoGrid |
| 5 | **How It Works** | 4-step process: (1) Discovery Call (2) Custom Proposal (3) Planning Together (4) Your Perfect Day | ProcessTimeline |
| 6 | **Testimonial Carousel** | 3-5 client quotes with photos, couple names, venue | TestimonialCarousel |
| 7 | **Colorado Venues Teaser** | Map or location cards for Vail, Beaver Creek, Aspen, Breckenridge, Keystone — "Explore Venues" | LocationCards |
| 8 | **Instagram Feed** | Live IG feed, 6-8 recent posts | InstagramFeed |
| 9 | **CTA Section** | Full-bleed mountain image + "Ready to Start Planning?" + primary CTA + secondary "Take Our Style Quiz" (Phase 2) | CTASection |

#### 2.2 Services Pages

**Services Hub (`/services/`):**
- Comparison table of all packages (Good/Better/Best pattern)
- Each package: name, description, key inclusions, price anchor, CTA
- Investment framing: "Your Investment" not "Pricing"
- Context: "Typically 8-12% of your total wedding budget"
- FAQ accordion at bottom addressing pricing objections

**Individual Service Pages (`/services/[slug]/`):**
- Detailed description of what's included
- What a typical timeline looks like for this service
- "Perfect for you if..." qualifying section
- 2-3 relevant case studies from this service tier
- Client testimonial specific to this service
- "What's NOT included" (transparency builds trust)
- CTA: "Book a Discovery Call"

### Week 3-4: Portfolio, About, Process, FAQ

#### 3.1 Portfolio (`/portfolio/`)
- **Grid view:** Filterable masonry grid with filter chips (Season, Venue Area, Style, Guest Count)
- **Case study template** (`/portfolio/[slug]/`):
  - Quick Facts bar (date, venue, guests, season, style, service level)
  - "Their Story" — 2-3 paragraphs about the couple
  - "The Vision" — What they wanted
  - "The Planning Journey" — Challenges and how Party Girl Events helped (THIS sells the service)
  - "The Details" — Design elements, colors, florals, personal touches
  - "The Day" — Timeline highlights, emotional moments
  - "What They Said" — Client testimonial with photo
  - Vendor Credits — Clickable links (builds vendor ecosystem + backlinks)
  - Photo Gallery — 15-25 curated images with lightbox
  - Schema: `Event` + `Review` structured data
- **Populate with 5-8 case studies** from Stephanie's best past weddings

#### 3.2 About Page (`/about/`)
- Stephanie's story — personal, authentic, Colorado-specific
- Professional credentials and experience ("150+ Weddings Planned," "10 Years")
- Team introduction (if applicable)
- Brand personality — why "Party Girl Events" as a name, what it means
- HRC Pride partnership highlight (underutilized differentiator)
- Awards and press mentions
- CTA: "Let's See If We're a Good Fit → Book a Discovery Call"

#### 3.3 Process Page (`/process/`)
- Interactive visual timeline: Inquiry → Discovery Call → Proposal → Contract → Planning → Wedding Day → Post-Wedding
- Each stage: what happens, what the couple does, what Stephanie does, typical duration
- Addresses "what do I actually get?" objection
- CTA at key stages: "Ready to start? This is where it begins."

#### 3.4 FAQ Page (`/faq/`)
- 25 questions organized by category (Pricing, Process, Services, Colorado-Specific, Logistics)
- Accordion UI with smooth animations
- `FAQPage` schema markup for rich snippets
- Questions sourced from Reddit research + common wedding planner objections (see `03-content-seo-blueprint.md`)

### Week 4-5: Lead Capture, Contact, SEO Foundation

#### 4.1 Multi-Step Inquiry Form (`/contact/`)

The most critical conversion element. Replaces the generic contact form with a progressive, qualifying flow.

**Form Flow:**

```
Step 1: "What are you dreaming of?"
  → [Full Wedding] [Intimate Elopement] [Destination Wedding] [Day-of Coordination] [Other Event]

Step 2 (adapts per selection):
  IF Full Wedding:
    → Guest count (50-100 / 100-150 / 150-200 / 200+)
    → Date (picker or "flexible")
    → Venue status (Booked / Touring / Haven't started)
  IF Elopement:
    → Guest count (Just us / 2-10 / 10-30)
    → Location preference (Mountain / Forest / Urban / Undecided)
    → Date (picker or "flexible")

Step 3: "Where in Colorado?"
  → [Vail] [Beaver Creek] [Aspen] [Breckenridge] [Keystone] [Not sure yet]

Step 4: "What's your investment range?"
  → Budget ranges appropriate to wedding type selected

Step 5: Contact info
  → Name, Email, Phone (optional), "Anything else Stephanie should know?" textarea

Confirmation: "Thank you, [Name]! Stephanie will reach out within 24 hours."
```

- React Hook Form with Zod validation
- Framer Motion step transitions
- Data stored in Supabase `inquiries` table (JSONB for flexible schema)
- Auto-email to Stephanie via Resend with formatted lead summary
- Auto-email to couple: confirmation + "What to Expect" + discovery call link
- HoneyBook CRM sync via webhook

#### 4.2 Floating/Sticky CTA
- Persistent "Start Planning" button visible after scrolling past the hero
- Mobile: bottom of screen, always accessible
- Desktop: sticky nav CTA button

#### 4.3 SEO Foundation
- [ ] Unique title tags per page (max 60 chars, keyword + brand)
- [ ] Unique meta descriptions per page (max 155 chars, CTA + emotional hook)
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skipping)
- [ ] Schema markup implementation:
  - `LocalBusiness` (subtype: `EventPlanning`) — sitewide JSON-LD
  - `FAQPage` — FAQ and services pages
  - `Review` — testimonials and case studies
  - `Event` — case study pages
  - `BreadcrumbList` — all pages
  - `Person` — about page (Stephanie Fleck)
  - `Service` — each service page
- [ ] XML sitemap generation (`src/app/sitemap.ts`)
- [ ] Robots.txt configuration (`src/app/robots.ts`)
- [ ] Web manifest (`src/app/manifest.ts`)
- [ ] Canonical URLs on all pages
- [ ] Internal linking strategy (blog → services, case studies → venues, FAQ → services)
- [ ] Image optimization: WebP/AVIF via next/image, descriptive alt text, lazy loading
- [ ] Submit to Google Search Console
- [ ] Open Graph + Twitter Card meta tags

### Week 5-6: Integration, Performance, Polish

#### 5.1 Third-Party Integrations
- [ ] Google Reviews widget or API integration (embed on homepage + testimonials)
- [ ] Instagram feed integration (native API or embed)
- [ ] Calendly/Cal.com embed on contact page for discovery call booking
- [ ] HoneyBook lead form sync (webhook on form submission)
- [ ] Google Tag Manager setup (for GA4 events + future conversion tracking)
- [ ] Cookie consent banner (CookieYes or Osano)

#### 5.2 Performance Optimization
- [ ] Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Next.js Image component for all images (AVIF/WebP, responsive srcset)
- [ ] Font optimization via `next/font` (subsetting, preload, swap)
- [ ] Component-level code splitting with `next/dynamic`
- [ ] Skeleton screens for dynamic content
- [ ] Edge caching headers on static assets
- [ ] Lighthouse CI integration (`scripts/lighthouse-ci.mjs`)
- [ ] Mobile PageSpeed target: > 85

#### 5.3 Accessibility (WCAG 2.2 AA)
- [ ] Focus indicators: 2px thick, 3:1 contrast (`:focus-visible`)
- [ ] Target sizes: all interactive elements ≥ 24x24px
- [ ] Color contrast: 4.5:1 for normal text, 3:1 for large text
- [ ] Semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, landmarks
- [ ] Skip navigation link
- [ ] `aria-label` on icon-only buttons
- [ ] `prefers-reduced-motion` — disable all animations
- [ ] Screen reader testing (VoiceOver)
- [ ] Keyboard navigation testing (all interactive elements reachable)

#### 5.4 Cross-Browser & Device Testing
- [ ] Chrome, Safari, Firefox, Edge (latest 2 versions)
- [ ] iOS Safari, Android Chrome
- [ ] iPhone SE → iPhone 15 Pro Max viewport range
- [ ] iPad (portrait + landscape)
- [ ] Desktop 1280px → 2560px

#### 5.5 Redirects & Migration
- [ ] Map all existing WordPress URLs to new paths
- [ ] Implement 301 redirects in `next.config.js` or `middleware.ts`
- [ ] Verify no 404s for old indexed URLs (Google Search Console)
- [ ] Update Google Business Profile with new URL structure
- [ ] Update all external directory listings (WeddingWire, The Knot, Yelp)

### Phase 1 Deliverables Checklist

- [ ] Homepage with hero, press bar, services, featured weddings, process, testimonials, CTA
- [ ] Services hub page with comparison table
- [ ] 3-4 individual service pages (Full Service, Wedding Management, Elopements, Events)
- [ ] Portfolio grid with 5-8 narrative case studies
- [ ] About page with credentials, story, personality
- [ ] Process/How It Works page
- [ ] FAQ page (25 questions, accordion, schema)
- [ ] Contact page with multi-step adaptive inquiry form
- [ ] Floating/sticky CTA
- [ ] Google Reviews integration
- [ ] Instagram feed
- [ ] Calendly scheduling embed
- [ ] HoneyBook CRM sync
- [ ] Privacy policy + terms pages
- [ ] Full SEO foundation (schema, sitemap, meta, redirects)
- [ ] Analytics setup (PostHog + Vercel Analytics + GA4)
- [ ] Cookie consent
- [ ] Mobile-first responsive design
- [ ] WCAG 2.2 AA compliance
- [ ] Performance: Mobile PageSpeed > 85
- [ ] All 301 redirects from old site

---

## 8. Phase 2 — Differentiators (Weeks 7-12)

**Goal:** Stand out from competitors with unique engagement tools, content strategy, and lead capture mechanisms that no Colorado planner offers.

### 2.1 Wedding Style Quiz (Weeks 7-9)

The highest-impact differentiator. An interactive 8-12 question visual quiz that generates a personalized mood board, captures lead data, and pre-qualifies prospects.

**Build Spec:**
- Full-screen modal/overlay experience (no page navigation during quiz)
- Visual multiple-choice: each question shows 4 curated image cards
- Framer Motion animated transitions between steps
- Progress bar showing completion
- Email capture at Q9-10 (after engagement, before results): "Where should we send your mood board?"
- On completion: send answers to GPT-4o-mini → receive style name, color palette (hex codes), decor recommendations, matched portfolio items
- Results page: personalized mood board grid, color swatches, "Stephanie's recommendation" blurb, 2-3 matched case studies, CTA to book consultation
- Results emailed as beautiful HTML email via Resend + React Email
- All data stored in Supabase `quiz_results` table
- CRM sync: answers auto-populate HoneyBook contact record

**Quiz Questions (draft):**
1. "What's your dream setting?" → Mountain Meadow / Luxury Resort / Rustic Ranch / Intimate Forest
2. "Pick the table setting that speaks to you" → 4 styled tablescape photos
3. "What's your color vibe?" → Warm Earth / Cool Neutrals / Bold Jewel / Soft Pastels
4. "What kind of flowers?" → Wild & Organic / Lush & Traditional / Modern & Sculptural / Minimal & Green
5. "How do you want the evening to feel?" → Candlelit & Romantic / Dance Party / Elegant Dinner / Adventure Celebration
6. "How many people?" → Just us / Under 50 / 50-150 / 150+
7. "What season?" → Spring / Summer / Fall / Winter
8. "What matters most?" → Rank: Design, Food, Photography, Experience, Music
9. "When's the big day?" → Date picker or "Haven't decided"
10. "What's your budget range?" → Ranges
11. "Where should we send your results?" → Name + Email

**Dependencies from Stephanie:**
- Style taxonomy (5-6 named styles: Mountain Modern, Rustic Luxe, Garden Romance, Boho Luxe, Classic Elegance, etc.)
- 50-100 curated/tagged portfolio images
- Brand voice for AI-generated result descriptions

**Expected Impact:** 3-5x improvement in lead quality. Quiz leads arrive to discovery call already profiled.

### 2.2 Venue Guide Pages (Weeks 7-9)

Five dedicated venue guides targeting the highest-intent local SEO keywords in the Colorado mountain wedding market. These pages are massive organic traffic opportunities — **zero competitors have this content**.

**Create pages for:**
1. `/venues/vail/` — "Best Wedding Venues in Vail, Colorado"
2. `/venues/beaver-creek/` — "Beaver Creek Wedding Venues Guide"
3. `/venues/aspen/` — "Aspen Wedding Planning: Venues & Tips"
4. `/venues/breckenridge/` — "Breckenridge Wedding Venue Guide"
5. `/venues/keystone/` — "Keystone Wedding Venues & Planning"

**Each page includes:**
- Area overview for weddings (3-5 paragraphs)
- Top 8-10 venue recommendations with photos, capacity, price range, style tags
- Best seasons and weather considerations
- Transportation and logistics tips
- Cost overview for the area
- Related case studies held at venues in this area
- Stephanie's personal notes/recommendations
- CTA: "Planning a [Location] wedding? Let's talk."
- Schema: `Place` markup for each venue

**SEO targets:** "best wedding venues vail colorado," "beaver creek wedding venues," etc. — high-intent, moderate volume, low competition.

### 2.3 Blog Content Strategy Launch (Weeks 8-12)

Begin publishing 2-3 posts per month targeting the 30 blog topics identified in `03-content-seo-blueprint.md`, prioritized by funnel stage and keyword opportunity.

**Month 1 priorities:**
- TOFU: "The Ultimate Guide to Planning a Colorado Mountain Wedding"
- MOFU: "Do You Need a Wedding Planner? 7 Signs You Should Hire One"
- BOFU: Real Wedding #1 (narrative case study format)

**Blog template includes:**
- Featured image (optimized)
- Reading time estimate
- Table of contents (for long-form)
- Author card (Stephanie)
- Related posts
- CTA blocks embedded in content
- Schema: `Article` + `BreadcrumbList`
- Social sharing buttons

### 2.4 Additional Phase 2 Features

| Feature | Timeline | Spec |
|---------|----------|------|
| **Video testimonials** | Week 8-9 | Embed on homepage, services, and testimonials page. 30-90 second client clips. |
| **Seasonal hero rotation** | Week 9 | 4 seasonal photo/video sets. Middleware or date-based logic swaps hero content. |
| **Exit-intent lead magnet** | Week 10 | Popup on cursor exit: "Before you go — download our free Mountain Wedding Planning Guide." PDF guide, email capture, ConvertKit nurture sequence trigger. |
| **Email nurture sequences** | Week 10-11 | 5-email series for quiz leads, 3-email for guide downloads. ConvertKit or Resend drip. |
| **Floating chat widget** | Week 11 | Lightweight (not AI yet — that's Phase 3). Links to Calendly or opens inquiry form. |
| **WeddingWire/The Knot badges** | Week 11 | Embed award badges with links to review profiles. |
| **Vendor recommendation page** | Week 12 | Curated directory of Stephanie's preferred vendors, tagged by category and region. Generates backlinks. |

### Phase 2 Deliverables Checklist

- [ ] Wedding Style Quiz (full flow, AI results, email capture, CRM sync)
- [ ] 5 venue guide pages (Vail, Beaver Creek, Aspen, Breckenridge, Keystone)
- [ ] 6+ blog posts published (2/month, TOFU/MOFU/BOFU mix)
- [ ] Video testimonials embedded across site
- [ ] Seasonal hero rotation
- [ ] Exit-intent lead magnet popup + PDF planning guide
- [ ] Email nurture sequences (quiz leads + guide downloads)
- [ ] WeddingWire/The Knot badge integration
- [ ] Vendor recommendation directory
- [ ] Floating chat widget (non-AI, links to booking)

---

## 9. Phase 3 — AI-Forward (Months 4-8)

**Goal:** Become the most innovative wedding planner website in Colorado with AI-powered tools that genuinely help couples plan while generating high-quality leads.

### Tier 1 AI Features (Months 4-5) — Ship First

| Feature | Build Time | Monthly Cost | Impact |
|---------|-----------|-------------|--------|
| **AI Concierge Chat** | 3-4 weeks | $15-30 | 30-40% more leads from after-hours visitors |
| **Smart Inquiry Form** (AI-enhanced) | 1-2 weeks | $2-5 | 25-35% more form completions |
| **Personalized Content** | 1-2 weeks | $0 | 15-25% return visitor conversion improvement |
| **Sentiment-Aware Follow-ups** | 1-2 weeks | $2-5 | Prioritized lead inbox, faster hot-lead response |

**AI Concierge Chat — Detailed Spec:**
- Floating chat bubble on every page, expands to branded chat panel
- Powered by OpenAI GPT-4o via Vercel AI SDK (`useChat` hook) with streaming responses
- RAG architecture: Stephanie's FAQ, services, pricing, portfolio metadata, blog posts, and venue data chunked and embedded in Supabase pgvector
- System prompt: detailed brand voice guide — warm, Colorado-specific, knows venues, uses Stephanie's phrases
- After 2-3 exchanges, naturally asks for contact info → stores in Supabase `leads` table
- Complex/high-value queries: "Let me connect you with Stephanie directly" → priority email notification
- Calendly integration: offer available consultation slots inline
- Transparent: "I'm Stephanie's AI assistant" — never pretends to be human
- Rate limited: Upstash Redis, 20 messages/session

**Personalized Content — Detailed Spec:**
- Cookie-based visitor segmentation (first-party, privacy-friendly)
- Segments from quiz results or browsing behavior: Mountain/Outdoor, Elopement, Large Wedding, Budget-Conscious, Luxury, Destination
- Content reordering (not hiding): homepage hero, featured weddings, blog feed, testimonials adapt to segment
- Returning visitors see: relevant hero imagery, matched portfolio items first, personalized CTA copy
- No AI API calls for serving — rule-based with pre-tagged content
- Fallback: unknown visitors get default ordering

### Tier 2 AI Features (Months 5-7) — Differentiators

| Feature | Build Time | Monthly Cost | Impact |
|---------|-----------|-------------|--------|
| **AI Budget Estimator** | 2-3 weeks | $2-5 | Strong SEO driver, 15-20% of users become leads |
| **Wedding Vibe Translator** | 2-3 weeks | $5-15 | Brand differentiation, viral sharing potential |
| **AI Timeline Generator** | 1-2 weeks | $2-5 | Retention tool, 10-15% of users convert |
| **Smart Gallery (NL Search)** | 2-3 weeks | $3-5 | 40-50% more time on portfolio pages |
| **Vendor Match Engine** | 2-3 weeks | $2-5 | Vendor relationship builder, email capture |

**AI Budget Estimator — Detailed Spec:**
- Conversational multi-step form: guest count → Colorado region → style → priorities
- Deterministic calculation engine (not AI) for math: Supabase `budget_ranges` table with Colorado-specific pricing data from Stephanie
- AI enhancement: GPT-4o-mini generates natural language commentary ("Mountain venue catering runs $85-120/person vs. $65-95 in Denver due to logistics")
- Output: beautiful budget breakdown with bar chart (Recharts), total range, per-category ranges, "Where to splurge vs. save" tips
- Planner fee shown in context: "Typically 8-12% of total — and saves you $5,000+ through vendor negotiations"
- Lead capture: full results require email, teaser (total range) shown without
- SEO: "Colorado mountain wedding budget calculator" = zero competition keyword

**Wedding Vibe Translator — Detailed Spec:**
- Text input: "Describe your dream wedding in a few sentences"
- Optional: image upload (Pinterest screenshot or inspiration photo)
- GPT-4o (with Vision for images) analyzes input → extracts style, colors, mood, formality, venue type
- Output: Style name ("Intimate Mountain Supper Club"), color palette with hex codes, venue recommendations from Stephanie's database, floral suggestions, budget range estimate, "Stephanie's Take" personalized note
- Results shareable on social media (OG image auto-generated)
- Email capture: "Save your mood board" requires email
- Most novel feature — no wedding planner website offers this

### Tier 3 AI Features (Month 7-8+) — Experimental

| Feature | Build Time | Monthly Cost | Notes |
|---------|-----------|-------------|-------|
| **AI Wedding Day Visualizer** | 4-6 weeks | $10-25 | Upload venue photo → AI generates decorated scene. Viral potential. |
| **AI Blog Content Pipeline** | 1-2 weeks | $5-10 | AI drafts, Stephanie edits. 4-8 posts/month with minimal effort. |
| **Predictive Availability** | 3-4 weeks | $2-5 | Calendar heat map showing demand + weather probability. |

### AI Ethics & Trust Principles

1. **Transparency:** Always disclose AI involvement. "Stephanie's AI assistant" not "Stephanie."
2. **Human escalation:** Every AI interaction has a clear path to a real human, one click away.
3. **No manipulation:** No fake urgency, no dark patterns, no exploiting emotional vulnerability.
4. **Data minimization:** Only collect what's needed. Budget estimator results are ephemeral unless explicitly saved.
5. **GDPR/CCPA compliance:** Cookie consent, data deletion flow, privacy policy updated for AI data processing.

### Phase 3 Deliverables Checklist

- [ ] AI Concierge Chat (RAG, brand voice, lead capture, Calendly integration)
- [ ] Smart Inquiry Form with AI lead analysis
- [ ] Personalized content for returning visitors
- [ ] Sentiment-aware lead prioritization (admin dashboard)
- [ ] AI Budget Estimator (Colorado-specific data, charts, lead capture)
- [ ] Wedding Vibe Translator (text + image input, shareable results)
- [ ] AI Timeline Generator (interactive, exportable to Google Calendar)
- [ ] Smart Gallery with natural language portfolio search
- [ ] Vendor Match Engine (quiz-results-based recommendations)
- [ ] AI blog content pipeline (draft generation, admin review)

---

## 10. Content Strategy & SEO

### Content Pillars

1. **Colorado Mountain Wedding Guides** — Venue guides, seasonal planning, logistics (TOFU, SEO-driven)
2. **Wedding Planning Education** — Planner vs. coordinator, budgeting, process (MOFU, trust-building)
3. **Real Wedding Stories** — Narrative case studies with planning journey (BOFU, social proof)
4. **Trend & Inspiration** — Seasonal trends, style guides, decor ideas (TOFU, shareable)

### 6-Month Content Calendar

| Month | TOFU Post | MOFU Post | BOFU / Real Wedding | SEO Task |
|-------|-----------|-----------|---------------------|----------|
| 1 | Colorado Mountain Wedding Planning Guide | Do You Need a Wedding Planner? | Real Wedding #1 | Title tags, schema, sitemap, Search Console |
| 2 | Best Vail Wedding Venues (2026) | Planner vs. Day-of Coordinator | Real Wedding #2 | Venue guide: Vail |
| 3 | How Much Does a Colorado Wedding Cost? | How to Choose a Wedding Planner | Real Wedding #3 | Venue guide: Beaver Creek |
| 4 | Beaver Creek Venue Guide | Full Service vs. Partial Planning | Real Wedding #4 | Internal linking audit |
| 5 | Best Season for a Mountain Wedding | Our Planning Process: First Call to "I Do" | Real Wedding #5 | Venue guide: Aspen |
| 6 | Colorado Elopement Ideas: 10 Mountain Spots | 5 Red Flags When Hiring a Planner | Real Wedding #6 | Core Web Vitals optimization |

### Schema Markup Strategy

| Schema Type | Pages | Purpose |
|-------------|-------|---------|
| `LocalBusiness` (`EventPlanning`) | Sitewide JSON-LD | Google Business, local SEO |
| `FAQPage` | /faq/, /services/ pages | Rich snippet FAQ results |
| `Review` | Case studies, testimonials | Star ratings in SERPs |
| `Event` | Case study pages | Event details in search |
| `BreadcrumbList` | All pages | Navigation breadcrumbs |
| `Person` | /about/ | Knowledge panel for Stephanie |
| `Service` | Each /services/ page | Service details in search |
| `Article` | Blog posts | Article rich snippets |
| `HowTo` | /process/, relevant blog posts | Step-by-step rich snippets |
| `Place` | Venue guide pages | Venue location data |

---

## 11. Analytics & Measurement

### Event Tracking Plan

| Event | Trigger | Properties | Tool |
|-------|---------|-----------|------|
| `page_view` | Every page load | path, title, referrer | PostHog + GA4 |
| `hero_cta_click` | Primary CTA clicked | page, cta_text | PostHog |
| `form_start` | First field interaction in inquiry form | form_type, page | PostHog |
| `form_step_complete` | Each step completed | step_number, step_name, form_type | PostHog |
| `form_submit` | Inquiry form submitted | wedding_type, guest_count, budget_range, location | PostHog + GA4 (conversion) |
| `form_abandon` | Form started but not completed | last_step, form_type | PostHog |
| `quiz_start` | Style quiz opened | source_page | PostHog |
| `quiz_step_complete` | Each quiz question answered | question_number, answer | PostHog |
| `quiz_complete` | Quiz fully completed | style_result, has_email | PostHog + GA4 (conversion) |
| `quiz_email_capture` | Email provided during quiz | — | PostHog + GA4 (conversion) |
| `case_study_view` | Case study page viewed | couple_name, venue, style | PostHog |
| `gallery_filter` | Portfolio filtered | filter_type, filter_value | PostHog |
| `venue_guide_view` | Venue guide page viewed | location | PostHog |
| `calendar_book` | Calendly booking completed | — | GA4 (conversion) |
| `chat_start` | AI chat opened | page | PostHog |
| `chat_lead_capture` | Contact info provided in chat | — | PostHog + GA4 (conversion) |
| `budget_tool_complete` | Budget estimator completed | guest_count, region, style | PostHog |
| `vibe_translator_complete` | Vibe translator used | input_type (text/image) | PostHog |
| `exit_intent_shown` | Exit popup triggered | page | PostHog |
| `lead_magnet_download` | Planning guide downloaded | — | PostHog + GA4 (conversion) |
| `external_link_click` | Vendor/venue external link | destination, link_text | PostHog |

### Key Funnels to Track

1. **Homepage → Inquiry:** homepage → services → contact → form_submit
2. **Quiz Funnel:** quiz_start → quiz_step_N → quiz_email_capture → quiz_complete → calendar_book
3. **Blog → Lead:** blog_view → form_start or quiz_start → conversion
4. **Venue Guide → Lead:** venue_guide_view → form_start → form_submit
5. **Chat → Lead:** chat_start → chat_lead_capture → calendar_book

### Dashboards

Build 3 PostHog dashboards:
1. **Acquisition:** Traffic sources, landing pages, new vs. returning, device breakdown
2. **Engagement:** Pages per session, time on site, scroll depth, quiz/tool usage
3. **Conversion:** Lead volume, form completion rates, chat conversions, booking rate by source

---

## 12. QA & Launch Checklist

### Pre-Launch Checklist

**Content:**
- [ ] All copy reviewed and approved by Stephanie
- [ ] 5-8 case studies populated with real content, photos, vendor credits
- [ ] FAQ page: 25 questions answered
- [ ] Services descriptions and pricing accurate
- [ ] Privacy policy and terms updated for new data practices (AI, cookies, etc.)
- [ ] All placeholder/lorem ipsum removed

**Technical:**
- [ ] All pages render correctly on mobile (iOS Safari, Android Chrome)
- [ ] All pages render correctly on desktop (Chrome, Safari, Firefox, Edge)
- [ ] All forms submit successfully and data appears in Supabase + HoneyBook
- [ ] Email notifications working (lead alerts to Stephanie, confirmations to couples)
- [ ] Calendly embed loads and books successfully
- [ ] 301 redirects verified for all old WordPress URLs
- [ ] XML sitemap generates correctly, submitted to Search Console
- [ ] Robots.txt allows crawling of all public pages
- [ ] All images optimized (WebP/AVIF, responsive srcset, alt text)
- [ ] No console errors on any page
- [ ] No broken links (run `scripts/validate-links.ts`)

**Performance:**
- [ ] Lighthouse Performance > 85 on all pages (mobile)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID/INP < 200ms
- [ ] No render-blocking resources

**SEO:**
- [ ] Unique title tags on every page (< 60 chars)
- [ ] Unique meta descriptions on every page (< 155 chars)
- [ ] H1 on every page, proper heading hierarchy
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] Open Graph tags render correctly (Facebook Debugger)
- [ ] Twitter Cards render correctly
- [ ] Canonical URLs set on all pages

**Accessibility:**
- [ ] WCAG 2.2 AA compliance verified
- [ ] Keyboard navigation works on all interactive elements
- [ ] Screen reader testing passed (VoiceOver)
- [ ] Color contrast passes (4.5:1 normal text, 3:1 large text)
- [ ] `prefers-reduced-motion` disables all animations
- [ ] All images have descriptive alt text
- [ ] Focus indicators visible and meet 2px/3:1 requirement

**Analytics:**
- [ ] PostHog tracking fires on all pages
- [ ] GA4 conversions configured (form submit, quiz complete, calendar book)
- [ ] Event tracking plan implemented (all events firing correctly)
- [ ] Cookie consent banner working and blocking analytics until consent

**Security:**
- [ ] Environment variables secured (not in client bundle)
- [ ] Rate limiting on API routes (especially AI endpoints)
- [ ] Input sanitization on all form fields
- [ ] CSRF protection on form submissions
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] No sensitive data exposed in client-side code

### Launch Day Procedure

1. DNS cutover: Update A/CNAME records to Vercel
2. Verify SSL certificate provisioned
3. Run full redirect verification (`scripts/validate-links.ts`)
4. Submit updated sitemap to Google Search Console
5. Verify Google Business Profile URL
6. Update WeddingWire, The Knot, Yelp listings with new URLs
7. Social media announcement
8. Monitor error rates and analytics for 24 hours

---

## 13. Post-Launch & Ongoing

### Week 1 Post-Launch
- Monitor Google Search Console for crawl errors, indexing issues
- Fix any 404s from unmapped old URLs
- Review initial analytics data — identify drop-off points
- A/B test hero headline variants
- Stephanie to review first incoming leads for quality

### Monthly Ongoing
- Publish 2-3 blog posts per content calendar
- Review and respond to Google Reviews
- Update portfolio with new weddings (ongoing case studies)
- Review analytics dashboards — optimize underperforming pages
- Update venue guides with new information/venues
- Review AI chat logs for quality and improvement opportunities
- Refresh seasonal hero imagery quarterly

### Quarterly Reviews
- SEO audit: keyword rankings, organic traffic trends, new opportunities
- Conversion rate optimization: form A/B tests, CTA experiments
- Content audit: what's performing, what needs updating
- Competitive monitoring: what are competitors doing?
- AI feature usage review: what's used, what's not, what to improve
- Performance audit: Core Web Vitals trends

---

## 14. Dependencies & Risks

### Dependencies on Stephanie

| Item | Phase | Priority | Description |
|------|-------|----------|-------------|
| Brand voice guide | 1 | Critical | 10-15 example responses showing tone, phrases, personality |
| Photography selection | 1 | Critical | Hero images, case study photos (5-8 weddings, 15-25 photos each) |
| Pricing finalization | 1 | Critical | Exact pricing structure for all service tiers |
| Case study content | 1 | Critical | Couple stories, planning narratives, testimonial quotes for 5-8 weddings |
| FAQ answers | 1 | High | Review and personalize 25 FAQ answers |
| Service descriptions | 1 | High | Detailed inclusions/exclusions for each package |
| Style taxonomy | 2 | Critical | 5-6 named style categories for quiz mapping |
| Tagged portfolio images | 2 | High | 50-100 images tagged by style, venue, season |
| Venue recommendations | 2 | High | Top 8-10 venues per location with notes |
| Colorado budget data | 3 | Critical | Real pricing ranges per category, per region, per style tier |
| Vendor database | 3 | High | Preferred vendors with categories, regions, style tags, endorsements |

### Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Stephanie content bottleneck | High | High | Start content gathering Week 1, provide templates and examples, allow AI-assisted drafts for Stephanie to edit |
| Photography quality inconsistent | Medium | High | Establish photo selection criteria, consider professional reshoot for hero/key images |
| AI hallucination in concierge | Medium | Medium | RAG architecture constrains to known data, confidence scoring, human escalation path |
| SEO takes time to compound | Certain | Medium | Set expectations: organic traffic ramp is 3-6 months. Quick wins from schema + venue guides |
| HoneyBook integration limitations | Medium | Low | Design for webhook-based integration, build abstraction layer for CRM swap |
| Scope creep from AI features | High | High | Strict phase gates — Phase 1 ships with ZERO AI. Phase 2 has quiz only. Phase 3 is iterative. |
| OpenAI API cost overrun | Low | Low | Rate limiting, cost capping, GPT-4o-mini for commodity tasks, monitoring |

---

## 15. Reference Documents

### Research Dossier (Pre-existing)
| File | Content |
|------|---------|
| `00-executive-summary.md` | Research summary, top 10 opportunities, anti-patterns, rebuild priority |
| `01-competitor-matrix.md` | 78-site competitive analysis across planners, platforms, adjacent industries |
| `02-ui-ux-pattern-library.md` | 40+ UI/UX patterns for hero, portfolio, trust, inquiry, pricing |
| `03-content-seo-blueprint.md` | Sitemap, 30 blog topics, case study template, FAQ strategy, schema plan |
| `04-feature-roadmap.md` | Phased feature plan with success metrics |
| `05-differentiator-concepts.md` | 5 signature feature specs (quiz, budget calc, vibe translator, concierge, timeline) |
| `06-source-log.md` | All research sources with dates and findings |
| `07-partygirl-baseline-audit.md` | Current site teardown and assessment |

### Consolidated Reference Docs (in `party-girl-events/docs/`)
| File | Content |
|------|---------|
| `docs/wedding-industry-trends-2026.md` | Consolidated wedding industry trends (from 4 research reports) |
| `docs/modern-website-uiux-guide-2026.md` | 2026 web design patterns, tech stack, implementation guides |
| `docs/ai-features-wedding-website.md` | 14 AI feature specs across 3 tiers with technical details |

### Architecture Decision Records (to be written)
| File | Decision |
|------|----------|
| `docs/adr/0001-nextjs-app-router.md` | Why Next.js 15 App Router over alternatives |
| `docs/adr/0002-content-strategy-mdx-vs-cms.md` | CMS choice: Payload vs. Sanity vs. MDX |
| `docs/adr/0003-forms-and-leads.md` | Form architecture and CRM integration approach |
| `docs/adr/0004-analytics-stack.md` | Analytics tool selection and privacy approach |

---

## Appendix: File-to-Plan Mapping

Which document to reference for each area of work:

| Working On | Reference These Files |
|------------|----------------------|
| Homepage design | `02-ui-ux-pattern-library.md` (Section A), `docs/modern-website-uiux-guide-2026.md`, `docs/wedding-industry-trends-2026.md` (Sections 2, 3) |
| Portfolio/case studies | `02-ui-ux-pattern-library.md` (Section B), `03-content-seo-blueprint.md` (case study template) |
| Services/pricing | `02-ui-ux-pattern-library.md` (Section E), `07-partygirl-baseline-audit.md` (Section 6) |
| Inquiry forms | `02-ui-ux-pattern-library.md` (Section D), `docs/ai-features-wedding-website.md` (Feature 3) |
| SEO & content | `03-content-seo-blueprint.md`, `docs/wedding-industry-trends-2026.md` (Section 8) |
| Style quiz | `05-differentiator-concepts.md` (Feature 1), `docs/ai-features-wedding-website.md` (Feature 1) |
| AI features | `docs/ai-features-wedding-website.md` (all), `05-differentiator-concepts.md` |
| Visual design system | `docs/modern-website-uiux-guide-2026.md`, `docs/wedding-industry-trends-2026.md` (Sections 2, 3, 4) |
| Competitive context | `01-competitor-matrix.md`, `00-executive-summary.md` |
| Current site gaps | `07-partygirl-baseline-audit.md` |
| Trust signals | `02-ui-ux-pattern-library.md` (Section C), `06-source-log.md` (Reddit themes) |
