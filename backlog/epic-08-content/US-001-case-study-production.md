# US-001 — Case Study Production

**Epic:** 08 — Content Pipeline
**Priority:** P0
**Points:** 5
**Status:** Not Started

---

## Description

Produce 5-8 narrative case studies for Phase 1 launch, establishing the portfolio as Party Girl Events' most powerful conversion tool. Each case study follows the structured template from Epic 02 US-003, telling a complete wedding story that showcases Stephanie's planning expertise while providing SEO-rich, emotionally compelling content. After launch, maintain a cadence of 1-2 new case studies per month to continuously grow the portfolio.

---

## Acceptance Criteria

### Case Study Template Compliance
- [ ] Each case study follows the Epic 02 US-003 template structure exactly
- [ ] Quick Facts bar populated: date, venue, guest count, season, style, service level
- [ ] "Their Story" section: 2-3 paragraphs about the couple (how they met, proposal, why Colorado)
- [ ] "The Vision" section: what they wanted for their wedding day
- [ ] "The Planning Journey" section: challenges faced and how Party Girl Events solved them (this section sells the service)
- [ ] "The Details" section: design elements, color palette, florals, personal touches
- [ ] "The Day" section: timeline highlights, emotional moments, surprises
- [ ] "What They Said" section: client testimonial with accompanying photo
- [ ] Vendor Credits section: clickable links to each vendor (builds vendor ecosystem and generates backlinks)
- [ ] Photo Gallery: 15-25 curated images per case study

### Content Gathering Process
- [ ] Stephanie provides: couple names (with written permission), venue, date, guest count, service tier, and 2-3 paragraphs of the planning story
- [ ] Stephanie provides or AI assists: expanded narrative sections drafted from her notes
- [ ] Client provides: testimonial quote with written approval on file
- [ ] Photographer provides: 15-25 curated images (high-resolution originals, with documented usage permission)
- [ ] All vendors listed with correct legal business names and verified website URLs
- [ ] Written permissions documented and stored for each case study (couple consent, image usage rights)

### SEO Requirements
- [ ] Unique page title per case study: "[Couple Names]'s [Venue] Wedding | Party Girl Events"
- [ ] Event schema markup applied to each case study page
- [ ] Review schema markup applied using client testimonial data
- [ ] Internal links included to: relevant venue guide page, service page matching their tier, 1-2 related case studies
- [ ] Alt text on all images: descriptive, keyword-aware, unique per image
- [ ] Meta description written: 150-160 characters, includes venue name and location

### Image Optimization
- [ ] All images served via next/image component
- [ ] Responsive srcset generated for each image
- [ ] AVIF and WebP formats auto-generated
- [ ] Images lazy-loaded below the fold
- [ ] Hero/featured image eager-loaded for LCP performance

### CMS Entry
- [ ] Each case study entered as CaseStudy content type with all fields populated
- [ ] All sections, metadata, vendor credits, and gallery images present in CMS
- [ ] Published status set correctly (published for launch batch, draft for in-progress)

### Launch and Ongoing Targets
- [ ] Minimum 5 case studies published before Phase 1 launch
- [ ] Target 8 case studies for launch if content is available
- [ ] Ongoing cadence: 1-2 new case studies published per month post-launch
- [ ] Content gathering pipeline documented so Stephanie can initiate new case studies independently

---

## Technical Notes

- Case study pages use the portfolio template built in Epic 02 US-003 — no new template development needed
- Photo gallery component should support lightbox viewing and keyboard navigation (built in Epic 06)
- Image files should be stored in a consistent directory structure: `/public/portfolio/[slug]/` or managed via CMS media library
- Vendor credits should use a repeatable CMS field (vendor name + URL pairs) for consistent rendering
- Consider a "Related Weddings" component at the bottom of each case study, pulling 2-3 other case studies with shared attributes (same venue, same season, same style)
- Schema markup should be auto-injected by the case study template, not manually added per page
- For AI-assisted narrative expansion: provide Stephanie's raw notes as input, generate draft copy in her voice, then she reviews and personalizes before publishing
- Track case study page performance in PostHog: scroll depth, gallery engagement, CTA clicks, time on page

---

## Dependencies

- Epic 02 US-003 — Portfolio/case study page template (must be built and deployed)
- Stephanie's wedding stories — she must provide raw content for each couple
- Client testimonials — written approval required from each couple before publishing
- Photographer images — high-resolution images with documented usage permissions
- Vendor information — correct business names and current website URLs for all vendors
- Epic 07 US-010 — AI content assistant (optional, for AI-assisted narrative drafting)

---

## Definition of Done

- [ ] Minimum 5 case studies published on the live site with all template sections complete
- [ ] Each case study passes SEO audit: schema markup valid, alt text present, internal links working
- [ ] All images optimized and serving in modern formats (AVIF/WebP) with responsive srcset
- [ ] Written permissions on file for every couple, testimonial, and photographer
- [ ] All vendor credits link to correct, live websites
- [ ] Case study pages load within Core Web Vitals targets (LCP < 2.5s, CLS < 0.1)
- [ ] Content gathering process documented for ongoing production
- [ ] Stephanie has reviewed and approved all published case studies
