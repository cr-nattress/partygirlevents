# US-004: Instagram Feed

**Epic:** [04 — Integrations](README.md)
**Priority:** P1 — Should Have
**Points:** 2
**Status:** Not Started

---

## Description

Integrate Stephanie's Instagram feed on the homepage to showcase recent work and provide visual social proof. Display 6-8 recent posts in a responsive grid with links to the full posts and the Instagram profile. The feed should update automatically and degrade gracefully if the Instagram API is unavailable.

---

## Acceptance Criteria

### Feed Display
- [ ] 6-8 most recent Instagram posts displayed on the homepage in a grid layout
- [ ] Grid is responsive: 4 columns on desktop, 3 on tablet, 2 on mobile
- [ ] Each post shows the image (square crop, consistent aspect ratio)
- [ ] Clicking a post opens the original Instagram post in a new tab
- [ ] "Follow us on Instagram" link below the grid links to the full profile
- [ ] Instagram icon/logo displayed per Instagram brand guidelines
- [ ] Section has a compelling heading (e.g., "Follow Along @partygirlevents")

### Image Handling
- [ ] Images served via next/image for optimization (AVIF/WebP, responsive srcset, lazy loading)
- [ ] Images have consistent dimensions (square grid, no layout shift)
- [ ] Hover effect on desktop: subtle overlay with Instagram icon or "View post" indicator
- [ ] Alt text on each image (Instagram caption or generic "Instagram post by Party Girl Events")

### Data Fetching & Caching
- [ ] Instagram posts fetched server-side via API — no client-side API calls
- [ ] Feed cached and refreshed on a schedule (every 6 hours or on ISR revalidation)
- [ ] Fetching utility in `src/lib/integrations/instagram.ts`
- [ ] Feed data includes: image URL, post URL, caption (for alt text), media type (image/video/carousel)
- [ ] Video posts show thumbnail image (not auto-playing video)
- [ ] Carousel posts show the first image

### Graceful Fallback
- [ ] If Instagram API is down or rate-limited: display cached posts from last successful fetch
- [ ] If no cached data is available: display a curated set of static portfolio images with Instagram CTA
- [ ] No error messages, broken images, or empty grid shown to visitors
- [ ] API errors logged server-side for monitoring

---

## Technical Notes

- **Option A: Instagram Basic Display API / Instagram Graph API**
  - Requires a Meta Developer account and an Instagram Business or Creator account
  - App review process may take 1-2 weeks — start early
  - Use long-lived access tokens (valid 60 days, must be refreshed)
  - Token refresh should be automated (cron job or on-demand before expiry)
  - Endpoint: `GET /me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp`

- **Option B: Third-party service (Fallback)**
  - Services like Behold.so, SnapWidget, or Elfsight provide Instagram feed widgets
  - Easier setup but less control; may require paid plan for custom styling
  - Use only if Instagram API approval is delayed or problematic

- **Option C: Static embed (Minimum Viable)**
  - Use Instagram's oEmbed API to render individual post embeds
  - Heavier on page load (each embed loads Instagram's iframe)
  - Use only as last resort

- Cache Instagram feed data in Supabase `instagram_posts` table or Vercel KV
- Data model: `post_id`, `media_url`, `permalink`, `caption`, `media_type`, `thumbnail_url`, `timestamp`, `fetched_at`
- Build a reusable `<InstagramFeed />` component in `src/components/integrations/instagram-feed.tsx`
- Environment variables: `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`

---

## Dependencies

- Epic 02 (Homepage must be built with a social proof / Instagram section)
- Meta Developer account with Instagram API access approved
- Stephanie's Instagram account linked as Business or Creator account

---

## Definition of Done

- [ ] 6-8 recent Instagram posts display on the homepage in a responsive grid
- [ ] Each post links to the original Instagram post
- [ ] "Follow" link goes to Stephanie's Instagram profile
- [ ] Images optimized via next/image (lazy loaded, responsive, modern formats)
- [ ] Feed auto-refreshes on schedule (every 6 hours)
- [ ] Graceful fallback renders when API is unavailable (cached or static images)
- [ ] No layout shift when the feed loads
- [ ] Component renders correctly on all target viewports
- [ ] No console errors related to the Instagram integration
