# US-006: Cookie Consent

**Epic:** [04 — Integrations](README.md)
**Priority:** P1 — Should Have
**Points:** 1
**Status:** Not Started

---

## Description

Implement a cookie consent banner that provides granular consent options for necessary, analytics, and marketing cookies. PostHog, GA4, and any marketing scripts must be blocked until the user gives explicit consent. The implementation must be GDPR and CCPA compliant, including a "Do Not Sell My Personal Information" link in the footer for CCPA requirements.

---

## Acceptance Criteria

### Consent Banner
- [ ] Cookie consent banner appears on first visit (before any non-essential cookies are set)
- [ ] Banner does not appear on subsequent visits if consent has already been given or denied
- [ ] Banner is visually consistent with the site design (warm minimalism aesthetic, not an ugly default widget)
- [ ] Banner does not obscure critical content (positioned at bottom of viewport or as a modal)
- [ ] Banner is accessible: keyboard navigable, focus managed, screen reader friendly

### Granular Consent Options
- [ ] Three consent categories presented:
  - **Necessary** (always on, cannot be disabled): session cookies, security cookies, essential functionality
  - **Analytics** (opt-in): PostHog, Vercel Analytics, GA4 — for understanding how visitors use the site
  - **Marketing** (opt-in): any future remarketing or advertising pixels
- [ ] "Accept All" button — enables all categories
- [ ] "Reject All" or "Necessary Only" button — disables analytics and marketing
- [ ] "Customize" or "Manage Preferences" option — allows granular toggle per category
- [ ] Each category has a brief, plain-language description of what it does

### Script Blocking
- [ ] PostHog SDK does NOT initialize until analytics consent is given
- [ ] GA4 (via Google Tag Manager) does NOT load until analytics consent is given
- [ ] Vercel Analytics respects consent state (or is classified as necessary if it only collects anonymous Web Vitals data)
- [ ] Any future marketing pixels will check marketing consent before loading
- [ ] Consent state is checked in the analytics initialization code (coordinate with Epic 03 US-004)
- [ ] On consent change (user updates preferences): scripts are loaded/unloaded accordingly

### Consent Storage
- [ ] Consent preferences stored in a cookie (e.g., `cookie_consent`) with a 12-month expiry
- [ ] Consent state accessible to the application via a React context or utility function
- [ ] `src/lib/integrations/consent.ts` exports: `getConsentState()`, `hasAnalyticsConsent()`, `hasMarketingConsent()`

### GDPR Compliance
- [ ] Consent is opt-in (not pre-checked) for analytics and marketing
- [ ] Users can withdraw consent at any time (link to manage preferences in footer or privacy page)
- [ ] Consent choice is recorded with timestamp (for audit purposes)
- [ ] Privacy policy link included in the consent banner

### CCPA Compliance
- [ ] "Do Not Sell My Personal Information" link in the site footer
- [ ] Link leads to a page or modal explaining data practices and providing opt-out mechanism
- [ ] CCPA opt-out triggers the same effect as rejecting marketing cookies

### Consent Management Platform
- [ ] Implemented using CookieYes, Osano, or a lightweight custom solution
- [ ] If using a third-party CMP: widget styled to match site design (custom CSS)
- [ ] If building custom: consent logic is well-tested and follows IAB TCF principles

---

## Technical Notes

- **Option A: CookieYes (Recommended)**
  - CookieYes provides a free tier for small sites
  - Offers auto-detection of cookies, granular consent, and a GDPR/CCPA compliant banner
  - Can be styled with custom CSS to match the site
  - Provides a JavaScript API for checking consent state

- **Option B: Custom implementation**
  - Build a custom consent banner component in `src/components/cookie-consent.tsx`
  - Store consent in a cookie and React context
  - More work but full control over UX and styling
  - Must handle: banner display logic, preference storage, script blocking, preference management

- Consent state integration with analytics:
  ```typescript
  // In the analytics provider
  if (hasAnalyticsConsent()) {
    posthog.init(key, { ... })
    // Load GTM
  }
  ```
- The consent banner should be rendered in the root layout but only on the client (`"use client"`)
- Consider using `next/script` with `strategy="lazyOnload"` for third-party CMP scripts
- The "Do Not Sell" page can be a simple content page or a section within the privacy policy

---

## Dependencies

- Epic 03 US-004 (Analytics Setup) — analytics scripts must integrate with consent state
- Privacy policy page (can be part of Epic 02 or a separate legal pages story)

---

## Definition of Done

- [ ] Cookie consent banner appears on first visit
- [ ] Granular consent options work: necessary (always on), analytics (opt-in), marketing (opt-in)
- [ ] PostHog and GA4 do NOT fire any events before analytics consent is given (verified in browser dev tools)
- [ ] Consent preferences persist across sessions (12-month cookie)
- [ ] Users can update preferences via a footer link
- [ ] "Do Not Sell My Personal Information" link present in footer
- [ ] Banner is visually consistent with site design
- [ ] Banner is keyboard accessible and screen reader friendly
- [ ] GDPR: consent is opt-in, withdrawable, and timestamped
- [ ] CCPA: "Do Not Sell" opt-out mechanism functional
