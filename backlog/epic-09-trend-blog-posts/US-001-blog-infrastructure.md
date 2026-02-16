# US-001: Blog Infrastructure & Post Template

**Epic:** E009 - Trend Blog Posts
**Priority:** P0
**Points:** 8
**Status:** Todo

## Description

Build the complete blog infrastructure for Party Girl Events, including the data layer, index page, post template, reusable blog components library, and analytics tracking. This establishes the foundation for publishing wedding planning content that drives organic traffic and demonstrates Party Girl Events' expertise.

The blog will feature a modern, visually-rich reading experience with interactive components, automatic table of contents generation, related post recommendations, and comprehensive analytics tracking to measure engagement and conversion.

## User Story

As a wedding planning blog reader, I want to browse and read well-structured, visually appealing blog posts about wedding trends and tips, so that I can get inspired and learn from Party Girl Events' expertise while having an engaging, interactive reading experience.

## Acceptance Criteria

### Blog Data Layer

- [ ] Create `src/lib/blog.ts` with core blog infrastructure
- [ ] Define `BlogPost` interface with fields: id, slug, title, excerpt, content, publishedAt, updatedAt, category, author, featuredImage, readingTime, tags, featured, metaDescription
- [ ] Define `BlogCategory` type with: Trends, Planning, Decor, Real Weddings, Budget, Venue, Seasonal
- [ ] Define `BlogAuthor` interface with: name, bio, avatar, socialLinks
- [ ] Implement `calculateReadingTime(content: string): number` function (assumes 200 words per minute)
- [ ] Implement `getPostBySlug(slug: string): BlogPost | null`
- [ ] Implement `getAllPosts(options?: { featured?: boolean, limit?: number }): BlogPost[]`
- [ ] Implement `getPostsByCategory(category: BlogCategory): BlogPost[]`
- [ ] Implement `getRelatedPosts(currentPost: BlogPost, limit?: number): BlogPost[]` (matches by category and tags)
- [ ] Create initial post registry with at least 3 sample posts for testing
- [ ] Export all types and functions from `src/lib/blog.ts`

### Blog Index Page (`src/app/(marketing)/blog/page.tsx`)

- [ ] Replace placeholder with functional blog index
- [ ] Display grid of post cards (3 columns on desktop, 2 on tablet, 1 on mobile)
- [ ] Each post card shows: featured image, category badge, title, excerpt (truncated to 120 chars), publish date, reading time, author avatar
- [ ] Featured posts (featured: true) appear at the top with larger card styling
- [ ] Implement category filter tabs (All, Trends, Planning, Decor, Real Weddings, Budget, Venue, Seasonal)
- [ ] Add search input with client-side filtering by title, excerpt, and tags
- [ ] Implement pagination showing 9 posts per page
- [ ] Add page metadata with title "Wedding Planning Blog | Party Girl Events" and description
- [ ] Hover effects on post cards (subtle lift, image zoom)
- [ ] Responsive design matches site aesthetic (Tailwind CSS v4, Framer Motion animations)
- [ ] Empty state message when no posts match filters

### Blog Post Template (`src/app/(marketing)/blog/[slug]/page.tsx`)

- [ ] Replace placeholder with dynamic blog post template
- [ ] Full-width hero image (16:9 aspect ratio, optimized with next/image)
- [ ] Post header section with: title (H1), publish date, reading time, author info, category badge
- [ ] Auto-generated table of contents from H2 and H3 headings
- [ ] Table of contents is sticky sidebar on desktop (>1024px)
- [ ] Table of contents is collapsible accordion on mobile
- [ ] Active heading is highlighted in table of contents during scroll
- [ ] Rich body content area with typography styles (prose classes)
- [ ] Support for blog post components library within content
- [ ] Author card at bottom with bio, avatar, and social links
- [ ] Related posts section showing 2-3 posts (same category)
- [ ] Social sharing buttons: Pinterest (with image), Facebook, Copy Link
- [ ] Previous/Next post navigation at bottom
- [ ] Breadcrumb navigation (Home > Blog > Category > Post Title)
- [ ] Dynamic metadata generation (title, description, OpenGraph, Twitter Card)
- [ ] 404 handling for invalid slugs with redirect to blog index

### Blog Post Components Library

- [ ] Create `src/components/blog/PullQuote.tsx` - Large quoted text with optional citation
- [ ] Create `src/components/blog/ImageGallery.tsx` - Grid of images with lightbox modal
- [ ] Create `src/components/blog/CalloutBox.tsx` - Colored box with variants: tip (blue), warning (yellow), note (gray)
- [ ] Create `src/components/blog/InlineCTA.tsx` - Mid-article CTA banner with heading, description, button
- [ ] Create `src/components/blog/StatCounter.tsx` - Animated number counter triggered on scroll into view
- [ ] Create `src/components/blog/ComparisonTable.tsx` - Two-column comparison table with checkmarks/X marks
- [ ] Create `src/components/blog/ColorPalette.tsx` - Display color swatches with hex codes
- [ ] Create `src/components/blog/BeforeAfter.tsx` - Image slider with draggable divider
- [ ] Create `src/components/blog/BudgetBreakdown.tsx` - Interactive pie chart showing budget categories
- [ ] Create `src/components/blog/BlogImage.tsx` - Captioned figure component using next/image
- [ ] Each component uses Tailwind CSS v4 styling consistent with site design
- [ ] Components support Framer Motion animations where appropriate
- [ ] Create `src/components/blog/index.ts` barrel export
- [ ] Document all components with JSDoc comments including props and usage examples

### Schema Markup

- [ ] Implement Article JSON-LD structured data on every blog post
- [ ] Include: headline, image, datePublished, dateModified, author, publisher, description
- [ ] Implement BreadcrumbList JSON-LD for blog post breadcrumbs
- [ ] Validate structured data with Google Rich Results Test
- [ ] Add schema generation utility in `src/lib/schema.ts`

### Analytics Integration

- [ ] Implement PostHog event `blog_post_viewed` with properties: post_slug, category, reading_time, author
- [ ] Implement PostHog event `blog_cta_clicked` with properties: post_slug, cta_type, cta_text, cta_position
- [ ] Implement PostHog event `blog_share_clicked` with properties: post_slug, platform (pinterest/facebook/copy)
- [ ] Implement PostHog event `blog_search_used` with properties: query, results_count
- [ ] Implement PostHog event `blog_interactive_engaged` with properties: post_slug, component_type, component_id
- [ ] Track time on page and scroll depth with PostHog
- [ ] Create analytics utility in `src/lib/analytics.ts` for blog-specific tracking

### Performance & SEO

- [ ] All blog images use next/image with appropriate sizes and priority flags
- [ ] Featured images are preloaded for LCP optimization
- [ ] Lazy load related posts and comments sections
- [ ] Implement `generateStaticParams()` for all existing blog posts
- [ ] Add canonical URL to all blog posts
- [ ] Implement RSS feed at `/feed.xml` with all published posts
- [ ] Add sitemap entries for all blog posts
- [ ] Lighthouse score: Performance > 90, SEO > 95

## Technical Notes

### File Structure
```
src/
├── app/
│   └── (marketing)/
│       └── blog/
│           ├── page.tsx                    # Blog index page
│           ├── [slug]/
│           │   └── page.tsx                # Blog post template
│           └── feed.xml/
│               └── route.ts                # RSS feed
├── components/
│   └── blog/
│       ├── PullQuote.tsx
│       ├── ImageGallery.tsx
│       ├── CalloutBox.tsx
│       ├── InlineCTA.tsx
│       ├── StatCounter.tsx
│       ├── ComparisonTable.tsx
│       ├── ColorPalette.tsx
│       ├── BeforeAfter.tsx
│       ├── BudgetBreakdown.tsx
│       ├── BlogImage.tsx
│       ├── BlogPostCard.tsx               # For index page
│       ├── TableOfContents.tsx             # For post template
│       ├── AuthorCard.tsx                  # For post template
│       └── index.ts
└── lib/
    ├── blog.ts                             # Blog data layer
    ├── schema.ts                           # JSON-LD generation
    └── analytics.ts                        # Blog analytics utilities
```

### Technology Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **UI Components:** Radix UI (for modals, accordions in blog components)
- **Images:** next/image with automatic optimization
- **Analytics:** PostHog
- **SEO:** next-seo, JSON-LD structured data

### Blog Post Storage
- For MVP, blog posts can be stored as TypeScript objects in `src/lib/blog.ts` or imported from separate files in `src/content/blog/`
- Content can use simple HTML strings or template literals
- Future enhancement: MDX support via @next/mdx or content layer API

### Table of Contents Generation
- Parse content for H2 and H3 tags using regex or DOM parsing
- Generate nested structure with anchor links
- Use Intersection Observer API to track active heading during scroll
- Smooth scroll behavior for TOC link clicks

### Related Posts Algorithm
- Priority: same category > shared tags > most recent
- Exclude current post from results
- Return 2-3 posts for desktop, 2 for mobile

### Social Sharing
- Pinterest share uses `https://pinterest.com/pin/create/button/` with image and description
- Facebook share uses `https://www.facebook.com/sharer/sharer.php?u=`
- Copy link uses Clipboard API with toast notification

### Interactive Components
- `StatCounter`: Use Intersection Observer + requestAnimationFrame for smooth counting
- `BeforeAfter`: Use mouse/touch events for slider control
- `BudgetBreakdown`: Consider Chart.js or recharts for pie chart visualization
- `ImageGallery`: Use Radix Dialog for lightbox, keyboard navigation support

## Dependencies

### Upstream Dependencies
- Design system components must be available (if not, use Radix UI directly)
- PostHog must be configured (tracking ID, initialization)
- Site navigation must include blog link

### Downstream Dependencies
- US-002 (First 5 Blog Posts) depends on this infrastructure
- US-003 (Pinterest SEO Optimization) builds on blog post template
- US-004 (Blog Content Calendar) uses blog data layer

## Definition of Done

- [ ] All acceptance criteria are met and verified
- [ ] Blog index page displays sample posts correctly across all breakpoints
- [ ] Blog post template renders all sections with sample content
- [ ] All 10 blog post components are implemented and functional
- [ ] Table of contents generates automatically and tracks active heading
- [ ] Social sharing works for all platforms (tested manually)
- [ ] Related posts display correctly (verified with 3+ posts)
- [ ] Article and BreadcrumbList JSON-LD validates in Google Rich Results Test
- [ ] All PostHog events fire correctly (verified in PostHog dashboard)
- [ ] RSS feed generates valid XML with all posts
- [ ] Lighthouse scores meet performance targets (>90 Performance, >95 SEO)
- [ ] All images are optimized with next/image
- [ ] Mobile experience is smooth and responsive
- [ ] No console errors or warnings
- [ ] Code follows project conventions and is fully typed (TypeScript)
- [ ] All components have hover states and animations
- [ ] Empty states and loading states are handled gracefully
- [ ] 404 handling works for invalid blog slugs
- [ ] Code is committed and merged to main branch
- [ ] Functionality is verified in production deployment
