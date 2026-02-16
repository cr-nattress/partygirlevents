# US-003 — Personalized Content

**Epic:** 07 — AI Features
**Priority:** P1
**Points:** 5
**Tier:** 1
**Status:** Not Started

---

## Description

Personalize content ordering for returning visitors based on their inferred segment, using first-party cookies and rule-based logic. When a visitor takes the style quiz, browses specific content, or submits a form, their preferences are captured into a visitor segment. On subsequent visits, homepage hero imagery, featured weddings, blog posts, testimonials, and service cards are reordered to surface the most relevant content first. This is not AI-powered at serving time — it uses pre-tagged CMS content and deterministic reordering rules, making it fast and cost-free to serve. All content remains accessible; nothing is hidden. New or unrecognized visitors see the default ordering with no degradation.

---

## Acceptance Criteria

### Visitor Segmentation
- [ ] Visitors are assigned to one or more segments based on first-party data signals
- [ ] Segment types: Mountain/Outdoor, Elopement, Large Wedding, Budget-Conscious, Luxury, Destination
- [ ] Segment assignment sources ranked by confidence: quiz results (primary, highest confidence), browsing behavior (pages visited, time spent — secondary), and form submission data (tertiary)
- [ ] Segment data is stored in an encrypted first-party cookie (`visitor-segment`) — no server-side visitor tracking or profiling
- [ ] Cookie value is encrypted/signed to prevent tampering (using `iron-session` or similar signed cookie library)
- [ ] Cookie expires after 90 days and is refreshed on each visit
- [ ] Visitors can belong to a primary segment and up to 2 secondary segments
- [ ] No third-party cookies, fingerprinting, or cross-site tracking is used — this is privacy-friendly by design
- [ ] Cookie usage is documented in the privacy policy

### Segment Assignment Logic
- [ ] Quiz-based (highest confidence): when a visitor completes the style quiz (Epic 06 US-001), their answers map deterministically to one or more segments
- [ ] Behavior-based (lower confidence): for visitors who have not taken the quiz, infer segment from browsing patterns — requires viewing 2+ pages in a content category before assigning (prevents single-page-view misclassification)
- [ ] Form-based: if the inquiry form includes wedding type or venue preference, use that to assign or update the segment

### Content Reordering
- [ ] Homepage hero section: displays imagery matching the visitor's primary style segment (e.g., mountain landscape for Mountain/Outdoor, intimate setting for Elopement)
- [ ] Featured weddings section: portfolio items matching the visitor's style and venue preferences are surfaced first in the grid or carousel
- [ ] Blog feed: posts are prioritized by relevance to the visitor's planning stage and interest tags
- [ ] Testimonials: reviews from couples with a similar wedding type are shown first
- [ ] Service cards: ordered by relevance to the visitor's wedding type (e.g., "Day-of Coordination" first for Budget-Conscious, "Full Planning" first for Luxury)
- [ ] All content remains accessible — reordering changes the display order, it never removes or hides content
- [ ] Reordering is subtle and natural — the visitor should feel the site "gets" them, not that they are being tracked

### CMS Content Tagging
- [ ] Every piece of CMS content (portfolio items, blog posts, testimonials, service descriptions, hero images) is tagged with one or more relevant segments via a `segments` field (array of segment IDs)
- [ ] Content can be tagged with multiple segments (e.g., a mountain elopement portfolio item tagged as both Mountain/Outdoor and Elopement)
- [ ] Untagged content appears in its default position — it is never deprioritized or hidden

### Returning Visitor Recognition
- [ ] On return visits where a segment cookie exists, a subtle welcome message displays: "Welcome back! Still planning your [Mountain/Elopement/etc.] wedding?"
- [ ] The welcome message is dismissible and does not reappear once dismissed (dismissal state stored in cookie)
- [ ] If the segment feels wrong, the visitor can retake the quiz to update their segment (link provided in the welcome message)

### Fallback Behavior
- [ ] New visitors with no segment cookie see the default content ordering — no degradation in experience
- [ ] If the segment cookie is corrupted or unreadable, fall back to default ordering silently
- [ ] If content is not tagged for the visitor's segment, it appears in its default position
- [ ] Personalization does not cause visible layout shifts on page load (handled in middleware or server component before render)

### Analytics
- [ ] `segment_assigned` event fires when a visitor is first assigned a segment (PostHog), with the segment type as a property
- [ ] `personalized_content_served` event fires on each page load where personalized ordering is applied, with the segment and page as properties
- [ ] `segment_updated` event fires if a visitor's segment changes (e.g., retaking the quiz)
- [ ] Segment distribution is trackable in PostHog (how many visitors in each segment)

---

## Technical Notes

- **No AI API Calls at Serving Time:** The "AI" aspect is in the segment inference (quiz results processed by scoring logic) and content tagging strategy. No OpenAI calls are made when serving personalized pages — this keeps page load fast and costs zero.
- **Middleware:** `middleware.ts` reads the `visitor-segment` cookie on each request and passes the segment to server components via headers or cookies. This is a lightweight operation that adds < 1ms latency.
- **Server Components:** Page-level server components receive the segment and reorder content arrays before rendering.
- **Reordering Algorithm:**
  ```
  function reorderBySegment(items, segment):
    matched = items.filter(item => item.segments.includes(segment.primary))
    partial = items.filter(item => item.segments.some(s => segment.secondary.includes(s)) && !matched.includes(item))
    rest = items.filter(item => !matched.includes(item) && !partial.includes(item))
    return [...matched, ...partial, ...rest]
  ```
- **Cookie Structure:**
  ```json
  {
    "primary": "mountain-outdoor",
    "secondary": ["luxury"],
    "source": "quiz",
    "assignedAt": "2025-03-15T00:00:00Z",
    "dismissed_welcome": false
  }
  ```
- **Behavior Tracking:** A client-side utility (`lib/segment-tracker.ts`) tracks page views by content category and assigns a behavior-based segment after threshold is met. Writes segment to cookie.
- **Hero Image Sets:** Prepare 6 hero image sets (one per segment). Store references in a config or CMS collection. Middleware selects the appropriate set based on segment.
- **Client-Side Hook:** `useVisitorSegment()` hook available for client components that need segment awareness.
- **Cache Considerations:** Personalized pages cannot be fully cached at the CDN level. Use `Vary: Cookie` header or implement personalization at the edge (middleware) to maintain cache efficiency for the non-personalized page shell.
- **Testing:** Create a dev tool (cookie override) to test each segment's content experience without completing the quiz.
- **Feature Flag:** `PERSONALIZED_CONTENT_ENABLED` — allows disabling personalization globally. When disabled, all visitors see default ordering.

---

## Dependencies

- Epic 06 US-001 (style quiz) — the primary source of segment data; quiz must store results that can be mapped to segments
- Epic 01 (content infrastructure) — CMS must support adding segment tags to content types
- Epic 02 (core pages) — the pages that will receive personalized content ordering must be built
- CMS content tagging completed — all existing portfolio items, blog posts, testimonials, and service descriptions need segment tags added
- Hero image sets prepared — 6 sets of hero imagery, one per segment
- PostHog analytics initialized (Epic 01 infrastructure)

---

## Definition of Done

- [ ] Visitors are assigned segments based on quiz results, browsing behavior, or form data
- [ ] Segment is stored in an encrypted first-party cookie with 90-day expiry
- [ ] Homepage hero, featured weddings, blog feed, testimonials, and service cards are reordered based on the visitor's segment
- [ ] All content remains accessible — no content is hidden or removed by personalization
- [ ] Returning visitors see a subtle, dismissible welcome message referencing their wedding type
- [ ] New visitors and visitors without a segment see the default content ordering with no degradation
- [ ] Content tagging schema is implemented in the CMS and all existing content is tagged
- [ ] Analytics events fire correctly: `segment_assigned`, `personalized_content_served`, `segment_updated`
- [ ] Personalization does not cause visible layout shifts on page load
- [ ] Feature flag allows disabling personalization without a deployment
- [ ] Privacy audit passes: no third-party cookies, no cross-site tracking, no server-side visitor profiling, cookie usage documented in privacy policy
- [ ] Dev tool available for testing each segment experience
- [ ] Manual QA: test each segment type, verify content reordering, test fallback for unknown/new visitors, test cookie expiry and corruption handling
