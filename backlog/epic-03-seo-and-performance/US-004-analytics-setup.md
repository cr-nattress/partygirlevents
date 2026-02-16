# US-004: Analytics & Conversion Tracking

**Epic:** [03 — SEO & Performance](README.md)
**Priority:** P0 — Must Have
**Points:** 2
**Status:** Not Started

---

## Description

Build out the full analytics stack with PostHog, Vercel Analytics, and GA4. Define and implement all conversion and engagement events. Create three PostHog dashboards and five conversion funnels. This story builds on the basic PostHog + Vercel Analytics scaffolding from Epic 01 and adds GA4 via Google Tag Manager, custom event tracking for every meaningful user action, and the dashboards Stephanie needs to understand how the site is performing and where leads come from.

---

## Acceptance Criteria

### PostHog Integration
- [ ] PostHog SDK (`posthog-js`) initialized in a client-side provider (from Epic 01 — verify it is working)
- [ ] Automatic page view tracking on every client-side navigation
- [ ] Session replay enabled for debugging user journeys (sample rate: 10% of sessions)
- [ ] Feature flags enabled for future A/B testing capability
- [ ] User identification: anonymous until form submission, then `posthog.identify()` with email as distinct ID

### Vercel Analytics
- [ ] `@vercel/analytics` tracking page views (from Epic 01 — verify it is working)
- [ ] `@vercel/speed-insights` reporting Core Web Vitals data in Vercel dashboard
- [ ] Traffic and Web Vitals visible in Vercel project dashboard

### GA4 via Google Tag Manager
- [ ] Google Tag Manager container created and script installed
- [ ] GTM loaded conditionally — only after analytics cookie consent is given (coordinate with Epic 04 US-006)
- [ ] GA4 property created and connected via GTM
- [ ] GA4 enhanced measurement enabled (page views, scrolls, outbound clicks, site search, file downloads)
- [ ] GA4 receiving page view data (verified in GA4 Realtime report)

### Conversion Events
- [ ] `form_submit` — fires on successful inquiry form submission (includes form_type: "inquiry")
- [ ] `quiz_complete` — fires when user completes the style quiz (includes quiz results)
- [ ] `calendar_book` — fires when a Calendly booking is confirmed (via Calendly event listener)
- [ ] `lead_magnet_download` — fires when a user downloads a lead magnet (venue guide, checklist, etc.)
- [ ] `chat_lead_capture` — fires when the AI chat widget captures contact info
- [ ] All conversion events sent to both PostHog and GA4 (via GTM dataLayer push)
- [ ] Conversion events include relevant properties (form data, page URL, referrer, UTM params)

### Engagement Events
- [ ] `hero_cta_click` — fires when any hero section CTA button is clicked (includes CTA text, page)
- [ ] `form_start` — fires when user begins filling out a form (first field interaction)
- [ ] `form_step_complete` — fires when user completes a step in a multi-step form (includes step number)
- [ ] `form_abandon` — fires when user starts but does not complete a form (includes last completed step)
- [ ] `case_study_view` — fires when user views a portfolio case study (includes case study name)
- [ ] `gallery_filter` — fires when user filters the portfolio gallery (includes filter values)
- [ ] `venue_guide_view` — fires when user views a venue guide page (includes venue name)
- [ ] `external_link_click` — fires when user clicks an external link (includes destination URL)
- [ ] All engagement events sent to PostHog (GA4 receives via GTM where relevant)

### Event Tracking Architecture
- [ ] Centralized analytics utility created in `src/lib/analytics.ts`
- [ ] Utility exposes typed functions: `trackConversion(event, properties)`, `trackEngagement(event, properties)`, `identifyUser(email, traits)`
- [ ] Event names and properties are typed with TypeScript enums/interfaces — no magic strings
- [ ] UTM parameters captured from URL and attached to all events (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`)
- [ ] Referrer captured and attached to first event in session

### PostHog Dashboards
- [ ] **Acquisition Dashboard:** page views by source, top landing pages, traffic by UTM campaign, new vs returning visitors, geographic breakdown
- [ ] **Engagement Dashboard:** session duration, pages per session, scroll depth, CTA click rates, form start rate, gallery interactions, blog engagement
- [ ] **Conversion Dashboard:** inquiry form submissions over time, conversion rate (visitors → leads), quiz completion rate, calendar bookings, lead magnet downloads, form abandonment rate

### PostHog Funnels
- [ ] **Homepage → Inquiry:** Homepage view → Contact page view → form_start → form_submit
- [ ] **Quiz Funnel:** Quiz page view → quiz_start → quiz_step_complete (each step) → quiz_complete → form_submit
- [ ] **Blog → Lead:** Blog post view → CTA click → Contact page view → form_submit
- [ ] **Venue Guide → Lead:** Venue guide view → venue_guide_view → CTA click → form_submit
- [ ] **Chat → Lead:** Chat widget open → chat message sent → chat_lead_capture

---

## Technical Notes

- The analytics utility (`src/lib/analytics.ts`) should abstract over PostHog and GA4 so event tracking calls are made once and routed to both systems
- For GA4 via GTM: push events to `window.dataLayer` — GTM triggers will forward them to GA4
- `form_abandon` can be detected using `beforeunload` event or by tracking `form_start` without a subsequent `form_submit` within the session (PostHog can compute this via funnel drop-off)
- Calendly provides a JavaScript API for listening to booking events (`Calendly:date_and_time_selected`, `Calendly:event_type_viewed`, `Calendly:event_scheduled`) — use `Calendly:event_scheduled` for the `calendar_book` event
- PostHog dashboards and funnels are configured in the PostHog UI, not in code — document the setup steps
- Consider creating a `useTrackEvent` hook for React components that need to fire events
- All analytics scripts must respect cookie consent (Epic 04 US-006) — wrap initialization in a consent check

---

## Dependencies

- Epic 01 US-001 (Project Initialization) — PostHog and Vercel Analytics scaffolding
- Epic 02 (Core Pages) — forms and interactive elements must exist to attach events to
- Epic 04 US-006 (Cookie Consent) — analytics must not fire until consent is given
- Google Tag Manager account and GA4 property — requires Google account setup
- PostHog project — requires PostHog account (free tier or Team plan)

---

## Definition of Done

- [ ] PostHog, Vercel Analytics, and GA4 all receiving page view data (verified in each platform's dashboard)
- [ ] All 5 conversion events firing correctly and visible in PostHog and GA4
- [ ] All 8 engagement events firing correctly and visible in PostHog
- [ ] Analytics utility (`src/lib/analytics.ts`) provides typed, centralized event tracking
- [ ] Three PostHog dashboards created and showing data
- [ ] Five PostHog funnels configured and calculating conversion rates
- [ ] UTM parameters captured and attached to events
- [ ] Analytics scripts blocked until cookie consent is given (or placeholder consent check is in place)
- [ ] No analytics-related console errors on any page
