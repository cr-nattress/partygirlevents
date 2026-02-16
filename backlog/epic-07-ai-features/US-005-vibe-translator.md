# US-005 — Wedding Vibe Translator

**Epic:** 07 — AI Features
**Priority:** P1
**Points:** 8
**Tier:** 2
**Status:** Not Started

---

## Description

The most novel feature on the entire site — no wedding planner website anywhere offers anything like this. Available at `/tools/vibe-translator/`, the Vibe Translator lets visitors describe their dream wedding in natural language, upload inspiration images (Pinterest screenshots, magazine clippings, mood photos), or combine both — and receive a personalized "Vibe Board" with a creative style name, extracted color palette, venue recommendations from Stephanie's database, floral suggestions, a budget range estimate, matched portfolio case studies, and a personalized note written in Stephanie's voice. Results are shareable on social media with a dynamically generated OG image, and saving the vibe board requires an email — creating a high-engagement lead capture moment.

---

## Acceptance Criteria

### Input Options
- [ ] Vibe translator accessible at `/tools/vibe-translator/`
- [ ] **Text input:** A generous free-text area with a prompt: "Describe your dream wedding in a few sentences" and 3-4 example prompts below for inspiration (e.g., "We want a cozy winter wedding in the mountains with candles everywhere and a small guest list", "Think garden party meets rustic barn with wildflowers and a live bluegrass band")
- [ ] **Image upload:** Drag-and-drop zone or file select button accepting JPEG, PNG, and WebP formats, max 10MB per image
- [ ] **Combined:** Both text and image can be provided together for the richest results
- [ ] At least one input (text or image) is required to proceed
- [ ] Client-side image preview displays after upload before submission
- [ ] Image upload shows a progress indicator during upload to Supabase Storage
- [ ] Input validation: text must be at least 20 characters if provided; image must be a valid supported format and under 10MB

### AI Processing
- [ ] **Text analysis:** GPT-4o analyzes the free-text input and extracts: style keywords, color preferences, mood/atmosphere, formality level, venue type hints, season preferences, guest count hints, and any specific elements mentioned
- [ ] **Image analysis:** GPT-4o Vision analyzes uploaded images and identifies: dominant and accent colors (as hex codes), textures and materials, decor style, venue type, floral types and arrangements, lighting mood, and overall aesthetic
- [ ] **Combined analysis:** When both text and image are provided, GPT-4o synthesizes both inputs into a unified style profile, noting where they align and complement each other
- [ ] AI processing time is communicated to the user with an engaging multi-phase loading state: "Analyzing your vibe...", "Extracting your color palette...", "Matching venues..."
- [ ] Processing completes within 15 seconds for text-only, 20 seconds for image or combined inputs

### Output — The Vibe Board
- [ ] **Generated style name:** A creative, evocative name for the couple's wedding vibe (e.g., "Intimate Mountain Supper Club", "Wild Alpine Romance", "Candlelit Timber Lodge", "Boho Meadow Celebration")
- [ ] **Color palette:** 5-6 hex code color swatches visually displayed, extracted from the AI analysis of the input text/image
- [ ] **Venue recommendations:** 2-3 Colorado venues from Stephanie's database that match the extracted vibe, with venue name, photo, and a one-line description of why it matches
- [ ] **Floral suggestions:** 3-5 flower types and arrangement styles matching the vibe (e.g., "Loose, garden-style arrangements with peonies, ranunculus, and trailing greenery")
- [ ] **Budget range estimate:** An estimated budget range for this style of wedding in Colorado, based on the inferred formality, guest count, and venue type
- [ ] **"Stephanie's Take":** A personalized, AI-generated note written in Stephanie's warm brand voice reacting to the couple's vision and offering one or two insider tips (e.g., "I love this vision! The candlelit supper club feel works beautifully at Devil's Thumb Ranch — the timber lodge practically glows. Pro tip: for this intimate vibe, long farm tables always beat rounds.")
- [ ] **Matched portfolio case studies:** 2-3 real weddings from Stephanie's portfolio that most closely match the translated vibe, with thumbnail, couple name, and venue

### Social Sharing
- [ ] Shareable results URL (e.g., `/tools/vibe-translator/results/{id}`)
- [ ] Dynamic OG image auto-generated using Vercel OG (`@vercel/og`) with: the vibe name, color palette swatches, and Party Girl Events branding
- [ ] Share buttons: copy link, share to Pinterest, share to Instagram Stories (deep link if possible), and email to partner/friend
- [ ] OG meta tags are correctly set for the shared URL so social media previews render beautifully

### Lead Capture
- [ ] The vibe board is viewable without an email — the full experience is not gated
- [ ] "Save your Vibe Board" action requires an email address: "We'll email you a beautiful copy of your vibe board so you never lose it"
- [ ] Saved results are emailed as a beautifully formatted HTML email (React Email template via Resend) with the full vibe board content
- [ ] Email is stored in Supabase `leads` table with source tagged as `vibe_translator`
- [ ] Vibe translator inputs and results are stored alongside the lead for Stephanie's context

### Image Upload and Storage
- [ ] Images are uploaded to Supabase Storage in a dedicated `vibe-uploads` bucket
- [ ] Images are resized/compressed if needed before being sent to GPT-4o Vision (max 2048px on longest side to optimize token usage)
- [ ] Uploaded images are retained for 30 days then auto-deleted (Supabase Storage lifecycle policy)
- [ ] Image URLs are not publicly accessible — they are only used for AI processing

### Rate Limiting
- [ ] Rate limiting via Upstash Redis: 5 vibe translations per IP address per day
- [ ] When the limit is reached, display a friendly message: "You've been busy dreaming! You've used all your vibe translations for today. Come back tomorrow, or book a free consultation with Stephanie to explore your vision in person."
- [ ] Rate limit counter resets daily at midnight UTC

### Fallback and Error Handling
- [ ] If OpenAI API is unavailable, display: "Our vibe translator is taking a moment. Try again in a few minutes, or describe your vision directly to Stephanie — she's even better at this in person!"
- [ ] If image upload fails, allow the user to retry or proceed with text-only input
- [ ] If image analysis fails but text analysis succeeds, generate the vibe board from text only with a note that the image couldn't be processed
- [ ] If portfolio matching finds no close matches, omit the matched case studies section gracefully rather than showing poor matches

### Analytics
- [ ] `vibe_translator_start` event fires when the user begins interacting with the input form (PostHog)
- [ ] `vibe_translator_complete` event fires when results are generated, with properties: input_type (text/image/combined), processing_time_ms
- [ ] `vibe_translator_share` event fires when the user shares results, with property: share_method (link/pinterest/instagram/email)
- [ ] `vibe_translator_email_capture` event fires when the user provides their email to save the vibe board
- [ ] `vibe_translator_consultation_click` event fires when the user clicks through to book a consultation from the results page

---

## Technical Notes

- **Page Routes:** `app/tools/vibe-translator/page.tsx` (input form page) and `app/tools/vibe-translator/results/[id]/page.tsx` (shareable results page).
- **API Route:** `app/api/vibe-translator/route.ts` — POST endpoint that accepts text and/or image (multipart form data or pre-uploaded image URL), processes through GPT-4o/Vision, and returns the structured vibe board.
- **AI Processing Pipeline:**
  1. Receive input (text, image URL, or both)
  2. If image: retrieve from Supabase Storage, resize to max 2048px, encode as base64 or provide URL to GPT-4o Vision
  3. Construct prompt requesting structured JSON output with all vibe board fields
  4. Validate AI response with Zod schema
  5. Use structured output to match venues from Supabase `venues` table (keyword/tag matching)
  6. Match portfolio items from Supabase `portfolio` table (keyword/tag matching)
  7. Calculate budget range using logic reused from US-004
  8. Store complete results in Supabase `vibe_results` table
  9. Return structured results to the client
- **Supabase Tables:**
  - `vibe_results`: id, input_text, input_image_url (nullable), result_json (jsonb), lead_id (nullable FK), created_at, expires_at
  - Leverage existing `venues` and `portfolio` tables for matching
- **Image Handling:**
  - Client-side: validate format and size, generate preview, upload to Supabase Storage via signed URL
  - Server-side: retrieve image for GPT-4o Vision processing, resize to max 2048px on longest side
  - Storage bucket: `vibe-uploads` with 30-day lifecycle policy
- **OG Image Generation:** `app/api/og/vibe/route.tsx` using `@vercel/og`. Accept vibe name and color palette as params, render a branded image with the color swatches and vibe name.
- **Color Palette Display:** Custom `ColorPalette` component that renders hex swatches with copy-on-click functionality.
- **Venue and Portfolio Matching:** Use tag-based matching. Each venue and portfolio item should have style tags in the CMS. Match the AI-extracted style keywords against these tags and return the top matches by relevance score.
- **Loading State UX:** Multi-phase loading animation. Phase 1 (0-3s): "Reading your vision..." Phase 2 (3-7s): "Extracting your color palette..." Phase 3 (7-12s): "Matching Colorado venues..." Phase 4 (12-15s): "Putting it all together..."
- **Email Template:** React Email template for the saved vibe board — renders the full results in beautiful branded HTML with a CTA to book a consultation.
- **Cost Estimate:** ~100 sessions/month x ~2000 tokens/response (including vision) = ~200K tokens/month on GPT-4o. Approximately $10-20/month.
- **Feature Flag:** `VIBE_TRANSLATOR_ENABLED` for staged rollout.

---

## Dependencies

- OpenAI GPT-4o API key with Vision capabilities enabled
- Supabase Storage configured with a `vibe-uploads` bucket and 30-day lifecycle policy
- Stephanie's venue data in Supabase — venues with style tags, photos, and descriptions
- Stephanie's portfolio data in Supabase — real weddings with style tags, thumbnails, and couple info
- Budget calculation logic from US-004 (reused for budget range estimation within the vibe board)
- Vercel OG package installed (for dynamic social sharing images)
- Upstash Redis instance (for rate limiting)
- React Email template setup (from Epic 04)
- PostHog analytics initialized
- Epic 01 infrastructure (Supabase, environment variables, design system)
- Brand voice guide from Stephanie (for "Stephanie's Take" AI-generated notes)

---

## Definition of Done

- [ ] Text input, image upload, and combined input all work correctly and produce a vibe board
- [ ] GPT-4o analyzes text input and extracts style, colors, mood, venue type, and season
- [ ] GPT-4o Vision analyzes uploaded images and identifies colors, textures, style, and floral types
- [ ] Vibe board displays all sections: creative style name, color palette (5-6 hex swatches), venue recommendations, floral suggestions, budget range, "Stephanie's Take" note, and matched portfolio case studies
- [ ] Shareable results URL works with a dynamically generated OG image for social media previews
- [ ] "Save your Vibe Board" email capture stores lead in Supabase and sends a beautiful HTML email
- [ ] Image upload handles validation (format, size), preview, progress indicator, and Supabase Storage
- [ ] Rate limiting enforced: 5 translations per IP per day via Upstash Redis
- [ ] Fallback states work correctly: API unavailable, image upload failure, no portfolio matches
- [ ] All analytics events fire correctly (start, complete, share, email capture, consultation click)
- [ ] Loading state provides engaging multi-phase progress messaging during AI processing
- [ ] Page is fully responsive on mobile with touch-friendly image upload
- [ ] Feature flag allows enabling/disabling the tool without a deployment
- [ ] Manual QA: test with diverse text inputs (detailed, vague, specific styles), various image types (Pinterest screenshots, photos, magazine scans), and combined inputs
- [ ] Stephanie has reviewed sample vibe results and approved the output quality
