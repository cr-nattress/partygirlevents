# US-002: Scheduling (Calendly)

**Epic:** [04 — Integrations](README.md)
**Priority:** P0 — Must Have
**Points:** 2
**Status:** Not Started

---

## Description

Embed Calendly on the contact page for discovery call booking and make it available as an inline widget triggered from CTAs across the site. When a booking is confirmed, a `calendar_book` conversion event fires to track scheduling as a lead conversion. The Calendly embed is styled to match the site's brand (warm minimalism aesthetic with brand colors).

---

## Acceptance Criteria

### Contact Page Embed
- [ ] Calendly inline embed renders on the contact page below or alongside the inquiry form
- [ ] Embed shows Stephanie's discovery call event type with available time slots
- [ ] Embed loads without layout shift (container has defined dimensions before Calendly loads)
- [ ] Embed is responsive — works correctly on mobile (375px) through desktop (2560px)
- [ ] If Calendly fails to load, a fallback message is shown with a direct link to Stephanie's Calendly page

### CTA-Triggered Widget
- [ ] "Book a Discovery Call" CTAs across the site (homepage, services, about) can trigger a Calendly popup/inline widget
- [ ] Widget opens as a modal overlay or slides into view (consistent with site interaction patterns)
- [ ] Widget is closable via close button, Escape key, and clicking outside
- [ ] Widget is accessible — focus is trapped while open, returns to trigger element on close

### Conversion Tracking
- [ ] `calendar_book` conversion event fires when a booking is successfully completed
- [ ] Event detected via Calendly's JavaScript API: listen for `Calendly:event_scheduled` event
- [ ] Event properties include: event type name, invitee email (if available from Calendly event payload)
- [ ] Event sent to both PostHog and GA4 (via the analytics utility from Epic 03 US-004)

### Brand Styling
- [ ] Calendly embed uses custom brand colors matching the site design system:
  - Primary color: terracotta (#C4926E) or brand primary
  - Text color: dark charcoal (#2C2C2C) or brand text color
  - Background color: cream (#FAF7F2) or white (#FFFFFF)
- [ ] Custom colors applied via Calendly embed parameters (`color`, `textColor`, `backgroundColor`)
- [ ] Calendly branding minimized (Pro plan feature — confirm with Stephanie's Calendly plan)

---

## Technical Notes

- Calendly provides two embed options:
  1. **Inline embed** — renders directly in a div container (best for contact page)
  2. **Popup widget** — opens as a modal overlay (best for CTA triggers)
- Use the Calendly embed script: `https://assets.calendly.com/assets/external/widget.js`
- Load the script dynamically with `next/script` or import it only on pages/components that need it
- Calendly event listener setup:
  ```javascript
  window.addEventListener('message', (e) => {
    if (e.data.event === 'calendly.event_scheduled') {
      trackConversion('calendar_book', { ... })
    }
  })
  ```
- Create a reusable `<CalendlyEmbed />` component in `src/components/integrations/calendly-embed.tsx` and a `<CalendlyPopup />` component for CTA-triggered usage
- Environment variable: `NEXT_PUBLIC_CALENDLY_URL` (Stephanie's Calendly scheduling link)
- Consider prefetching the Calendly widget script on pages with booking CTAs for faster load

---

## Dependencies

- Epic 02 (Contact page must be built)
- Epic 03 US-004 (Analytics utility for conversion event tracking)
- Stephanie's Calendly account with discovery call event type configured
- Calendly plan level determines branding customization options (Pro plan removes Calendly branding)

---

## Definition of Done

- [ ] Calendly inline embed renders on the contact page and shows available time slots
- [ ] CTA buttons across the site open a Calendly popup widget
- [ ] `calendar_book` conversion event fires on successful booking (verified in PostHog and GA4)
- [ ] Embed styled with brand colors (terracotta/cream/charcoal)
- [ ] Embed is responsive across all target viewports
- [ ] Graceful fallback if Calendly fails to load
- [ ] Widget popup is keyboard accessible and focus-trapped
- [ ] No CLS caused by Calendly embed loading
