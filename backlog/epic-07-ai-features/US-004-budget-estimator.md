# US-004 — AI Budget Estimator

**Epic:** 07 — AI Features
**Priority:** P0
**Points:** 8
**Tier:** 2
**Status:** Not Started

---

## Description

An interactive, Colorado-specific wedding budget calculator deployed at `/tools/budget-estimator/`. This is the strongest SEO play in the entire site — "Colorado mountain wedding budget calculator" is a zero-competition keyword with high intent. The tool uses a conversational multi-step input form to collect guest count, Colorado region, style tier, and spending priorities, then generates a detailed budget breakdown using deterministic math (not AI) with Colorado-specific pricing data provided by Stephanie. GPT-4o-mini adds natural language commentary with regional insights, splurge-vs-save recommendations, and planner fee context. Full detailed results require an email address, creating a high-quality lead capture mechanism.

---

## Acceptance Criteria

### Multi-Step Input Form
- [ ] Budget estimator accessible at `/tools/budget-estimator/`
- [ ] Step 1 — Guest Count: slider or numeric input, range 2-300, with visual feedback labels (e.g., "Intimate" for 2-20, "Medium" for 50-100, "Grand" for 200+)
- [ ] Step 2 — Colorado Region: selection from Vail, Beaver Creek, Aspen, Breckenridge, Keystone, Denver/Front Range, with brief context for each (e.g., "Vail — Premium mountain elegance, highest venue costs")
- [ ] Step 3 — Style Tier: three options — Intimate & Simple, Classic & Elegant, Luxury & Lavish — with visual descriptions for each
- [ ] Step 4 — Priorities Ranking: drag-to-rank interface for categories: Venue, Catering, Photography, Florals, Music/Entertainment, Design/Decor
- [ ] Each step has a clear progress indicator (step N of 4, progress bar)
- [ ] Back navigation between steps preserves previous selections
- [ ] Form is fully responsive and touch-friendly on mobile (including the drag-to-rank step, which needs a mobile-friendly alternative such as tap-to-rank)
- [ ] Form inputs are validated before advancing to the next step

### Deterministic Calculation Engine
- [ ] Budget calculations use deterministic math — no AI randomness in the actual numbers
- [ ] Pricing data is stored in a Supabase `budget_ranges` table with Colorado-specific data provided by Stephanie
- [ ] Budget categories calculated: Venue, Catering (per-person scaling), Photography, Videography, Florals, Music/Entertainment, Officiant, Hair & Makeup, Rentals, Stationery, Transportation, Planner Fee, Attire, Miscellaneous (5-10% buffer)
- [ ] Each category produces a low-high range estimate
- [ ] Ranges adjust based on three multipliers: region multiplier (e.g., Aspen = 1.4x, Denver = 1.0x), style multiplier (Intimate = 0.7x, Classic = 1.0x, Luxury = 1.6x), and guest count scaling (linear for per-person categories, tiered for fixed-cost categories)
- [ ] Priority ranking adjusts within-category allocation: top priorities get budget shifted toward the high end, lower priorities toward the low end
- [ ] Total range is calculated as the sum of all category low ends to all category high ends
- [ ] Planner fee is calculated as a percentage of total (8-12% depending on style tier)

### AI-Generated Commentary
- [ ] GPT-4o-mini generates natural language commentary based on the visitor's specific inputs
- [ ] Category insights: region-specific tips (e.g., "Mountain venue catering runs $85-120/person vs. $65-95 in Denver due to logistics and altitude considerations")
- [ ] "Where to splurge vs. save" personalized recommendations based on the visitor's priority ranking
- [ ] Planner fee context: "A planner typically costs 8-12% of your total budget — and saves you $5,000+ through vendor negotiations, timeline management, and avoiding costly mistakes"
- [ ] Commentary is generated once on form submission and cached — not regenerated on page refresh
- [ ] If AI commentary generation fails, the budget breakdown still displays with all numerical data (commentary section shows a fallback or is omitted gracefully)

### Output and Results Display
- [ ] Beautiful budget breakdown page with a bar chart visualization (Recharts library)
- [ ] Total estimated range displayed prominently at the top (e.g., "$45,000 — $72,000")
- [ ] Per-category breakdown with: category icon, category name, low-high range, and percentage of total
- [ ] Bar chart showing category proportions with color coding
- [ ] "Where to Splurge vs. Save" section with the AI-generated personalized recommendations
- [ ] Planner fee shown in context with the AI-generated explanation
- [ ] Regional insights section with Colorado-specific tips

### Social Sharing and OG Image
- [ ] Shareable results via a unique URL (inputs encoded in URL params or stored with a shareable ID)
- [ ] Dynamic OG image auto-generated for social media sharing using Vercel OG (`@vercel/og`)
- [ ] OG image includes: total range, top 3 categories, Colorado region, and Party Girl Events branding
- [ ] Share buttons for: copy link, share to Pinterest, share to Instagram Stories, email to partner
- [ ] OG meta tags are set correctly for the shared URL

### Lead Capture
- [ ] Teaser results (total range only, no category breakdown) are shown without requiring an email
- [ ] Full detailed results (category breakdown, chart, AI commentary, splurge/save tips) require an email address
- [ ] Email capture form is non-intrusive: "Enter your email to see your full Colorado wedding budget breakdown"
- [ ] Captured email is stored in Supabase `leads` table with source tagged as `budget_tool`
- [ ] Budget inputs are stored alongside the lead for Stephanie's context
- [ ] Data stored in Supabase for analytics (anonymized if no email provided)

### SEO
- [ ] Target keyword: "Colorado mountain wedding budget calculator"
- [ ] Title tag: "Colorado Mountain Wedding Budget Calculator | Party Girl Events"
- [ ] Meta description referencing free budget estimation, Colorado-specific pricing, and personalized results
- [ ] Schema markup (FAQPage for common budget questions at the bottom of the page)
- [ ] Internal linking from budget-related blog posts

### Analytics
- [ ] `budget_tool_start` event fires when the user begins the form (PostHog)
- [ ] `budget_tool_complete` event fires when the user completes all steps and views results
- [ ] `budget_tool_email_capture` event fires when the user provides their email for full results
- [ ] `budget_tool_share` event fires when the user shares their results
- [ ] Drop-off tracking: events fire at each step completion to identify where users abandon the flow

---

## Technical Notes

- **Page Route:** `app/tools/budget-estimator/page.tsx` — the main page with the multi-step form and results display. Consider a client component for the interactive form with server actions for calculation and AI commentary.
- **Calculation Logic:** Keep the deterministic budget math in a pure utility function (`lib/budget-calculator.ts`) that takes inputs and returns the breakdown. This is testable and independent of the AI layer.
- **Supabase `budget_ranges` Table Schema:**
  ```sql
  CREATE TABLE budget_ranges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category text NOT NULL,
    region text NOT NULL,
    style_tier text NOT NULL,
    low_per_unit numeric NOT NULL,
    high_per_unit numeric NOT NULL,
    unit_type text NOT NULL,  -- 'flat', 'per_person', 'percentage'
    notes text,
    updated_at timestamp DEFAULT now()
  );
  ```
- **AI Commentary Route:** `app/api/budget-commentary/route.ts` — POST endpoint that takes the budget inputs and breakdown, sends to GPT-4o-mini, and returns the generated commentary. Response is cached in Supabase or Redis keyed by input hash to avoid regenerating for identical inputs.
- **Recharts Integration:** Use `BarChart` or `ResponsiveContainer` from Recharts for the category breakdown visualization. Style to match the design system.
- **OG Image Generation:** Use Vercel OG (`@vercel/og`) to generate dynamic social sharing images at `app/api/og/budget/route.tsx`. Accept budget summary params and render a branded image.
- **Drag-to-Rank Library:** Use `@dnd-kit/core` or similar for the priority ranking step. Ensure it works on mobile with touch events. Provide a tap-to-rank fallback for small screens.
- **Cost Estimate:** ~200 sessions/month x ~500 tokens/response = ~100K tokens/month on GPT-4o-mini. Approximately $3-5/month.
- **Feature Flag:** `BUDGET_ESTIMATOR_ENABLED` for staged rollout.

---

## Dependencies

- Colorado budget data from Stephanie — per-category pricing ranges for each region and style tier (this is the critical input; the tool cannot launch without real data)
- Supabase `budget_ranges` table created and populated
- OpenAI API key provisioned (for AI commentary)
- Recharts library installed
- Vercel OG package installed (for dynamic social images)
- Drag-and-drop library installed (for priority ranking step)
- PostHog analytics initialized
- Epic 01 infrastructure (Supabase, environment variables, design system)

---

## Definition of Done

- [ ] Multi-step form collects guest count, region, style tier, and priority ranking with smooth UX
- [ ] Deterministic budget calculation produces accurate ranges using Stephanie's Colorado pricing data
- [ ] AI commentary generates region-specific insights and personalized splurge/save recommendations
- [ ] Results display with bar chart, category breakdown, total range, and AI commentary
- [ ] Teaser results (total only) shown without email; full results require email capture
- [ ] Lead data stored in Supabase with source tagged as `budget_tool`
- [ ] Shareable results with dynamic OG image for social media
- [ ] SEO elements in place: title tag, meta description, schema markup, internal linking
- [ ] All analytics events fire correctly (start, complete, email capture, share, step drop-off)
- [ ] Calculation engine is unit-tested with known inputs producing expected outputs
- [ ] AI commentary fallback works — budget numbers display even if OpenAI is unavailable
- [ ] Page is fully responsive and touch-friendly on mobile (including drag-to-rank or tap-to-rank alternative)
- [ ] Feature flag allows enabling/disabling the tool without a deployment
- [ ] Manual QA: test all region/style/guest count combinations, verify math accuracy, test edge cases (2 guests, 300 guests, all regions)
