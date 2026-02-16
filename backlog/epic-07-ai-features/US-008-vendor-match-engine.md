# US-008 — Vendor Match Engine

**Epic:** [07 — AI Features](README.md)
**Priority:** P2 — Nice to Have
**Points:** 5
**Tier:** 2 — Standalone AI Tools
**Status:** Not Started

---

## Description

Build an AI-powered vendor recommendation engine that matches couples with Colorado wedding vendors based on their style preferences, budget, location, and season. The tool lives at `/tools/vendor-match/` and can also be embedded within the vendor directory. It synthesizes data from multiple sources — quiz results, budget estimator output, and direct input — to build a couple's profile, then uses GPT-4o-mini to analyze compatibility against Stephanie's curated vendor database. Each recommendation includes a personalized explanation of why that vendor is a good fit, Stephanie's endorsement level, and a price range indicator. The "Dream Team" summary gives couples a complete recommended vendor lineup at a glance. Full recommendations require email capture, creating a natural lead funnel while delivering genuine value. This feature strengthens Stephanie's vendor relationships by driving referral traffic, incentivizing backlinks and reciprocal promotion.

---

## Acceptance Criteria

### Input Sources
- [ ] The engine combines data from any available sources to build a couple's profile:
  - **Quiz results:** If the couple has completed the style quiz (Epic 06 US-001), pull their quiz data (style preference, season, location, vibe) from Supabase by session/email
  - **Budget estimator results:** If the couple has used the budget tool (US-004), pull their budget allocation per category
  - **Direct input form:** Standalone form at `/tools/vendor-match/` with fields:
    - Wedding location (dropdown: Vail, Breckenridge, Aspen, Telluride, Denver, Colorado Springs, Boulder, Steamboat, Other Colorado, Destination)
    - Style preference (multi-select: Rustic, Elegant, Bohemian, Modern, Vintage, Rustic Luxe, Classic, Whimsical)
    - Total wedding budget range (slider or dropdown: Under $25K, $25-50K, $50-75K, $75-100K, $100-150K, $150K+)
    - Wedding date or season (date picker or season selector)
    - Guest count estimate (slider or dropdown: Under 25, 25-75, 75-150, 150-250, 250+)
    - Priority categories: which vendor categories matter most (multi-select: Photographer, Videographer, Florist, Caterer, DJ/Band, Officiant, Hair & Makeup, Rentals, Transportation, Stationery)
- [ ] Data from multiple sources is merged: quiz results provide defaults, budget estimator adds budget detail, direct input overrides or supplements
- [ ] If no prior data exists, the direct input form is required

### Matching Logic
- [ ] API route sends the couple's profile + vendor database to GPT-4o-mini for analysis
- [ ] GPT-4o-mini evaluates each vendor against the couple's profile on these factors:
  - **Style compatibility:** Does the vendor's aesthetic match the couple's style preferences?
  - **Budget fit:** Does the vendor's typical price range align with the couple's budget allocation for that category?
  - **Location match:** Does the vendor serve the couple's wedding location? Prioritize vendors who specialize in that area.
  - **Seasonal availability:** Is the vendor typically available for the couple's season? Flag vendors with limited winter access.
  - **Stephanie's endorsement level:** Weight Stephanie's personal recommendations (vendors she has worked with and recommends are ranked higher)
- [ ] Returns ranked vendor recommendations per category (top 3-5 vendors per category)
- [ ] Matching considers the couple's priority categories first, then fills remaining categories

### Vendor Data
- [ ] Vendor database sourced from the CMS/Supabase vendor directory (Epic 06 US-007)
- [ ] Each vendor record includes: name, category, location(s), style tags, price range (low/mid/high/luxury), Stephanie's endorsement (Highly Recommended / Recommended / Listed), portfolio link, website URL, brief description
- [ ] Vendor data is read from the same source as the public vendor directory — no data duplication

### Output UI
- [ ] Results page displays categorized vendor recommendations:
  - Category header (e.g., "Photographer", "Florist", "Caterer")
  - Under each category, 3-5 vendor cards ranked by match strength
- [ ] Each vendor card includes:
  - Vendor name and logo/avatar (if available)
  - **Match reason:** 1-2 sentence AI-generated explanation (e.g., "Great fit for your rustic luxe style and Vail location — Sarah specializes in mountain ceremonies with a documentary approach")
  - **Stephanie's endorsement badge:** Highly Recommended (gold), Recommended (silver), Listed (no badge)
  - **Price range indicator:** $ / $$ / $$$ / $$$$ relative to category average
  - **Portfolio link:** Link to vendor's portfolio page on the site or their website
  - **Location tags:** Where they primarily serve
- [ ] **Dream Team summary:** Top section shows the single best-matched vendor for each major category in a summary card view — "Your Dream Team at a Glance"
- [ ] Dream Team is shareable: unique URL or social share image
- [ ] Results page is scrollable with category navigation (jump to Photographer, Florist, etc.)

### Lead Capture
- [ ] Initial results page shows a preview: Dream Team summary visible, but individual category details are blurred/locked
- [ ] "See Full Recommendations" requires email address input
- [ ] Email stored in Supabase `leads` table with `source = "vendor_match"`
- [ ] Lead record includes: email, style preferences, budget range, location, wedding date, priority categories, timestamp
- [ ] Stephanie receives notification with the lead's profile summary and matched vendor categories
- [ ] After email capture, full results are unlocked and persisted (accessible via unique link sent in confirmation email)

### Vendor Relationship Benefits
- [ ] Each vendor recommendation includes a trackable link to the vendor's page/website (UTM parameters: `utm_source=partygirlev&utm_medium=vendor_match&utm_campaign=ai_recommendation`)
- [ ] Vendor referral dashboard (future scope, out of this story): track click-throughs per vendor from the match engine
- [ ] Vendor match results email includes Stephanie's intro: "These are vendors I trust and have worked with. Tell them Party Girl Events sent you!"

### Analytics
- [ ] PostHog events tracked:
  - `vendor_match_start` — user opens the tool (with property: has_quiz_data, has_budget_data)
  - `vendor_match_submit` — user submits their profile
  - `vendor_match_complete` — results displayed (with property: categories_matched, total_vendors_shown)
  - `vendor_match_email_capture` — email provided to unlock full results
  - `vendor_match_vendor_click` — user clicks on a specific vendor (with property: vendor_id, vendor_category, result_rank)
  - `vendor_match_dream_team_share` — user shares their Dream Team

### Rate Limiting
- [ ] Upstash Redis rate limiting: 3 full match generations per IP per hour
- [ ] When rate limit hit: "You've been busy matching! For a personal vendor introduction, [book a call with Stephanie](calendly link)."

---

## Technical Notes

- **Page Route:** `src/app/tools/vendor-match/page.tsx` — server component with vendor data pre-fetched
- **Client Components:** `src/components/tools/vendor-match-form.tsx` — input form, `src/components/tools/vendor-match-results.tsx` — results display with lead gate
- **API Route:** `src/app/api/tools/vendor-match/route.ts` — accepts couple profile, fetches vendor data, calls GPT-4o-mini, returns ranked recommendations
- **Prompt Engineering:** System prompt includes:
  - Instructions to evaluate vendors against the couple's profile on style, budget, location, season, and endorsement
  - Vendor database in structured format (or top-K pre-filtered vendors per category based on location/style to stay within token limits)
  - Instructions to generate match reason in Stephanie's voice (warm, specific, Colorado-aware)
  - Output format: structured JSON array of categories, each with ranked vendor recommendations
- **Token Optimization:** With a large vendor database, pre-filter vendors by location and broad style match before sending to GPT-4o-mini. Only send 5-10 candidate vendors per category to keep token usage manageable.
- **Pre-filtering:** Before AI analysis, use SQL queries to narrow the vendor pool:
  ```sql
  SELECT * FROM vendors
  WHERE location_tags @> ARRAY['vail']
  AND style_tags && ARRAY['rustic', 'rustic-luxe']
  AND price_tier IN ('mid', 'high')
  ORDER BY endorsement_level DESC;
  ```
- **Data Merging:** Utility function `buildCoupleProfile()` in `src/lib/vendor-match.ts` merges quiz data + budget data + direct input, with direct input taking precedence for conflicts.
- **Shareable Results:** Generate a unique results ID stored in Supabase. Results URL: `/tools/vendor-match/results/[resultId]`. Results page is server-rendered for social sharing (OG image showing Dream Team).
- **Email Template:** `src/emails/vendor-match-results.tsx` — React Email template with Dream Team summary, full category recommendations, and Stephanie's intro.
- **Caching:** Cache vendor match results per unique profile hash for 24 hours to avoid re-generation on page refreshes.
- **Fallback:** If OpenAI API is unavailable, show pre-filtered vendor list based on location and style tags (SQL-only filtering) with a note: "Our AI matching is temporarily unavailable, but here are vendors in your area that match your style."

---

## Dependencies

- **Epic 06 US-007:** Vendor directory with vendor data in CMS/Supabase (names, categories, locations, styles, price ranges, endorsements)
- **Epic 06 US-001:** Style quiz (optional — enriches profile if available)
- **US-004:** Budget estimator (optional — enriches profile if available)
- **Epic 01 US-001:** Supabase project, OpenAI API key configured
- **Epic 01 US-003:** UI components (Select, MultiSelect, Slider, Button, Card, Badge)
- **Epic 04:** Resend email integration for results email
- **Upstash Redis:** For rate limiting
- **From Stephanie:** Vendor endorsement levels, updated vendor database with style tags and price ranges

---

## Expected Outcomes

- **High-value lead capture:** Couples who use the vendor match engine are actively planning and have defined preferences — these are warm-to-hot leads
- **Vendor relationship builder:** Vendors see referral traffic from the match engine, strengthening Stephanie's vendor network and incentivizing backlinks
- **Time savings for Stephanie:** Instead of manually recommending vendors in every consultation, the tool pre-matches and Stephanie can refine in follow-up
- **Engagement depth:** The tool requires meaningful interaction (profile input, result exploration), increasing session duration and return visits
- **SEO value:** `/tools/vendor-match/` targets "Colorado wedding vendor recommendations" and "mountain wedding vendor finder" keywords

---

## Definition of Done

- [ ] Input form accepts all fields (location, style, budget, date, guest count, priority categories)
- [ ] Data merging works correctly: quiz + budget + direct input combined into unified profile
- [ ] AI generates ranked vendor recommendations per category with personalized match reasons
- [ ] Each vendor card displays name, match reason, endorsement badge, price indicator, and portfolio link
- [ ] Dream Team summary shows top vendor per major category
- [ ] Lead gate locks full results behind email capture; preview (Dream Team) is visible without email
- [ ] Email capture stores lead in Supabase with full profile data
- [ ] Stephanie receives notification with lead profile summary
- [ ] Vendor links include UTM tracking parameters
- [ ] Results are shareable via unique URL
- [ ] Rate limiting prevents abuse (3 generations per IP per hour)
- [ ] Fallback shows SQL-filtered vendor list when API is unavailable
- [ ] All PostHog analytics events fire correctly
- [ ] Tool works correctly on mobile, tablet, and desktop
- [ ] Stephanie has reviewed sample match results and confirmed vendor recommendations are accurate
