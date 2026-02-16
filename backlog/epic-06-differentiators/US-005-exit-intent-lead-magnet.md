# US-005 — Exit-Intent Lead Magnet

**Epic:** [06 — Differentiators](README.md)
**Priority:** P2 — Nice to Have
**Points:** 3
**Status:** Not Started

---

## Description

Implement an exit-intent popup that triggers when the visitor's cursor leaves the viewport, offering a free downloadable "Mountain Wedding Planning Guide" PDF in exchange for their email address. The email is captured and sent to ConvertKit, which triggers a nurture sequence (see US-006). The popup is suppressed for returning visitors who have already downloaded the guide (cookie-based) and does not show again for 30 days after dismissal. This is a proven lead capture mechanism that catches visitors who would otherwise leave without converting — but it must feel helpful, not desperate.

---

## Acceptance Criteria

### Exit-Intent Detection
- [ ] Popup triggers when the user's cursor moves above the viewport boundary (desktop: `mouseout` event with `clientY < 0`)
- [ ] Mobile alternative: trigger after 60 seconds of page engagement OR on scroll-up behavior (since mobile has no cursor leave event)
- [ ] Popup does NOT trigger on the first 10 seconds of a page visit (prevent false triggers from quick mouse movements)
- [ ] Popup triggers maximum once per session

### Popup UI
- [ ] Modal overlay with semi-transparent backdrop
- [ ] Headline: "Before you go -- download our free Mountain Wedding Planning Guide"
- [ ] Supporting text: 1-2 sentences describing what the guide includes (timeline, budget tips, venue checklist, Colorado-specific advice)
- [ ] Preview image of the guide cover or a mockup
- [ ] Email input field with validation (valid email format)
- [ ] Optional name field
- [ ] Submit button: "Send Me the Guide"
- [ ] Close button (X) in the top-right corner
- [ ] Click outside the modal to dismiss
- [ ] Escape key to dismiss
- [ ] Styled to match the site's "Elevated Warm Minimalism" design system
- [ ] Framer Motion entrance animation (fade + scale or slide-up)
- [ ] Responsive: full-screen modal on mobile, centered overlay on desktop

### Lead Capture & Delivery
- [ ] On form submission: email sent to ConvertKit via API (subscribe to "Guide Download" tag/segment)
- [ ] ConvertKit triggers the guide download nurture sequence (see US-006)
- [ ] PDF guide delivered via: (a) immediate download link shown post-submit, AND (b) email with download link
- [ ] Lead also stored in Supabase `leads` table with source = "exit_intent_guide"
- [ ] Success state: "Check your email! Your guide is on its way." with direct download link

### Suppression Logic
- [ ] Cookie set on successful download: `pge_guide_downloaded=true` (expires: never or 365 days)
- [ ] Cookie set on dismiss: `pge_exit_intent_dismissed=true` (expires: 30 days)
- [ ] Popup suppressed if either cookie exists
- [ ] Popup suppressed if visitor is already a known lead (has completed quiz or submitted inquiry)
- [ ] Popup does NOT show on `/contact/`, `/quiz/`, or any page where the visitor is actively converting

### PDF Planning Guide
- [ ] Branded PDF guide (8-15 pages) covering:
  - Colorado mountain wedding planning timeline (12-month countdown)
  - Budget planning worksheet with Colorado-specific ranges
  - Venue selection checklist
  - Seasonal planning considerations
  - What to ask your wedding planner
  - Party Girl Events services overview and CTA
- [ ] PDF hosted on Supabase Storage or Vercel's static files
- [ ] Stephanie creates the guide content (AI-assisted draft acceptable)

### Analytics
- [ ] PostHog events: `exit_intent_shown`, `exit_intent_dismissed`, `exit_intent_email_submitted`, `lead_magnet_downloaded`
- [ ] Track conversion rate: shown → submitted

---

## Technical Notes

- **Component:** `src/components/marketing/exit-intent-popup.tsx` (client component)
- **Hook:** `src/hooks/use-exit-intent.ts` — encapsulates detection logic, cookie checking, and trigger state
- **Cookie Management:** Use `js-cookie` or native `document.cookie` with helper utilities. Respect any future cookie consent mechanism.
- **ConvertKit API:** POST to ConvertKit's subscriber API endpoint with the email and a form/tag ID. API key stored in environment variable.
- **Mobile Detection:** Use `window.matchMedia('(hover: none)')` or user agent to determine if the device has a cursor. Apply alternative trigger for touch devices.
- **Performance:** The popup component should be code-split with `next/dynamic` to avoid adding to the initial bundle on every page.
- **A/B Testing:** Consider tracking two headline variants via PostHog feature flags in a future iteration.

---

## Dependencies

- **Epic 01 US-003:** UI components (Button, Input, Modal/Dialog)
- **Epic 04:** ConvertKit integration (API keys, subscriber endpoint)
- **US-006:** Email nurture sequences must be configured before this popup goes live (otherwise captured emails receive no follow-up)
- **From Stephanie:** PDF planning guide content (draft or outline). AI-assisted drafting is acceptable but Stephanie must review and approve.

---

## Definition of Done

- [ ] Exit-intent popup triggers correctly on cursor leave (desktop) and engagement timeout (mobile)
- [ ] Popup does not trigger in first 10 seconds or on conversion pages
- [ ] Email capture submits to ConvertKit and stores in Supabase
- [ ] PDF guide delivered via immediate download link and email
- [ ] Cookie-based suppression works: downloaded → never show again, dismissed → 30-day suppression
- [ ] Popup suppressed for existing leads
- [ ] Close/dismiss interactions work (X button, click outside, Escape key)
- [ ] Responsive and accessible on mobile and desktop
- [ ] All PostHog analytics events fire correctly
- [ ] PDF guide is branded, informative, and reviewed by Stephanie
