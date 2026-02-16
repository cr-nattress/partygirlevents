# US-003 — Portfolio & Case Studies

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 8
**Status:** Not Started

---

## Description

Build the portfolio system that transforms the current flat photo gallery into narrative case studies that sell the planning service, not just showcase pretty photos. The current site has decent photography but zero narrative structure, no filtering, no vendor credits, and no connection between the portfolio and the services being sold. The new portfolio includes a filterable masonry grid on the index page with Framer Motion layout animations, and a rich case study template that tells the full story of each wedding -- from the couple's vision through the planning journey to the wedding day. Each case study functions as a mini sales page, demonstrating what working with Party Girl Events actually looks like. The system should launch with 5-8 case studies from Stephanie's best weddings.

---

## Acceptance Criteria

### Portfolio Grid Page (`/portfolio/`)

- [ ] Page headline: "Our Weddings" or "Real Weddings" or "Portfolio"
- [ ] Introductory copy (1-2 sentences) setting the tone for exploring real wedding stories
- [ ] Filter bar with filter chips for:
  - **Season:** Spring, Summer, Fall, Winter
  - **Venue Area:** Vail, Beaver Creek, Aspen, Breckenridge, Keystone, Other Colorado
  - **Style:** Categories from Stephanie's taxonomy (e.g., Mountain Modern, Rustic Luxe, Garden Romance, Classic Elegance, Boho Luxe)
  - **Guest Count:** Intimate (< 50), Medium (50-150), Large (150+)
- [ ] "All" or "Clear Filters" option to reset active filters
- [ ] Active filter chips are visually distinct (filled/highlighted state)
- [ ] Multiple filters can be active simultaneously (AND logic within category, OR logic across categories -- or simpler: single-select per category)
- [ ] Masonry grid layout for case study preview cards
- [ ] Framer Motion `layoutId` or `LayoutGroup` animations on filter changes (cards reflow smoothly rather than snapping)
- [ ] Each preview card includes: hero photo, couple names, venue name, location tag, style badge, "View Their Story" link
- [ ] Preview cards have hover state: subtle scale, shadow increase, or image zoom
- [ ] Responsive: 3-column masonry on desktop, 2 columns on tablet, single column on mobile
- [ ] Empty state when no case studies match active filters: "No weddings match your filters. Try adjusting your selection."
- [ ] Populate with 5-8 case studies from Stephanie's best weddings

### Case Study Template (`/portfolio/[slug]/`)

- [ ] **Quick Facts Bar** at the top of the page displaying:
  - Wedding date
  - Venue name and location
  - Guest count
  - Season
  - Style/aesthetic
  - Service level (Full Service, Wedding Management, etc.)
- [ ] Quick Facts Bar is visually compact (horizontal on desktop, grid on mobile) with consistent icon or label treatment

- [ ] **"Their Story"** section: 2-3 paragraphs about the couple -- how they met, their relationship, why they chose Colorado
- [ ] **"The Vision"** section: What the couple wanted for their wedding day -- aesthetic, mood, priorities, special elements
- [ ] **"The Planning Journey"** section: How Party Girl Events helped bring the vision to life -- challenges faced, creative solutions, logistics handled. This section sells the service.
- [ ] **"The Details"** section: Design elements, color palette, florals, table settings, personal touches, stationery
- [ ] **"The Day"** section: Timeline highlights, emotional moments, behind-the-scenes touches, weather stories, surprises
- [ ] **"What They Said"** section: Client testimonial with full quote, couple name, and couple photo. Styled as a pull-quote or featured testimonial block.

- [ ] **Vendor Credits** section: List of all wedding vendors with name, role/category (Photographer, Florist, Caterer, Venue, DJ, etc.), and clickable link to vendor website
- [ ] Vendor credits displayed as a clean list or grid with vendor names as outbound links (`target="_blank"`, `rel="noopener noreferrer"`)

- [ ] **Photo Gallery**: 15-25 curated photos per case study
- [ ] Gallery displays as a responsive grid (3-4 columns desktop, 2 columns mobile)
- [ ] Lightbox opens on photo click with full-resolution image, navigation arrows, and close button
- [ ] Lightbox supports keyboard navigation (arrow keys, Escape to close) and swipe on mobile
- [ ] Images use `next/image` with responsive srcset, AVIF/WebP optimization, and descriptive alt text
- [ ] Lazy loading on gallery images below the fold

- [ ] **Schema Markup:**
  - `Event` structured data (event name, date, location, description)
  - `Review` structured data (testimonial as review, rating if applicable)
- [ ] **Navigation:**
  - Breadcrumb: Home > Portfolio > [Couple Names]
  - "Previous / Next" case study navigation at the bottom
  - "Back to Portfolio" link
- [ ] **CTA section** at the bottom: "Dreaming of your own Colorado mountain wedding?" + "Start Planning" button linking to `/contact/`

### Cross-Cutting Requirements
- [ ] Mobile-first responsive design across all sections
- [ ] Scroll-triggered Framer Motion entrance animations on each narrative section
- [ ] All animations respect `prefers-reduced-motion`
- [ ] "Elevated Warm Minimalism" design: generous whitespace between narrative sections, serif headings, warm tones
- [ ] Case study pages are long-form -- ensure comfortable reading experience with max-width content container (prose width ~65ch)

---

## Technical Notes

- **Routes:**
  - Grid: `src/app/(marketing)/portfolio/page.tsx`
  - Detail: `src/app/(marketing)/portfolio/[slug]/page.tsx`
- **Rendering:** Static generation with ISR for both pages. Use `generateStaticParams()` to pre-render all case study slugs. Use `generateMetadata()` for per-page SEO (title, description, OG image using the hero photo).
- **CMS Model:** `CaseStudy` content type with fields for: couple name, slug, date, venue (relation), guest count, season (enum), style (enum/tag), service level (relation to Service), hero image, narrative sections (rich text or structured blocks), testimonial quote, vendor credits (array of {name, role, url}), gallery images (array), featured flag (boolean for homepage).
- **Masonry grid:** Use CSS `columns` property or a library like `react-masonry-css`. For Framer Motion layout animations on filter, wrap cards in `motion.div` with `layout` prop and use `AnimatePresence` for enter/exit animations.
- **Lightbox:** Use a headless lightbox library (e.g., yet-another-react-lightbox) or build with Framer Motion + Radix Dialog for accessibility. Ensure focus trap and `aria-modal` behavior.
- **Filter state:** Manage via URL search params (`?season=fall&area=vail`) for shareable filtered views. Use `useSearchParams()` from `next/navigation`.
- **Image optimization:** Gallery images should have multiple srcset sizes. Consider a lower-resolution grid thumbnail and full-resolution lightbox variant.
- **Analytics events:** Track `portfolio_filter_apply`, `portfolio_card_click`, `case_study_view`, `gallery_lightbox_open`, `vendor_credit_click`, `case_study_cta_click` via PostHog.
- **SEO:** Each case study page targets long-tail keywords like "Vail mountain wedding," "[Venue Name] wedding," "fall wedding Colorado." Use couple names and venue in the page title.

---

## Dependencies

- **Epic 01:** All foundation stories complete (design system, components, layout, CMS with CaseStudy model)
- **From Stephanie:** Case study content for 5-8 weddings including: couple story narratives, vision descriptions, planning journey narratives, detail descriptions, day-of highlights, testimonial quotes with photos, complete vendor credit lists with URLs, 15-25 curated photos per wedding (high-resolution originals for optimization pipeline)

---

## Definition of Done

- [ ] Portfolio grid page renders with 5-8 case study cards in masonry layout
- [ ] All 4 filter categories function correctly and update the displayed cards
- [ ] Framer Motion layout animations play smoothly on filter changes
- [ ] Filter state persists in URL search params (shareable filtered URLs)
- [ ] All 5-8 individual case study pages render with complete narrative sections
- [ ] Quick Facts bar, all narrative sections, vendor credits, and gallery are present and functional
- [ ] Photo gallery lightbox opens, navigates with keyboard/swipe, and closes correctly
- [ ] `Event` and `Review` schema markup validates on Google Rich Results Test
- [ ] Previous/Next navigation works across case studies
- [ ] Pages render correctly on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] All images optimized via `next/image` with AVIF/WebP and descriptive alt text
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] Content reviewed and approved by Stephanie
- [ ] Passes accessibility audit (keyboard navigation, lightbox focus trap, screen reader, color contrast)
