# US-002 — Venue Guide Pages

**Epic:** [06 — Differentiators](README.md)
**Priority:** P0 — Must Have
**Points:** 5
**Status:** Not Started

---

## Description

Build 5 dedicated venue guide pages targeting uncontested SEO keywords that no Colorado wedding planner competitor is producing content for. Each page provides an in-depth guide to wedding venues in a specific Colorado mountain location — Vail, Beaver Creek, Aspen, Breckenridge, and Keystone — with venue recommendations, Stephanie's personal notes, seasonal advice, transportation tips, cost overviews, and related case studies. These pages target high-intent keywords like "best wedding venues vail colorado" with ZERO direct competition from other planner websites, creating an SEO moat that compounds traffic over time.

---

## Acceptance Criteria

### Page Structure
- [ ] 5 venue guide pages created at:
  - `/venues/vail/`
  - `/venues/beaver-creek/`
  - `/venues/aspen/`
  - `/venues/breckenridge/`
  - `/venues/keystone/`
- [ ] Venue guide index page at `/venues/` with cards linking to each location
- [ ] Consistent page template used across all 5 guides

### Per-Page Content Sections
- [ ] **Area Overview:** 2-3 paragraphs introducing the location for weddings — character, accessibility, season highlights, what makes it special
- [ ] **Top Venues:** 8-10 venue recommendations, each with:
  - Venue name and hero photo
  - Capacity range (ceremony + reception)
  - Estimated price range (venue rental)
  - Style tags (rustic, luxury, intimate, grand, outdoor, indoor)
  - Best seasons for this venue
  - 2-3 sentence description
  - Stephanie's personal note ("I love this venue because...")
  - Link to venue website (external, `rel="noopener"`)
- [ ] **Best Seasons & Weather:** Month-by-month breakdown for the area — typical weather, pros/cons per season, what to plan for (altitude, afternoon storms, snow dates)
- [ ] **Transportation & Logistics:** Getting there from Denver, airport options, shuttle services, guest accommodation areas, parking considerations
- [ ] **Cost Overview:** General wedding cost expectations for the area vs. Front Range, typical venue rental ranges, catering expectations, mountain premium factors
- [ ] **Related Case Studies:** 1-3 real weddings from Stephanie's portfolio in this area (linked to case study pages)
- [ ] **Stephanie's Personal Notes:** 1-2 paragraphs of insider knowledge — what makes this area special, hidden gems, common mistakes to avoid
- [ ] **CTA Section:** "Planning a [Location] Wedding?" with inquiry form link, pre-populated with the location

### SEO & Schema
- [ ] **Place schema** markup (JSON-LD) for each venue mentioned on the page
- [ ] **BreadcrumbList schema** on each venue guide page: Home > Venues > [Location]
- [ ] Target keywords per page:
  - Vail: "best wedding venues vail colorado", "vail wedding planner"
  - Beaver Creek: "beaver creek wedding venues", "beaver creek wedding planner"
  - Aspen: "aspen wedding venues colorado", "aspen wedding planner"
  - Breckenridge: "breckenridge wedding venues", "breckenridge wedding planner"
  - Keystone: "keystone wedding venues colorado", "keystone wedding planner"
- [ ] Unique title tag per page: "Best Wedding Venues in [Location], Colorado | Party Girl Events" (< 60 chars)
- [ ] Unique meta description per page referencing top venues, insider tips, and planner expertise (< 155 chars)
- [ ] Internal links to related services, case studies, blog posts, and the contact page
- [ ] Each venue guide linked from the homepage Colorado Venues Teaser section (Epic 02 US-001 Section 7)

### Design & Responsiveness
- [ ] Hero image specific to each location (mountain landscape or featured venue)
- [ ] Venue cards in a responsive grid: 2 columns on desktop, single column on mobile
- [ ] Table of contents (sticky sidebar on desktop, collapsible on mobile) for long-form navigation
- [ ] Responsive typography and image sizing across all breakpoints
- [ ] Scroll-triggered entrance animations for venue cards

### Analytics
- [ ] PostHog events: `venue_guide_viewed` (with location), `venue_card_clicked` (with venue name), `venue_guide_cta_clicked`
- [ ] Track which venues receive the most clicks per location page

---

## Technical Notes

- **Routes:** `src/app/(marketing)/venues/page.tsx` (index), `src/app/(marketing)/venues/[slug]/page.tsx` (dynamic)
- **Content:** CMS-managed content for each venue guide. Content model: `VenueGuide` (location, slug, overview, venues[], seasons, transportation, costs, personalNotes). Nested `Venue` model: name, photo, capacity, priceRange, styleTags[], bestSeasons[], description, stephanieNote, website.
- **Static Generation:** Use `generateStaticParams()` for the 5 known slugs. ISR with revalidation for content updates.
- **Images:** Venue photos via `next/image` with responsive srcset. Source from Stephanie or venue websites (with permission).
- **Schema:** Reuse the schema helper from Epic 03 (`src/lib/schema.ts`) — add `buildPlaceSchema()` function.
- **Table of Contents:** Parse heading elements on mount to generate TOC dynamically, or use CMS structure to define sections.

---

## Dependencies

- **Epic 01 US-004:** Layout components (Section, Container, PageHero)
- **Epic 01 US-005:** CMS content models and content fetching utilities
- **Epic 03 US-001:** SEO foundation (schema helpers, metadata patterns)
- **From Stephanie:** Venue recommendations (8-10 per location) with photos, capacity, pricing, style tags, seasonal notes, and personal commentary. This is the critical dependency — the pages cannot be published without Stephanie's venue knowledge.

---

## Definition of Done

- [ ] All 5 venue guide pages render correctly at their respective URLs
- [ ] Venue index page at `/venues/` links to all 5 location pages
- [ ] Each page contains 8-10 venue recommendations with all required fields
- [ ] Place schema validates via Google Rich Results Test for each venue
- [ ] BreadcrumbList schema validates on each page
- [ ] Target keywords present in title, H1, meta description, and body content
- [ ] Internal links connect venue guides to homepage, services, case studies, and contact page
- [ ] Table of contents navigates correctly on desktop and mobile
- [ ] All images optimized and responsive
- [ ] Mobile PageSpeed Lighthouse score > 85
- [ ] Content reviewed and approved by Stephanie
- [ ] Pages submitted to Google Search Console for indexing
