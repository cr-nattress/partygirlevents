# US-005: Content Infrastructure / CMS

**Epic:** [01 — Foundation & Design System](README.md)
**Priority:** P0 — Must Have
**Points:** 8
**Status:** Not Started

---

## Description

Set up the content management system (Payload CMS or Sanity — to be decided in an ADR) with all content models needed for the site, build the content fetching utilities, configure Incremental Static Regeneration for content pages, set up the image upload and optimization pipeline, and enable preview mode for draft content editing. This story establishes the content backbone that every page in Epic 02 and beyond will consume. It is the largest story in the epic because it involves schema design, CMS deployment, API integration, and caching strategy.

---

## Acceptance Criteria

### CMS Setup
- [ ] CMS platform selected (Payload CMS or Sanity) with rationale documented in an ADR (`docs/adr/0002-content-strategy-mdx-vs-cms.md`)
- [ ] CMS project provisioned and accessible (admin panel URL, API endpoint)
- [ ] CMS admin authentication configured (Stephanie + developer accounts)
- [ ] CMS connected to the Next.js project (API keys in environment variables)

### Content Models

All content models must be defined with proper field types, validation, and relationships.

#### Page
- [ ] Fields: `title`, `slug` (unique), `body` (rich text), `seoTitle`, `seoDescription`, `ogImage`, `publishedAt`, `status` (draft/published)
- [ ] Used for static pages: Privacy Policy, Terms of Service, Process, etc.

#### CaseStudy
- [ ] Fields:
  - `coupleName` (string, required)
  - `slug` (string, unique, auto-generated from couple name)
  - `venue` (relationship to Venue model)
  - `date` (date)
  - `guestCount` (number)
  - `season` (enum: Spring, Summer, Fall, Winter)
  - `style` (enum or tags: Mountain Modern, Rustic Luxe, Garden Romance, Boho Luxe, Classic Elegance, etc.)
  - `serviceLevel` (enum: Full Service, Wedding Management, Elopement, Event)
  - `excerpt` (text, for card previews)
  - `narrativeSections` (array of rich text blocks — Their Story, The Vision, The Planning Journey, The Details, The Day)
  - `gallery` (array of images, 15-25 per case study)
  - `vendorCredits` (array of objects: vendor name, category, website URL)
  - `testimonial` (relationship to Testimonial model or inline: quote, couple photo)
  - `featuredImage` (image, required)
  - `seoTitle`, `seoDescription`, `ogImage`
  - `status` (draft/published)
  - `publishedAt` (date)

#### BlogPost
- [ ] Fields:
  - `title` (string, required)
  - `slug` (string, unique, auto-generated from title)
  - `excerpt` (text, 150-300 chars)
  - `body` (rich text with embedded images, links, CTA blocks)
  - `category` (enum: Colorado Guides, Planning Tips, Real Weddings, Inspiration & Trends)
  - `tags` (array of strings)
  - `featuredImage` (image, required)
  - `author` (defaults to Stephanie)
  - `readingTime` (auto-calculated from body word count)
  - `seoTitle`, `seoDescription`, `ogImage`
  - `status` (draft/published)
  - `publishedAt` (date)

#### Venue
- [ ] Fields:
  - `name` (string, required)
  - `slug` (string, unique)
  - `location` (enum: Vail, Beaver Creek, Aspen, Breckenridge, Keystone, Other)
  - `description` (rich text)
  - `photos` (array of images)
  - `capacity` (object: min guests, max guests)
  - `priceRange` (string, e.g., "$$$" or "$10,000-$25,000")
  - `seasons` (multi-select: Spring, Summer, Fall, Winter)
  - `styleTags` (array of strings)
  - `website` (URL)
  - `stephNotes` (rich text — Stephanie's personal recommendation)
  - `status` (draft/published)

#### FAQ
- [ ] Fields:
  - `question` (string, required)
  - `answer` (rich text)
  - `category` (enum: Pricing, Process, Services, Colorado-Specific, Logistics)
  - `sortOrder` (number, for manual ordering within category)
  - `status` (draft/published)

#### Testimonial
- [ ] Fields:
  - `coupleName` (string, required)
  - `quote` (text, required)
  - `photo` (image, optional — couple photo)
  - `venue` (string or relationship to Venue)
  - `date` (date)
  - `videoUrl` (URL, optional — for video testimonials in Phase 2)
  - `rating` (number, 1-5, optional — for schema markup)
  - `status` (draft/published)

#### Service
- [ ] Fields:
  - `name` (string, required — Full Service, Wedding Management, Elopements, Events)
  - `slug` (string, unique)
  - `tagline` (string — one-line description)
  - `description` (rich text — detailed service description)
  - `inclusions` (array of strings — what's included)
  - `exclusions` (array of strings — what's NOT included)
  - `startingPrice` (string, e.g., "Starting at $8,000")
  - `investmentContext` (text — "Typically 8-12% of your total wedding budget")
  - `perfectFor` (rich text — "Perfect for you if..." qualifying section)
  - `typicalTimeline` (rich text — what the planning timeline looks like)
  - `featuredImage` (image)
  - `cta` (object: text, link)
  - `seoTitle`, `seoDescription`, `ogImage`
  - `status` (draft/published)
  - `sortOrder` (number)

### Content Fetching Utilities (`src/lib/content.ts`)
- [ ] Typed fetching functions for each content model:
  - `getPages()`, `getPageBySlug(slug)`
  - `getCaseStudies(filters?)`, `getCaseStudyBySlug(slug)`
  - `getBlogPosts(page?, category?)`, `getBlogPostBySlug(slug)`
  - `getVenues(location?)`, `getVenueBySlug(slug)`
  - `getFAQs(category?)`
  - `getTestimonials(limit?)`
  - `getServices()`, `getServiceBySlug(slug)`
- [ ] All functions return fully typed TypeScript objects (types defined in `src/types/content.ts`)
- [ ] Error handling: functions throw descriptive errors on CMS connection failure or missing content
- [ ] Support for filtering, sorting, and pagination where applicable
- [ ] Caching headers set appropriately for server-side calls

### Incremental Static Regeneration (ISR)
- [ ] Content pages use ISR with appropriate revalidation intervals:
  - Case studies, services, about: `revalidate: 3600` (1 hour)
  - Blog posts: `revalidate: 1800` (30 minutes)
  - FAQ, testimonials: `revalidate: 3600` (1 hour)
- [ ] On-demand revalidation endpoint at `/api/revalidate`:
  - Accepts POST request with `secret` token and `path` or `tag` parameter
  - Validates secret against `REVALIDATION_SECRET` environment variable
  - Calls `revalidatePath()` or `revalidateTag()` to bust cache for specific content
  - CMS webhook configured to trigger revalidation on content publish/update
- [ ] Verify that updated content appears on the live site within seconds of publishing + triggering revalidation

### Image Upload & Optimization
- [ ] Image upload workflow configured in CMS:
  - Supported formats: JPEG, PNG, WebP
  - Maximum upload size: 10MB per image
  - Auto-generates responsive variants (thumbnail, medium, large, full) if CMS supports it
- [ ] Images served through `next/image` component with automatic optimization:
  - Format conversion to WebP/AVIF
  - Responsive `srcset` generation
  - Lazy loading by default, `priority` for above-the-fold images
- [ ] Image URLs from CMS work correctly with Next.js `remotePatterns` configuration in `next.config.ts`
- [ ] Alt text field required on all image uploads in CMS

### Preview Mode
- [ ] Draft content preview enabled:
  - `/api/preview` endpoint enables Next.js Draft Mode with a secret token
  - `/api/exit-preview` endpoint disables Draft Mode
  - When Draft Mode is active, pages fetch draft (unpublished) content from CMS
  - Visual indicator shown when preview mode is active ("You are viewing draft content")
- [ ] Stephanie can preview unpublished content by clicking a preview link in the CMS admin
- [ ] Preview mode does not affect production visitors

---

## Technical Notes

### If Payload CMS
- Payload CMS is TypeScript-first and can embed directly into the Next.js app (runs at `/admin` route). This simplifies deployment — one Vercel project serves both the site and the CMS.
- Content types are defined as TypeScript collections in `src/collections/`.
- Payload generates TypeScript types automatically from collection schemas.
- Payload uses its own PostgreSQL database — can share the Supabase PostgreSQL instance or use a separate database.

### If Sanity
- Sanity runs as a separate hosted service with its own Studio (admin panel).
- Content types defined as schemas in a `/sanity` directory.
- Use `next-sanity` package for integration with Next.js App Router.
- GROQ query language for content fetching.
- Sanity has built-in image CDN and transformation pipeline.
- TypeScript types can be generated from schemas using `sanity-typegen`.

### General Notes
- Define TypeScript interfaces for all content models in `src/types/content.ts` regardless of CMS choice — the rest of the app should import types from this file, not from CMS-specific generated types.
- The content fetching layer in `src/lib/content.ts` should abstract the CMS implementation — if we ever swap CMS providers, only this file changes.
- For ISR, use Next.js `fetch()` with `next: { revalidate: N }` or `export const revalidate = N` in page files.
- Tag-based revalidation (`revalidateTag`) is preferred over path-based for content that appears on multiple pages (e.g., a testimonial shown on homepage and services page).
- Seed the CMS with sample content (2-3 entries per model) so that Epic 02 page development has data to work with from day one.

---

## Dependencies

- **US-001** (Project Initialization) — Supabase and project infrastructure must be in place; CMS-related environment variables configured
- **ADR Decision:** The CMS platform choice (Payload vs. Sanity) should be finalized before this story begins. If undecided, default to Payload CMS for TypeScript-first development and single-deployment simplicity.

---

## Definition of Done

- [ ] CMS admin panel is accessible and Stephanie has an account
- [ ] All 7 content models (Page, CaseStudy, BlogPost, Venue, FAQ, Testimonial, Service) are created with all specified fields
- [ ] Content fetching utilities in `src/lib/content.ts` successfully retrieve content for each model
- [ ] TypeScript types for all content models are defined in `src/types/content.ts` and used by fetching utilities
- [ ] ISR is configured and verified: edit content in CMS, trigger revalidation webhook, confirm updated content appears on site
- [ ] On-demand revalidation endpoint (`/api/revalidate`) works with secret token validation
- [ ] Images uploaded to CMS render correctly through `next/image` with optimization (WebP/AVIF, responsive srcset)
- [ ] Preview mode works: Stephanie can click a preview link in CMS and see draft content on the site
- [ ] CMS is seeded with sample content (2-3 entries per model) for Epic 02 development
- [ ] No TypeScript errors in content fetching layer (`npm run build` passes)
- [ ] Content fetching functions handle errors gracefully (CMS unreachable, content not found)
- [ ] ADR documenting the CMS choice and rationale is written
