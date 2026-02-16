# US-005 — Process / How It Works Page

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Build an interactive visual timeline page that walks prospective couples through the entire planning journey from first inquiry to post-wedding wrap-up. The current site has no process page at all, leaving couples wondering "what do I actually get when I hire a wedding planner?" This is one of the top objections surfaced in Reddit research. The Process page demystifies the planning experience by showing each stage with clear descriptions of what happens, what the couple is responsible for, what Stephanie handles, and how long each stage typically takes. Scroll-triggered animations progressively reveal each stage as the visitor scrolls, creating an engaging narrative experience.

---

## Acceptance Criteria

### Process Timeline (`/process/`)

- [ ] Page headline: "How It Works" or "Your Planning Journey" or "From First Call to 'I Do'"
- [ ] Introductory paragraph (2-3 sentences) setting expectations: working with a planner is a partnership, here is exactly what that looks like

- [ ] **7-stage interactive visual timeline** displayed vertically, each stage revealed via scroll-triggered animation:

  **Stage 1: Inquiry**
  - [ ] Title: "Reach Out" or "Say Hello"
  - [ ] What happens: Couple fills out the inquiry form; Stephanie reviews within 24 hours
  - [ ] What you do: Complete the inquiry form on the website
  - [ ] What Stephanie does: Reviews your details, assesses fit, and prepares for the call
  - [ ] Duration: "Response within 24 hours"

  **Stage 2: Discovery Call**
  - [ ] Title: "Discovery Call" or "Let's Chat"
  - [ ] What happens: 30-minute complimentary video or phone call to discuss vision, ask questions, and see if it is a mutual fit
  - [ ] What you do: Share your vision, ask anything, get a feel for working together
  - [ ] What Stephanie does: Listens, asks about your priorities, shares relevant experience, answers questions
  - [ ] Duration: "30 minutes"
  - [ ] CTA: "Book Your Discovery Call" linking to `/contact/`

  **Stage 3: Custom Proposal**
  - [ ] Title: "Custom Proposal"
  - [ ] What happens: Stephanie creates a tailored proposal with recommended service level, pricing, and a planning roadmap
  - [ ] What you do: Review the proposal, ask follow-up questions, discuss with your partner
  - [ ] What Stephanie does: Crafts a personalized proposal based on your specific wedding vision and needs
  - [ ] Duration: "Delivered within 3-5 days"

  **Stage 4: Contract & Onboarding**
  - [ ] Title: "Let's Make It Official"
  - [ ] What happens: Sign the contract, pay the retainer, and begin the onboarding process
  - [ ] What you do: Sign digitally via HoneyBook, complete the onboarding questionnaire
  - [ ] What Stephanie does: Sets up your planning portal, creates your master timeline, schedules the kickoff meeting
  - [ ] Duration: "1-2 weeks"

  **Stage 5: Planning Together**
  - [ ] Title: "The Fun Part" or "Planning Together"
  - [ ] What happens: The core planning phase -- venue tours, vendor selection, design development, tastings, fittings, logistics
  - [ ] What you do: Make decisions (with guidance), attend tastings and meetings, enjoy the process
  - [ ] What Stephanie does: Manages vendors, coordinates logistics, develops design vision, handles contracts and timelines, keeps everything on track
  - [ ] Duration: "3-12 months (depending on timeline)"
  - [ ] This is the longest section -- can include 3-4 sub-bullets or a mini-timeline within

  **Stage 6: Wedding Day**
  - [ ] Title: "Your Perfect Day"
  - [ ] What happens: Stephanie and team manage every detail so the couple can be fully present
  - [ ] What you do: Get ready, show up, get married, celebrate, enjoy every moment
  - [ ] What Stephanie does: Runs the rehearsal, manages vendor arrivals, handles timeline, solves problems you never know about, coordinates the ceremony and reception
  - [ ] Duration: "Rehearsal + Wedding Day (typically 2 days)"

  **Stage 7: Post-Wedding**
  - [ ] Title: "After the Celebration"
  - [ ] What happens: Wrap-up, vendor payments, gift returns, and a final check-in
  - [ ] What you do: Go on your honeymoon, send thank-you notes
  - [ ] What Stephanie does: Handles final vendor coordination, rental returns, manages any post-event logistics, final meeting to review
  - [ ] Duration: "1-2 weeks post-wedding"

### Timeline Visual Design
- [ ] Vertical timeline layout with a center line (desktop) or left-aligned line (mobile) connecting all stages
- [ ] Each stage has a numbered marker or icon on the timeline line
- [ ] Active/revealed stages have filled markers; upcoming stages have outline markers
- [ ] Each stage card includes: stage title, "What You Do" column, "What Stephanie Does" column, duration badge
- [ ] Alternating left/right card placement on desktop (stages alternate sides of the timeline)
- [ ] Single-column stack on mobile with timeline line on the left

### Animation & Interaction
- [ ] Scroll-triggered reveal: each stage animates into view as the user scrolls (fade-in + slide-up from below)
- [ ] Timeline line draws progressively as user scrolls (SVG line animation or progressive fill)
- [ ] Stage markers fill/activate as their corresponding stage enters the viewport
- [ ] All animations respect `prefers-reduced-motion` (stages visible immediately, no line draw)
- [ ] Smooth, elegant timing -- stages should feel like they are being "unveiled" not "popping in"

### CTAs & Navigation
- [ ] CTA button at Stage 2 (Discovery Call): "Book Your Discovery Call" linking to `/contact/`
- [ ] CTA button at the bottom of the page: "Ready to Start? This Is Where It Begins." linking to `/contact/`
- [ ] Optional: Sticky progress indicator showing which stage is currently in view (nice-to-have, not required)
- [ ] Breadcrumb navigation: Home > How It Works

---

## Technical Notes

- **Route:** `src/app/(marketing)/process/page.tsx`
- **Rendering:** Static generation. Content can be hardcoded (structured data in the component or a constants file) or CMS-driven.
- **Timeline component:** Build as `src/components/process/ProcessTimeline.tsx`. Consider building the timeline line as an SVG path with Framer Motion `pathLength` animation for the progressive draw effect.
- **Scroll detection:** Use Framer Motion `useScroll` and `useTransform` for the timeline progress, and `useInView` for individual stage reveals. Wrap each stage in a `motion.div` with `initial`, `whileInView`, and `viewport` props.
- **Layout:** CSS Grid or Flexbox for the alternating left/right pattern. Each stage card is a `<section>` or `<article>` element.
- **"What You Do" / "What Stephanie Does" columns:** Consider a two-column layout within each stage card, or tabbed content on mobile if horizontal space is limited.
- **HowTo schema:** Consider `HowTo` schema markup for SEO rich snippets (step-by-step planning process).
- **Analytics events:** Track `process_page_view`, `process_stage_view` (which stages are scrolled to), `process_cta_click` via PostHog.
- **SEO:** Target keywords like "wedding planning process," "what does a wedding planner do," "how wedding planning works Colorado."

---

## Dependencies

- **Epic 01:** All foundation stories complete (design tokens, UI components, layout)
- **From Stephanie:** Descriptions of what she does at each stage (in her voice), typical durations for each stage, any stage-specific details unique to her process (e.g., does she use a specific planning portal?)

---

## Definition of Done

- [ ] Process page renders with all 7 stages on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Vertical timeline with alternating cards displays correctly on desktop
- [ ] Single-column timeline with left-aligned line displays correctly on mobile
- [ ] Scroll-triggered reveal animations fire sequentially as user scrolls through stages
- [ ] Timeline line draws progressively (or stages activate progressively) on scroll
- [ ] All animations respect `prefers-reduced-motion`
- [ ] CTA buttons at Stage 2 and page bottom link correctly to `/contact/`
- [ ] Each stage clearly shows: what happens, what the couple does, what Stephanie does, and duration
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] Content reviewed and approved by Stephanie
- [ ] Passes accessibility audit (keyboard navigation, screen reader, color contrast, semantic structure)
