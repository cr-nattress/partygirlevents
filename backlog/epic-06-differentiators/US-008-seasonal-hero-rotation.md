# US-008 — Seasonal Hero Rotation

**Epic:** [06 — Differentiators](README.md)
**Priority:** P2 — Nice to Have
**Points:** 2
**Status:** Not Started

---

## Description

Implement automatic seasonal rotation of the homepage hero image so that the first thing visitors see always reflects the current Colorado mountain season. The hero swaps between four seasonal image sets — spring wildflower meadows, summer blue-sky peaks, fall golden aspens, and winter snow-covered lodges — based on the current date. This creates an immediately immersive, contextually relevant first impression that reinforces Stephanie's deep knowledge of Colorado mountain weddings year-round. A CMS override allows Stephanie to force a specific season for marketing campaigns or off-season testing, ensuring full creative control over the site's most prominent visual element.

---

## Acceptance Criteria

### Seasonal Logic
- [ ] Homepage hero image automatically swaps based on the current calendar month:
  - **Spring (March - May):** Wildflower meadow, green mountain landscape, fresh alpine scenery
  - **Summer (June - August):** Blue sky mountain peaks, outdoor ceremony setup, bright sunshine
  - **Fall (September - November):** Golden aspen trees, warm autumn colors, harvest-toned decor
  - **Winter (December - February):** Snow-covered peaks, cozy lodge interior, candlelit warmth
- [ ] Season determined by a utility function using `new Date().getMonth()` — no external API calls required
- [ ] Season logic runs at build time for static generation AND at server render time for real-time accuracy
- [ ] Correct season displays immediately on page load with no flash of wrong season

### CMS Override
- [ ] CMS field on the homepage content model: `heroSeasonOverride` with options: "auto" (default), "spring", "summer", "fall", "winter"
- [ ] When override is set to a specific season, that season's hero displays regardless of the current date
- [ ] Override applies to the homepage hero only (does not affect other seasonal elements if added later)
- [ ] Override can be toggled back to "auto" at any time by Stephanie or her team

### Image Sets
- [ ] Four complete seasonal image sets, each containing:
  - Desktop hero image (landscape, minimum 1920x1080, optimized)
  - Mobile hero image (portrait crop, minimum 750x1200, optimized)
  - Optional color overlay tint value (hex with opacity) for text readability adjustment per season
  - Descriptive alt text specific to each season (e.g., "Snow-covered Colorado mountain peaks at sunset with a cozy lodge in the foreground")
- [ ] Images stored in CMS media library or `public/hero/` directory with naming convention: `hero-spring-desktop.webp`, `hero-spring-mobile.webp`, etc.
- [ ] All images served via `next/image` with responsive `srcset`, proper `sizes` attribute, and priority loading (hero is above the fold)
- [ ] WebP format with JPEG fallback for maximum browser compatibility

### Hero Component Integration
- [ ] Integrates with the existing homepage hero component from Epic 02 US-001
- [ ] Hero text overlay (headline, subheadline, CTA) remains consistent across seasons — only the background image and optional tint change
- [ ] Text contrast verified against all 4 seasonal images (WCAG AA minimum for large text)
- [ ] Smooth visual presentation: no layout shift when the hero image loads (explicit width/height or aspect-ratio CSS)

### Performance
- [ ] Hero images preloaded with `priority` prop on `next/image` for above-the-fold LCP optimization
- [ ] Only the current season's images are loaded — other seasons are not fetched
- [ ] Optional optimization: prefetch the next season's images in the final week of the current season (edge case, low priority)
- [ ] No Cumulative Layout Shift (CLS) from seasonal image swap
- [ ] Lighthouse Performance score impact: hero rotation must not degrade mobile score below 85

### Edge Cases
- [ ] Server and client agree on the current season (no hydration mismatch) — use the same `getSeason()` function on both server and client, or pass season as a server-determined prop
- [ ] If a seasonal image fails to load, fall back to a default all-season hero image
- [ ] Time zone handling: use the server's locale or a fixed Mountain Time reference to avoid edge cases where UTC and local time disagree on the month boundary
- [ ] If the date changes during a user's session (midnight crossover at month boundary), no action required — the new season will display on next page load

### Analytics
- [ ] PostHog event property on `page_viewed` (homepage): `hero_season` value indicating which season is currently displayed
- [ ] Track whether CMS override is active: `hero_season_override` boolean property
- [ ] Track if seasonal hero affects engagement (CTR on hero CTA by season)

---

## Technical Notes

- **Utility Function:** `src/lib/seasonal.ts` — exports `getSeason(): 'spring' | 'summer' | 'fall' | 'winter'` using `new Date().getMonth()`. Also exports `getSeasonalHeroConfig(override?: string)` that returns the image paths, alt text, and optional tint for the current (or overridden) season.
- **Season Mapping:**
  ```typescript
  type Season = 'spring' | 'summer' | 'fall' | 'winter';

  const SEASON_MAP: Record<number, Season> = {
    0: 'winter',  // January
    1: 'winter',  // February
    2: 'spring',  // March
    3: 'spring',  // April
    4: 'spring',  // May
    5: 'summer',  // June
    6: 'summer',  // July
    7: 'summer',  // August
    8: 'fall',    // September
    9: 'fall',    // October
    10: 'fall',   // November
    11: 'winter', // December
  };
  ```
- **Hero Component:** Update the existing hero component (`src/components/sections/hero.tsx` or equivalent from Epic 02 US-001) to accept seasonal image props. The homepage page component calls `getSeasonalHeroConfig()` and passes the result to the hero.
- **CMS Integration:** Add a `heroSeasonOverride` field to the homepage content model in the CMS (Sanity, Contentful, or equivalent). The page data fetch reads this field and passes it to `getSeasonalHeroConfig(override)`.
- **Static Generation + ISR:** Since the season changes infrequently (4 times per year), ISR revalidation handles the transition naturally. Set revalidation period to ensure the page regenerates within a reasonable window of a season change. Alternatively, use `revalidateTag()` or on-demand revalidation triggered by a cron job on season boundary dates.
- **Image Optimization:** All 8 hero images (4 seasons x 2 crops) should be pre-optimized before upload. Target file sizes: desktop < 200KB, mobile < 120KB (after `next/image` optimization). Use Squoosh or Sharp for pre-processing.
- **Hydration Safety:** Since `new Date()` can differ between server render and client hydration, pass the season as a prop from the server component to avoid mismatch. The server component determines the season, and the client component receives it as a prop — no client-side `new Date()` call needed for the initial render.
- **Fallback Image:** Include a single default hero image (`hero-default-desktop.webp`, `hero-default-mobile.webp`) that works across all seasons as the fallback if the seasonal image fails to load or if a seasonal set is not yet configured.
- **Colorado-Specific Timing:** Consider that spring at 9,000+ feet often looks more like winter through April. Stephanie may want to adjust season boundaries in the future (e.g., Winter: Nov-Apr, Spring: May-Jun, Summer: Jul-Aug, Fall: Sep-Oct). The CMS override addresses this for now, but making the month-to-season mapping configurable via CMS is a future enhancement.

---

## Dependencies

- **Epic 02 US-001:** Homepage hero section must be built — this story modifies the existing hero component to support seasonal images
- **Epic 01 US-005:** CMS content model access for the homepage override field
- **Epic 01 US-004:** Layout components (hero section structure)
- **From Stephanie:** 4 seasonal photo sets (8 images total: 4 desktop landscape crops + 4 mobile portrait crops). Photos must be high-quality, representative of Colorado mountain wedding settings in each season, and approved for web use. This is the critical dependency — the feature cannot launch without all 4 seasonal image sets.

---

## Definition of Done

- [ ] Homepage hero displays the correct seasonal image based on the current month
- [ ] All 4 seasonal images render correctly on desktop and mobile (8 images total verified)
- [ ] CMS override field functions: setting a specific season forces that hero image regardless of date
- [ ] CMS override can be returned to "auto" to resume date-based rotation
- [ ] Text overlay maintains WCAG AA contrast against all 4 seasonal backgrounds
- [ ] No layout shift (CLS = 0) when the hero image loads
- [ ] No hydration mismatch between server and client renders
- [ ] Fallback hero displays if a seasonal image fails to load
- [ ] `next/image` serves optimized, responsive images with priority loading
- [ ] Only the current season's images are loaded (no unnecessary network requests for other seasons)
- [ ] Lighthouse Performance score remains > 85 on mobile
- [ ] PostHog `hero_season` property fires correctly on homepage views
- [ ] Seasonal images reviewed and approved by Stephanie
