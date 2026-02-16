# US-006 — AI Timeline Generator

**Epic:** [07 — AI Features](README.md)
**Priority:** P2 — Nice to Have
**Points:** 3
**Tier:** 2 — Standalone AI Tools
**Status:** Not Started

---

## Description

Build an interactive wedding planning timeline tool at `/tools/timeline/` that generates a personalized, month-by-month countdown based on the couple's wedding date, wedding type, and current planning status. The tool works backwards from the wedding date, producing visual milestones with specific action items, priority coding, and Colorado-specific tips that account for altitude, weather windows, and mountain venue demand. GPT-4o-mini personalizes the timeline dynamically based on how far out the couple is from their date, ensuring late planners see compressed, prioritized action lists while early planners get a relaxed, thorough roadmap. Export options (Google Calendar, PDF, email) serve as natural lead capture mechanisms while providing genuine utility that keeps couples returning to the site.

---

## Acceptance Criteria

### Input Form
- [ ] Multi-step or single-page form at `/tools/timeline/` with the following fields:
  - **Wedding date:** Date picker component (must be a future date)
  - **Wedding type:** Select from Full Wedding / Elopement / Destination
  - **Current planning status:** Select from Haven't Started / Just Engaged / In Progress / Final Stretch
  - **Colorado-specific:** Yes/No toggle (when Yes, timeline includes altitude, weather, and travel logistics adjustments)
- [ ] Form validates all required fields before submission
- [ ] Clear CTA button: "Generate My Timeline" or similar
- [ ] Mobile-friendly form layout with accessible inputs

### Timeline Generation
- [ ] On form submission, API route sends inputs to GPT-4o-mini to generate personalized timeline
- [ ] Timeline works backwards from wedding date, calculating months remaining and distributing milestones accordingly
- [ ] Each milestone includes:
  - Month marker (e.g., "12 Months Out — January 2027")
  - Specific action items for that month
  - Priority code: **Must Do** (red/urgent), **Should Do** (amber/important), **Nice to Have** (green/optional)
  - Colorado-specific tip when Colorado toggle is enabled
- [ ] Timeline adjusts dynamically based on how far out the couple currently is:
  - If 18+ months out: full relaxed timeline with all Nice to Have items included
  - If 6-12 months out: compressed timeline, Must Do and Should Do items emphasized, Nice to Have items deprioritized
  - If < 6 months out: accelerated timeline, only Must Do items with aggressive scheduling, warning that some items may require rush fees
- [ ] Elopement type generates a simplified timeline (fewer vendor categories, emphasis on permits, photographer, officiant)
- [ ] Destination type generates timeline with travel logistics milestones (guest travel info, welcome bags, rehearsal logistics, weather contingency)

### Colorado-Specific Tips
- [ ] When Colorado toggle is enabled, milestones include relevant Colorado mountain wedding tips, such as:
  - "Book mountain venue 12-18 months out — peak season (June-October) fills fast"
  - "Order cold-weather backup plan by June for fall wedding"
  - "Send save-the-dates with altitude/travel advisory for out-of-state guests"
  - "Confirm venue has indoor backup — afternoon thunderstorms are common June-August"
  - "Book hotel room blocks early — mountain town lodging is limited"
  - "Schedule hair/makeup trial at altitude — products perform differently above 7,000 ft"
  - "Plan ceremony before 2pm to avoid afternoon mountain weather"
  - "Arrange guest transportation — mountain roads can be challenging, especially in winter"
- [ ] Tips are contextual to the month and milestone, not generic

### Timeline UI
- [ ] Visual interactive timeline display (vertical timeline on desktop, stacked cards on mobile)
- [ ] Each milestone is expandable/collapsible to show full detail
- [ ] Priority-coded items visually distinguished with color or icon (Must Do = red badge, Should Do = amber badge, Nice to Have = green badge)
- [ ] Colorado tips highlighted with a distinct visual treatment (mountain icon or Colorado flag accent)
- [ ] Progress indicator or scroll position tracker for long timelines
- [ ] Smooth animations on expand/collapse (Framer Motion or CSS transitions)
- [ ] Responsive design: works on mobile, tablet, and desktop

### AI Enhancement
- [ ] GPT-4o-mini generates personalized tips beyond the base template:
  - If "Just Engaged" + 18 months out: "Congratulations! You have great timing — enjoy the engagement for a month before diving into planning."
  - If "In Progress" + 4 months out: "You're in the home stretch! Focus on confirmations and final details. Here's what to prioritize..."
  - If Colorado + Destination: "Your guests will need altitude adjustment tips — consider including this in your welcome packet."
- [ ] AI personalizes action item descriptions based on wedding type (elopement action items read differently from full wedding)
- [ ] Streaming response via Vercel AI SDK for progressive timeline rendering

### Export Options
- [ ] **Google Calendar integration:** Button to add all milestones as calendar events via Google Calendar API
  - Each event includes: milestone title, action items in description, appropriate date
  - Events created as all-day events on the target date
  - Requires Google OAuth consent
- [ ] **PDF download:** Generate a styled PDF of the full timeline
  - Includes all milestones, action items, priority codes, and Colorado tips
  - Branded with Party Girl Events logo and footer with contact info
  - Generated server-side (e.g., using `@react-pdf/renderer` or Puppeteer)
- [ ] **Email to self:** Send the full timeline as a formatted email
  - React Email template with timeline content
  - Sent via Resend

### Lead Capture
- [ ] Export and email options require the user to provide their email address before completing the action
- [ ] Email stored in Supabase `leads` table with `source = "timeline_tool"`
- [ ] Lead record includes: email, wedding date, wedding type, planning status, Colorado flag, timestamp
- [ ] Stephanie receives a notification when a new lead is captured from the timeline tool
- [ ] Timeline generation itself is free and does not require email (captures email only on export/email action)

### Analytics
- [ ] PostHog events tracked:
  - `timeline_tool_start` — user opens the tool page
  - `timeline_tool_generate` — user submits the form and generates a timeline (with properties: wedding_type, planning_status, colorado_flag, months_until_wedding)
  - `timeline_tool_expand_milestone` — user expands a milestone for detail
  - `timeline_tool_complete` — user scrolls through or interacts with full timeline
  - `timeline_tool_export` — user exports (with property: export_type = "google_calendar" | "pdf" | "email")
  - `timeline_tool_lead_captured` — email captured during export flow

### Rate Limiting
- [ ] Upstash Redis rate limiting: 5 timeline generations per IP per hour
- [ ] When rate limit hit: "You've generated several timelines! For personalized planning help, [book a free consultation with Stephanie](calendly link)."

---

## Technical Notes

- **Page Route:** `src/app/tools/timeline/page.tsx` — server component wrapper with client-side interactive form
- **Client Component:** `src/components/tools/timeline-form.tsx` — input form, `src/components/tools/timeline-display.tsx` — interactive timeline UI
- **API Route:** `src/app/api/tools/timeline/route.ts` — accepts form input, calls GPT-4o-mini, returns structured timeline JSON
- **Prompt Engineering:** System prompt includes a base timeline template for each wedding type, with instructions to personalize based on months remaining, planning status, and Colorado flag. Include 3-5 example Colorado tips per milestone category for consistent quality.
- **Response Format:** Instruct GPT-4o-mini to return a structured JSON array of milestones. Validate with Zod schema before rendering.
- **Google Calendar API:** Use the Google Calendar API v3 with OAuth 2.0. Create events using `events.insert` endpoint. Consider using `events.quickAdd` for simpler implementation. Store OAuth tokens securely.
- **PDF Generation:** Use `@react-pdf/renderer` for server-side PDF generation. Template should match site branding (colors, fonts, logo). Generate on-demand via an API route (`src/app/api/tools/timeline/pdf/route.ts`).
- **Email:** Use existing Resend integration with a new React Email template (`src/emails/timeline-results.tsx`).
- **Caching:** Cache the base timeline template per combination of (wedding_type, colorado_flag) to reduce API calls. Only the personalization layer (based on months out and planning status) needs to be generated dynamically.
- **Token Budget:** Target 500-800 tokens per timeline generation (~$0.02-0.03 per generation at GPT-4o-mini pricing).
- **Fallback:** If OpenAI API is unavailable, serve a static base timeline template (without AI personalization) and display: "Our AI personalization is temporarily unavailable, but here's a comprehensive planning timeline to get started."

---

## Dependencies

- **Epic 01 US-001:** Supabase project, OpenAI API key configured
- **Epic 01 US-003:** UI component library (DatePicker, Select, Toggle, Button, Card, Accordion)
- **Epic 04:** Resend email integration for email export
- **Google Calendar API:** OAuth credentials configured for Google Calendar event creation
- **Upstash Redis:** For rate limiting (shared across AI tools)

---

## Expected Outcomes

- **High engagement tool:** Couples return multiple times as their planning progresses to check off milestones
- **Lead capture:** Export/email flow captures email addresses of highly engaged couples (planning-stage leads)
- **Colorado differentiation:** Colorado-specific tips reinforce Stephanie's mountain wedding expertise and local knowledge
- **SEO value:** `/tools/timeline/` page targets "wedding planning timeline" and "Colorado wedding planning checklist" keywords
- **Referral potential:** Shareable timelines encourage couples to share the tool with engaged friends

---

## Definition of Done

- [ ] Timeline form accepts all input fields and validates correctly
- [ ] AI generates personalized, month-by-month timeline working backwards from wedding date
- [ ] Timeline adjusts for wedding type (Full / Elopement / Destination) with appropriate milestones
- [ ] Timeline adjusts for current planning status (compressed for late planners, relaxed for early planners)
- [ ] Colorado-specific tips appear when Colorado toggle is enabled, contextual to each milestone
- [ ] Priority coding (Must Do / Should Do / Nice to Have) is visually clear and consistent
- [ ] Milestones are expandable/collapsible with smooth animations
- [ ] Google Calendar export creates events for all milestones
- [ ] PDF export generates a branded, readable document
- [ ] Email export sends formatted timeline via Resend
- [ ] All export/email actions require email capture, stored in Supabase `leads` table
- [ ] Rate limiting prevents abuse (5 generations per IP per hour)
- [ ] Fallback state serves static timeline when API is unavailable
- [ ] All PostHog analytics events fire correctly
- [ ] Tool works correctly on mobile, tablet, and desktop
- [ ] Stephanie has reviewed sample timelines and confirmed Colorado tips are accurate
