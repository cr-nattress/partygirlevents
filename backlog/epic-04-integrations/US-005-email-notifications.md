# US-005: Email Notifications (Resend)

**Epic:** [04 — Integrations](README.md)
**Priority:** P0 — Must Have
**Points:** 2
**Status:** Not Started

---

## Description

Implement transactional email notifications using Resend with React Email templates. When a couple submits the inquiry form, two emails fire: (1) a formatted lead summary to Stephanie with all submitted data, and (2) a warm confirmation to the couple thanking them, setting expectations for Stephanie's response within 24 hours, explaining what to expect next, and including a direct link to book a discovery call. Both emails are beautifully designed and branded to match the site's elevated warm minimalism aesthetic.

---

## Acceptance Criteria

### Resend Integration
- [ ] Resend SDK installed and configured in `src/lib/integrations/email.ts`
- [ ] Sending domain verified in Resend (e.g., `partygirl.events` or `mail.partygirl.events`)
- [ ] SPF, DKIM, and DMARC records configured for the sending domain
- [ ] Emails send from a branded address (e.g., `hello@partygirl.events` or `stephanie@partygirl.events`)
- [ ] Email sending is server-side only (API route) — no client-side Resend calls

### Notification to Stephanie (Lead Summary)
- [ ] Email fires on every inquiry form submission
- [ ] Subject line: "New Inquiry: [Couple Name] — [Wedding Date or 'Date TBD']"
- [ ] Email body includes ALL submitted form data in a clean, scannable format:
  - Couple name(s)
  - Email address (clickable mailto link)
  - Phone number (clickable tel link)
  - Wedding date
  - Guest count
  - Budget range
  - Wedding type (ceremony + reception, elopement, etc.)
  - Location / venue
  - Style preferences or special requests (free-text field)
  - How they found Party Girl Events (referral source)
- [ ] Lead source metadata: page URL, UTM parameters, timestamp
- [ ] Quick-action links in the email: "Reply to [Name]", "View in HoneyBook", "Book Discovery Call for Them"
- [ ] Email is mobile-friendly (Stephanie reads emails on her phone)

### Confirmation to Couple
- [ ] Email fires on every inquiry form submission
- [ ] Subject line: "We got your message, [First Name]! Here's what's next"
- [ ] Email body includes:
  - Warm, personal greeting using their first name
  - Acknowledgment: "Thank you for reaching out! Stephanie is thrilled to learn about your wedding plans."
  - Timeline: "Stephanie will personally reach out within 24 hours"
  - "What to Expect" section: brief overview of the discovery call and planning process
  - CTA button: "Book Your Discovery Call Now" linking to Calendly
  - Social links: Instagram, Facebook
  - Contact info: phone, email
- [ ] Tone matches Stephanie's brand voice — warm, personal, excited, professional
- [ ] Email does not feel automated or generic

### React Email Templates
- [ ] Both email templates built with React Email (`@react-email/components`)
- [ ] Templates located in `src/emails/` directory:
  - `src/emails/lead-notification.tsx` (to Stephanie)
  - `src/emails/inquiry-confirmation.tsx` (to couple)
- [ ] Templates use React Email components: `Html`, `Head`, `Preview`, `Body`, `Container`, `Section`, `Text`, `Link`, `Button`, `Img`, `Hr`
- [ ] Templates are type-safe with TypeScript props interfaces

### Brand Design
- [ ] Email design matches the site's "Elevated Warm Minimalism" aesthetic:
  - Cream background (#FAF7F2)
  - White content card
  - Terracotta accent color (#C4926E) for buttons and highlights
  - Serif heading font (web-safe serif fallback: Georgia, Times New Roman)
  - Sans-serif body font (web-safe: Arial, Helvetica)
- [ ] Party Girl Events logo in email header
- [ ] Footer: business address, unsubscribe (if applicable), social links
- [ ] Emails render correctly in Gmail, Apple Mail, Outlook, and Yahoo Mail
- [ ] Emails render correctly on mobile (responsive design)

### Error Handling
- [ ] Failed email sends are caught and logged (not silently swallowed)
- [ ] Form submission succeeds even if email sending fails (email is non-blocking)
- [ ] Failed emails logged with recipient, subject, and error details for manual follow-up
- [ ] Retry logic: 2 automatic retries on transient failures

---

## Technical Notes

- Resend provides a first-class React Email integration — templates render server-side to HTML
- Email sending should happen in the same API route that handles form submission (`/api/contact` or similar):
  1. Validate form data (Zod)
  2. Store lead in Supabase
  3. Send notification email to Stephanie (async, non-blocking)
  4. Send confirmation email to couple (async, non-blocking)
  5. Sync to CRM (async, non-blocking — Epic 04 US-001)
  6. Return success to client
- Use `Promise.allSettled()` for parallel email sends + CRM sync — any individual failure should not block the others
- React Email templates can be previewed locally with `npx react-email dev`
- Resend free tier: 100 emails/day, 3000/month — more than sufficient for a wedding planner
- Environment variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFICATION_EMAIL` (Stephanie's email)

---

## Dependencies

- Epic 02 (Inquiry form must be built and submitting data)
- Resend account created and sending domain verified
- DNS records (SPF, DKIM, DMARC) configured for the sending domain
- Party Girl Events logo available for email header
- Epic 04 US-002 (Calendly URL for discovery call link in confirmation email)

---

## Definition of Done

- [ ] Inquiry form submission triggers both notification and confirmation emails
- [ ] Notification email received by Stephanie with all lead data, formatted and scannable
- [ ] Confirmation email received by the couple — warm, branded, personal
- [ ] Both emails render correctly in Gmail, Apple Mail, Outlook (tested with Litmus or Email on Acid, or manual testing)
- [ ] Both emails render correctly on mobile devices
- [ ] Email design matches site branding (cream, terracotta, serif headings)
- [ ] Form submission works even if email sending fails
- [ ] React Email templates are type-safe and located in `src/emails/`
- [ ] No email-related console errors in production
