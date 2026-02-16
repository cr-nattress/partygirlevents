# US-001 — AI Concierge Chat

**Epic:** 07 — AI Features
**Priority:** P0
**Points:** 8
**Tier:** 1
**Status:** Not Started

---

## Description

The flagship AI feature for the Party Girl Events website. A floating chat bubble appears on every page and expands into a branded chat panel powered by OpenAI GPT-4o via the Vercel AI SDK (`useChat` hook) with streaming responses. The concierge uses a RAG (Retrieval-Augmented Generation) architecture — Stephanie's FAQ, services, pricing, portfolio metadata, blog posts, and venue data are chunked, embedded with OpenAI text-embedding-3-small, and stored in Supabase pgvector for semantic similarity search — to answer visitor questions in Stephanie's warm, Colorado-native brand voice. After 2-3 exchanges the assistant naturally captures lead contact information and offers Calendly consultation booking inline. Complex or high-value queries escalate to Stephanie directly via priority email notification.

---

## Acceptance Criteria

### Chat UI
- [ ] Floating chat bubble positioned in the bottom-right corner on every page, styled to the design system
- [ ] Bubble uses a branded icon consistent with the Party Girl Events visual identity
- [ ] Clicking the bubble expands a chat panel (400px wide on desktop, full-screen on mobile)
- [ ] Chat panel includes a header with branding, a minimize button, and a close button
- [ ] Message bubbles display with clear visual distinction between visitor messages and assistant messages
- [ ] A typing indicator (animated dots) displays while the assistant is generating a response
- [ ] Quick-reply suggestion chips render below the input field with contextual prompts (e.g., "What services do you offer?", "How much does a planner cost?", "Tell me about mountain venues")
- [ ] A "Talk to Stephanie" button is always visible in the chat panel for manual human escalation at any point
- [ ] Chat panel is accessible: keyboard navigable, screen reader compatible, ARIA labels on all interactive controls
- [ ] Chat history persists within the same browser session
- [ ] On mobile viewports (< 768px), the chat panel renders as a full-screen overlay with a prominent close button; the floating bubble does not obscure important page CTAs

### Streaming Responses
- [ ] Chat uses the Vercel AI SDK `useChat` hook for real-time streaming responses
- [ ] API route at `POST /api/chat/` returns a streaming response via `streamText()`
- [ ] Responses stream token-by-token into the message bubble as they are generated
- [ ] User can send a new message while a response is still streaming (queued, not lost)

### RAG Architecture
- [ ] Knowledge base content is chunked (500 token chunks with 100 token overlap) and embedded using OpenAI `text-embedding-3-small`
- [ ] Embeddings are stored in Supabase pgvector for semantic similarity search
- [ ] Knowledge base sources include: Stephanie's FAQ, services descriptions, pricing information, portfolio metadata, blog post content, and Colorado venue data
- [ ] On each user message: the query is embedded, top-k relevant chunks are retrieved via cosine similarity (`SELECT content, metadata FROM knowledge_chunks ORDER BY embedding <=> $1 LIMIT 5`), and injected into the system prompt as context
- [ ] Retrieved context is clearly delimited in the system prompt so the model distinguishes grounded knowledge from general knowledge
- [ ] A documented update process exists for re-embedding content when Stephanie adds or changes CMS content
- [ ] A runnable ingestion script (`pnpm run ingest`) handles chunking, embedding, and upserting into Supabase

### Brand Voice and System Prompt
- [ ] System prompt includes a detailed brand voice guide: warm, enthusiastic, Colorado-specific, uses Stephanie's characteristic phrases
- [ ] The assistant introduces itself as "Stephanie's AI assistant" in the greeting — it never pretends to be Stephanie or a human
- [ ] Responses reference Colorado-specific details (mountain venues, altitude considerations, seasonal weather, local vendors) when relevant
- [ ] The assistant does not fabricate information — if a question is outside the knowledge base, it says so honestly and offers to connect the visitor with Stephanie
- [ ] If asked "Are you a real person?", it responds honestly about being an AI assistant trained on Stephanie's knowledge

### Conversation Flow and Lead Capture
- [ ] Greeting message introduces the assistant and offers 2-3 suggested topics to get started
- [ ] After 2-3 meaningful exchanges, the assistant naturally transitions to capturing contact info (name, email, optional phone) without being pushy
- [ ] Captured lead data is stored in the Supabase `leads` table with source tagged as `ai_chat`
- [ ] When a visitor expresses interest in booking a consultation, the assistant offers available Calendly slots inline
- [ ] Complex queries (custom pricing, emotional topics, high-budget indicators) trigger a human escalation flow
- [ ] Human escalation sends a priority email notification to Stephanie with the chat transcript and visitor info
- [ ] The escalation message to the visitor is warm: "This is a great question — let me connect you with Stephanie directly so she can give you the best answer"

### Rate Limiting
- [ ] Rate limiting is implemented via Upstash Redis
- [ ] Limit: 20 messages per browser session
- [ ] Limit: 50 messages per IP address per day
- [ ] When a limit is reached, the assistant displays a friendly message with contact info and Calendly link as alternatives
- [ ] Rate limit counters reset appropriately (session on new session, IP daily at midnight UTC)

### Fallback and Error Handling
- [ ] If the OpenAI API is unavailable or returns an error, the chat displays: "I'm having trouble connecting right now. You can reach Stephanie directly at [email] or [phone]."
- [ ] If Supabase pgvector is unavailable, the assistant falls back to responding without RAG context (general knowledge only) with a reduced confidence disclaimer
- [ ] Network errors during streaming display a retry option to the visitor
- [ ] Malformed or empty user messages are handled gracefully (not sent to the API)

### Analytics
- [ ] `chat_start` event fires when the chat panel is first opened in a session (PostHog)
- [ ] `chat_message_sent` event fires on each visitor message with metadata (message count in session, page URL)
- [ ] `chat_lead_capture` event fires when contact info is successfully captured
- [ ] `chat_human_escalation` event fires when a conversation is escalated to Stephanie
- [ ] `chat_calendly_click` event fires when a Calendly link is clicked from within chat

---

## Technical Notes

- **Vercel AI SDK:** Use the `useChat` hook from `ai/react` for the client-side chat interface. This handles streaming, message state, and abort control out of the box.
- **API Route:** `app/api/chat/route.ts` — POST handler that accepts messages array, performs RAG retrieval, constructs system prompt with context, and returns a streaming response via `streamText()`.
- **RAG Pipeline:**
  1. Receive user message
  2. Embed user message using `text-embedding-3-small`
  3. Query Supabase pgvector: `SELECT content, metadata FROM knowledge_chunks ORDER BY embedding <=> $1 LIMIT 5`
  4. Construct system prompt: `[brand voice guide] + [retrieved context chunks] + [conversation rules]`
  5. Call GPT-4o with the full message history + enriched system prompt
  6. Stream response back to client
- **Knowledge Base Ingestion:** A separate script (`scripts/ingest-knowledge.ts`) handles chunking content (500 token chunks with 100 token overlap), embedding, and upserting into Supabase. Runnable as `pnpm run ingest`.
- **Supabase Tables:**
  - `knowledge_chunks`: id, content, metadata (source, type, url), embedding (vector(1536)), created_at
  - `leads`: id, name, email, phone, source, chat_transcript, created_at
  - `chat_sessions`: id, visitor_id, messages (jsonb), lead_id (nullable FK), escalated (boolean), created_at
- **Upstash Redis Keys:**
  - `chat:session:{sessionId}:count` — TTL matches session duration
  - `chat:ip:{ipAddress}:count` — TTL 24 hours
- **Chat Components:** `components/chat/ChatBubble.tsx` (floating button with animation, renders ChatPanel on expand) and `components/chat/ChatPanel.tsx` (full chat interface with message list, input, suggestion chips, escalation button)
- **Code Splitting:** Chat bubble component should be code-split with `next/dynamic` (loaded after main content). Chat panel should lazy-load on first open.
- **Token Management:** Set `max_tokens` on the API call to control response length and cost. Target 200-400 tokens per response.
- **Feature Flag:** Wrap the chat bubble in a feature flag (`AI_CHAT_ENABLED`) for staged rollout.
- **Estimated Token Usage:** ~500 conversations/month x ~4 exchanges x ~1000 tokens/exchange = ~2M tokens/month. At GPT-4o pricing, budget approximately $30-50/month.

---

## Dependencies

- Supabase pgvector extension enabled and `knowledge_chunks` table created (Epic 01 infrastructure)
- OpenAI API key provisioned and stored in environment variables (Epic 01 infrastructure)
- Upstash Redis instance provisioned for rate limiting (Epic 01 infrastructure)
- Vercel AI SDK installed (`ai` and `@ai-sdk/openai` packages)
- Brand voice guide provided by Stephanie — expanded version with phrases, tone examples, and Colorado-specific language
- RAG knowledge base populated with initial content: FAQ, services, pricing, portfolio metadata, venue data
- Calendly account and embed/link URL from Stephanie
- Epic 02 core pages deployed (chat overlays on existing pages)
- PostHog analytics initialized (Epic 01 infrastructure)

---

## Definition of Done

- [ ] Chat bubble renders on every page of the site and expands to the full chat panel
- [ ] Streaming responses display in real-time via the Vercel AI SDK
- [ ] RAG retrieval returns relevant context from the knowledge base for each query
- [ ] Brand voice is consistent — responses sound like Stephanie's assistant, not a generic chatbot
- [ ] Lead capture flow works end-to-end: contact info collected and stored in Supabase `leads` table
- [ ] Human escalation sends a priority email to Stephanie with transcript
- [ ] Calendly integration offers booking slots inline when visitor expresses interest
- [ ] Rate limiting enforced via Upstash Redis (20/session, 50/IP/day)
- [ ] Fallback message displays when OpenAI API is unavailable
- [ ] All five analytics events fire correctly and appear in PostHog
- [ ] Chat panel is fully responsive (400px panel on desktop, full-screen on mobile)
- [ ] Accessibility audit passes (keyboard navigation, screen reader, ARIA labels)
- [ ] Feature flag allows enabling/disabling the chat without a deployment
- [ ] Knowledge base ingestion script runs successfully and populates pgvector
- [ ] Manual QA: 20+ test conversations covering services, pricing, venues, edge cases, and escalation scenarios
