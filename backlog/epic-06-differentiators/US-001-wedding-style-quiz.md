# US-001 — Wedding Style Quiz

**Epic:** [06 — Differentiators](README.md)
**Priority:** P0 — Must Have
**Points:** 8
**Status:** Not Started

---

## Description

Build an interactive 8-12 question visual quiz that helps couples discover their wedding style, generates AI-powered personalized results, and captures high-quality leads. This is THE highest-impact differentiator in the entire backlog — no Colorado wedding planner offers anything like it. The quiz presents full-screen visual multiple-choice questions with curated image cards, uses Framer Motion for polished transitions, and on completion sends the answers to GPT-4o-mini to generate a named style, color palette, decor recommendations, and matched portfolio items. Results are displayed as a branded mood board page and emailed as a designed HTML email. This feature is expected to produce 3-5x lead quality improvement over a standard contact form.

---

## Acceptance Criteria

### Quiz Flow & UI
- [ ] Quiz accessible at `/quiz/` route
- [ ] Full-screen modal/overlay experience — no page navigation during the quiz (single-page state machine)
- [ ] Visual multiple-choice format: 4 curated image cards per question
- [ ] Image cards include a short label and are selectable with clear active/selected state
- [ ] Framer Motion animated transitions between questions (slide, fade, or morph)
- [ ] Progress bar showing current question / total questions
- [ ] Back button to revisit previous questions without losing answers
- [ ] Responsive layout: 2x2 image grid on desktop, vertical scroll or swipeable on mobile
- [ ] Keyboard accessible: arrow keys to navigate options, Enter to select, Tab for back/next

### Questions (8-12)
- [ ] **Dream Setting:** Mountain meadow, luxury resort, rustic barn, intimate garden (visual cards)
- [ ] **Table Setting:** Formal multi-course, family-style farm tables, cocktail-style stations, picnic/casual (visual cards)
- [ ] **Color Vibe:** Earth tones & neutrals, bold jewel tones, soft pastels, classic black & white (visual cards with palette swatches)
- [ ] **Flowers:** Wild & organic, structured & architectural, romantic & lush, minimal & modern (visual cards)
- [ ] **Evening Feel:** Dance party, cozy fireside, elegant cocktail hour, stargazing adventure (visual cards)
- [ ] **Guest Count:** Elopement (2-20), intimate (21-50), medium (51-100), grand (100+) (visual cards with icons)
- [ ] **Season:** Spring (wildflowers), summer (alpine), fall (aspens), winter (snow) (visual cards with Colorado imagery)
- [ ] **Priorities:** Rank top 3 from: photography, food & drink, venue, florals, music, guest experience, decor (drag-and-drop or tap-to-rank)
- [ ] **Preferred Date:** Date range picker (month/year) or "Still deciding"
- [ ] **Budget Range:** Slider or range cards ($15K-25K, $25K-50K, $50K-75K, $75K+)
- [ ] **Email Capture:** Name + email + optional phone (final question before results)
- [ ] Email field is required to view full results (teaser shown without)

### AI Results Generation
- [ ] On quiz completion, send all answers to GPT-4o-mini via a Next.js API route
- [ ] System prompt instructs the model to return structured JSON: style name, style description, color palette (5 hex codes with names), decor recommendations (5-8 items), floral suggestions, venue type match, "Stephanie's recommendation" paragraph
- [ ] AI response parsed and validated with Zod schema before rendering
- [ ] Fallback: if AI API fails, show a rule-based result mapping (predefined style per answer combination)

### Results Page
- [ ] Branded results page at `/quiz/results/[id]/` (shareable URL)
- [ ] Mood board grid displaying: style name heading, style description, color palette swatches (hex codes visible), 4-6 matched portfolio images, decor recommendations list, floral suggestions
- [ ] "Stephanie's Recommendation" section with personalized paragraph from AI
- [ ] 2-3 matched case studies from the portfolio (filtered by style tags matching quiz results)
- [ ] Primary CTA: "Book Your Free Discovery Call" linking to `/contact/` with quiz data pre-populated
- [ ] Secondary CTA: "Share Your Style" with social sharing buttons
- [ ] Results page uses Event schema markup

### Email & Data
- [ ] Quiz results emailed to the couple as a branded HTML email (Resend + React Email template)
- [ ] Email includes: style name, color swatches, recommendations, link back to results page, CTA to book
- [ ] All quiz answers + AI results stored in Supabase `quiz_results` table:
  - `id` (UUID), `created_at`, `email`, `name`, `phone`, `answers` (JSONB), `ai_result` (JSONB), `style_name`, `utm_source`, `utm_medium`, `utm_campaign`
- [ ] Quiz completion triggers HoneyBook CRM sync (lead creation with quiz context)
- [ ] Notification email sent to Stephanie with lead summary and quiz results

### Shareable Results
- [ ] Auto-generated OG image for each result (style name + color palette + hero image)
- [ ] OG image generated via `next/og` (Vercel OG Image Generation) or pre-rendered
- [ ] Social sharing produces a visually compelling card when shared on Instagram, Pinterest, Facebook

### Analytics
- [ ] PostHog events tracked: `quiz_started`, `quiz_question_answered` (per question with answer), `quiz_completed`, `quiz_email_captured`, `quiz_results_viewed`, `quiz_results_shared`, `quiz_cta_clicked`
- [ ] Track completion funnel: start → each question → email → results
- [ ] Track drop-off question (which question has the highest abandonment)

---

## Technical Notes

- **Route:** `src/app/(marketing)/quiz/page.tsx` (quiz), `src/app/(marketing)/quiz/results/[id]/page.tsx` (results)
- **State Management:** React `useReducer` or Zustand for quiz state machine (current question, answers, navigation history)
- **AI API Route:** `src/app/api/quiz/generate/route.ts` — POST endpoint that accepts answers, calls GPT-4o-mini, validates response, stores in Supabase, returns result ID
- **Image Cards:** Use `next/image` with priority loading for the current question's images, prefetch next question's images
- **Framer Motion:** `AnimatePresence` with `mode="wait"` for question transitions. Consider `layout` animations for the progress bar.
- **Email Template:** React Email component in `src/emails/quiz-results.tsx`
- **Supabase Table:** `quiz_results` with RLS policies (anon insert, authenticated read)
- **Rate Limiting:** Consider rate limiting the AI generation endpoint (1 result per email per hour) to prevent abuse
- **Performance:** Quiz images should be optimized and served at appropriate sizes. Consider preloading the next question's images during the current question.
- **Mobile:** The priority ranking question (drag-and-drop) needs a mobile-friendly alternative — consider tap-to-rank (tap items in priority order) instead of drag on touch devices

---

## Dependencies

- **Epic 01 US-002:** Design tokens for quiz styling
- **Epic 01 US-003:** UI components (Card, Button, Progress, Input)
- **Epic 01 US-005:** CMS content models for portfolio (to match case studies to quiz results)
- **Epic 04:** HoneyBook CRM integration for lead sync
- **From Stephanie:** Style taxonomy (5-6 named styles with descriptions and characteristics), 50-100 portfolio images tagged by style/season/setting/size

---

## Expected Outcomes

- **40-60%** quiz completion rate (industry average for visual quizzes)
- **70-80%** email capture rate among quiz completers (email required for full results)
- **3-5x** lead quality improvement vs. standard contact form leads
- Quiz leads will have pre-qualified themselves with budget, timeline, guest count, and style preferences — Stephanie can personalize her outreach before the first conversation

---

## Definition of Done

- [ ] Quiz loads at `/quiz/` with all 8-12 questions rendering correctly
- [ ] Visual image cards display, select, and transition smoothly on mobile and desktop
- [ ] Progress bar accurately reflects current position
- [ ] Back navigation preserves previous answers
- [ ] AI results generate successfully with style name, colors, and recommendations
- [ ] Fallback results display when AI API is unavailable
- [ ] Results page renders mood board with matched portfolio items and case studies
- [ ] Quiz results emailed as branded HTML email via Resend
- [ ] Data stored in Supabase `quiz_results` table with all fields populated
- [ ] HoneyBook CRM sync fires on completion
- [ ] Shareable OG image generates correctly for social sharing
- [ ] All PostHog analytics events fire at each step
- [ ] Lighthouse Performance score > 85 on mobile
- [ ] Keyboard accessible throughout the entire quiz flow
- [ ] Stephanie has reviewed and approved the style taxonomy and question content
