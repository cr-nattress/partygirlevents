# US-003 — Blog Content Strategy & Templates

**Epic:** [06 — Differentiators](README.md)
**Priority:** P1 — Should Have
**Points:** 3
**Status:** Not Started

---

## Description

Build the blog infrastructure — index page, post template, category system, and search — and launch with 4-6 SEO-optimized posts from the first two months of the 6-month content calendar. The blog system provides the templates and structure that Epic 08 (Content Pipeline) will use for ongoing content production. Every post is designed to rank for high-intent keywords, drive organic traffic, and funnel readers toward inquiry. The blog is a long-term SEO investment that compounds traffic month over month.

---

## Acceptance Criteria

### Blog Index Page
- [ ] Blog index at `/blog/` with a grid of post preview cards
- [ ] Each card includes: featured image, title, excerpt (2-3 lines), publish date, reading time, category badge
- [ ] Pagination: 9-12 posts per page with numbered page navigation
- [ ] Category filtering: clickable category badges that filter the post list (Astro-style tabs or dropdown)
- [ ] Search functionality: text input that filters posts by title and content (client-side for small collections, Supabase full-text search for scale)
- [ ] Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile

### Blog Post Template
- [ ] Blog post pages at `/blog/[slug]/`
- [ ] **Featured image:** Full-width hero image with caption and alt text
- [ ] **Post header:** Title (H1), publish date, reading time estimate, author name, category badge(s)
- [ ] **Table of contents:** Auto-generated from H2/H3 headings for long-form posts (> 1500 words). Sticky sidebar on desktop, collapsible on mobile.
- [ ] **Body content:** Rich text with support for: headings (H2-H4), paragraphs, bold/italic, bullet/numbered lists, block quotes, images with captions, embedded video, code blocks (for any technical tips), call-out boxes (tip, warning, note)
- [ ] **Author card:** Stephanie's photo, name, title, 1-2 sentence bio, link to About page
- [ ] **Related posts:** 2-3 algorithmically or manually related posts at the bottom
- [ ] **CTA blocks:** Inline CTA banners at mid-article and end-article positions — "Ready to start planning? Book your free discovery call" with link to `/contact/`
- [ ] **Social sharing:** Share buttons for Pinterest, Facebook, and email (copy link)
- [ ] **Previous/Next navigation:** Links to adjacent posts by publish date

### Categories
- [ ] Category taxonomy with the following initial categories:
  - Planning Tips
  - Real Weddings
  - Venue Guides
  - Colorado Weddings
- [ ] Each category has a dedicated filtered view at `/blog/category/[slug]/`
- [ ] Categories are CMS-managed and extensible

### Schema Markup
- [ ] **Article schema** (JSON-LD) on every blog post: headline, author, datePublished, dateModified, image, description, publisher
- [ ] **BreadcrumbList schema** on every blog post: Home > Blog > [Post Title]
- [ ] Schema validates via Google Rich Results Test

### Launch Content
- [ ] 4-6 blog posts published at launch, drawn from the Month 1-2 content calendar priorities:
  - "The Ultimate Guide to Colorado Mountain Weddings" (TOFU)
  - "Do You Really Need a Wedding Planner?" (MOFU)
  - Real Wedding feature #1 (BOFU)
  - "Best Wedding Venues in Vail, Colorado" (TOFU — cross-links to venue guide)
  - Additional 1-2 posts as capacity allows
- [ ] Each post is SEO-optimized: target keyword in title, H1, first paragraph, and meta description
- [ ] Each post includes 3+ internal links to other site pages
- [ ] Each post has structured headings (H2/H3) for featured snippet eligibility

### Analytics
- [ ] PostHog events: `blog_post_viewed` (with slug and category), `blog_cta_clicked`, `blog_share_clicked` (with platform), `blog_category_filtered`, `blog_search_used`

---

## Technical Notes

- **Routes:** `src/app/(marketing)/blog/page.tsx` (index), `src/app/(marketing)/blog/[slug]/page.tsx` (post), `src/app/(marketing)/blog/category/[slug]/page.tsx` (category filter)
- **Content:** CMS-managed blog posts. Content model: `BlogPost` (title, slug, excerpt, body (rich text), featuredImage, category[], author, publishDate, readingTime, seoTitle, seoDescription, relatedPosts[])
- **Reading Time:** Calculate from word count (~200 words/minute) — utility function in `src/lib/blog.ts`
- **Table of Contents:** Parse rendered HTML or MDX headings to extract H2/H3 IDs and text for TOC generation
- **Static Generation:** `generateStaticParams()` for all published posts. ISR with on-demand revalidation when CMS content updates.
- **RSS Feed:** Consider adding `/blog/rss.xml` for feed readers (nice-to-have)
- **Pagination:** Server-side pagination via CMS query params or Supabase `range()` if using database-backed content

---

## Dependencies

- **Epic 01 US-003:** UI components (Card, Badge, Button, Input)
- **Epic 01 US-004:** Layout components (Section, Container, PageHero)
- **Epic 01 US-005:** CMS content models and rich text rendering
- **Epic 03 US-001:** SEO foundation (Article schema helper, metadata patterns)
- **From Stephanie:** Blog post content (drafts or outlines for 4-6 launch posts), approval of 6-month content calendar

---

## Definition of Done

- [ ] Blog index page renders at `/blog/` with post cards, pagination, category filtering, and search
- [ ] Blog post template renders correctly with all sections (hero, header, TOC, body, author, related, CTAs, sharing)
- [ ] Article and BreadcrumbList schema validates on all posts
- [ ] 4-6 launch posts published with SEO-optimized content
- [ ] Category pages filter correctly at `/blog/category/[slug]/`
- [ ] Reading time calculates accurately from post content
- [ ] Social sharing buttons function correctly on mobile and desktop
- [ ] Mobile PageSpeed Lighthouse score > 85
- [ ] All PostHog analytics events fire correctly
- [ ] Content reviewed and approved by Stephanie
