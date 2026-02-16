# Epic 09 — 2026 Wedding Trend Blog Posts

**Phase:** 1.5 (Content Launch — bridges Phase 1 site with Phase 2 differentiators)
**Priority:** P1 — Should Have
**Stories:** 10
**Points:** 47
**Status:** Not Started
**Dependencies:** Blog template infrastructure (built as part of this epic), existing UI component library (Epic 01)

---

## Goal

Build out the blog system and publish 8 visually rich, content-dense, interactive blog posts derived from the `wedding-industry-trends-2026.md` research document. Each post is designed to:

1. **Rank for high-intent SEO keywords** that Colorado couples are searching
2. **Showcase Party Girl Events' expertise** with original analysis and insider perspective
3. **Convert readers to inquiries** through strategically placed CTAs
4. **Demonstrate the brand's design quality** through interactive elements, rich visuals, and editorial layout

These are not standard blog posts. Each one is a **mini-experience** — think editorial magazine spreads with scroll-triggered animations, interactive comparison tools, embedded color palettes, image galleries, and data visualizations.

---

## Story Index

| Story | Title | Points | Priority | Status |
|-------|-------|--------|----------|--------|
| [US-001](US-001-blog-infrastructure.md) | Blog Infrastructure & Post Template | 8 | P0 | Not Started |
| [US-002](US-002-personalization-over-tradition.md) | "The Death of the Cookie-Cutter Wedding" | 5 | P1 | Not Started |
| [US-003](US-003-colorado-mountain-cost-guide.md) | "How Much Does a Mountain Wedding in Colorado Actually Cost?" | 5 | P1 | Not Started |
| [US-004](US-004-color-trends-2026.md) | "2026 Wedding Color Trends for Colorado Mountain Weddings" | 5 | P1 | Not Started |
| [US-005](US-005-lighting-transforms-venues.md) | "How Lighting Transforms Any Wedding Venue" | 5 | P1 | Not Started |
| [US-006](US-006-non-traditional-formats.md) | "Beyond the Ballroom: Non-Traditional Wedding Formats" | 5 | P1 | Not Started |
| [US-007](US-007-micro-luxury-weddings.md) | "Micro-Luxury Weddings: Why Less Is the New More" | 5 | P1 | Not Started |
| [US-008](US-008-food-as-decor.md) | "Food as Decor: The Interactive Catering Revolution" | 3 | P2 | Not Started |
| [US-009](US-009-sustainable-mountain-wedding.md) | "How to Plan a Sustainable Mountain Wedding" | 3 | P2 | Not Started |
| [US-010](US-010-elevated-minimalism-design.md) | "Elevated Minimalism: The 2026 Wedding Design Playbook" | 3 | P2 | Not Started |

**Total: 10 stories, 47 points**

---

## Architecture Decisions

### Content Storage
Blog posts are **statically defined in code** as MDX-like data structures (not CMS-managed). This eliminates CMS dependency, enables rich interactive components inline, and allows full control over layout per post. When a CMS is added later (Epic 01 US-005), these can be migrated.

### Interactive Components
Each post includes 1-3 bespoke interactive elements built as React components:
- Color palette swatches (click-to-copy hex codes)
- Budget breakdown calculators
- Before/after image sliders
- Comparison tables with hover states
- Scroll-triggered stat counters
- Image lightbox galleries
- Embedded quizzes/polls
- Animated infographics

### Visual Design
Posts follow the "Elevated Warm Minimalism" design system with:
- Full-bleed hero images
- Pull quotes with decorative typography
- Alternating full-width and contained sections
- Generous whitespace and editorial rhythm
- Framer Motion scroll animations (consistent with homepage)

### SEO Strategy
Each post targets a specific high-intent keyword cluster:
- Long-form (1500-2500 words) for TOFU guides
- Article + BreadcrumbList JSON-LD schema
- Internal linking to services, portfolio, contact pages
- OG images auto-generated or hand-crafted per post

---

## Content Source Mapping

| Post | Trend Document Sections | Target Keyword |
|------|------------------------|----------------|
| US-002 | Section 1 (Personalization), Section 4 (Decor) | "personalized wedding planning colorado" |
| US-003 | Section 1 (Budget Creativity), Section 8 (#1) | "colorado mountain wedding cost" |
| US-004 | Section 3 (Color Palettes) | "2026 wedding color trends" |
| US-005 | Section 4 (Statement Lighting) | "wedding lighting ideas" |
| US-006 | Section 1 (Non-Traditional), Section 5 (Venues) | "non-traditional wedding ideas" |
| US-007 | Section 1 (Micro-Luxury), Section 5 (Venues) | "micro wedding colorado" |
| US-008 | Section 4 (Food as Decor) | "interactive wedding catering ideas" |
| US-009 | Section 6 (Sustainability) | "sustainable mountain wedding" |
| US-010 | Section 2 (Visual Design), Section 4 (Texture) | "minimalist wedding design" |

---

## Definition of Done (Epic Level)

- [ ] Blog infrastructure built: index page with grid, category filter, search, pagination
- [ ] Blog post template built: hero, TOC, rich body, author card, related posts, CTAs, social sharing
- [ ] All 8 blog posts published with full content, images, and interactive elements
- [ ] Article + BreadcrumbList schema validates on every post
- [ ] All posts have unique OG images and meta descriptions
- [ ] Internal linking: each post links to 3+ other site pages
- [ ] Each post has at least 1 interactive element
- [ ] Mobile responsive — all interactive elements work on touch devices
- [ ] Lighthouse performance > 85 on all blog pages
- [ ] PostHog events firing: view, scroll depth, CTA click, share, interactive engagement
