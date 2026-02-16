# US-006 — Email Nurture Sequences

**Epic:** [06 — Differentiators](README.md)
**Priority:** P1 — Should Have
**Points:** 3
**Status:** Not Started

---

## Description

Set up two automated email nurture sequences in ConvertKit that follow up with leads captured through the wedding style quiz (US-001) and the planning guide download (US-005). Each sequence delivers value-first content that builds trust, demonstrates expertise, and naturally guides the couple toward booking a discovery call. Emails are branded to match the site design using custom HTML templates, comply with CAN-SPAM regulations, and include proper unsubscribe handling. These sequences turn one-time interactions into ongoing relationships.

---

## Acceptance Criteria

### Quiz Lead Sequence (5 emails over 3 weeks)
- [ ] **Email 1 (Day 0):** Quiz results reminder — recap their style name, color palette, top recommendations. "Here's everything from your quiz results in one place." CTA: View full results page.
- [ ] **Email 2 (Day 3):** Relevant blog post — selected based on quiz answers (e.g., mountain-style answers → "Guide to Colorado Mountain Weddings"). Shows Stephanie's expertise. CTA: Read the article.
- [ ] **Email 3 (Day 7):** Case study — a real wedding that matches their quiz style. "This couple had a similar vision — here's how we brought it to life." CTA: View the case study.
- [ ] **Email 4 (Day 14):** Services overview — what working with Stephanie looks like, what's included, investment framing. "Here's how we'd bring your [style name] vision to life." CTA: View services.
- [ ] **Email 5 (Day 21):** Book a call CTA — direct, warm invitation. "I'd love to hear more about your plans. Let's chat." CTA: Book a free discovery call (Calendly link).

### Guide Download Sequence (3 emails over 2 weeks)
- [ ] **Email 1 (Day 0):** Guide delivery + welcome — download link, brief intro to Stephanie and Party Girl Events. "Here's your Mountain Wedding Planning Guide."
- [ ] **Email 2 (Day 5):** Planning tips — "3 Things I Wish Every Couple Knew Before Planning a Mountain Wedding." Practical, valuable content from Stephanie's experience. CTA: Read more on the blog.
- [ ] **Email 3 (Day 14):** Discovery call CTA — "If you're starting to plan, I'd love to help. Here's what a free discovery call looks like." CTA: Book a discovery call (Calendly link).

### Email Design & Branding
- [ ] Custom HTML email templates matching the site's design system:
  - Warm cream background (#FAF7F2)
  - Heading font styling matching site typography
  - Terracotta accent color for CTA buttons (#C4926E)
  - Party Girl Events logo in header
  - Footer with: physical address, unsubscribe link, social links
- [ ] Templates built in ConvertKit's email designer or imported as custom HTML
- [ ] Templates tested across major email clients: Gmail (web + mobile), Apple Mail, Outlook

### ConvertKit Configuration
- [ ] Two automation sequences created in ConvertKit:
  - "Quiz Lead Nurture" — triggered by "quiz-completed" tag
  - "Guide Download Nurture" — triggered by "guide-downloaded" tag
- [ ] Subscribers tagged appropriately when entering each sequence
- [ ] Sequences do not overlap: if a subscriber is in one sequence, delay or skip duplicate content in the other
- [ ] Subscribers who book a discovery call (tagged "booked-call") are removed from active nurture sequences

### Compliance
- [ ] Every email includes a physical mailing address (CAN-SPAM requirement)
- [ ] Every email includes a one-click unsubscribe link
- [ ] Unsubscribe requests processed within 10 business days (ConvertKit handles automatically)
- [ ] Email content does not use deceptive subject lines
- [ ] Opt-in is explicit: subscribers actively entered their email in exchange for quiz results or guide download (no pre-checked boxes, no purchased lists)

### Analytics
- [ ] ConvertKit tracking: open rate, click rate, unsubscribe rate per email in each sequence
- [ ] PostHog events (via ConvertKit webhook or UTM tracking): `nurture_email_opened`, `nurture_email_clicked`, `nurture_email_unsubscribed` (if technically feasible via webhooks)
- [ ] Track end-of-sequence conversion: how many nurture leads book a discovery call within 30 days

---

## Technical Notes

- **ConvertKit Setup:** Use ConvertKit's visual automation builder for sequence logic. Each sequence is a "Visual Automation" with time-based delays between emails.
- **Tagging:** Quiz completion (US-001) must tag the subscriber with "quiz-completed" via ConvertKit API. Guide download (US-005) must tag with "guide-downloaded." Both tags trigger their respective sequences.
- **Dynamic Content:** ConvertKit supports merge fields (subscriber first name, custom fields). Store quiz style name as a custom field on the subscriber for personalization in quiz sequence emails.
- **Email Templates:** ConvertKit supports custom HTML templates. Build the base template as HTML/CSS (inline styles for email compatibility). Consider using MJML as a preprocessor for responsive email HTML.
- **Webhook Integration:** ConvertKit can fire webhooks on subscriber events. Use these to update Supabase lead records with email engagement data (optional enhancement).
- **Testing:** Use ConvertKit's "Send Test Email" feature and Litmus/Email on Acid for cross-client rendering tests.

---

## Dependencies

- **US-001:** Quiz lead data and ConvertKit tagging must be implemented before the quiz nurture sequence can function
- **US-005:** Guide download and ConvertKit tagging must be implemented before the guide nurture sequence can function
- **Epic 04:** ConvertKit API integration (API keys, subscriber management)
- **Epic 02 US-007:** Contact/inquiry form — the "book a discovery call" CTA in nurture emails links to this
- **From Stephanie:** Review and approval of all email copy. Email content should sound like Stephanie, not marketing automation.

---

## Definition of Done

- [ ] Quiz lead nurture sequence (5 emails) configured and tested in ConvertKit
- [ ] Guide download nurture sequence (3 emails) configured and tested in ConvertKit
- [ ] Email templates match site branding and render correctly in Gmail, Apple Mail, and Outlook
- [ ] Sequences trigger correctly when subscribers are tagged
- [ ] No sequence overlap for subscribers in both sequences
- [ ] Booked-call subscribers removed from active sequences
- [ ] CAN-SPAM compliance verified: physical address, unsubscribe link, honest subject lines
- [ ] ConvertKit reports open rate, click rate, and unsubscribe rate per email
- [ ] All email copy reviewed and approved by Stephanie
- [ ] Test run completed: both sequences sent end-to-end to a test email address
