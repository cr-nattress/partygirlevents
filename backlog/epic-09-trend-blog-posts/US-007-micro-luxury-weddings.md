# US-007: Micro-Luxury Weddings: Why Fewer Guests Means More Magic

**Epic:** Epic 09 - Trend Blog Posts
**Priority:** P1
**Story Points:** 5
**Status:** Draft

## Description

Create an immersive, data-driven blog post exploring the micro-luxury wedding trend—intimate celebrations (30-50 guests) with elevated per-guest experiences. This post combines emotional storytelling with interactive budget visualizations and venue discovery tools.

Based on trend research (Section 1: Micro-Luxury and Section 5: Venues with Character), this post reframes wedding planning from "how many people can we invite?" to "how memorable can we make each guest's experience?" Features a revolutionary guest count slider that shows budget reallocation in real-time.

Key message: 50 guests is the new sweet spot. Intentional over extravagant. Quality over quantity.

**Target Keyword:** "micro wedding colorado"
**Target Word Count:** 1800-2200 words
**Target Audience:** Couples considering smaller weddings but worried about appearing "cheap" or offending people; couples prioritizing experience over optics

## Acceptance Criteria

### Content Structure
- [ ] Hero section with emotional pull quote from real couple + striking intimate wedding image
- [ ] Introduction (200-300 words): The shift from "big wedding" default to intentional intimacy
- [ ] Section 1: "What Is Micro-Luxury?" (300 words)
  - [ ] Definition: 20-50 guests, elevated experience
  - [ ] Why it's trending now (post-pandemic values shift, Gen Z priorities)
  - [ ] Price per guest thinking vs. total budget thinking
- [ ] Section 2: "The 50-Guest Sweet Spot" (300 words)
  - [ ] Why 50 works (intimate but not exclusive, single venue space, manageable logistics)
  - [ ] Budget math: $50K for 150 guests vs. 50 guests (same total, different allocation)
  - [ ] What you can elevate: food, venue, photography, entertainment, guest gifts
- [ ] Section 3: "Where Micro-Luxury Shines in Colorado" (400 words)
  - [ ] 6 intimate venue profiles (see interactive element below)
  - [ ] Types: mountain meadows, historic estates, greenhouse spaces, luxury lodge buyouts
  - [ ] Seasonal considerations
- [ ] Section 4: "Real Couples: Why We Went Small" (300 words)
  - [ ] 3 pull quotes from real Colorado micro-weddings
  - [ ] Before/after mindset shifts
  - [ ] What they splurged on with the savings
- [ ] Section 5: "Planning Your Micro-Luxury Wedding" (300 words)
  - [ ] Guest list strategy (VIP-only approach)
  - [ ] What to splurge on vs. skip
  - [ ] Timeline considerations
  - [ ] Communication tips (managing expectations with those not invited)
- [ ] Conclusion (200 words): "Less is More, But Better Is Best"
- [ ] CTA to download "Micro-Luxury Wedding Budget Calculator"

### Interactive Elements
- [ ] **Guest Count Budget Slider**:
  - [ ] Horizontal slider: drag from 20 → 200 guests
  - [ ] Fixed total budget ($50K displayed, but value is adjustable)
  - [ ] Real-time calculation shows per-guest allocation
  - [ ] Visual breakdown updates as you drag:
    - Catering per guest
    - Bar per guest
    - Favors per guest
    - Florals per guest
    - Photography time per guest
  - [ ] "What This Buys You" callouts change based on per-guest amount
    - At 200 guests: "Basic buffet, cash bar, 1 photographer"
    - At 50 guests: "Chef-plated 5-course meal, premium open bar, lead + second shooter, overnight venue buyout"
  - [ ] Mobile: vertical slider, thumb-friendly
  - [ ] Analytics: track most common guest count selections
- [ ] **Micro vs. Traditional Comparison Infographic**:
  - [ ] Animated split-screen showing two weddings with same $50K budget:
    - Left: 150 guests, traditional allocation
    - Right: 50 guests, micro-luxury allocation
  - [ ] Categories: venue, food, bar, florals, entertainment, photography, favors
  - [ ] Dollar amounts appear with animation on scroll
  - [ ] Color-coded for easy visual comparison
  - [ ] "See where your money goes" headline
  - [ ] Downloadable as PDF
- [ ] **Intimate Venue Finder**:
  - [ ] 6 interactive venue cards for Colorado micro weddings:
    - Mountain meadow (20-40 guests)
    - Historic estate (30-50 guests)
    - Greenhouse conservatory (25-45 guests)
    - Luxury lodge buyout (20-50 guests)
    - Private chef's table venue (20-30 guests)
    - Scenic overlook with tent (30-60 guests)
  - [ ] Each card shows:
    - Hero image
    - Capacity range
    - Best season
    - Vibe tags (romantic, adventurous, elegant, rustic)
    - Starting price range
    - "Request Info" CTA
  - [ ] Filterable by capacity, season, vibe
  - [ ] Mobile: swipeable card carousel
- [ ] **Real Couple Pull Quotes**:
  - [ ] 3 stylized quote blocks with couple photo, names, wedding date, guest count
  - [ ] Quotes about their micro-wedding decision and what they splurged on
  - [ ] Hover effect reveals full mini-story

### Images and Media
- [ ] Hero image: intimate ceremony moment (20-40 guests visible, emotional)
- [ ] 6 venue images (one per venue card)
- [ ] 3 couple photos (for pull quotes)
- [ ] 8-10 supporting images: intimate receptions, tablescapes, guest interactions
- [ ] Before/after comparison image (traditional ballroom vs. intimate mountain venue)
- [ ] All images optimized: WebP, lazy load, responsive srcset
- [ ] Alt text includes keyword variations

### SEO Requirements
- [ ] Target keyword "micro wedding colorado" appears in:
  - [ ] H1 title
  - [ ] Meta description
  - [ ] First 100 words
  - [ ] 2+ H2 headings
  - [ ] Image alt text (3+ instances)
- [ ] Secondary keywords integrated naturally:
  - "intimate wedding venues colorado"
  - "small luxury wedding"
  - "50 guest wedding ideas"
  - "micro wedding cost"
- [ ] Internal links to:
  - [ ] Venue pages (6 links from venue finder)
  - [ ] Planning services page
  - [ ] Related blog posts: non-traditional formats, sustainable weddings
- [ ] External links to credible sources (2-3: wedding industry data, trend reports)
- [ ] Meta description: 150-160 characters, includes keyword + emotional hook
- [ ] URL slug: /blog/micro-luxury-weddings-colorado

### Mobile Optimization
- [ ] Budget slider smooth on touch devices, large enough touch target
- [ ] Venue cards stack vertically or swipe horizontally on mobile
- [ ] Infographic readable without pinch-zoom (may require mobile-specific layout)
- [ ] All interactive elements tested on iOS Safari and Android Chrome
- [ ] CTAs positioned for easy thumb access

### Analytics and Tracking
- [ ] Track guest count slider interactions (average selection, distribution)
- [ ] Track venue card clicks and "Request Info" conversions
- [ ] Track budget calculator downloads (lead magnet)
- [ ] Scroll depth tracking (are users reading full article?)
- [ ] Time on page
- [ ] Social shares by platform
- [ ] Events sent to GA4 and PostHog

### Calls to Action
- [ ] Primary CTA (above fold): "Plan Your Micro-Luxury Wedding with Us"
- [ ] Mid-article CTA (after budget slider): Download "Micro-Luxury Budget Calculator" (lead magnet PDF)
- [ ] Venue card CTAs: "Request Info" for each venue (email capture)
- [ ] Footer CTA: "Schedule a Free Consultation"

## Technical Notes

### Component Architecture
- Slider component: React component with hooks for state management
  - Consider using a library like `rc-slider` or `react-slider` for accessibility
  - Custom styling to match brand
- Budget calculation logic:
  - Per-guest calculation: totalBudget / guestCount
  - Category allocation percentages (based on industry standards):
    - Venue: 10-15%
    - Catering: 30-35%
    - Bar: 10-15%
    - Photography: 10-12%
    - Florals: 8-10%
    - Entertainment: 8-10%
    - Favors: 2-3%
  - Display as both dollar amounts and percentages
- Venue filter component: filterable card grid
  - Filter state management (capacity, season, vibe)
  - Filter logic applied to venue data array
- Infographic animation: triggered on scroll (Intersection Observer API)

### Performance Considerations
- Slider calculations should be debounced (update after 100ms pause, not on every pixel drag)
- Lazy load venue cards below fold
- Infographic animations only trigger when in viewport
- Image optimization critical: 15+ images on page
- Code-split interactive components
- Target Lighthouse: 90+ performance, 100 accessibility, 100 SEO

### Data Management
- Venue data stored in structured format (CMS or JSON)
- Budget allocation percentages configurable (not hard-coded)
- Real couple quotes stored as structured content
- Budget calculator PDF pre-generated or dynamically created with user's slider selection

### Accessibility
- Slider keyboard navigable (arrow keys to adjust)
- ARIA labels on all interactive elements
- Venue filter controls accessible via keyboard
- Color contrast WCAG AA compliant
- Focus indicators visible
- Screen reader announces slider value changes

## Dependencies

- **Blocks:**
  - US-001: Blog infrastructure and CMS setup
  - Content: Real couple interviews/quotes (3 couples)
  - Content: Venue research and partnerships (6 venues confirmed)
  - Design: Infographic design for micro vs. traditional comparison
  - Design: Slider UI design
  - Asset: Budget calculator PDF lead magnet (designed and built)
  - Photography: 15-20 curated micro-wedding images

- **Blocked By:**
  - US-001: Blog infrastructure (must be complete)

## Definition of Done

- [ ] All content sections written, edited, and approved
- [ ] Real couple quotes sourced and approved by couples
- [ ] 6 venue profiles complete with accurate details and imagery
- [ ] Budget slider built and tested (smooth interaction, accurate calculations)
- [ ] Infographic designed and animated (triggers on scroll)
- [ ] Venue finder built and tested (filters work correctly)
- [ ] Budget calculator PDF created and hosted
- [ ] All images sourced, optimized, and uploaded with alt text
- [ ] SEO checklist complete (keyword density, meta tags, internal links)
- [ ] Mobile responsive tested on 3+ devices (iOS, Android)
- [ ] Performance targets met (Lighthouse 90+)
- [ ] Accessibility audit passed (keyboard nav, screen reader, WCAG AA)
- [ ] Analytics events configured and firing correctly
- [ ] All CTAs linked and tested (form submissions, PDF downloads)
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Stakeholder review and approval
- [ ] Published to production
- [ ] Submitted to Google Search Console
- [ ] Social media promotion plan executed
- [ ] Lead magnet email automation set up (auto-send budget calculator on form submission)
- [ ] Performance monitored for first 7 days

## Notes

- This post has high conversion potential—couples researching micro weddings are likely serious planners
- Budget slider is the hero feature—invest in making it polished and accurate
- Consider retargeting ad campaigns to visitors who interact with slider but don't convert
- Venue partnerships: confirm venues are okay being featured, negotiate referral agreements if possible
- A/B test lead magnet CTA copy ("Download Budget Calculator" vs. "Get Your Free Budget Breakdown")
- Update venue availability and pricing annually
- Consider expanding slider to allow custom total budget input (not just fixed $50K)
- Monitor keyword rankings for "micro wedding colorado" weekly—high competition term
