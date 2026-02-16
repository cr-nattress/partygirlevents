# US-008: Food as Decor: How Interactive Catering Is Replacing Centerpieces

**Epic:** Epic 09 - Trend Blog Posts
**Priority:** P2
**Story Points:** 3
**Status:** Draft

## Description

Create a visually stunning blog post showcasing the "food as decor" trend—where interactive catering stations, grazing tables, and artful presentations replace traditional floral centerpieces. This post is image-forward with practical planning tools and cost comparisons.

Based on trend research (Section 4: Food as Decor breakout trend), this post explores how couples are reallocating decor budgets into edible experiences: grazing tables as tablescape art, dessert walls as photo moments, live cooking stations as entertainment, and passed cocktails as decor elements.

Key message: Your food can be beautiful AND delicious. Function meets aesthetics.

**Target Keyword:** "interactive wedding catering ideas"
**Target Word Count:** 1500-1800 words
**Target Audience:** Couples who want their wedding to feel experiential rather than formal; food-forward couples; budget-conscious planners looking to consolidate line items

## Acceptance Criteria

### Content Structure
- [ ] Hero section with stunning food-as-decor image (grazing table or dessert wall) + headline
- [ ] Introduction (200 words): Why food is the new centerpiece
  - [ ] Cultural shift toward experience over formality
  - [ ] Instagram-worthy food displays
  - [ ] Budget reallocation opportunity
- [ ] Section 1: "5 Ways to Make Food Your Decor" (600 words)
  - [ ] Grazing tables as tablescape art (description, best practices, 2 images)
  - [ ] Artful dessert displays (dessert walls, suspended donuts, macaron towers, 2 images)
  - [ ] Live cooking stations as theater (pasta, crepes, farm-to-table salads, 1 image)
  - [ ] Edible centerpieces (fruit towers, herb gardens, bread baskets, 1 image)
  - [ ] Passed cocktails as moving art (espresso martinis, colored drinks, garnishes, 1 image)
- [ ] Section 2: "The Cost Comparison You Need to See" (300 words)
  - [ ] Traditional approach: $2K florals + $8K catering = $10K
  - [ ] Food-as-decor approach: $500 minimal florals + $9.5K elevated catering = $10K
  - [ ] What you get for the reallocation: better food, interactive experience, built-in conversation starters
  - [ ] Callout box with cost breakdown
- [ ] Section 3: "Planning Your Food-Forward Reception" (400 words)
  - [ ] How to work with your caterer (bring images, discuss flow, timing)
  - [ ] What to splurge on (display pieces, fresh ingredients, chef talent)
  - [ ] What to skip (generic centerpieces, excessive linens)
  - [ ] Timeline tips (when stations open, how to guide guests)
  - [ ] Photography considerations (golden hour grazing table shots)
- [ ] Conclusion (200 words): "Eat the Decor"
- [ ] CTA to download "Interactive Catering Planning Checklist"

### Interactive Elements
- [ ] **Food-as-Decor Image Gallery**:
  - [ ] 8-10 high-quality images showcasing different food presentation styles
  - [ ] Lightbox functionality (click to expand, navigate with arrows)
  - [ ] Captions with details: what it is, catering partner, venue, approximate cost
  - [ ] Categories: grazing tables, dessert walls, cooking stations, edible centerpieces, cocktail displays
  - [ ] Filter by category (optional, but nice-to-have)
  - [ ] Mobile: swipeable gallery, optimized for vertical scrolling
  - [ ] Each image has save/pin functionality
- [ ] **Station Planning Guide**:
  - [ ] Interactive checklist with collapsible sections:
    - [ ] "Grazing Table Essentials" (10 items: cheeses, charcuterie, fruits, breads, nuts, etc.)
    - [ ] "Dessert Display Must-Haves" (8 items: varied heights, signage, serving utensils, etc.)
    - [ ] "Live Station Setup" (6 items: chef, ingredients, display setup, traffic flow, etc.)
    - [ ] "Beverage Presentation" (5 items: garnishes, glassware, passed vs. stationed, ice displays)
  - [ ] Check items as you plan (saves to local storage)
  - [ ] Progress bar shows completion percentage
  - [ ] "Print My Checklist" button
  - [ ] Mobile-friendly: touch-friendly checkboxes, vertical layout
- [ ] **Cost Comparison Callout**:
  - [ ] Visually striking side-by-side comparison (not just text)
  - [ ] Two columns: "Traditional" vs. "Food-as-Decor"
  - [ ] Line items with dollar amounts
  - [ ] Total at bottom (same amount for both)
  - [ ] "What You Gain" section highlighting experiential benefits
  - [ ] Shareable as image (social media ready)

### Images and Media
- [ ] Hero image: breathtaking grazing table or dessert wall (editorial quality)
- [ ] 8-10 gallery images showcasing diverse food-as-decor styles
- [ ] 1-2 supporting images for cost comparison section (before/after reception shots)
- [ ] All images optimized: WebP format, lazy load, responsive srcset
- [ ] Alt text for accessibility and SEO (include keywords naturally)
- [ ] Image credits to photographers/caterers where appropriate

### SEO Requirements
- [ ] Target keyword "interactive wedding catering ideas" appears in:
  - [ ] H1 title
  - [ ] Meta description
  - [ ] First 100 words
  - [ ] 2+ H2 headings
  - [ ] Image alt text (3+ instances)
- [ ] Secondary keywords integrated naturally:
  - "wedding grazing table ideas"
  - "food as wedding decor"
  - "edible centerpieces"
  - "interactive wedding food stations"
- [ ] Internal links to:
  - [ ] Catering/planning services page
  - [ ] Related blog posts (micro-luxury weddings, non-traditional formats)
  - [ ] Vendor directory (if available)
- [ ] External links to featured caterers or trend sources (2-3 links)
- [ ] Meta description: 150-160 characters, compelling, includes keyword
- [ ] URL slug: /blog/food-as-decor-interactive-catering

### Mobile Optimization
- [ ] Image gallery swipeable on touch devices
- [ ] Lightbox works on mobile without awkward zooming
- [ ] Checklist items large enough to tap easily (48px min)
- [ ] Cost comparison table stacks vertically on mobile
- [ ] All text readable without zoom
- [ ] CTAs thumb-friendly

### Analytics and Tracking
- [ ] Track image gallery interactions (views, clicks, time spent)
- [ ] Track checklist usage (items checked, completion rate)
- [ ] Track cost comparison image shares
- [ ] Track checklist downloads/prints
- [ ] Track CTA conversions (consultation requests, checklist downloads)
- [ ] Events sent to GA4 and PostHog

### Calls to Action
- [ ] Primary CTA (above fold): "Plan Your Food-Forward Wedding"
- [ ] Mid-article CTA (after cost comparison): Download "Interactive Catering Planning Checklist" (lead magnet)
- [ ] Gallery CTA: "See More in Our Portfolio"
- [ ] Footer CTA: "Get Custom Catering Recommendations"

## Technical Notes

### Component Architecture
- Image gallery component with lightbox:
  - Consider library like `react-image-lightbox` or `yet-another-react-lightbox`
  - Lazy load images outside viewport
  - Preload next/previous images in lightbox for smooth navigation
- Checklist component:
  - Local storage to persist checked items
  - Print functionality (CSS print styles)
  - React state for checkbox interactions
- Cost comparison: styled component or static infographic (decide based on reusability needs)

### Performance Considerations
- Image gallery is heavy—critical to optimize
  - Use thumbnail images for gallery grid (low resolution)
  - Load full resolution only in lightbox
  - WebP format with JPEG fallback
  - Lazy load below-fold images
- Checklist is lightweight (minimal JavaScript)
- Target Lighthouse: 85+ performance (image-heavy page), 100 accessibility, 100 SEO

### Data Management
- Gallery images stored in CMS with structured metadata:
  - Image URL
  - Caption
  - Category tag
  - Credit (photographer/caterer)
  - Approximate cost (optional)
- Checklist items stored in config file or CMS for easy updates
- Cost comparison data in structured format (JSON or CMS)

### Accessibility
- Gallery images have descriptive alt text
- Lightbox keyboard navigable (arrow keys, ESC to close)
- Checklist keyboard accessible (space to toggle checkboxes)
- Color contrast WCAG AA compliant
- Focus indicators visible
- Screen reader announces checkbox state changes

## Dependencies

- **Blocks:**
  - US-001: Blog infrastructure and CMS setup
  - Content: Food-as-decor trend research and writing
  - Photography: 10-12 high-quality food styling images (licensed or original)
  - Photography: Permission to use caterer/venue images
  - Design: Cost comparison infographic design
  - Asset: Checklist PDF or printable format
  - Partnerships: Catering vendor relationships for image sourcing and crediting

- **Blocked By:**
  - US-001: Blog infrastructure (must be complete)

## Definition of Done

- [ ] All content sections written, edited, and approved
- [ ] 8-10 gallery images sourced, licensed, and optimized
- [ ] Image credits and permissions confirmed
- [ ] Image gallery built and tested (lightbox works on all browsers)
- [ ] Station planning checklist built and tested (local storage persists)
- [ ] Print checklist functionality tested
- [ ] Cost comparison callout designed and implemented
- [ ] All images have descriptive alt text with keywords
- [ ] SEO checklist complete (meta tags, keywords, internal links)
- [ ] Mobile responsive tested on iOS and Android
- [ ] Performance targets met (Lighthouse 85+)
- [ ] Accessibility audit passed (keyboard nav, screen reader)
- [ ] Analytics events configured and tested
- [ ] All CTAs linked and functional
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Stakeholder review and approval
- [ ] Published to production
- [ ] Submitted to Google Search Console
- [ ] Social media assets created (pull 2-3 images for Instagram/Pinterest)
- [ ] Promoted on social channels
- [ ] Performance monitored for first 7 days

## Notes

- This post is highly visual—image quality will make or break engagement
- Partner with 2-3 Colorado caterers for exclusive images and potential cross-promotion
- Gallery images should show diversity: rustic, elegant, modern, seasonal
- Consider Pinterest strategy—images are highly pinnable
- Cost comparison is key conversion moment—make it visually compelling, not just a table
- Checklist lead magnet should be beautifully designed PDF (not plain text)
- Monitor Pinterest traffic—this content type performs well there
- Consider followup post: "10 Colorado Caterers Who Nail Food-as-Decor"
- Update gallery images annually to keep content fresh
