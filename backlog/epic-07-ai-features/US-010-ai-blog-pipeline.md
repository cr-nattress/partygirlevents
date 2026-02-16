# US-010 — AI Blog Pipeline

**Epic:** [07 — AI Features](README.md)
**Priority:** P2 — Nice to Have
**Points:** 5
**Tier:** 3 — AI Content Production
**Status:** Not Started

---

## Description

Build an AI-assisted blog content production pipeline that accelerates Stephanie's publishing cadence from 3 posts/month to 4-8 posts/month without sacrificing quality or authenticity. The pipeline covers the full content lifecycle: topic selection from the 6-month content calendar, automated research (Colorado wedding trends, competitor content gaps, target keywords), draft generation in Stephanie's voice using GPT-4o, human review and editing in the CMS, and publication with automatic ISR revalidation. Every piece of content goes through mandatory human review — the AI generates drafts, never publishes automatically. A voice training system prompt built from Stephanie's existing writing ensures the AI output sounds like Stephanie, not a generic AI. The pipeline also auto-generates SEO metadata, suggests internal links, and places CTAs strategically. At an estimated $10-20/month in API costs for 8 drafts, this is one of the highest-ROI features in the entire site — more content means more keyword coverage, more organic traffic, and more leads.

---

## Acceptance Criteria

### Pipeline Flow

#### Step 1: Topic Selection
- [ ] Admin interface displays upcoming topics from the 6-month content calendar (defined in PLAN.md Section 10)
- [ ] Each topic shows: title, target keyword, content type (TOFU/MOFU/BOFU), target publish date, status (Not Started / Drafting / In Review / Published)
- [ ] Admin selects a topic and clicks "Generate Draft" to initiate the pipeline
- [ ] Optional fields before generation:
  - Target keyword (pre-filled from calendar, editable)
  - Content type: TOFU (Top of Funnel — awareness/inspiration), MOFU (Middle of Funnel — consideration/comparison), BOFU (Bottom of Funnel — decision/conversion)
  - Word count target (default: 1500-2500)
  - Additional notes or angles from Stephanie (free text: "Include our recent Vail wedding as an example", "Emphasize budget-friendly tips")
  - Target audience segment (from PLAN.md persona definitions)

#### Step 2: Research
- [ ] On "Generate Draft" trigger, the pipeline first gathers relevant context:
  - Colorado wedding statistics and trends (from a curated reference dataset or web search summary)
  - Competitor content gaps: what are top-ranking articles for this keyword, and what do they miss?
  - Related internal content: existing blog posts and pages on the site that could be linked
  - Seasonal relevance: if the target publish date is in October, emphasize fall wedding content angles
- [ ] Research step produces a structured brief: topic, keyword, audience, angle, reference data, internal link opportunities
- [ ] Research brief is visible to Stephanie in the admin interface before draft generation (optional review step)

#### Step 3: Draft Generation
- [ ] GPT-4o generates a full blog post draft (1500-2500 words) based on the research brief
- [ ] Draft matches Stephanie's brand voice:
  - Warm, approachable, and conversational — like talking to a knowledgeable friend
  - Colorado-specific references and local knowledge woven naturally throughout
  - Expert authority without being condescending or overly formal
  - Personal anecdotes placeholders: "[Stephanie's note: add a personal story about...]" where personal touches would strengthen the piece
- [ ] Draft structure:
  - **Title:** Engaging, keyword-inclusive, under 60 characters for SEO
  - **Introduction:** Hook + context + what the reader will learn (150-250 words)
  - **Body:** Organized with H2 and H3 headings, bullet points, numbered lists where appropriate
  - **Pull quotes:** 2-3 highlighted quotes or key takeaways per post
  - **Image placements:** Suggested locations for images with descriptive alt text (e.g., "[Image: Bride and groom exchanging vows at Piney River Ranch with Gore Range backdrop. Alt: Mountain wedding ceremony at Piney River Ranch near Vail Colorado]")
  - **Internal links:** 3-5 contextual links to existing site pages (services, portfolio, venue guides, related blog posts)
  - **CTA blocks:** Mid-post CTA ("Planning your own mountain wedding? [Take our style quiz](/tools/quiz) to find your vibe") and end-post CTA ("Ready to start planning? [Book a free consultation with Stephanie](/contact)")
  - **Conclusion:** Summary + forward-looking statement + CTA
- [ ] Target keyword used naturally in: title, first paragraph, 2-3 H2 headings, and 3-5 times in body copy (no keyword stuffing — density under 2%)
- [ ] Draft includes a "Sources & Inspiration" section at the bottom if external data was referenced

#### Step 4: Review
- [ ] Draft appears in the CMS with status "AI Draft — Pending Review"
- [ ] Stephanie can:
  - Edit the draft directly in the CMS rich text editor
  - Add personal anecdotes where placeholders were left
  - Adjust tone, remove sections, add sections
  - Replace suggested images with actual portfolio photos
  - Approve or reject the draft
- [ ] Diff view available: shows Stephanie's edits against the original AI-generated version (tracked for quality improvement over time)
- [ ] Edit percentage tracked: how much of the AI draft Stephanie changes (metric for voice training quality)

#### Step 5: Publish
- [ ] On approval, post status changes to "Scheduled" or "Published" based on the target publish date
- [ ] Publication triggers ISR revalidation for the blog listing page and the new post page
- [ ] Published post includes all standard blog post metadata: author (Stephanie), publish date, category, tags, featured image
- [ ] Sitemap automatically updated with the new post URL

### Voice Training System Prompt
- [ ] System prompt includes 5-10 example blog posts written by Stephanie, used as style reference
- [ ] Examples cover different content types: inspiration posts, how-to guides, venue spotlights, planning tips, personal stories
- [ ] System prompt includes explicit voice guidelines:
  - Sentence structure preferences (mix of short and medium sentences, avoid long academic sentences)
  - Vocabulary patterns (use "couples" not "clients", "mountain" not "alpine", "laid-back" not "casual")
  - Tone markers (enthusiastic but not over-the-top, warm but professional)
  - Colorado-specific language and references that Stephanie naturally uses
- [ ] Voice training can be updated over time: as Stephanie writes more posts, new examples can be added to the system prompt

### SEO Auto-Generation
- [ ] For each draft, the pipeline auto-generates:
  - **Meta title:** Under 60 characters, includes target keyword, compelling for CTR
  - **Meta description:** 150-160 characters, includes keyword, includes a call-to-action or value proposition
  - **OG title and description:** Optimized for social sharing (can differ slightly from meta)
  - **Suggested slug:** URL-friendly version of the title (e.g., `colorado-fall-wedding-venues-guide`)
  - **Schema markup suggestions:** Article schema with author, publish date, modified date
- [ ] All SEO fields are editable by Stephanie before publication

### Admin Interface
- [ ] Content calendar view: list or calendar display of upcoming topics with status indicators
- [ ] "Generate Draft" button on each topic card
- [ ] Generation progress indicator (API call may take 15-30 seconds for a full draft)
- [ ] Draft preview with formatting (headings, bullets, links rendered)
- [ ] Diff view toggle for comparing AI draft vs. edited version
- [ ] Publish/Schedule controls with date picker
- [ ] Simple and focused: this is a content tool, not a full CMS replacement

### Content Quality Safeguards
- [ ] AI never auto-publishes — ALL content requires Stephanie's explicit approval
- [ ] Draft clearly marked as "AI-Generated Draft" in the CMS until approved
- [ ] AI includes "[Stephanie's note: ...]" placeholders where personal touches are needed, ensuring the final post has authentic human elements
- [ ] Draft includes a confidence note at the top (visible only in CMS, not published): "AI Confidence: High/Medium/Low — [reason]" to flag areas where the AI is less certain about accuracy
- [ ] Factual claims about Colorado venues, laws, or statistics include "[verify]" tags for Stephanie to fact-check

### Analytics
- [ ] PostHog events tracked:
  - `blog_pipeline_draft_requested` — Stephanie initiates a draft generation (with property: topic, keyword, content_type)
  - `blog_pipeline_draft_generated` — draft completed successfully (with property: word_count, generation_time_seconds)
  - `blog_pipeline_draft_approved` — Stephanie approves and publishes (with property: edit_percentage, time_in_review_hours)
  - `blog_pipeline_draft_rejected` — Stephanie rejects the draft (with property: rejection_reason if provided)
- [ ] Track AI-generated vs. human-written post performance:
  - Organic traffic per post (via PostHog or Google Search Console)
  - Average time on page
  - Bounce rate
  - Conversion events (CTA clicks, form submissions, consultation bookings)
  - SEO ranking for target keyword (tracked externally, logged manually or via API)
- [ ] Monthly report: AI drafts generated, approval rate, average edit percentage, content output velocity

---

## Technical Notes

- **Admin Routes:**
  - `src/app/admin/content/page.tsx` — content calendar view
  - `src/app/admin/content/[topicId]/page.tsx` — topic detail with draft generation, preview, and editing
- **API Routes:**
  - `src/app/api/admin/content/research/route.ts` — research step: gathers context for the topic
  - `src/app/api/admin/content/generate/route.ts` — draft generation: sends research brief + voice training to GPT-4o, returns full draft
  - `src/app/api/admin/content/publish/route.ts` — handles publication, ISR revalidation, sitemap update
- **Voice Training Prompt:** Stored in `src/lib/prompts/blog-voice.ts` — exports the system prompt with example posts and voice guidelines. This file should be updated as Stephanie's writing evolves.
- **Research Module:** `src/lib/blog-research.ts` — utility functions:
  - `getInternalLinks(topic)` — queries existing blog posts and pages for relevant internal link opportunities
  - `getSeasonalContext(publishDate)` — returns seasonal relevance data for Colorado weddings
  - `getKeywordContext(keyword)` — basic keyword analysis (search volume estimate, related keywords)
- **Content Calendar Data:** Stored in Supabase `content_calendar` table: `id`, `title`, `target_keyword`, `content_type`, `target_publish_date`, `status`, `notes`, `ai_draft` (text), `ai_draft_metadata` (JSONB), `published_post_id` (FK), `created_at`, `updated_at`
- **Diff Tracking:** Store the original AI draft separately from the edited version. Use a text diff library (e.g., `diff` npm package) to calculate edit percentage and generate visual diff view.
- **Token Budget:** A 2000-word blog post is approximately 2500-3000 tokens of output. With the system prompt, research brief, and voice examples, total token usage per draft is approximately 5000-8000 tokens. At GPT-4o pricing, this is approximately $0.10-0.20 per draft, or $0.80-1.60 for 8 drafts/month. Research step adds approximately $0.02-0.05 per draft.
- **ISR Revalidation:** On publish, call `revalidatePath('/blog')` and `revalidatePath('/blog/[slug]')` to update the statically generated blog pages.
- **Rate Limiting:** No public-facing rate limiting needed (admin-only feature). Implement a simple guard: max 3 draft generations per hour to prevent accidental overuse.
- **Fallback:** If GPT-4o is unavailable, display: "Draft generation is temporarily unavailable. You can still create posts manually in the CMS." No degraded AI output — either the draft meets quality standards or it doesn't generate.

---

## Dependencies

- **Epic 01 US-005:** CMS system (Sanity or similar) with blog post content type
- **Epic 06 US-003:** Blog system with blog listing page, individual post pages, categories, tags, and ISR
- **Epic 01 US-001:** Supabase project, OpenAI API key configured (GPT-4o for draft generation)
- **Epic 08:** Content calendar defined (PLAN.md Section 10) with 6 months of topic ideas
- **From Stephanie:** Brand voice guide with 5-10 example blog posts for voice training, vocabulary preferences, tone markers, and topics she does/does not want to cover
- **Resend:** For email notifications when drafts are ready for review (optional)
- **Authentication:** Admin pages require authentication — only Stephanie should access the content pipeline

---

## Expected Outcomes

- **Content velocity increase:** From 3 posts/month to 4-8 posts/month, doubling or tripling organic content output
- **Keyword coverage expansion:** More posts = more keywords targeted = broader organic search visibility for Colorado wedding queries
- **Stephanie's time savings:** Draft generation takes 15-30 seconds vs. 3-5 hours of writing from scratch. Stephanie spends 30-60 minutes editing and personalizing each draft instead of writing from zero.
- **Consistent quality:** Voice training ensures every post sounds like Stephanie, maintaining brand authenticity even at higher volume
- **Cost efficiency:** $10-20/month in API costs for 8 drafts — orders of magnitude cheaper than hiring a content writer ($200-500 per post)
- **SEO compound effect:** Each new post is a new indexed page targeting a new keyword. Over 6 months, 24-48 additional indexed pages with Colorado-specific long-tail keywords significantly expand organic traffic
- **Lead generation:** Every blog post includes strategic CTAs driving readers to the style quiz, consultation booking, and contact form

---

## Definition of Done

- [ ] Admin content calendar displays upcoming topics with status indicators
- [ ] "Generate Draft" initiates the full pipeline: research, draft generation, SEO metadata
- [ ] GPT-4o generates 1500-2500 word drafts in Stephanie's voice with correct structure (headings, bullets, image placements, CTAs, internal links)
- [ ] Voice training system prompt produces drafts that require less than 30% editing to match Stephanie's actual voice (measured by edit percentage tracking)
- [ ] SEO metadata (meta title, meta description, OG fields, slug) auto-generated for each draft
- [ ] Drafts appear in CMS as "AI Draft — Pending Review" and are never auto-published
- [ ] Stephanie can edit, approve, or reject drafts in the admin interface
- [ ] Diff view shows changes between AI draft and Stephanie's edited version
- [ ] On approval, post publishes with ISR revalidation and sitemap update
- [ ] "[Stephanie's note: ...]" placeholders and "[verify]" tags are included where appropriate
- [ ] All PostHog analytics events fire correctly (draft requested, generated, approved/rejected)
- [ ] AI-generated vs. human-written post performance can be compared via analytics
- [ ] Admin interface works on desktop (mobile support optional for admin tools)
- [ ] Stephanie has reviewed 3-5 sample drafts and confirmed voice quality meets her standards
- [ ] Monthly API costs for the blog pipeline stay within the $10-20 estimate
