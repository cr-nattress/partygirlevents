# US-007 — Contact & Multi-Step Inquiry Form

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 8
**Status:** Not Started

---

## Description

Build the Contact page with a multi-step adaptive inquiry form that serves as THE most critical conversion element of the entire site. Every page on the site funnels visitors toward this form -- it is where interest becomes a lead. The current site has a basic contact form with no structure, no progressive disclosure, and no intelligence. The new form uses a 5-step adaptive flow that feels like a conversation rather than a questionnaire, progressively collecting wedding details while adapting questions based on previous answers. Form data is stored in Supabase, auto-emails are sent to both Stephanie and the couple via Resend, and the form integrates with HoneyBook CRM for lead management. The confirmation experience includes a Calendly embed for immediate discovery call booking, turning a form submission into a scheduled conversation.

---

## Acceptance Criteria

### Multi-Step Adaptive Form (`/contact/`)

- [ ] Page title: "Get in Touch | Party Girl Events"
- [ ] Page headline: "Let's Start Planning Your Perfect Day" or similar warm, inviting headline
- [ ] Introductory paragraph (1-2 sentences): setting the tone that this is the beginning of a conversation, not a transaction

- [ ] **5-step adaptive form flow:**

  **Step 1: "What are you dreaming of?"**
  - [ ] Large, visually appealing selection cards (not a dropdown):
    - Full Wedding
    - Intimate Elopement
    - Destination Wedding
    - Day-of Coordination
    - Other Event
  - [ ] Each option includes a brief description or tagline beneath the label
  - [ ] Icons or illustrations on each card for visual appeal
  - [ ] Single selection required; clicking an option highlights it with active state
  - [ ] "Next" button or auto-advance on selection (decide during implementation, document the choice)

  **Step 2: Event Details (adapts based on Step 1 selection)**
  - [ ] Questions adapt dynamically based on the wedding type selected in Step 1:

    *If Full Wedding:*
    - [ ] Estimated guest count (range selector or selectable tiles: 50-100, 100-200, 200-300, 300+)
    - [ ] Preferred date or month/year (date picker with "We're flexible" option)
    - [ ] Venue status: "Have a venue" / "Exploring venues" / "Need help finding one"

    *If Intimate Elopement:*
    - [ ] Guest count (range tiles: Just us, 2-10, 10-25, 25-50)
    - [ ] Preferred date or season
    - [ ] Venue status: "Have a location in mind" / "Want suggestions" / "Completely open"

    *If Destination Wedding:*
    - [ ] Guest count (range selector)
    - [ ] Preferred date or month/year
    - [ ] "Where are you traveling from?" (free text or state selector)
    - [ ] Venue status: "Have a venue" / "Exploring venues" / "Need help finding one"

    *If Day-of Coordination:*
    - [ ] Wedding date (date picker -- required, since they are further along in planning)
    - [ ] Guest count (range selector)
    - [ ] Venue name (free text -- they likely have one)
    - [ ] "How far along is your planning?" (Just started / Mostly planned / Almost done)

    *If Other Event:*
    - [ ] Event type (free text)
    - [ ] Estimated guest count (range selector)
    - [ ] Preferred date or timeframe
    - [ ] Brief description of what you are looking for (textarea)

  **Step 3: "Where in Colorado?"**
  - [ ] Location selection with visually appealing cards featuring representative thumbnail photos:
    - Vail
    - Beaver Creek
    - Aspen
    - Breckenridge
    - Keystone
    - Not sure yet
  - [ ] Single or multi-select (couple may be considering multiple locations)
  - [ ] Each location card includes location name and representative thumbnail photo

  **Step 4: "What's your investment range?"**
  - [ ] Budget range options adapt based on Step 1 wedding type selection:

    *Full Wedding / Destination Wedding ranges:*
    - Under $5,000
    - $5,000 - $10,000
    - $10,000 - $20,000
    - $20,000 - $35,000
    - $35,000+
    - "I'd rather discuss this on a call"

    *Intimate Elopement ranges:*
    - Under $2,500
    - $2,500 - $5,000
    - $5,000 - $10,000
    - $10,000+
    - "I'd rather discuss this on a call"

    *Day-of Coordination ranges:*
    - Under $2,000
    - $2,000 - $3,500
    - $3,500 - $5,000
    - $5,000+
    - "I'd rather discuss this on a call"

    *Other Event:*
    - Same as Full Wedding ranges

  - [ ] Reassurance text: "No judgment here -- this helps us recommend the right service level for you"
  - [ ] "I'd rather discuss this on a call" option available for every wedding type (removes pressure)

  **Step 5: Contact Information**
  - [ ] Name (first and last -- required)
  - [ ] Email address (required)
  - [ ] Phone number (optional, with note: "Only if you prefer a call or text")
  - [ ] "Tell us more about your vision" free text area (optional, 500 character limit with counter)
  - [ ] "How did you hear about us?" dropdown (Google, Instagram, Referral, Wedding Wire, The Knot, Other)
  - [ ] Privacy note: "We will never share your information. See our [Privacy Policy](/privacy/)."
  - [ ] Submit button: "Send My Inquiry" or "Let's Get Started"

  **Confirmation Page/State**
  - [ ] "Thank you, [First Name]! Stephanie will reach out within 24 hours."
  - [ ] Personalized confirmation message based on wedding type selected
  - [ ] "What to Expect Next" section: brief description of the discovery call process
  - [ ] Calendly embed for booking a discovery call immediately: "Want to skip the wait? Book your free discovery call now."
  - [ ] Social links: "In the meantime, follow us on Instagram for inspiration"
  - [ ] Link back to homepage or portfolio: "While you wait, explore our portfolio"

### Form UX & Interaction

- [ ] Progress bar at the top showing completion percentage (e.g., "Step 2 of 5" with visual bar)
- [ ] Progress bar fills proportionally with animated transition
- [ ] Framer Motion step transitions: slide and fade animation between steps (slide-left on advance, slide-right on back)
- [ ] "Back" button available on steps 2-5 to navigate to previous step without losing data
- [ ] Form state persisted in `sessionStorage` so users do not lose progress on page refresh or accidental navigation
- [ ] `sessionStorage` cleared on successful submission
- [ ] Adaptive logic: Step 2 questions change dynamically based on Step 1 selection
- [ ] Adaptive logic: Step 4 budget ranges change dynamically based on Step 1 selection
- [ ] Loading state on final submit: button shows spinner, prevents double-submission
- [ ] Error state on submission failure: "Something went wrong. Please try again or email us directly at [email]."
- [ ] Page also includes direct contact fallbacks (email address, phone number, response time expectation)

### Validation

- [ ] React Hook Form with Zod validation schema per step
- [ ] Zod schemas defined per step:
  - Step 1: `weddingType` required enum
  - Step 2: Conditional schema based on `weddingType` (Zod discriminated union or `.refine()`)
  - Step 3: `location` required (string or array)
  - Step 4: `budgetRange` required enum
  - Step 5: `name` required string, `email` required email format, `phone` optional with format validation, `notes` optional max 500 chars
- [ ] Validation runs on each step before advancing to the next
- [ ] Inline error messages displayed below the relevant field
- [ ] Required fields clearly marked (asterisk or "Required" label)
- [ ] Form cannot be submitted unless all required fields in all steps are valid

### Mobile Optimization

- [ ] Mobile-first design: single column layout, large touch targets (minimum 44x44px)
- [ ] Selection cards are full-width on mobile with generous tap areas
- [ ] Swipe-friendly transitions between steps (optional: swipe left/right to navigate)
- [ ] Keyboard does not obscure form fields on mobile (scroll into view on focus)
- [ ] Input fields use appropriate mobile keyboard types (`type="email"`, `type="tel"`, `inputMode="numeric"`)

### Data Storage & Backend

- [ ] Form data stored in Supabase `inquiries` table
- [ ] Table uses JSONB column for flexible schema (accommodates varying Step 2 fields per wedding type)
- [ ] Row includes: `id` (UUID), `created_at` (timestamp), `wedding_type` (text), `name` (text), `email` (text), `phone` (text, nullable), `location` (text[]), `budget_range` (text), `form_data` (JSONB -- all step responses), `referral_source` (text), `status` (text, default: "new", constrained to: new, contacted, booked, archived), `notes` (text), `utm_source` (text, nullable), `utm_medium` (text, nullable), `utm_campaign` (text, nullable)
- [ ] Server action or API route handles form submission (`src/app/api/inquiry/route.ts` or `src/app/(marketing)/contact/actions.ts`)
- [ ] Server-side Zod validation of the complete payload
- [ ] Submission endpoint returns success/error response to the client
- [ ] UTM parameters captured from URL on page load and included in submission payload

### Email Notifications

- [ ] Auto-email to Stephanie via Resend on form submission:
  - Formatted lead summary with all form data organized by step
  - Wedding type, date, location, budget range clearly highlighted
  - Reply-to set to the couple's email address
  - Subject: "New Inquiry: [Wedding Type] - [Name]"
- [ ] Auto-email to couple via Resend on form submission:
  - Personalized greeting using their first name
  - Summary of what they shared
  - "What to Expect" next steps (Stephanie will review and reach out within 24 hours)
  - Discovery call booking link (Calendly)
  - Warm, on-brand tone matching Stephanie's voice
  - Party Girl Events branding
  - Subject: "We Got Your Message, [First Name]! Here's What's Next"

### CRM Integration

- [ ] HoneyBook CRM sync via webhook (implementation coordinated with Epic 04)
- [ ] Form data mapped to HoneyBook lead fields
- [ ] Webhook fires asynchronously after successful Supabase insert (does not block form confirmation)
- [ ] Graceful failure handling: if HoneyBook webhook fails, inquiry is still stored in Supabase and Stephanie still receives the email
- [ ] Failures logged for manual retry

### Anti-Spam

- [ ] Honeypot field: hidden field that bots fill but humans do not -- submission rejected silently if populated
- [ ] Rate limiting on submission endpoint: maximum 3 submissions per IP per hour
- [ ] No CAPTCHA (friction too high for a luxury wedding brand)

### Analytics

- [ ] PostHog events tracked at each stage of the form funnel:
  - `form_start`: when the contact page loads or user interacts with Step 1
  - `form_step_complete`: fired on each step completion (includes step number, step name, and wedding type)
  - `form_submit`: fired on successful submission (includes wedding type, location, budget range)
  - `form_abandon`: fired when user leaves the page with a partially completed form (via `beforeunload` event, includes last step reached)
  - `form_error`: fired when validation errors occur (includes step and field)
  - `calendly_click`: fired when user clicks to book a discovery call on confirmation page
- [ ] Funnel analysis: identify which step has the highest drop-off rate
- [ ] Track which wedding types and budget ranges are selected most frequently

---

## Technical Notes

- **Route:** `src/app/(marketing)/contact/page.tsx`
- **Rendering:** The page shell is a Server Component. The multi-step form itself is a Client Component (`"use client"`) due to interactivity requirements. Main form component: `src/components/contact/InquiryForm.tsx` with sub-components per step: `Step1WeddingType.tsx`, `Step2EventDetails.tsx`, `Step3Location.tsx`, `Step4Budget.tsx`, `Step5ContactInfo.tsx`, `StepConfirmation.tsx`.
- **Form state management:** React Hook Form `useForm` with a single form instance spanning all steps. Use `useFormContext` in step sub-components. Zod schema is a discriminated union based on `weddingType` field for adaptive validation. Use `watch()` for conditional rendering in Step 2 and Step 4.
- **Step transitions:** Framer Motion `AnimatePresence` with `mode="wait"` and `motion.div` per step. Use `key={currentStep}` for exit/enter animations. Direction-aware animations: `custom` prop passes direction (1 for forward, -1 for back) to `variants`.
- **Session persistence:** Serialize form state to `sessionStorage` on every field change (debounced at ~300ms). On mount, hydrate form from `sessionStorage` if data exists. Clear `sessionStorage` on successful submission.
- **Supabase table schema:**
  ```sql
  CREATE TABLE inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    wedding_type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT[],
    budget_range TEXT,
    form_data JSONB NOT NULL,
    referral_source TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked', 'archived')),
    notes TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT
  );
  ```
- **Email templates:** Build Resend email templates using React Email (`@react-email/components`). Store in `src/emails/InquiryNotification.tsx` (to Stephanie) and `src/emails/InquiryConfirmation.tsx` (to couple).
- **Calendly embed:** Use the Calendly inline embed widget (`calendly-inline-widget`) or popup widget on the confirmation page. Load script dynamically to avoid impacting initial page load performance.
- **HoneyBook webhook:** Fire asynchronously via `fetch` in the server action after Supabase insert. Wrap in try/catch so webhook failure does not block the user response. Log failures for retry. If direct HoneyBook API is limited, implement a generic webhook endpoint connectable via Zapier/Make.
- **Rate limiting:** Use Upstash Redis rate limiter (`@upstash/ratelimit`) for distributed rate limiting with IP-based keys. Fallback: simple in-memory counter per serverless function instance.
- **SEO:** Target keywords: "contact wedding planner Colorado," "hire wedding planner Vail," "wedding planner inquiry." Open Graph tags with a warm, inviting image. Meta description should mention free discovery call and 24-hour response time.
- **Performance:** Form components lazy-loaded below the fold. Step sub-components can be code-split with `next/dynamic` if bundle size is a concern.
- **Accessibility:** Option cards function as radio buttons (`role="radiogroup"` and `role="radio"`) with proper `aria-checked` states. Progress bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Validation errors associated with fields via `aria-describedby`. Focus management: focus moves to the first interactive element of each new step on transition. Screen reader announces step transitions via live region or focus-based announcement. All form fields have visible labels (not placeholder-only).

---

## Dependencies

- **Epic 01 US-001:** Project initialization (Next.js 15, Tailwind, Framer Motion, React Hook Form, Zod installed)
- **Epic 01 US-002:** Design tokens (colors, typography, spacing)
- **Epic 01 US-003:** UI component library (Button, Input, Select, Card, ProgressBar components)
- **Epic 01 US-004:** Layout components (Header, Footer, Section, Container)
- **Epic 01 US-005:** CMS content infrastructure (if any contact page content is CMS-driven)
- **Supabase:** Database setup with `inquiries` table created and RLS policies configured
- **Resend:** API key configured, sender domain verified, email templates built
- **Epic 04 (coordination):** HoneyBook CRM webhook endpoint specification (form can launch without this; webhook added in Epic 04)
- **From Stephanie:** Inquiry form field validation rules (budget ranges per wedding type, guest count thresholds), confirmation email copy in her voice, Calendly scheduling link, preferred response time commitment (24 hours), email address for lead notifications

---

## Definition of Done

- [ ] Multi-step form renders all 5 steps with correct adaptive logic based on wedding type selection
- [ ] Step 2 questions change dynamically based on Step 1 wedding type
- [ ] Step 4 budget ranges change dynamically based on Step 1 wedding type
- [ ] Progress bar accurately reflects completion percentage across all steps and is accessible (`role="progressbar"`)
- [ ] Framer Motion transitions between steps are smooth and direction-aware (forward = slide left, back = slide right)
- [ ] "Back" button navigates to the previous step without losing form data
- [ ] Form state persists in `sessionStorage` and survives page refresh
- [ ] Zod validation runs on each step and displays inline error messages
- [ ] Form submission creates a row in Supabase `inquiries` table with all form data in correct schema
- [ ] Auto-email to Stephanie fires on submission with formatted lead summary
- [ ] Auto-email to couple fires on submission with personalized confirmation, next steps, and Calendly link
- [ ] Confirmation page displays personalized thank-you message with couple's first name
- [ ] Calendly embed loads on the confirmation page for immediate discovery call booking
- [ ] Honeypot field rejects bot submissions silently
- [ ] Rate limiting prevents more than 3 submissions per IP per hour
- [ ] UTM parameters captured from URL and stored with submission
- [ ] Error states handled gracefully (network failure, server error, rate limit hit)
- [ ] All PostHog analytics events fire correctly: `form_start`, `form_step_complete`, `form_submit`, `form_abandon`, `form_error`, `calendly_click`
- [ ] Form renders correctly on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Touch targets meet minimum 44x44px on mobile
- [ ] All form interactions are keyboard accessible
- [ ] Screen reader can navigate the entire form flow with proper ARIA attributes
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] Content reviewed and approved by Stephanie
- [ ] Passes accessibility audit (keyboard navigation, screen reader, focus management, color contrast, form labels, error announcements)
