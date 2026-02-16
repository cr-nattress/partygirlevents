# US-002: Cross-Browser & Device Testing

**Epic:** [05 — Launch & Migration](README.md)
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Execute comprehensive cross-browser, cross-device, and cross-viewport testing across the entire site to ensure pixel-perfect rendering, functional correctness, and performance compliance before DNS cutover. This story covers the full pre-launch checklist from PLAN.md Section 12 — content verification, technical validation, performance benchmarks, SEO audit, accessibility compliance, analytics confirmation, and security review. Every page, form, integration, and interactive element must be verified working before the site goes live.

---

## Acceptance Criteria

### Browser Testing Matrix
- [ ] **Chrome** (latest 2 versions) — all pages render correctly, all interactions work
- [ ] **Safari** (latest 2 versions) — all pages render correctly, all interactions work
- [ ] **Firefox** (latest 2 versions) — all pages render correctly, all interactions work
- [ ] **Edge** (latest 2 versions) — all pages render correctly, all interactions work
- [ ] **iOS Safari** (latest 2 iOS versions) — all pages render correctly, touch interactions work
- [ ] **Android Chrome** (latest 2 versions) — all pages render correctly, touch interactions work
- [ ] No visual regressions between browsers (layout, typography, colors, spacing consistent)
- [ ] Mobile-specific interactions tested: swipe gestures (if any), touch targets, soft keyboard behavior on forms
- [ ] No horizontal scrolling on any page at any mobile viewport

### Viewport & Device Testing
- [ ] **iPhone SE** (375px) — smallest supported viewport, no horizontal scroll, no clipped content
- [ ] **iPhone 12/13/14** (390px) — primary mobile experience renders correctly
- [ ] **iPhone 15 Pro Max** (430px) — largest iPhone viewport
- [ ] **iPad portrait** (810px) — tablet layout renders correctly
- [ ] **iPad landscape** (1080px) — tablet landscape transitions to desktop layout appropriately
- [ ] **Desktop 1280px** — minimum desktop viewport, no layout issues
- [ ] **Desktop 1440px** — standard desktop viewport
- [ ] **Desktop 1920px** — full HD desktop
- [ ] **Desktop 2560px** — ultrawide/4K desktop, content does not stretch or look sparse
- [ ] Responsive breakpoints transition smoothly (no layout jumps between breakpoints)
- [ ] Touch targets are at least 24x24px on mobile (WCAG 2.2 AA)
- [ ] No horizontal scrollbar on any viewport

### Content Verification (Pre-Launch Checklist)
- [ ] All copy reviewed and approved by Stephanie — no drafts, no AI-generated placeholder text
- [ ] 5-8 case studies populated with real content: couple stories, photos, vendor credits, testimonials
- [ ] FAQ page has 25 questions answered, organized by category
- [ ] Services descriptions and pricing are accurate and approved
- [ ] Privacy policy and terms of service updated for new data practices (cookies, analytics, email, CRM)
- [ ] Zero instances of lorem ipsum, "TODO", "TBD", "[Insert X]", or placeholder text anywhere on the site
- [ ] All images are real (no stock placeholders) and have descriptive alt text
- [ ] Footer information is correct: business address, phone, email, social links
- [ ] Copyright year in footer is dynamic (not hardcoded)
- [ ] All social media links are correct and open in new tabs

### Technical Validation (Pre-Launch Checklist)
- [ ] All forms submit successfully end-to-end:
  - Multi-step inquiry form → data in Supabase → notification email to Stephanie → confirmation email to couple → HoneyBook CRM sync
  - Style quiz (if built) → results displayed → data synced to Supabase and HoneyBook
  - Newsletter signup (if applicable) → email captured → ConvertKit
- [ ] Email notifications work: Stephanie receives formatted lead summary, couple receives branded confirmation
- [ ] Calendly embed loads correctly and books a discovery call successfully
- [ ] Instagram feed loads with graceful fallback if API is unavailable
- [ ] Google Reviews display correctly with star ratings
- [ ] 301 redirects verified for all mapped WordPress URLs (run `scripts/validate-redirects.ts`)
- [ ] XML sitemap generates correctly at `/sitemap.xml` — all public pages included, no private routes
- [ ] `robots.txt` allows crawling of all public pages, blocks `/api/`
- [ ] No JavaScript console errors on any page (check browser DevTools)
- [ ] No broken links on any page (run `scripts/validate-links.ts`)
- [ ] No mixed content warnings (all resources loaded over HTTPS)
- [ ] All external links open in new tab with `rel="noopener noreferrer"`
- [ ] Custom 404 page renders with helpful navigation (not the default Next.js 404)
- [ ] Custom 500 error page renders gracefully
- [ ] Favicon and Apple Touch Icon display correctly
- [ ] Multi-step forms preserve state across steps and work with browser back button
- [ ] Form validation works: required fields enforced, error messages displayed, invalid input rejected

### Performance Benchmarks (Pre-Launch Checklist)
- [ ] **Lighthouse Performance score > 85** on all pages (mobile audit)
- [ ] **LCP (Largest Contentful Paint) < 2.5s** on all pages
- [ ] **CLS (Cumulative Layout Shift) < 0.1** on all pages
- [ ] **FID / INP (Interaction to Next Paint) < 200ms** on all pages
- [ ] No render-blocking resources identified in Lighthouse audit
- [ ] Images served in modern formats (WebP/AVIF) via `next/image`
- [ ] Fonts load without FOUT/FOIT (font-display: swap via `next/font`)
- [ ] JavaScript bundle size is reasonable — no unexpectedly large client-side bundles
- [ ] Pages with heavy media (portfolio, homepage) still meet LCP target
- [ ] No significant layout shift visible during page load on any device
- [ ] Pages feel responsive — no jank on scroll, no delayed interactions

### SEO Audit (Pre-Launch Checklist)
- [ ] Every page has a unique `<title>` tag (under 60 characters)
- [ ] Every page has a unique `<meta name="description">` (under 155 characters)
- [ ] Every page has exactly one `<h1>` with proper heading hierarchy (H1 > H2 > H3, no skipping)
- [ ] Schema markup validates on Google Rich Results Test:
  - `LocalBusiness` (sitewide)
  - `FAQPage` (FAQ page, services pages)
  - `Review` (case studies, testimonials)
  - `BreadcrumbList` (all pages)
  - `Person` (about page)
  - `Service` (service pages)
- [ ] Open Graph tags render correctly (verified with Facebook Sharing Debugger)
- [ ] Twitter Card tags render correctly (verified with Twitter Card Validator)
- [ ] Canonical URLs set on every page (`<link rel="canonical">`)
- [ ] No duplicate content issues (canonical tags resolve any ambiguity)
- [ ] Internal links use consistent URL format (trailing slash consistency)

### Accessibility (WCAG 2.2 AA — Pre-Launch Checklist)
- [ ] **Keyboard navigation:** all interactive elements (links, buttons, form fields, accordions, modals, carousels) are reachable and operable via keyboard alone
- [ ] **Focus indicators:** visible focus ring on all focusable elements, at least 2px thick with 3:1 contrast ratio
- [ ] **Screen reader testing:** VoiceOver (macOS/iOS) — all pages read logically, landmarks are announced, form labels are associated, images have alt text
- [ ] **Color contrast:** all text meets 4.5:1 contrast ratio (normal text) and 3:1 (large text) — verify with axe DevTools or Contrast Checker
- [ ] **Reduced motion:** `prefers-reduced-motion: reduce` disables all CSS animations and Framer Motion transitions
- [ ] **Skip navigation:** "Skip to main content" link present and functional
- [ ] **Form accessibility:** all form fields have associated labels, error messages are announced by screen readers, required fields are indicated
- [ ] **Modal accessibility:** focus is trapped inside open modals, Escape key closes modals, focus returns to trigger element on close
- [ ] **Image alt text:** all images have descriptive alt text (decorative images use `alt=""`)

### Analytics Verification (Pre-Launch Checklist)
- [ ] **PostHog** fires `page_view` events on all pages (verify in PostHog dashboard)
- [ ] **PostHog** custom events fire correctly: `hero_cta_click`, `form_start`, `form_step_complete`, `form_submit`, `case_study_view`, `gallery_filter`
- [ ] **GA4** page views are tracked
- [ ] **GA4** conversions are configured: form submission, quiz completion, calendar booking
- [ ] **Vercel Analytics** is collecting Web Vitals data
- [ ] **Cookie consent** blocks PostHog and GA4 until analytics consent is given (verify: no tracking cookies or network requests before consent)
- [ ] Cookie consent banner appears on first visit, does not appear on subsequent visits after consent
- [ ] "Cookie Settings" footer link opens consent preferences

### Security Review (Pre-Launch Checklist)
- [ ] Environment variables are not exposed in client-side JavaScript bundle (check page source, network tab)
- [ ] API routes have rate limiting configured (especially `/api/contact`, `/api/lead`)
- [ ] Form inputs are sanitized — no XSS vulnerabilities (test with `<script>alert('xss')</script>` input)
- [ ] CSRF protection is active on form submissions
- [ ] Security headers are configured:
  - `Strict-Transport-Security` (HSTS)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` (or SAMEORIGIN)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (restrict camera, microphone, geolocation)
  - Content Security Policy (CSP) — at minimum, report-only mode
- [ ] No sensitive data (API keys, tokens, credentials) in client-side code or Git history

### Image & Asset Verification
- [ ] All images load on every page (no broken image icons)
- [ ] Images render at correct dimensions (no distortion, no unexpected cropping)
- [ ] next/image lazy loading works (below-fold images load on scroll)
- [ ] Hero images load quickly (priority loading verified)
- [ ] Favicon displays correctly in browser tab
- [ ] Open Graph images render correctly in social sharing previews (tested with Facebook Sharing Debugger, Twitter Card Validator)

### Link Verification
- [ ] Run `scripts/validate-links.ts` script to check all internal links
- [ ] Zero broken internal links (no 404s for any `<a href>` on the site)
- [ ] External links open in new tab (`target="_blank"`) with `rel="noopener noreferrer"`
- [ ] External links are reachable (no dead links to third-party sites)
- [ ] Navigation links (header, footer, breadcrumbs) all point to correct pages
- [ ] CTA buttons link to correct destinations

### Test Report
- [ ] Test report created documenting all findings:
  - Date tested, browser/device combination
  - Pass/fail status for each checklist item
  - Screenshots of any issues found
  - Severity classification (blocker, major, minor, cosmetic)
  - Resolution status (fixed, deferred, won't fix with justification)
- [ ] All blockers resolved before launch sign-off
- [ ] Report signed off by Stephanie (content) and developer (technical)

---

## Technical Notes

- **Testing approach:** Manual testing supplemented by automated scripts. Each browser/device combination should be tested by navigating through the full user journey: homepage → services → portfolio → case study → about → process → FAQ → contact → form submission.
- **Lighthouse CI:** Run `scripts/lighthouse-ci.mjs` against all key pages and capture scores. Pages that fail the > 85 threshold must be optimized before launch.
- **Link validation:** `scripts/validate-links.ts` should:
  1. Crawl the sitemap to get all page URLs
  2. Fetch each page and extract all `<a href>` values
  3. Test each link: internal links return 200, external links return 200 or 301
  4. Report any broken links with the source page and destination URL
- **Redirect validation:** `scripts/validate-redirects.ts` should test every URL in the redirect mapping document against the Vercel preview deployment, verifying each returns a 301 with the correct `Location` header.
- **Browser testing tools:** Use BrowserStack, LambdaTest, or Playwright for automated cross-browser screenshots if manual testing on all combinations is impractical.
- **Accessibility testing tools:**
  - axe DevTools browser extension (automated accessibility audit)
  - WAVE Web Accessibility Evaluation Tool
  - VoiceOver (macOS built-in screen reader)
  - Manual keyboard navigation testing
- **Performance testing:** Run Lighthouse in incognito mode to avoid extension interference. Test on a throttled network (3G) to catch performance issues that only appear on slower connections.
- **Mobile testing tip:** Use Chrome DevTools device emulation for viewport testing, but always verify on at least one real iOS and Android device.
- **Social sharing preview testing:** Use https://developers.facebook.com/tools/debug/ and https://cards-dev.twitter.com/validator
- Consider using Playwright for automated cross-browser testing of critical flows (form submission, navigation)
- Create a testing spreadsheet/checklist that maps every page x browser x viewport combination for systematic coverage

---

## Dependencies

- Epics 01-04 must be complete (all pages built, all integrations connected, all content populated)
- Epic 04 US-001 (HoneyBook) — CRM sync must be working for end-to-end form testing
- Epic 04 US-005 (Email) — emails must be firing for end-to-end form testing
- Access to BrowserStack or physical test devices (iPhone, iPad, Android phone)
- Stephanie must have reviewed and approved all content before testing begins
- Vercel preview deployment available for testing (before DNS cutover)
- `scripts/validate-links.ts` and `scripts/validate-redirects.ts` must be written (can be part of this story)
- Google Search Console access for sitemap verification
- Facebook Sharing Debugger and Twitter Card Validator access for OG/Twitter tag verification

---

## Definition of Done

- [ ] Site tested on Chrome, Safari, Firefox, Edge (latest 2 versions) with no visual or functional issues
- [ ] Site tested on iOS Safari and Android Chrome across iPhone SE to iPhone 15 Pro Max viewport range
- [ ] Site tested on iPad (portrait + landscape) and desktop viewports (1280px to 2560px)
- [ ] All content verified: no placeholder text, no TODOs, all copy approved by Stephanie
- [ ] All forms tested end-to-end: data in Supabase, emails sent, CRM synced
- [ ] All integrations working: Calendly, Google Reviews, Instagram, email notifications
- [ ] Lighthouse Performance > 85 on all pages (mobile), LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] SEO audit passed: unique titles/descriptions, schema validates, OG tags work, canonical URLs set
- [ ] WCAG 2.2 AA accessibility: keyboard nav, VoiceOver, color contrast, reduced motion, focus indicators
- [ ] Analytics verified: PostHog and GA4 firing correctly, cookie consent blocking pre-consent tracking
- [ ] Security review passed: env vars secure, rate limiting active, input sanitization, security headers
- [ ] Zero broken links (validated by `scripts/validate-links.ts`)
- [ ] Zero console errors on any page in any browser
- [ ] Test report created with all findings documented, all blockers resolved
