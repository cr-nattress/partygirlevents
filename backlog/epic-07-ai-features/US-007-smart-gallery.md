# US-007 — Smart Gallery (Natural Language Search)

**Epic:** [07 — AI Features](README.md)
**Priority:** P2 — Nice to Have
**Points:** 5
**Tier:** 2 — Standalone AI Tools
**Status:** Not Started

---

## Description

Add natural language search capability to the portfolio gallery at `/portfolio/`, allowing couples to describe their dream wedding in their own words and see semantically matched results. Instead of relying solely on predefined filter chips, a couple can type "outdoor ceremony with wildflowers in fall" or "intimate dinner party at a lodge" and see the most relevant portfolio images ranked by semantic similarity. The feature uses a one-time batch processing pipeline where GPT-4o Vision analyzes every portfolio image to generate rich descriptive tags, which are then embedded using `text-embedding-3-small` and stored in Supabase pgvector. On search, the user's query is embedded and compared against the image embeddings via cosine similarity, returning ranked results in under 500ms. The existing filter chip system remains fully functional and can be combined with natural language queries for precise, multi-modal search.

---

## Acceptance Criteria

### One-Time Batch Processing Pipeline
- [ ] Script or Edge Function processes all existing portfolio images through the tagging and embedding pipeline
- [ ] For each image, GPT-4o Vision analyzes the photo and generates structured tags:
  - **Setting:** indoor / outdoor / mixed
  - **Venue type:** mountain lodge, barn, garden, church, hotel ballroom, private estate, tent, rooftop, etc.
  - **Season:** spring / summer / fall / winter / ambiguous
  - **Time of day:** morning, afternoon, golden hour, evening, night
  - **Colors:** dominant color palette (e.g., "blush, sage green, gold")
  - **Floral type:** wildflowers, roses, peonies, greenery-heavy, minimal, etc.
  - **Style:** rustic, elegant, bohemian, modern, vintage, rustic luxe, classic, whimsical
  - **Mood:** romantic, joyful, intimate, grand, relaxed, dramatic, playful
  - **Guest count estimate:** elopement (2-10), intimate (10-50), medium (50-150), large (150+)
  - **Key elements:** specific notable elements (e.g., "mountain backdrop", "string lights", "long farm table", "snow-covered peaks", "aspen trees")
  - **Description:** 2-3 sentence natural language description of the scene
- [ ] Tags + description concatenated into a single text representation and embedded using `text-embedding-3-small`
- [ ] Embedding stored in Supabase `portfolio_embeddings` table: `id`, `image_id` (FK to portfolio images), `tags` (JSONB), `description` (text), `embedding` (vector), `created_at`
- [ ] Pipeline is idempotent: re-running it updates existing records rather than creating duplicates
- [ ] Pipeline handles new images: when new portfolio images are added via CMS, they are automatically processed (via webhook or manual trigger)

### Natural Language Search
- [ ] Search bar displayed at the top of the `/portfolio/` page with placeholder text: "Describe your dream wedding..."
- [ ] On user input, query is debounced (300ms) before triggering search
- [ ] User query is embedded using `text-embedding-3-small` via API route
- [ ] Embedded query is compared against `portfolio_embeddings` using cosine similarity (`<=>` operator in pgvector)
- [ ] Top N results returned (default N=20), ranked by similarity score
- [ ] Results displayed in the existing gallery grid layout, replacing or reordering the default display
- [ ] Search completes in < 500ms from query submission to results rendering (excluding network latency)

### Search Results UI
- [ ] Each result shows:
  - Image thumbnail (existing portfolio image component)
  - Relevance indicator: visual bar, percentage, or dot indicator showing match strength (not a raw number)
  - Matched tags highlighted beneath the image (e.g., if user searched "fall outdoor ceremony", the tags "outdoor", "fall", "ceremony" are highlighted)
- [ ] Results animate in smoothly (fade or slide transition)
- [ ] If search returns fewer than 3 results, display a "Related searches" section with suggested filter chip combinations
- [ ] If search returns 0 results, display: "No exact matches found. Try one of these:" followed by popular filter chip suggestions
- [ ] Clear search button resets to the default gallery view

### Combined Search (NL + Filter Chips)
- [ ] The existing filter chip system (from Epic 02/08) continues to work independently
- [ ] NL search and filter chips can be used together:
  - User types "rustic" in search bar + selects "Vail" filter chip = results matching both "rustic" semantic meaning AND the "Vail" location tag
- [ ] Combined search logic: apply filter chip constraints first (exact match on tags), then rank remaining results by NL embedding similarity
- [ ] Clearing the search bar returns to filter-chip-only mode
- [ ] Clearing all filter chips returns to NL-search-only mode
- [ ] Clearing both resets to default gallery view

### Performance
- [ ] Image embeddings are pre-computed and stored (no real-time image analysis)
- [ ] Query embedding is generated on each search (lightweight, ~50ms)
- [ ] Supabase pgvector query uses an IVFFlat or HNSW index for fast approximate nearest neighbor search
- [ ] Total search response time: < 500ms for query embedding + vector search + result return
- [ ] Gallery images are lazy-loaded with blur-up placeholders (existing optimization from Epic 02)

### Analytics
- [ ] PostHog events tracked:
  - `gallery_search` — user performs an NL search (with property: query_text, result_count)
  - `gallery_search_click` — user clicks on a search result (with property: image_id, result_rank, query_text)
  - `gallery_search_no_results` — search returned 0 results (with property: query_text)
  - `gallery_filter_combined` — user uses NL search + filter chips together
- [ ] Track most popular search queries to inform future portfolio additions and content strategy

---

## Technical Notes

- **Batch Processing Script:** `scripts/embed-portfolio.ts` — CLI script that:
  1. Fetches all portfolio images from CMS/Supabase
  2. Sends each image to GPT-4o Vision with a structured tagging prompt
  3. Concatenates tags + description into a single text
  4. Generates embedding using `text-embedding-3-small`
  5. Upserts into `portfolio_embeddings` table
  - Run manually or as a scheduled job. Estimated one-time cost: ~$0.50-2.00 for 100-200 images.
- **Database Schema:**
  ```sql
  CREATE TABLE portfolio_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID REFERENCES portfolio_images(id) ON DELETE CASCADE,
    tags JSONB NOT NULL,
    description TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  CREATE INDEX ON portfolio_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  ```
- **API Route:** `src/app/api/gallery/search/route.ts` — accepts query string, generates embedding, queries pgvector, returns ranked results with tags and scores.
- **Client Component:** `src/components/portfolio/gallery-search.tsx` — search input with debouncing, result display logic, combined search state management.
- **Embedding Dimension:** `text-embedding-3-small` produces 1536-dimensional vectors. Ensure the pgvector column is configured for this dimension.
- **Similarity Threshold:** Set a minimum similarity threshold (e.g., 0.3) to filter out irrelevant results. Results below the threshold are not displayed.
- **Tag Prompt for GPT-4o Vision:** Provide a structured JSON schema in the prompt so the model returns consistent tags across all images. Validate with Zod.
- **CMS Webhook:** When a new portfolio image is published in the CMS, trigger the embedding pipeline for that single image. Can be implemented as a Supabase Edge Function triggered by a database webhook on the `portfolio_images` table.
- **Fallback:** If the embedding API is unavailable during a search, fall back to basic text search against the `tags` JSONB field using PostgreSQL `@>` containment queries or full-text search.

---

## Dependencies

- **Epic 02 US-003 / Epic 08:** Portfolio images must be uploaded and accessible — the batch processing pipeline needs the image URLs and existing metadata
- **Epic 01 US-001:** Supabase with pgvector extension enabled, OpenAI API key configured
- **Epic 01 US-003:** UI components (Input, Badge, Gallery Grid)
- **Existing filter chip system:** The current portfolio filter UI must be in place for combined search to work

---

## Expected Outcomes

- **Improved portfolio engagement:** Couples find relevant inspiration faster, increasing time on site and pages per session
- **Reduced bounce rate:** Visitors who don't find what they want via filter chips can describe their vision in natural language
- **Differentiation:** No other Colorado wedding planner offers AI-powered portfolio search — this is a standout feature
- **Content intelligence:** Popular search queries reveal what couples are looking for, informing Stephanie's portfolio expansion and content strategy
- **SEO indirect benefit:** Increased engagement signals (time on page, interaction depth) improve page quality metrics

---

## Definition of Done

- [ ] Batch processing pipeline runs successfully on all existing portfolio images
- [ ] Each image has structured tags (setting, venue type, season, colors, style, mood, guest count, key elements) and an embedding stored in Supabase
- [ ] NL search bar is displayed at the top of the portfolio page with appropriate placeholder text
- [ ] Typing a natural language query returns semantically relevant results ranked by similarity
- [ ] Results display with relevance indicators and highlighted matched tags
- [ ] Combined search (NL query + filter chips) works correctly, applying both constraints
- [ ] Search responds in < 500ms (query embedding + vector search + result return)
- [ ] No-results state shows helpful fallback suggestions (related filter chips)
- [ ] New images added via CMS are automatically processed through the embedding pipeline
- [ ] Fallback search works when embedding API is unavailable
- [ ] All PostHog analytics events fire correctly
- [ ] Gallery search works on mobile, tablet, and desktop
- [ ] Stephanie has reviewed sample search results and confirmed relevance quality
