# US-002 — Smart Inquiry Form

**Epic:** 07 — AI Features
**Priority:** P1
**Points:** 3
**Tier:** 1
**Status:** Not Started

---

## Description

AI-enhanced analysis of inquiry form submissions, designed entirely for Stephanie — not visitor-facing. When a potential client submits the contact/inquiry form, GPT-4o-mini analyzes the submission in the background and generates a lead quality score, natural language summary, response priority recommendation, suggested talking points, and red flag alerts. This gives Stephanie an instant, structured read on every lead so she can prioritize her time and respond with personalized outreach. The AI analysis is strictly advisory — it never auto-rejects or auto-responds to leads.

---

## Acceptance Criteria

### AI Lead Analysis
- [ ] When a form submission is received, GPT-4o-mini analyzes the full submission text and generates a structured analysis
- [ ] Lead quality score is generated on a 1-10 scale based on: budget fit (does stated or implied budget align with Stephanie's minimums?), date timeline (how far out is the wedding?), service match (are they looking for services Stephanie offers?), detail level (how much thought and specificity is in the submission?), and engagement signals (tone, questions asked, urgency indicators)
- [ ] A 2-3 sentence natural language summary is generated capturing the key details: who the couple is, what they want, when, where, and any standout details
- [ ] Suggested response priority is assigned: Hot (respond within 2 hours), Warm (respond within 24 hours), or Cool (respond within 48 hours)
- [ ] 3-5 recommended talking points are generated for Stephanie's response, personalized to what the couple shared (e.g., "They mentioned wanting a Breckenridge ceremony — mention your experience at Ten Mile Station")
- [ ] Red flags and special notes are surfaced when applicable (e.g., "Very tight timeline — wedding is 3 months out", "Budget of $5K may be below minimum for full-service coordination", "Mentioned they're also talking to other planners — competitive situation")

### Data Storage
- [ ] AI analysis is stored in Supabase alongside the lead record in a structured `ai_analysis` JSONB column or a related `lead_analyses` table with a foreign key to `leads.id`
- [ ] Analysis record includes: score, summary, priority, talking_points (array), red_flags (array), model_used, analyzed_at timestamp
- [ ] If AI analysis fails, the lead record is still stored successfully — analysis is non-blocking
- [ ] AI analysis is never shown to the visitor — it is Stephanie-facing only

### Email Notification Integration
- [ ] The existing lead notification email (from Epic 04 US-005) is enhanced to include the AI analysis section
- [ ] Email format includes: lead quality score with visual indicator (colored badge or bar), priority recommendation (Hot/Warm/Cool with suggested response timeframe), natural language summary, talking points as a bulleted list, and red flags highlighted prominently if present
- [ ] If AI analysis is not available (API failure), the email is still sent with the standard lead details and a note: "AI analysis unavailable for this submission"

### Admin Visibility
- [ ] AI analysis is accessible in a simple admin view or included in the email format — does not require a full admin dashboard for this story
- [ ] Leads can be viewed sorted by priority (Hot first, then Warm, then Cool)
- [ ] Lead quality score is visible at a glance for quick scanning

### AI Ethics and Advisory Nature
- [ ] AI analysis is strictly advisory — it never auto-rejects a lead or sends an automated response to the visitor
- [ ] Stephanie retains full control over which leads to pursue and how to respond
- [ ] The scoring criteria are documented and can be adjusted via prompt engineering, not hard-coded logic
- [ ] No visitor-facing communication references or reveals the AI analysis

---

## Technical Notes

- **Implementation Pattern:** The AI analysis is async and non-blocking to the visitor experience:
  1. Visitor submits inquiry form
  2. Lead is stored in Supabase `leads` table immediately (existing flow from Epic 02 US-007)
  3. Visitor receives confirmation message (existing flow, no delay)
  4. Async: form data is sent to GPT-4o-mini with a structured analysis prompt
  5. AI response is parsed and stored in Supabase linked to the lead record
  6. Enhanced notification email is sent to Stephanie with the AI analysis included
- **API Route or Edge Function:** The analysis can be triggered as an async call from the existing form submission handler, or via a Supabase database webhook / `after insert` trigger calling a Supabase Edge Function.
- **Prompt Engineering:** The system prompt should include Stephanie's service offerings, pricing minimums, ideal client profile, and Colorado-specific context so the model can score leads accurately. The prompt should request a JSON-structured response for reliable parsing.
- **Response Format:** Request structured JSON output from the model:
  ```json
  {
    "score": 8,
    "summary": "Sarah and Mike are planning a 150-guest wedding at a Breckenridge venue next September...",
    "priority": "Hot",
    "talking_points": ["Mention your experience at Ten Mile Station", "Ask about their floral vision", "..."],
    "red_flags": ["Tight 4-month timeline"],
    "confidence": 0.85
  }
  ```
- **Validation:** AI response validated with a Zod schema before storage to ensure all required fields are present and correctly typed.
- **Model Choice:** GPT-4o-mini is sufficient for this task. Estimated cost: ~$0.02 per inquiry at ~1000 tokens total, approximately $1-2/month for ~50 submissions.
- **Email Template:** Enhance the existing Resend/React Email template from Epic 04 to conditionally render the AI analysis block when available.
- **Error Handling:** Wrap the AI analysis call in a try-catch. On failure, log the error, store `ai_analysis: null` on the lead, and send the notification email without the analysis section. Retry once after 5 seconds; if retry fails, set a `needs_manual_review` flag.
- **Feature Flag:** `AI_INQUIRY_ANALYSIS_ENABLED` — allows disabling AI analysis without removing the feature code.

---

## Dependencies

- Epic 02 US-007 (contact/inquiry form) — the form must exist and store leads in Supabase
- Epic 04 US-005 (email notifications) — the lead notification email must be implemented so it can be enhanced with the AI analysis section
- OpenAI API key provisioned and available in environment variables
- Stephanie's ideal client profile, service offerings, and pricing minimums documented for the AI prompt
- Supabase `leads` table exists with the schema from Epic 02

---

## Definition of Done

- [ ] Form submissions trigger AI analysis via GPT-4o-mini without blocking the visitor experience
- [ ] Lead quality score (1-10), summary, priority, talking points, and red flags are generated accurately
- [ ] AI analysis is stored in Supabase linked to the lead record
- [ ] Stephanie's notification email includes the AI analysis section with clear formatting
- [ ] If AI analysis fails, the lead is still stored and the notification email is still sent (without the analysis)
- [ ] AI analysis is advisory only — no automated actions are taken on leads
- [ ] Feature flag allows enabling/disabling the AI analysis
- [ ] Scoring prompt is documented and version-controlled for future tuning
- [ ] Manual QA: test with 10+ sample submissions covering various lead types (hot, warm, cool, edge cases, red flag scenarios)
- [ ] Stephanie has reviewed sample AI analyses and confirmed they are accurate and useful
