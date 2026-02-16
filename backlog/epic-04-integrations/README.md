# Epic 04 — Integrations

**Phase:** 1
**Weeks:** 5-6
**Total Points:** 12
**Status:** Not Started
**Dependencies:** Epic 02 (Core Pages — forms, contact page, and content sections must exist to integrate with)

---

## Goal

Connect the site to all external services that power the business workflow. Inquiry form submissions sync leads to HoneyBook CRM and trigger branded transactional emails via Resend. Calendly is embedded for discovery call scheduling. Google Reviews and Instagram content are pulled in to provide social proof. Cookie consent is implemented to ensure GDPR/CCPA compliance before any tracking fires. These integrations transform the site from a brochure into a lead-generation and client-onboarding system.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-crm-honeybook.md) | CRM Integration (HoneyBook) | P0 | 3 | Not Started |
| [US-002](US-002-scheduling-calendly.md) | Scheduling (Calendly) | P0 | 2 | Not Started |
| [US-003](US-003-google-reviews.md) | Google Reviews | P1 | 2 | Not Started |
| [US-004](US-004-instagram-feed.md) | Instagram Feed | P1 | 2 | Not Started |
| [US-005](US-005-email-notifications.md) | Email Notifications (Resend) | P0 | 2 | Not Started |
| [US-006](US-006-cookie-consent.md) | Cookie Consent | P1 | 1 | Not Started |
| | **Total** | | **12** | |

---

## Epic-Level Acceptance Criteria

- [ ] Inquiry form submission creates a contact in HoneyBook with all lead data
- [ ] Quiz completion syncs quiz results and contact info to HoneyBook
- [ ] Failed CRM syncs are retried with exponential backoff and logged
- [ ] Calendly embed renders on contact page and is accessible from CTAs
- [ ] `calendar_book` event fires on successful Calendly booking
- [ ] Google Reviews display on homepage and relevant pages with star rating and recent reviews
- [ ] Instagram feed displays 6-8 recent posts on homepage with graceful fallback
- [ ] Form submission sends notification email to Stephanie and confirmation email to the couple
- [ ] Both emails are beautifully branded using React Email templates
- [ ] Cookie consent banner appears on first visit and blocks analytics/marketing cookies until consent
- [ ] Site is GDPR and CCPA compliant

---

## Technical Context

- **CRM:** HoneyBook (API/webhook integration, abstracted behind interface for future swap to Dubsado)
- **Scheduling:** Calendly (embed widget + event listener API)
- **Reviews:** Google Places API or Google Reviews widget
- **Social:** Instagram Basic Display API or embed
- **Email:** Resend (React Email templates, transactional delivery)
- **Consent:** CookieYes or Osano (consent management platform)

---

## Integration Architecture

All third-party integrations should follow a consistent pattern:

```
src/lib/integrations/
├── crm.ts              # CRM abstraction layer (HoneyBook implementation)
├── email.ts            # Resend client and send functions
├── calendar.ts         # Calendly configuration and event helpers
├── reviews.ts          # Google Reviews fetching and caching
├── instagram.ts        # Instagram feed fetching and caching
└── consent.ts          # Cookie consent state management
```

Each integration should:
- Have its own configuration via environment variables
- Include error handling and logging
- Fail gracefully (site functionality is never blocked by a third-party outage)
- Be testable with mocks

---

## Notes

- HoneyBook API access may require contacting their support team for API credentials — start this process early
- If HoneyBook API is not available, fall back to webhook integration via Zapier or Make as an interim solution
- Instagram API requires a Meta Developer account and app review — plan for 1-2 week approval time
- Google Reviews may require a Google Cloud project with Places API enabled
- Resend has a generous free tier (100 emails/day) suitable for a wedding planner's volume
- Cookie consent implementation must coordinate with Epic 03 US-004 (Analytics Setup) — analytics scripts must check consent state before initializing
