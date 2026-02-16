# US-009 — Sentiment-Based Follow-Ups

**Epic:** [07 — AI Features](README.md)
**Priority:** P2 — Nice to Have
**Points:** 3
**Tier:** 1 — Foundation AI
**Status:** Not Started

---

## Description

Build an AI-powered lead analysis and prioritization system that is entirely Stephanie-facing — visitors never see or interact with this feature. The system consolidates all touchpoints for each lead (inquiry form submissions, AI chat transcripts, quiz results, and browsing behavior from PostHog) into a single profile, then uses GPT-4o-mini to generate a sentiment score, urgency assessment, budget-service fit analysis, and engagement depth rating. Leads are sorted into a priority inbox (Hot / Warm / Cool) with recommended actions and consolidated context, enabling Stephanie to focus her limited follow-up time on the highest-intent leads first. Hot leads trigger real-time alerts so Stephanie can respond within minutes rather than hours. This replaces manual inbox scanning with intelligent triage, ensuring no high-value lead slips through the cracks.

---

## Acceptance Criteria

### Data Source Consolidation
- [ ] All lead data is consolidated by email address as the primary identifier
- [ ] Data sources merged per lead:
  - **Inquiry form submissions** (Epic 02 US-007): free-text message content, selected services, budget range, wedding date, venue preferences
  - **AI chat transcripts** (US-001): full conversation history from AI concierge, including questions asked and topics discussed
  - **Quiz results** (Epic 06 US-001): style preferences, vibe selections, engagement level (how many questions completed, time spent)
  - **Browsing behavior** (PostHog): pages visited, time on site, number of visits, specific pages of interest (services page, pricing, portfolio, venue guides), scroll depth on key pages
  - **Budget estimator results** (US-004): if the lead used the budget tool, their budget breakdown
  - **Timeline tool results** (US-006): wedding date, planning status, wedding type
- [ ] Consolidation handles partial data gracefully: leads with only a form submission are still analyzed (fewer signals, lower confidence)
- [ ] Deduplication: if the same email appears across multiple touchpoints, all data is merged into a single lead profile

### AI Analysis
- [ ] GPT-4o-mini analyzes the consolidated lead profile and returns a structured assessment:
  - **Sentiment score:** Excited / Engaged / Neutral / Hesitant / Price-Shopping
    - Excited: enthusiastic language, specific vision, multiple touchpoints, deep engagement
    - Engaged: clear interest, reasonable questions, active exploration
    - Neutral: standard inquiry, no strong signals either way
    - Hesitant: uncertainty language, asking about cancellation policies, comparison signals
    - Price-Shopping: budget-focused questions, asking for itemized pricing, comparing multiple planners
  - **Urgency indicators:**
    - Wedding date proximity (< 6 months = high urgency, 6-12 months = medium, > 12 months = low)
    - Language urgency cues ("need help ASAP", "running out of time", "just got engaged yesterday")
    - Multiple site visits in a short window (3+ visits in 48 hours = high intent)
    - Specific venue or date mentioned (decision signals)
  - **Budget-service fit:** Does the lead's indicated budget match the services they're interested in? Flags mismatches (e.g., luxury expectations on a tight budget) so Stephanie can address early
  - **Engagement depth:** Quantified touchpoint score:
    - Form submission only = low
    - Form + quiz = medium
    - Form + quiz + chat = high
    - Form + quiz + chat + budget tool = very high
    - Multiple visits over multiple days = bonus signal
  - **Recommended action:** Specific suggested next step for Stephanie (e.g., "Call within 2 hours — excited bride with Vail wedding in 5 months, budget aligns with full planning package", "Send pricing PDF — engaged couple exploring options for next summer")
  - **Summary:** 3-4 sentence overview of the lead, their situation, and why they scored the way they did
- [ ] AI response validated with Zod schema before storage

### Priority Classification
- [ ] Leads classified into three tiers based on AI analysis:
  - **Hot (respond now):** Sentiment = Excited or Engaged, urgency = high, engagement = high or very high, budget-service fit = good. These leads are most likely to convert if Stephanie responds quickly.
  - **Warm (respond today):** Sentiment = Engaged or Neutral, urgency = medium, engagement = medium+, budget-service fit = reasonable. Solid leads that need nurturing.
  - **Cool (respond this week):** Sentiment = Neutral or below, urgency = low, engagement = low, or budget-service fit = poor. Still worth following up, but not time-sensitive.
- [ ] Priority classification uses a weighted scoring model: sentiment (30%), urgency (25%), engagement depth (25%), budget-service fit (20%)

### Priority Inbox
- [ ] Admin page at `/admin/leads/` (protected by authentication) displaying the priority inbox
- [ ] Leads sorted by priority tier (Hot first, then Warm, then Cool) and within each tier by recency
- [ ] Each lead in the inbox shows:
  - Name and email
  - Priority badge (Hot = red, Warm = amber, Cool = blue)
  - Sentiment score with icon
  - Wedding date and months until wedding
  - Engagement depth indicator (visual: 1-4 dots or bars)
  - AI summary (2-3 sentences)
  - Recommended action
  - Timestamp of most recent touchpoint
  - Expand to view: all touchpoint data consolidated (form submission, chat transcript, quiz results, browsing summary)
- [ ] Filter and sort options: by priority, by date, by sentiment, by engagement depth
- [ ] Mark as "Contacted" or "Not a fit" to remove from active queue
- [ ] Quick-action buttons: "Email", "Call", "Schedule Consultation" (links to Stephanie's tools)

### Email Digest
- [ ] Daily email digest sent to Stephanie at a configurable time (default: 8am MT)
- [ ] Digest includes:
  - Count of new leads since last digest, broken down by priority
  - Hot leads listed first with full details (name, summary, recommended action)
  - Warm leads listed with abbreviated details
  - Cool leads listed as count only ("5 cool leads — view in dashboard")
  - Link to the admin inbox for full details
- [ ] Digest sent via Resend with branded React Email template
- [ ] Digest only sent when there are new leads (no empty emails)

### Real-Time Alerts for Hot Leads
- [ ] When a lead is classified as Hot, an immediate alert is sent to Stephanie
- [ ] Alert channels (configurable):
  - Email: immediate email with lead summary and recommended action
  - Push notification: via web push notification API (if Stephanie has the admin page open)
- [ ] Alert includes: lead name, email, AI summary, recommended action, and direct link to the lead detail in the admin inbox
- [ ] Alert is sent within 2 minutes of the lead's triggering touchpoint

### Processing Schedule
- [ ] Analysis triggers on:
  - **New lead creation:** When a new form submission creates a lead record, analysis runs after a 5-minute delay (to catch if the lead immediately starts a chat session or takes the quiz)
  - **Lead data update:** When an existing lead adds a new touchpoint (e.g., submits a form AND later uses the chat), re-analyze with the new data
  - **Daily digest:** Vercel Cron job runs daily at 7:30am MT to generate and send the daily digest
- [ ] Re-analysis updates the existing AI assessment rather than creating duplicates

### Analytics
- [ ] PostHog events tracked:
  - `lead_ai_analyzed` — lead analyzed by AI (with properties: priority, sentiment, urgency, engagement_depth)
  - `lead_hot_alert_sent` — hot lead alert dispatched
  - `lead_digest_sent` — daily digest email sent (with property: hot_count, warm_count, cool_count)
  - `lead_inbox_viewed` — Stephanie opens the admin inbox
  - `lead_action_taken` — Stephanie marks a lead as contacted (with property: priority, time_to_action_hours)

---

## Technical Notes

- **Data Consolidation:** `src/lib/lead-consolidation.ts` — utility that queries Supabase across tables (`leads`, `chat_sessions`, `quiz_results`, `tool_results`) and merges by email address. PostHog data fetched via PostHog API using the lead's distinct ID or email.
- **AI Analysis Route:** `src/app/api/admin/analyze-lead/route.ts` — accepts a lead ID, consolidates data, sends to GPT-4o-mini, stores result.
- **Supabase Schema Updates:**
  - `leads` table: add columns `ai_sentiment` (JSONB), `priority_tier` (text), `ai_analyzed_at` (timestamptz), `touchpoint_count` (integer), `last_touchpoint_at` (timestamptz)
  - Or create a separate `lead_analysis` table with FK to `leads`
- **Prompt Engineering:** System prompt includes:
  - Context about Stephanie's business: services offered, pricing ranges, ideal client profile
  - Scoring rubric for sentiment, urgency, engagement, and budget-service fit
  - Examples of Hot, Warm, and Cool leads with reasoning
  - Instructions to generate actionable, specific recommended actions (not generic "follow up")
- **Trigger Mechanism:** Supabase database webhook on `INSERT` and `UPDATE` to the `leads` table triggers a Supabase Edge Function that calls the analysis API route. The 5-minute delay is implemented with a Supabase `pg_cron` scheduled check or a Vercel Cron job that processes the "pending analysis" queue.
- **PostHog API Integration:** Use PostHog's REST API to fetch person properties and recent events for a given email/distinct_id. Limit to last 30 days of activity. Cache PostHog data per lead to avoid excessive API calls.
- **Admin Page:** `src/app/admin/leads/page.tsx` — server component with authentication gate (only Stephanie can access). Uses server-side data fetching for the lead list, client-side interactions for expand/collapse and quick actions.
- **Cron Job:** `src/app/api/cron/lead-digest/route.ts` — Vercel Cron endpoint that runs daily, generates the digest, and sends via Resend. Configured in `vercel.json` cron schedule.
- **Token Budget:** Target 300-500 tokens per lead analysis (~$0.01-0.02 per lead at GPT-4o-mini pricing). With ~50 leads/month, total cost ~$0.50-1.00/month.
- **Fallback:** If AI analysis fails, lead is stored with `priority_tier = "manual_review"` and included in the digest with a note: "AI analysis unavailable — please review manually."

---

## Dependencies

- **US-001:** AI Chat system (for chat transcript data)
- **US-002:** Smart Inquiry Form (for form submission data with existing AI analysis)
- **US-004:** Budget Estimator (optional — enriches lead profile if used)
- **US-006:** Timeline Generator (optional — enriches lead profile if used)
- **Epic 06 US-001:** Style quiz (for quiz result data)
- **Epic 04:** PostHog integration (for browsing behavior data), Resend integration (for digest and alert emails)
- **Epic 01 US-001:** Supabase project, OpenAI API key configured
- **Authentication:** Admin page requires authentication (Supabase Auth or similar) — only Stephanie should access the priority inbox

---

## Expected Outcomes

- **Faster response to high-intent leads:** Hot leads identified within minutes, not hours — critical since response time is the #1 factor in wedding planner selection
- **Prioritized time allocation:** Stephanie spends her limited follow-up time on leads most likely to convert, rather than processing inbox in chronological order
- **No leads lost:** Consolidated view ensures leads who interact across multiple touchpoints (chat + form + quiz) are recognized as highly engaged, not treated as separate low-touch contacts
- **Better first contact:** Recommended actions and consolidated context enable Stephanie to personalize her outreach with full awareness of the couple's situation
- **Data-driven insights:** Over time, sentiment and priority data reveals patterns in lead quality by source, season, and behavior

---

## Definition of Done

- [ ] Lead data from all sources (form, chat, quiz, browsing, tools) is consolidated by email address into a unified profile
- [ ] GPT-4o-mini generates structured analysis: sentiment, urgency, budget-service fit, engagement depth, recommended action, summary
- [ ] Leads are classified into Hot / Warm / Cool priority tiers
- [ ] Admin priority inbox at `/admin/leads/` displays leads sorted by priority with all relevant data
- [ ] Daily email digest sent to Stephanie with lead summary by priority tier
- [ ] Hot lead alerts sent immediately via email (within 2 minutes of triggering touchpoint)
- [ ] Analysis triggers on new lead creation and lead data updates
- [ ] Re-analysis updates existing assessment when new touchpoint data arrives
- [ ] Fallback handles AI analysis failures gracefully (lead flagged for manual review)
- [ ] Admin page is authentication-protected (Stephanie only)
- [ ] All PostHog analytics events fire correctly
- [ ] Admin inbox works on desktop and tablet (mobile optional for admin interface)
- [ ] Stephanie has reviewed sample lead analyses and confirmed priority classifications are useful and accurate
