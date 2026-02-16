# US-001 — Homepage

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 8
**Status:** Not Started

---

## Description

Build the homepage as the primary entry point and emotional anchor of the entire site. The current homepage fails the 5-second test with a "Get Your Party On Now!!" hero CTA and no clear value proposition. The new homepage must accomplish five things in scroll order: instant clarity on who Party Girl Events is and where they serve, an emotional hook through aspirational Colorado mountain imagery, layered trust signals that reduce skepticism, multiple low-commitment engagement paths, and a clear primary CTA driving visitors to the inquiry form. The page consists of 9 scroll sections with Framer Motion animations, a mobile-first layout, and a seasonal hero swap capability for year-round relevance.

---

## Acceptance Criteria

### Section 1: Hero
- [ ] Full-screen hero section (100vh on desktop, min-height on mobile) with background image/video
- [ ] Clear value proposition headline: "Colorado Mountain Wedding Planning -- Reimagined"
- [ ] Supporting subheadline: "Intimate, elevated, and stress-free. From Vail to Aspen, we make your mountain wedding vision real."
- [ ] Single primary CTA button: "Start Planning" linking to `/contact/`
- [ ] Headline uses fluid typography (`clamp(3rem, 8vw, 12rem)` or equivalent scale)
- [ ] Subtle scroll indicator (animated chevron or "scroll" text) visible on desktop
- [ ] Hero image/video loads as LCP element with priority loading (no lazy load)
- [ ] Seasonal hero swap capability: system supports 4 seasonal image/video sets (Spring, Summer, Fall, Winter) selectable via CMS field, environment variable, or date-based logic
- [ ] Warm cream gradient overlay on hero image ensures text readability
- [ ] Mobile hero adapts to portrait aspect ratio without cropping key visual elements

### Section 2: Press Logo Bar
- [ ] "As Featured In" or "As Seen In" label above logos
- [ ] Press logos displayed: Martha Stewart Weddings, Brides, The Knot, Buzzfeed, The Sun
- [ ] Logos rendered in monochrome/muted style matching the design system
- [ ] Horizontal scrollable or wrapping layout on mobile
- [ ] Logos link to the relevant press feature (if available) or are non-linking
- [ ] Section provides immediate social proof above the fold or near it

### Section 3: Services Preview
- [ ] 3 service cards displayed: Full Service Planning, Wedding Management, Elopements
- [ ] Each card includes: service name, 1-2 sentence description, "Starting at $X" price anchor, "Learn More" link to `/services/[slug]/`
- [ ] Cards use consistent styling from the Epic 01 Card component
- [ ] Hover/focus states with subtle elevation or border color change
- [ ] Responsive layout: 3 columns on desktop, single column stack on mobile
- [ ] Scroll-triggered entrance animation (fade-up stagger)

### Section 4: Featured Weddings
- [ ] 3-4 case study preview cards arranged in a bento grid layout
- [ ] Each card includes: hero photo, couple names, venue name, style tag badge, "View Their Story" link to `/portfolio/[slug]/`
- [ ] Bento grid uses varied card sizes for visual interest (1 large + 2 small, or similar)
- [ ] Responsive: bento grid on desktop, single-column stack on mobile
- [ ] Scroll-triggered entrance animation
- [ ] Content sourced from CMS (featured case studies)

### Section 5: How It Works
- [ ] 4-step process displayed: (1) Discovery Call (2) Custom Proposal (3) Planning Together (4) Your Perfect Day
- [ ] Each step includes: step number, title, 1-2 sentence description, optional icon or illustration
- [ ] Visual connector between steps (line, dots, or similar timeline indicator)
- [ ] Scroll-triggered sequential reveal animation (each step animates in order)
- [ ] Responsive layout: horizontal timeline on desktop, vertical on mobile
- [ ] Final step includes subtle CTA or link to `/process/` for full detail

### Section 6: Testimonial Carousel
- [ ] 3-5 client testimonial quotes displayed in a carousel or slider
- [ ] Each testimonial includes: quote text, couple name, venue name, couple photo (optional)
- [ ] Auto-advance with configurable interval (default: 6 seconds)
- [ ] Manual navigation: dots, arrows, or swipe on mobile
- [ ] Pause auto-advance on hover/focus
- [ ] Smooth Framer Motion transition between slides
- [ ] Accessible: `aria-live="polite"` region, keyboard navigable, pause button if auto-advancing

### Section 7: Colorado Venues Teaser
- [ ] Location cards for 5 areas: Vail, Beaver Creek, Aspen, Breckenridge, Keystone
- [ ] Each card includes: location name, representative photo, brief tagline (e.g., "Luxury Alpine Elegance")
- [ ] Cards link to venue guide pages (`/venues/[slug]/`) -- if venue guides are not yet built (Phase 2), link to `/contact/` with location pre-selected
- [ ] Responsive: horizontal scroll or grid on desktop, scrollable row on mobile
- [ ] Section headline: "Where in Colorado?" or "Colorado Mountain Venues"

### Section 8: Instagram Feed
- [ ] 6-8 recent Instagram posts displayed in a grid
- [ ] Each post shows image thumbnail, links to the original Instagram post on click
- [ ] Feed sourced from Instagram API or embed widget
- [ ] Fallback: if API is unavailable, show curated static images linking to the Instagram profile
- [ ] Instagram handle and "Follow Us" CTA displayed
- [ ] Responsive grid: 4 columns on desktop, 2 columns on mobile

### Section 9: CTA Section
- [ ] Full-bleed background image of Colorado mountain landscape
- [ ] Overlay headline: "Ready to Start Planning?"
- [ ] Supporting text: 1-2 sentences reinforcing the next step
- [ ] Primary CTA button: "Start Planning" linking to `/contact/`
- [ ] Secondary CTA (text link or ghost button): "Take Our Style Quiz" (links to `/quiz/` -- placeholder until Phase 2)
- [ ] Visually distinct from other sections (dark overlay, contrasting typography)

### Global Page Requirements
- [ ] Mobile-first layout with responsive breakpoints (375px, 768px, 1024px, 1280px, 1536px)
- [ ] All scroll-triggered animations use Framer Motion `useInView` or scroll-triggered variants
- [ ] All animations respect `prefers-reduced-motion: reduce` (disable or minimize motion)
- [ ] Page loads with LCP < 2.5s (hero image is the LCP candidate)
- [ ] Semantic HTML structure: single `<h1>` in hero, `<h2>` for each section, proper landmark elements
- [ ] Open Graph and Twitter Card meta tags with hero image for social sharing
- [ ] Unique page title: "Colorado Mountain Wedding Planner | Party Girl Events" (< 60 chars)
- [ ] Unique meta description referencing Colorado, mountain weddings, and key services (< 155 chars)

---

## Technical Notes

- **Route:** `src/app/(marketing)/page.tsx`
- **Rendering:** Homepage should be statically generated with ISR for CMS-driven content (featured weddings, testimonials). Hero section can be a Server Component; interactive sections (carousel, animations) require `"use client"` wrappers.
- **Hero images:** Use `next/image` with `priority` prop for LCP. Provide 4 seasonal variants. Swap logic can be a utility function in `src/lib/seasonal.ts` using `new Date().getMonth()` or a CMS field override.
- **Press logos:** SVG format for crisp rendering at any size. Store in `public/logos/` or as React components.
- **Bento grid:** CSS Grid with `grid-template-areas` for the featured weddings layout. Consider `@container` queries for responsive card behavior.
- **Testimonial carousel:** Use Framer Motion `AnimatePresence` for slide transitions. Consider Embla Carousel as a headless base for swipe/keyboard support.
- **Instagram feed:** Use Instagram Basic Display API or a serverless function that caches feed data. Fallback to static images if rate-limited.
- **Performance:** Lazy load sections below the fold. Use `next/dynamic` for the Instagram feed component. Consider `Intersection Observer` for scroll-triggered data fetching of below-fold content.
- **Analytics events:** Track `hero_cta_click`, `service_card_click`, `case_study_card_click`, `testimonial_view`, `venue_card_click`, `instagram_post_click`, `bottom_cta_click` via PostHog.

---

## Dependencies

- **Epic 01 US-001:** Project initialization (Next.js 15 setup, Tailwind, Framer Motion installed)
- **Epic 01 US-002:** Design tokens (colors, typography, spacing applied in Tailwind config)
- **Epic 01 US-003:** UI component library (Button, Card, Badge components)
- **Epic 01 US-004:** Layout components (Header, Footer, Section, Container, PageHero)
- **Epic 01 US-005:** Content infrastructure (CMS models for CaseStudy, Testimonial, Service)
- **From Stephanie:** Hero photography/video (4 seasonal sets), featured wedding content, testimonial quotes and photos, press feature details

---

## Definition of Done

- [ ] All 9 homepage sections render correctly on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Scroll-triggered animations fire correctly and respect `prefers-reduced-motion`
- [ ] Seasonal hero swap works via CMS toggle or date-based logic
- [ ] All CTA buttons link to correct destinations (`/contact/`, `/services/[slug]/`, `/portfolio/[slug]/`)
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] LCP (hero image) loads in < 2.5s on 4G network simulation
- [ ] Semantic HTML validated (proper heading hierarchy, landmarks, alt text on all images)
- [ ] Open Graph and Twitter Card meta tags produce correct social share preview
- [ ] PostHog analytics events fire on all interactive elements
- [ ] Content reviewed and approved by Stephanie (or populated with approved placeholder content)
- [ ] Passes accessibility audit (keyboard navigation, screen reader, color contrast)
