# US-001: SEO Foundation

**Epic:** [03 — SEO & Performance](README.md)
**Priority:** P0 — Must Have
**Points:** 5
**Status:** Not Started

---

## Description

Implement comprehensive on-page SEO across the entire site. Every page gets a unique title tag and meta description optimized for Colorado mountain wedding keywords. Structured data (JSON-LD) is added to all relevant pages to earn rich snippets in search results. The XML sitemap, robots.txt, canonical URLs, Open Graph tags, and web manifest are configured. Internal linking is reviewed and strengthened. The site is submitted to Google Search Console and verified.

---

## Acceptance Criteria

### Meta Tags
- [ ] Every page has a unique `<title>` tag, under 60 characters, formatted as `{Page Keyword} | Party Girl Events`
- [ ] Every page has a unique `<meta name="description">` under 155 characters, containing a CTA and emotional hook
- [ ] Metadata implemented via Next.js `generateMetadata()` or static `metadata` exports — no manual `<head>` tags
- [ ] No duplicate title tags or meta descriptions across any pages

### Heading Hierarchy
- [ ] Every page has exactly one `<h1>` element
- [ ] Heading hierarchy follows logical order: H1 → H2 → H3 (no skipped levels)
- [ ] Headings contain target keywords naturally (not keyword-stuffed)

### Schema Markup (JSON-LD)
- [ ] **LocalBusiness** (type: EventPlanning) on homepage and contact page — includes name, address, phone, email, URL, logo, hours, service area, geo coordinates, price range
- [ ] **FAQPage** schema on FAQ page and any page with FAQ sections
- [ ] **Review** / **AggregateRating** schema on pages displaying testimonials
- [ ] **Event** schema on any event-specific pages
- [ ] **BreadcrumbList** schema on all pages except homepage
- [ ] **Person** schema on About page for Stephanie
- [ ] **Service** schema on services page for each service tier
- [ ] **Article** schema on all blog posts (headline, author, datePublished, dateModified, image)
- [ ] **HowTo** schema on "planning process" or step-based content
- [ ] **Place** schema on venue guide pages
- [ ] All JSON-LD validates via Google Rich Results Test (no errors)
- [ ] Schema helper utility created in `src/lib/schema.ts` for reusable JSON-LD generation

### Sitemap & Robots
- [ ] XML sitemap generated dynamically via `src/app/sitemap.ts`
- [ ] Sitemap includes all public pages with `lastModified`, `changeFrequency`, and `priority` attributes
- [ ] Blog posts and portfolio items included in sitemap dynamically (fetched from CMS/database)
- [ ] `robots.txt` generated via `src/app/robots.ts` — allows all crawlers, references sitemap URL, blocks `/api/` routes
- [ ] Sitemap submitted to Google Search Console

### Canonical URLs & Open Graph
- [ ] Canonical URL set on every page via `alternates.canonical` in metadata
- [ ] Open Graph tags on every page: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- [ ] Twitter Card meta tags: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Default OG image created (1200x630px) with Party Girl Events branding
- [ ] Per-page OG images for key landing pages (homepage, services, contact)

### Internal Linking
- [ ] Every page has contextual internal links to related pages
- [ ] CTAs on every page link to contact/inquiry page
- [ ] Blog posts link to relevant service pages and portfolio items
- [ ] Breadcrumb navigation rendered on all pages except homepage
- [ ] Footer contains links to all major pages

### Search Console & Manifest
- [ ] Google Search Console property verified (DNS or meta tag method)
- [ ] Sitemap submitted in Search Console
- [ ] Web manifest configured via `src/app/manifest.ts` with app name, icons, theme color, background color
- [ ] Favicon set (SVG preferred with PNG fallback, Apple Touch Icon)

---

## Technical Notes

- Use a centralized metadata configuration in `src/lib/metadata.ts` for default values (site name, default OG image, etc.) and a helper function to merge page-specific metadata with defaults
- JSON-LD should be rendered via a `<script type="application/ld+json">` component — create a reusable `<JsonLd data={...} />` component
- The schema utility in `src/lib/schema.ts` should export typed builder functions: `buildLocalBusinessSchema()`, `buildArticleSchema()`, `buildFAQSchema()`, etc.
- Sitemap should dynamically fetch blog posts and portfolio items from the CMS/database to include them
- For OG images, consider using `next/og` (Vercel OG Image Generation) for dynamic images on blog posts
- Internal linking strategy should be documented as a content guideline for Stephanie

---

## Dependencies

- Epic 02 (Core Pages) — pages must exist before meta tags and schema can be applied
- CMS content models (Epic 01 US-005) — blog posts and portfolio items must be queryable for sitemap
- Google Search Console access — requires DNS verification or site ownership verification

---

## Definition of Done

- [ ] Every page has unique title, description, canonical, and OG tags — verified by crawling site with Screaming Frog or similar
- [ ] All JSON-LD schemas validate via Google Rich Results Test (zero errors)
- [ ] XML sitemap accessible at `/sitemap.xml` and includes all public pages
- [ ] robots.txt accessible at `/robots.txt` with correct directives
- [ ] Google Search Console verified and sitemap submitted
- [ ] Web manifest and favicon configured
- [ ] No SEO errors in Lighthouse audit (SEO score > 95)
- [ ] Breadcrumb navigation renders on all non-homepage pages
