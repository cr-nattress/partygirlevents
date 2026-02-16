# US-002 — Services & Pricing Pages

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 5
**Status:** Not Started

---

## Description

Build the services hub page and individual service detail pages that replace the current site's raw pricing display with a value-framed, comparison-driven presentation. The current site shows pricing as plain numbers with no context, no comparison table, no "what's included" detail, and no FAQ addressing pricing objections. The new services system uses a Good/Better/Best comparison pattern on the hub page, frames pricing as "Your Investment" with budget-relative context ("typically 8-12% of total wedding budget"), and provides individual service pages with detailed inclusions, qualifying copy, relevant case studies, and transparency on what is NOT included. A pricing FAQ accordion addresses the most common objections sourced from Reddit research.

---

## Acceptance Criteria

### Services Hub Page (`/services/`)

- [ ] Page title/headline: "Our Services" or "How We Help" (not just "Pricing")
- [ ] Introductory paragraph framing investment context: planning is typically 8-12% of total wedding budget, with messaging about value and peace of mind
- [ ] Comparison table displaying all service tiers in a Good/Better/Best pattern:
  - **Elopements** (Good) -- intimate, streamlined
  - **Wedding Management** (Better) -- couple handles the vision, Stephanie manages execution
  - **Full Service Planning** (Best) -- end-to-end planning and design
- [ ] Each tier in the comparison table includes: package name, 1-2 sentence description, 5-8 key inclusions (checkmarks), starting price anchor ("Starting at $X"), primary CTA button ("Learn More" or "Get Started")
- [ ] Visual emphasis on the "Best" tier (highlighted column, "Most Popular" badge, or similar pattern)
- [ ] "Your Investment" language used instead of "Pricing" or "Cost" throughout
- [ ] Events/Corporate service mentioned separately below the main comparison (not part of the wedding tier comparison)
- [ ] FAQ accordion section at the bottom of the page addressing 5-8 pricing-specific objections:
  - "Why should I hire a wedding planner?"
  - "What does 'starting at' mean?"
  - "Can I customize a package?"
  - "When is payment due?"
  - "Do you offer payment plans?"
  - "What if I only need help with part of my wedding?"
  - "How does your pricing compare to other Colorado planners?"
  - "Is a planner worth it for a small wedding?"
- [ ] FAQ section uses the same Accordion component as the FAQ page (US-006)
- [ ] Page includes a final CTA section: "Not sure which service is right for you? Let's talk." linking to `/contact/`
- [ ] Responsive layout: side-by-side comparison columns on desktop, stacked cards on mobile

### Individual Service Pages (`/services/[slug]/`)

Create 4 individual service pages:
1. `/services/full-service/` -- Full Service Planning
2. `/services/wedding-management/` -- Wedding Management
3. `/services/elopements/` -- Elopement Planning
4. `/services/events/` -- Corporate & Social Events

Each page includes:
- [ ] Hero section with service name, tagline, and representative image
- [ ] Detailed description of the service (2-3 paragraphs)
- [ ] "What's Included" -- comprehensive list of inclusions for this tier, organized by category (Planning, Design, Coordination, Communication, etc.)
- [ ] "Perfect For You If..." -- 3-5 qualifying bullets helping the visitor self-select (e.g., "You want to be involved in the creative decisions but need someone to manage the logistics")
- [ ] 2-3 relevant case studies from this service tier (sourced from portfolio, linked to `/portfolio/[slug]/`)
- [ ] Client testimonial specific to this service level (quote, couple name, venue)
- [ ] "What's NOT Included" -- transparent list of exclusions (builds trust per Reddit research insight)
- [ ] Price anchor and investment context for this specific tier
- [ ] Primary CTA: "Book a Discovery Call" or "Start Planning" linking to `/contact/` with service type pre-selected
- [ ] Breadcrumb navigation: Home > Services > [Service Name]
- [ ] Related services: "Also consider..." linking to other service pages
- [ ] `Service` schema markup (JSON-LD)

### Cross-Cutting Requirements
- [ ] All pages follow the "Elevated Warm Minimalism" design language
- [ ] Investment/pricing sections use the monospace accent font for dollar amounts (per design tokens)
- [ ] Mobile-first responsive layout
- [ ] Scroll-triggered Framer Motion animations on section entrances
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Consistent CTA placement and styling across all service pages

---

## Technical Notes

- **Routes:**
  - Hub: `src/app/(marketing)/services/page.tsx`
  - Detail: `src/app/(marketing)/services/[slug]/page.tsx`
- **Rendering:** Static generation with ISR. Service content from CMS `Service` content model. Use `generateStaticParams()` for the 4 service slugs.
- **Comparison table:** Build as a responsive component that transforms from a multi-column table on desktop to stacked cards on mobile. Consider `<table>` with proper `<th>` scope attributes for accessibility, or a CSS Grid-based layout.
- **FAQ accordion:** Reuse the Accordion component from Epic 01 US-003. FAQ content sourced from CMS `FAQ` model filtered by category "pricing".
- **Schema:** Implement `Service` schema markup per service page. Include `FAQPage` schema on the hub page for the pricing FAQ accordion.
- **Analytics events:** Track `service_comparison_view`, `service_tier_click`, `service_page_cta_click`, `pricing_faq_expand` via PostHog.
- **SEO:** Target keywords like "Colorado wedding planner pricing," "mountain wedding planner cost," "full service wedding planner Colorado." Each service page targets its specific service keyword cluster.

---

## Dependencies

- **Epic 01:** All foundation stories complete (design tokens, UI components, layout, CMS)
- **Epic 02 US-003:** Case study content must exist (or be in progress) for the "relevant case studies" sections on individual service pages
- **From Stephanie:** Finalized pricing structure for all tiers, detailed inclusions/exclusions per service level, service-specific testimonial quotes

---

## Definition of Done

- [ ] Services hub page renders comparison table correctly on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] All 4 individual service pages render with complete content sections
- [ ] Comparison table is keyboard-accessible and screen-reader friendly
- [ ] FAQ accordion on services hub is functional with smooth animations
- [ ] "Your Investment" framing used consistently -- no instances of "Pricing" or "Cost" as headers
- [ ] Each service page includes `Service` schema markup that validates on Google Rich Results Test
- [ ] Services hub includes `FAQPage` schema markup for the pricing FAQ
- [ ] All CTAs link correctly to `/contact/` with appropriate pre-selection parameters
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] Content reviewed and approved by Stephanie
- [ ] Passes accessibility audit (keyboard navigation, screen reader, color contrast, proper heading hierarchy)
