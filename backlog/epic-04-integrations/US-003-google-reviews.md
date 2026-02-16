# US-003: Google Reviews

**Epic:** [04 — Integrations](README.md)
**Priority:** P1 — Should Have
**Points:** 2
**Status:** Not Started

---

## Description

Integrate Google Reviews to display Stephanie's business reviews as social proof across the site. Show the aggregate star rating, total review count, and 3-5 recent reviews on the homepage testimonial section, about page, and services pages. Reviews auto-refresh daily or on ISR revalidation so the site always shows current feedback without manual updates.

---

## Acceptance Criteria

### Review Display
- [ ] Google Reviews displayed on the homepage (testimonial/social proof section)
- [ ] Google Reviews displayed on the about page
- [ ] Google Reviews displayed on services pages
- [ ] Aggregate star rating shown (e.g., 4.9 out of 5 stars)
- [ ] Total review count shown (e.g., "Based on 47 reviews")
- [ ] 3-5 most recent reviews displayed with: reviewer name, star rating, review text, review date
- [ ] "View all reviews on Google" link opens Google Business Profile in new tab
- [ ] Google attribution displayed per Google's branding guidelines

### Review Component
- [ ] Reusable `<GoogleReviews />` component in `src/components/integrations/google-reviews.tsx`
- [ ] Component accepts props for display variant: `compact` (rating + count only), `featured` (rating + 3-5 reviews), `full` (all available reviews)
- [ ] Star rating rendered with accessible SVG stars (not images) with `aria-label` (e.g., "4.9 out of 5 stars")
- [ ] Long review text truncated with "Read more" expansion
- [ ] Component renders beautifully within the site's design system (warm minimalism aesthetic)

### Data Fetching & Caching
- [ ] Reviews fetched server-side (not client-side) to avoid exposing API keys
- [ ] Reviews cached and refreshed daily (or on ISR revalidation — whichever comes first)
- [ ] Fetching utility in `src/lib/integrations/reviews.ts`
- [ ] If Google API is unavailable: fall back to cached data or manually curated testimonials from Supabase
- [ ] No empty state shown to users — always display at least cached or fallback reviews

### Graceful Degradation
- [ ] If Google Places API is down or returns an error, the component renders fallback testimonials
- [ ] Fallback testimonials stored in Supabase or CMS (manually entered by Stephanie)
- [ ] No error messages or broken UI shown to visitors
- [ ] API errors logged server-side for monitoring

---

## Technical Notes

- **Option A: Google Places API (Preferred)**
  - Use the Google Places API (New) `places/{placeId}/reviews` endpoint
  - Requires a Google Cloud project with Places API enabled and an API key
  - API key should be restricted to server-side use only (not exposed to client)
  - Place ID can be found via Google Maps or the Place ID Finder tool
  - Rate limits: 1000 requests/day on free tier (more than sufficient with caching)

- **Option B: Third-party widget (Fallback)**
  - Services like Elfsight, EmbedSocial, or Trustmary provide Google Reviews widgets
  - Easier setup but less control over styling and data
  - Use only if Google Places API is not feasible

- Cache reviews in Supabase `google_reviews` table or in-memory cache (Vercel KV or unstable_cache)
- Review data model: `reviewer_name`, `rating`, `text`, `relative_time`, `profile_photo_url`, `fetched_at`
- Consider using `next/image` for reviewer profile photos with a fallback avatar
- Environment variables: `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`

---

## Dependencies

- Epic 02 (Homepage and services pages must be built with testimonial sections)
- Google Cloud project with Places API enabled
- Stephanie's Google Business Profile with reviews (requires the Place ID)

---

## Definition of Done

- [ ] Google Reviews display on homepage, about page, and services pages
- [ ] Aggregate star rating and review count are accurate and match Google Business Profile
- [ ] 3-5 recent reviews displayed with reviewer name, rating, text, and date
- [ ] Reviews refresh automatically (daily cache invalidation)
- [ ] Fallback to cached or manual testimonials if Google API is unavailable
- [ ] Component renders correctly on all viewports (mobile through desktop)
- [ ] Star rating is accessible (screen reader announces rating)
- [ ] Google attribution branding requirements met
