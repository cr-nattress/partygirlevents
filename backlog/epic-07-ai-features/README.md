# Epic 07 — AI Features

**Phase:** 3
**Months:** 4-8
**Total Points:** 55
**Status:** Not Started
**Dependencies:** Epic 05 (site live) must be complete — AI features layer onto an established, traffic-receiving website

---

## Goal

Become the most innovative wedding planner website in Colorado with AI-powered tools that genuinely help couples plan their mountain wedding. These features are organized into three tiers: Tier 1 (foundation AI that augments existing site capabilities), Tier 2 (standalone AI tools that drive engagement and leads), and Tier 3 (AI-assisted content production for ongoing growth). Every AI feature follows strict ethics principles and is designed to provide real value — not gimmicks.

---

## Story Index

| ID | Story | Priority | Points | Tier | Status |
|----|-------|----------|--------|------|--------|
| [US-001](US-001-ai-concierge-chat.md) | AI Concierge Chat | P0 | 8 | 1 | Not Started |
| [US-002](US-002-smart-inquiry-form.md) | Smart Inquiry Form | P1 | 3 | 1 | Not Started |
| [US-003](US-003-personalized-content.md) | Personalized Content | P1 | 5 | 1 | Not Started |
| [US-004](US-004-budget-estimator.md) | Budget Estimator | P0 | 8 | 2 | Not Started |
| [US-005](US-005-vibe-translator.md) | Vibe Translator | P1 | 8 | 2 | Not Started |
| [US-006](US-006-timeline-generator.md) | Timeline Generator | P2 | 3 | 2 | Not Started |
| [US-007](US-007-smart-gallery.md) | Smart Gallery | P2 | 5 | 2 | Not Started |
| [US-008](US-008-vendor-match-engine.md) | Vendor Match Engine | P2 | 5 | 2 | Not Started |
| [US-009](US-009-sentiment-follow-ups.md) | Sentiment-Based Follow-Ups | P2 | 3 | 1 | Not Started |
| [US-010](US-010-ai-blog-pipeline.md) | AI Blog Pipeline | P2 | 5 | 3 | Not Started |
| | **Total** | | **55** | | |

---

## Feature Tiers

### Tier 1 — Foundation AI (Months 4-5)
Augments existing site capabilities with intelligence. Invisible or subtly visible to visitors.

| Story | What It Does | Visitor-Facing? |
|-------|-------------|----------------|
| US-001 | AI chat assistant on every page | Yes |
| US-002 | AI-analyzed inquiry form submissions | No (Stephanie-facing) |
| US-003 | Personalized content ordering per visitor segment | Subtly yes |
| US-009 | AI-prioritized lead follow-ups | No (Stephanie-facing) |

### Tier 2 — Standalone AI Tools (Months 5-7)
Interactive tools that drive engagement, capture leads, and provide genuine value to couples.

| Story | What It Does | Lead Capture? |
|-------|-------------|--------------|
| US-004 | Colorado wedding budget estimator | Yes (email for full results) |
| US-005 | Natural language → mood board translator | Yes (email to save) |
| US-006 | Wedding timeline with Colorado tips | Yes (email for reminders) |
| US-007 | Natural language portfolio search | No (engagement tool) |
| US-008 | AI-matched vendor recommendations | Yes (email to save list) |

### Tier 3 — AI Content Production (Month 8+)
AI-assisted content pipeline for ongoing SEO growth.

| Story | What It Does | Ongoing? |
|-------|-------------|---------|
| US-010 | AI drafts blog posts for Stephanie to edit | Yes (2 drafts/week) |

---

## AI Ethics Principles

All AI features in this epic adhere to the following principles:

1. **Transparency:** AI-powered features are clearly identified. The chat assistant introduces itself as "Stephanie's AI assistant" and never pretends to be human. AI-generated content is reviewed by a human before publishing.
2. **Human Escalation:** Every AI interaction includes a clear path to connect with Stephanie directly. Complex questions, emotional conversations, and high-intent leads are routed to a human.
3. **No Manipulation:** AI is used to help, inform, and simplify — never to create false urgency, fabricate social proof, or pressure decisions. Budget estimates are honest ranges, not anchored to upsell.
4. **Data Minimization:** Only collect data necessary for the feature to function. Quiz answers, chat transcripts, and visitor segments are stored with clear retention policies. No shadow profiling.

---

## Epic-Level Acceptance Criteria

- [ ] AI concierge chat deployed on every page with streaming responses, brand voice, and lead capture
- [ ] Inquiry form submissions include AI-generated lead analysis visible to Stephanie
- [ ] Returning visitors see personalized content ordering based on their segment
- [ ] Budget estimator deployed at `/tools/budget/` with Colorado-specific data and lead capture
- [ ] Vibe translator deployed at `/tools/vibe/` with text and image input support
- [ ] Timeline generator deployed at `/tools/timeline/` with Google Calendar export
- [ ] Smart gallery supports natural language search with semantic matching
- [ ] Vendor match engine recommends vendors based on quiz/budget/location data
- [ ] Lead follow-ups are AI-prioritized with urgency notifications for hot leads
- [ ] AI blog pipeline generates 2 drafts/week in Stephanie's voice for review
- [ ] All AI features include rate limiting (Upstash Redis) to prevent abuse
- [ ] Monthly API costs stay within $60-155 budget
- [ ] All AI features work gracefully when API is unavailable (fallback states)
- [ ] PostHog tracks engagement with every AI feature

---

## Monthly API Cost Estimate

| Feature | Model | Est. Monthly Usage | Est. Cost |
|---------|-------|--------------------|-----------|
| AI Chat | GPT-4o | ~500 conversations | $30-50 |
| Smart Inquiry | GPT-4o-mini | ~50 submissions | $1-2 |
| Budget Estimator | GPT-4o-mini | ~200 sessions | $3-5 |
| Vibe Translator | GPT-4o (Vision) | ~100 sessions | $10-20 |
| Timeline Generator | GPT-4o-mini | ~100 sessions | $2-3 |
| Smart Gallery | text-embedding-3-small | ~300 queries/mo | $1-2 |
| Vendor Match | GPT-4o-mini | ~100 sessions | $2-3 |
| Sentiment Analysis | GPT-4o-mini | ~50 leads | $1-2 |
| Blog Pipeline | GPT-4o | ~8 drafts/mo | $10-20 |
| RAG Embeddings | text-embedding-3-small | One-time + updates | $2-5 |
| **Total** | | | **$60-155** |

---

## Content Dependencies on Stephanie

| Item | Needed By | Story | Status |
|------|-----------|-------|--------|
| Brand voice guide (expanded for AI system prompts) | Month 4 | US-001 | Pending |
| FAQ database (for RAG knowledge base) | Month 4 | US-001 | Pending |
| Colorado budget data (per category, region, style) | Month 4 | US-004 | Pending |
| Venue recommendation data (for vibe translator) | Month 5 | US-005 | Pending |
| Colorado pricing data (for vibe translator ranges) | Month 5 | US-005 | Pending |
| Vendor database (names, categories, tags, endorsements) | Month 5 | US-008 | Pending |
| Content voice examples (for blog pipeline training) | Month 6 | US-010 | Pending |

---

## Relationship to Other Epics

- **Epic 01 (Foundation):** Supabase with pgvector, OpenAI API key, Vercel AI SDK — all provisioned in Epic 01.
- **Epic 02 (Core Pages):** AI chat overlays on all core pages. Smart inquiry enhances the Epic 02 contact form. Personalized content reorders Epic 02 page sections.
- **Epic 06 (Differentiators):** Quiz data feeds personalization (US-003). Vendor directory data powers vendor match engine (US-008). Blog templates from US-003 are used by AI blog pipeline (US-010).
- **Epic 08 (Content Pipeline):** AI blog pipeline (US-010) accelerates the content calendar defined in Epic 08.

---

## Technical Context

- **LLM:** OpenAI GPT-4o (chat, vibe translator, blog), GPT-4o-mini (budget, timeline, inquiry, vendor, sentiment)
- **Embeddings:** text-embedding-3-small for RAG and smart gallery
- **Vector Store:** Supabase pgvector extension
- **Streaming:** Vercel AI SDK `useChat` hook for real-time chat responses
- **Rate Limiting:** Upstash Redis for per-session and per-IP limits
- **Image Analysis:** GPT-4o Vision for vibe translator image input and gallery tagging
- **Caching:** Cache AI responses where appropriate (budget commentary, timeline tips) to reduce API costs
- **Fallbacks:** Every AI feature has a graceful degradation path when the API is unavailable

---

## Notes

- Tier 1 features (US-001, US-002, US-003, US-009) should be built first — they augment existing site capabilities and deliver ROI immediately.
- The Budget Estimator (US-004) and Vibe Translator (US-005) are the two highest-impact Tier 2 features and should be prioritized after Tier 1.
- The AI Chat (US-001) requires a well-populated RAG knowledge base before launch — coordinate with Epic 08 content production.
- Smart Gallery (US-007) requires a one-time batch processing step to tag and embed all portfolio images before the feature can go live.
- Monitor API costs monthly and adjust rate limits or model choices if costs exceed the $155 ceiling.
- All AI features should be behind feature flags during development for staged rollout.
