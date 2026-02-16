# US-007 — Vendor Directory

**Epic:** [06 — Differentiators](README.md)
**Priority:** P2 — Nice to Have
**Points:** 3
**Status:** Not Started

---

## Description

Build a curated vendor recommendation page where Stephanie personally endorses her trusted network of Colorado mountain wedding vendors. Unlike generic vendor directories (The Knot, WeddingWire), this page features a hand-picked selection organized by category and tagged by region and style, with Stephanie's personal endorsement for each vendor. The page serves three purposes: it provides genuine value to couples researching vendors, it strengthens vendor partnerships through visibility (generating reciprocal backlinks when vendors link back), and it positions Stephanie as the hub of the Colorado mountain wedding vendor network. The "Tell them Stephanie sent you!" framing creates a personal referral dynamic rather than a cold directory listing.

---

## Acceptance Criteria

### Page Structure
- [ ] Vendor directory page at `/vendors/` (or `/recommended-vendors/`)
- [ ] Page intro: 2-3 paragraphs from Stephanie about how she selects vendors, the importance of the right team, and what "recommended" means (personally vetted, worked with multiple times, trusted with her clients)
- [ ] Vendors organized by category with clear section headings
- [ ] Anchor links or sticky sidebar navigation to jump between categories
- [ ] "Tell them Stephanie sent you!" tagline featured prominently

### Vendor Categories
- [ ] Categories include (at minimum):
  - Photographer
  - Videographer
  - Florist
  - Caterer
  - DJ / Band / Music
  - Hair & Makeup
  - Officiant
  - Cake / Desserts
  - Rentals & Decor
  - Stationery / Invitations
- [ ] Categories are extensible via CMS (new categories can be added without code changes)

### Vendor Cards
- [ ] Each vendor card displays:
  - Vendor business name
  - Category badge
  - Region tags (e.g., Vail, Aspen, Statewide)
  - Style tags (e.g., Rustic, Luxury, Bohemian, Classic)
  - 1 representative photo or logo
  - Stephanie's personal endorsement (2-3 sentences): why she recommends them, what they're known for, what kind of wedding they're best for
  - Website link (external, `rel="noopener"`)
  - Instagram link (optional)
- [ ] Cards are visually consistent and styled with the site's design system
- [ ] Hover/focus state with subtle elevation

### Filtering
- [ ] Filter by category (dropdown or tab navigation)
- [ ] Filter by region (multi-select or tag filter)
- [ ] Filter by style (multi-select or tag filter)
- [ ] Filters combine (e.g., "Photographer" + "Vail" + "Luxury" = filtered results)
- [ ] URL updates with filter state for shareable filtered views (query params)
- [ ] Empty state: "No vendors match your current filters — try broadening your search"

### SEO
- [ ] Unique title tag: "Recommended Colorado Wedding Vendors | Party Girl Events"
- [ ] Unique meta description referencing curated vendor recommendations and Colorado mountain weddings
- [ ] BreadcrumbList schema: Home > Recommended Vendors
- [ ] Internal links to and from: services pages, venue guides, contact page

### Analytics
- [ ] PostHog events: `vendor_directory_viewed`, `vendor_card_clicked` (with vendor name and category), `vendor_filter_applied` (with filter values), `vendor_website_clicked` (external link)

---

## Technical Notes

- **Route:** `src/app/(marketing)/vendors/page.tsx`
- **Content:** CMS-managed vendor entries. Content model: `Vendor` (name, category, regions[], styleTags[], photo, endorsement, website, instagram, sortOrder)
- **Filtering:** Client-side filtering is sufficient for the expected vendor count (30-60 vendors). Use React state to manage active filters and filter the vendor list. If the directory grows significantly, migrate to server-side filtering with Supabase queries.
- **URL State:** Use `useSearchParams()` to sync filter state with URL query parameters for shareable filtered views.
- **Backlink Strategy:** When vendors are added, notify them of their listing. Many will link back to the directory from their own "preferred vendors" or "as seen on" pages, generating valuable backlinks.
- **Static Generation:** Use ISR for the page since vendor data changes infrequently.

---

## Dependencies

- **Epic 01 US-003:** UI components (Card, Badge, Button, Select/Filter)
- **Epic 01 US-004:** Layout components (Section, Container, PageHero)
- **Epic 01 US-005:** CMS content model for vendors
- **From Stephanie:** Vendor database — business names, categories, region coverage, style tags, endorsement text, website/Instagram links, and representative photos. This is the critical dependency.

---

## Definition of Done

- [ ] Vendor directory page renders at `/vendors/` with all vendor cards organized by category
- [ ] Each vendor card displays all required fields including Stephanie's endorsement
- [ ] Category, region, and style filters work correctly (individually and combined)
- [ ] Filter state syncs with URL query parameters
- [ ] External links to vendor websites open in new tabs with `rel="noopener"`
- [ ] BreadcrumbList schema validates
- [ ] Page is responsive across all target breakpoints
- [ ] Mobile PageSpeed Lighthouse score > 85
- [ ] All PostHog analytics events fire correctly
- [ ] Vendor content reviewed and approved by Stephanie
- [ ] Vendors notified of their listing (for backlink opportunity)
