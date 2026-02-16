# US-004 — About Page & Trust Signals

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Build the About page and implement trust signals that weave throughout the site. The About page transforms Stephanie from a faceless brand into a real person with credentials, personality, and values -- critical for a high-touch service like wedding planning where couples are entrusting their most important day to someone. The page highlights Stephanie's personal story, professional track record, HRC Pride partnership (an underutilized differentiator), and brand personality. Trust signals -- press logos, metric counters, and booking status indicators -- are designed as reusable components that appear across multiple pages, not just the About page.

---

## Acceptance Criteria

### About Page (`/about/`)

- [ ] Hero section with headline (e.g., "Meet Stephanie" or "The Woman Behind the Party") and a professional but warm portrait photo
- [ ] **Stephanie's Story** section: 3-5 paragraphs telling her personal journey -- why she started Party Girl Events, her connection to Colorado, what drives her, personal touches that make her relatable (not a corporate bio)
- [ ] **Experience & Credentials** section highlighting:
  - "150+ Weddings Planned" (or current accurate number)
  - Years of experience ("10+ Years" or specific count)
  - Certifications or professional memberships (if applicable)
  - Notable venues worked with
- [ ] **Animated metric counters**: Key stats displayed as large numbers that count up when scrolled into view:
  - Weddings planned (e.g., 150+)
  - Years of experience
  - Venues worked with
  - Happy couples
  - 5-star reviews
- [ ] Counter animation uses Framer Motion or a lightweight counter library, triggers on `useInView`, respects `prefers-reduced-motion` (shows final number immediately)
- [ ] **Team Introduction** section: If Stephanie has team members or key collaborators, include their names, roles, and photos. If solo, this section can highlight key vendor partners or be omitted.
- [ ] **Brand Personality** section: Why "Party Girl Events" as a name -- what it represents, the energy and personality behind the brand. Addresses the tension between "party girl" fun and professional sophistication.
- [ ] **HRC Pride Partnership** highlight: Dedicated subsection or callout block celebrating the partnership with the Human Rights Campaign and commitment to LGBTQ+ weddings. Include HRC logo/badge if permitted. This is a genuine differentiator in the Colorado mountain market.
- [ ] **Awards & Press** section: Display awards, features, and press mentions. Can include logos, publication names, and links to features. Overlap with the homepage press bar is intentional (reinforcement).
- [ ] **CTA section** at the bottom: "Let's See If We're a Good Fit" + "Book a Discovery Call" button linking to `/contact/`
- [ ] Breadcrumb navigation: Home > About
- [ ] `Person` schema markup (JSON-LD) for Stephanie Fleck with name, job title, organization, image, and relevant `sameAs` links (social profiles)

### Trust Signal Components (Reusable, Site-Wide)

- [ ] **Press Logo Bar component**: Reusable component displaying "As Featured In" logos. Used on Homepage (Section 2) and About page. Accepts a list of logos and renders them in monochrome.
- [ ] **Metric Counter component**: Reusable animated counter component. Accepts label, target number, suffix (e.g., "+"), and triggers count-up animation on scroll into view. Used on About page and optionally on Homepage.
- [ ] **Real-Time Booking Status component**: A small banner or badge displaying "Currently booking Fall 2026 + Spring 2027" (or current accurate seasons). Creates soft urgency without fake scarcity. Content managed via CMS or environment variable for easy updates.
  - Display locations: site-wide announcement bar (top of header), About page, Contact page, and/or Footer
  - Styling: subtle, informational tone -- not a hard-sell popup
- [ ] **Testimonial Pull-Quote component**: Reusable styled testimonial block with quote, attribution (couple name, venue), and optional photo. Used on About, Service detail pages, and Case Studies.

### Cross-Cutting Requirements
- [ ] Mobile-first responsive design
- [ ] Scroll-triggered Framer Motion entrance animations on sections
- [ ] All animations respect `prefers-reduced-motion`
- [ ] "Elevated Warm Minimalism" design: warm tones, serif headings, generous whitespace, personal and approachable feel
- [ ] Stephanie's photo(s) use `next/image` with optimization

---

## Technical Notes

- **Route:** `src/app/(marketing)/about/page.tsx`
- **Rendering:** Static generation. About page content can be hardcoded or CMS-driven. Trust signal components live in `src/components/shared/` or `src/components/trust/` for site-wide reuse.
- **Metric counter:** Use Framer Motion `useMotionValue` and `animate` for the counting animation, or a lightweight library like `react-countup`. Trigger with `useInView` from Framer Motion.
- **Booking status:** Content should be easily updatable. Options: CMS field on a site settings model, Supabase key-value table, or environment variable (`NEXT_PUBLIC_BOOKING_STATUS`). Avoid hardcoding season text.
- **Press logo bar:** Build as a reusable component in `src/components/shared/PressLogoBar.tsx`. SVG logos for crisp rendering. Apply CSS filter for monochrome effect (`filter: grayscale(100%) opacity(0.6)`) with hover revealing color.
- **Schema:** `Person` schema for Stephanie, `Organization` for Party Girl Events. Consider `sameAs` links to Instagram, Facebook, LinkedIn, WeddingWire, The Knot profiles.
- **Analytics events:** Track `about_page_view`, `about_cta_click`, `booking_status_view` via PostHog.
- **SEO:** Target keywords like "Colorado mountain wedding planner," "Stephanie Fleck wedding planner," "Party Girl Events about."

---

## Dependencies

- **Epic 01:** All foundation stories complete (design tokens, UI components, layout, CMS)
- **From Stephanie:** Personal story narrative (written in her voice or interview transcript for us to polish), professional headshot and casual photos, team member details (if applicable), HRC partnership details and permission to use badge, complete list of awards and press features, accurate metric numbers (weddings planned, years of experience, etc.)

---

## Definition of Done

- [ ] About page renders with all sections on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Animated metric counters count up smoothly on scroll and show final numbers when motion is reduced
- [ ] Press Logo Bar component renders correctly on About page and is reusable for Homepage
- [ ] Booking Status component displays current booking seasons and is easily updatable without code deployment
- [ ] HRC Pride partnership is prominently featured
- [ ] `Person` schema markup validates on Google Rich Results Test
- [ ] CTA links correctly to `/contact/`
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] Content reviewed and approved by Stephanie
- [ ] Passes accessibility audit (keyboard navigation, screen reader, color contrast, proper heading hierarchy)
