# Epic 03 — SEO & Performance

**Phase:** 1
**Weeks:** 4-6
**Total Points:** 13
**Status:** Not Started
**Dependencies:** Epic 02 (Core Pages must be built before optimizing them)

---

## Goal

Ensure the site is discoverable, fast, and accessible. Implement structured data and meta tags for search engine visibility, optimize Core Web Vitals for a mobile PageSpeed score above 85, achieve WCAG 2.2 AA accessibility compliance, and wire up PostHog, Vercel Analytics, and GA4 with conversion tracking and dashboards. This epic transforms the functional site from Epic 02 into one that ranks, converts, and serves all users well.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-seo-foundation.md) | SEO Foundation | P0 | 5 | Not Started |
| [US-002](US-002-performance-optimization.md) | Performance Optimization | P0 | 3 | Not Started |
| [US-003](US-003-accessibility.md) | Accessibility (WCAG 2.2 AA) | P1 | 3 | Not Started |
| [US-004](US-004-analytics-setup.md) | Analytics & Conversion Tracking | P0 | 2 | Not Started |
| | **Total** | | **13** | |

---

## Epic-Level Acceptance Criteria

- [ ] Every page has a unique title tag, meta description, canonical URL, and Open Graph tags
- [ ] Schema markup (LocalBusiness, FAQPage, Review, BreadcrumbList, and page-specific types) renders valid JSON-LD on every relevant page
- [ ] XML sitemap auto-generates from the app's route structure and is submitted to Google Search Console
- [ ] robots.txt properly configured for production
- [ ] Core Web Vitals pass: LCP < 2.5s, FID/INP < 200ms, CLS < 0.1 on mobile
- [ ] Mobile PageSpeed Lighthouse score > 85
- [ ] All images use next/image with responsive srcset and modern formats (AVIF/WebP)
- [ ] WCAG 2.2 AA compliance verified across all pages (contrast, focus, keyboard, screen reader)
- [ ] PostHog, Vercel Analytics, and GA4 are firing events on every page
- [ ] Conversion events tracked: form_submit, quiz_complete, calendar_book, lead_magnet_download, chat_lead_capture
- [ ] Three PostHog dashboards live: Acquisition, Engagement, Conversion
- [ ] Five funnels configured in PostHog

---

## Technical Context

- **SEO:** Next.js Metadata API (generateMetadata), JSON-LD for structured data, `src/app/sitemap.ts` and `src/app/robots.ts`
- **Performance:** next/image, next/font, next/dynamic, Vercel Edge caching, Lighthouse CI
- **Accessibility:** Semantic HTML, Radix UI primitives (already accessible), focus management, prefers-reduced-motion
- **Analytics:** PostHog (posthog-js), Vercel Analytics (@vercel/analytics), GA4 via Google Tag Manager

---

## Notes

- SEO and performance work can begin as soon as the first Core Pages are built (does not need to wait for all of Epic 02)
- Accessibility should be validated incrementally as components are built, but this story covers the audit and remediation pass
- Analytics setup builds on the PostHog/Vercel Analytics scaffolding from Epic 01 US-001 and adds GA4, custom events, dashboards, and funnels
- Cookie consent (Epic 04 US-006) must block analytics scripts until consent is given — coordinate with that story
