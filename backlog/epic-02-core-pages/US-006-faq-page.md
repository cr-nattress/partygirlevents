# US-006 — FAQ Page

**Epic:** 02 — Core Pages
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Build a comprehensive FAQ page with 25 questions organized into 5 categories, using an accordion UI with smooth Framer Motion animations and FAQPage schema markup for rich snippet eligibility. The current site has no FAQ page at all, forcing couples to either call/email for basic questions or leave the site entirely. Questions are sourced from Reddit wedding planning research, common wedding planner objections, and Colorado-specific planning concerns. The FAQ page serves dual purposes: answering real visitor questions to reduce friction and remove objections, and capturing organic search traffic for long-tail question keywords. FAQ sections are also embeddable on other pages (e.g., pricing FAQs on the Services hub) via a shared reusable component.

---

## Acceptance Criteria

### FAQ Page (`/faq/`)

- [ ] Page title: "Wedding Planning FAQ | Party Girl Events"
- [ ] Page headline: "Frequently Asked Questions" or "Questions We Hear Most"
- [ ] Introductory paragraph (2-3 sentences): acknowledging that planning a wedding raises a lot of questions, and encouraging visitors to reach out if their question is not answered here

- [ ] **5 category sections** with questions organized under clear headings:

  **Category 1: Pricing & Value (5 questions)**
  - [ ] "How much does a wedding planner cost in Colorado?"
  - [ ] "What does 'starting at' mean for your packages?"
  - [ ] "Is a wedding planner worth the investment?"
  - [ ] "Do you offer payment plans?"
  - [ ] "What percentage of my wedding budget should go to a planner?"

  **Category 2: Process & Working Together (5 questions)**
  - [ ] "What does the planning process look like from start to finish?"
  - [ ] "How far in advance should I book a wedding planner?"
  - [ ] "What is a discovery call and is it free?"
  - [ ] "How often will we communicate during the planning process?"
  - [ ] "What happens if I need to change my wedding date?"

  **Category 3: Services & Packages (5 questions)**
  - [ ] "What is the difference between full service planning and wedding management?"
  - [ ] "Can I customize a package to fit my needs?"
  - [ ] "Do you plan elopements and intimate weddings?"
  - [ ] "Do you plan destination weddings to Colorado for out-of-state couples?"
  - [ ] "What is NOT included in your services?"

  **Category 4: Colorado-Specific (5 questions)**
  - [ ] "What are the best months for a mountain wedding in Colorado?"
  - [ ] "How do you handle weather contingency plans for outdoor mountain weddings?"
  - [ ] "Which Colorado mountain towns do you serve?"
  - [ ] "Do I need special permits for a mountain wedding in Colorado?"
  - [ ] "How does altitude affect wedding planning in Colorado?"

  **Category 5: Logistics & Practical (5 questions)**
  - [ ] "How many weddings do you take per year?"
  - [ ] "Will you be at the wedding the entire day?"
  - [ ] "Do you have vendor recommendations?"
  - [ ] "What if there is an emergency on the wedding day?"
  - [ ] "Do you work with LGBTQ+ couples?"

- [ ] Each category has a visible heading (`<h2>`) separating the groups
- [ ] Each category is a collapsible group that can be expanded/collapsed as a whole
- [ ] Total: 25 questions across 5 categories

### Search & Filter
- [ ] Search/filter input at the top of the FAQ page for finding specific questions
- [ ] Search filters questions in real-time as the user types (client-side filtering)
- [ ] When a search term is active, matching questions are shown regardless of category grouping
- [ ] Clear search button to reset the filter and restore category view
- [ ] "No results found" state with a prompt to contact Stephanie directly

### Accordion UI
- [ ] Each question is an accordion item with the question as the trigger and the answer as the collapsible panel
- [ ] Accordion built on Radix UI `Accordion` primitive for accessibility (proper `aria-expanded`, `aria-controls`, `role` attributes, keyboard navigation)
- [ ] Smooth open/close animation via Framer Motion `AnimatePresence` or CSS transition with `height: auto` support
- [ ] Only one accordion item open at a time within each category (single-expand behavior) -- or optionally allow multiple open (decide during implementation, document the choice)
- [ ] Accordion trigger shows expand/collapse indicator (chevron icon that rotates, or +/- icon)
- [ ] Expanded state visually distinct from collapsed (subtle background color change or border highlight)
- [ ] Answer content supports rich text: paragraphs, bold text, inline links to relevant pages (e.g., link to `/services/` from pricing answers, link to `/process/` from process answers, link to `/contact/` where appropriate)
- [ ] Mobile-first accordion that works with touch interactions (large enough tap targets, no hover-dependent behavior)

### Internal Linking
- [ ] FAQ answers include contextual internal links to relevant site pages:
  - Pricing answers link to `/services/`
  - Process answers link to `/process/`
  - Service-related answers link to specific service detail pages
  - "Contact us" mentions link to `/contact/`
- [ ] Internal links are styled distinctly within answer text (underline, brand color)

### Schema Markup
- [ ] `FAQPage` schema markup (JSON-LD) covering all 25 questions and answers
- [ ] Schema validates on Google Rich Results Test
- [ ] Schema is generated from the same data source as the rendered content (no duplication/drift risk)

### Embedded FAQ Sections
- [ ] FAQ accordion component is reusable and can be embedded on other pages with a filtered subset of questions
- [ ] Services hub page (`/services/`) embeds the "Pricing & Value" category FAQs (implemented in US-002)
- [ ] Component accepts a `category` or `questions` prop to render a filtered subset
- [ ] When embedded on another page, the embedded section includes a "View All FAQs" link to `/faq/`

### CMS Content Model
- [ ] FAQ content fetched from CMS using a dedicated `FAQ` content model
- [ ] Content model fields: `question` (string), `answer` (rich text), `category` (enum: Pricing, Process, Services, Colorado-Specific, Logistics), `sortOrder` (number)
- [ ] Stephanie can add, edit, reorder, and remove FAQ entries without code changes
- [ ] FAQ page rebuilds via ISR when CMS content is updated

### Analytics
- [ ] PostHog events tracked: `faq_page_view`, `faq_question_expand` (with question text or ID and category), `faq_category_view`, `faq_search` (with search term), `faq_cta_click`
- [ ] Track which questions are opened most frequently to inform content strategy and identify gaps

### Navigation & CTA
- [ ] Breadcrumb navigation: Home > FAQ
- [ ] Anchor links from category headings (e.g., `/faq/#pricing`, `/faq/#process`, `/faq/#services`, `/faq/#colorado`, `/faq/#logistics`) for deep linking
- [ ] "Jump to" category navigation at the top for quick access to specific sections
- [ ] CTA section at the bottom: "Still have questions? We would love to hear from you." + "Contact Us" button linking to `/contact/`

### Accessibility
- [ ] Fully keyboard navigable: Enter/Space to toggle accordion items, arrow keys to navigate between items
- [ ] Screen reader friendly: proper ARIA attributes via Radix Accordion (`aria-expanded`, `aria-controls`, `aria-labelledby`)
- [ ] Focus management: visible focus indicators on accordion triggers
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] All animations respect `prefers-reduced-motion` (accordion items visible immediately, no animation)

---

## Technical Notes

- **Route:** `src/app/(marketing)/faq/page.tsx`
- **Rendering:** Static generation with ISR. FAQ content stored in the CMS (`FAQ` content model with question, answer, category, sort order fields). CMS is preferred so Stephanie can update answers without code changes.
- **Accordion component:** Use Radix UI `Accordion` primitive as the base for accessibility guarantees, with Framer Motion layered on top for animation. Component lives in `src/components/ui/Accordion.tsx` (may already exist from Epic 01 US-003). Wrap Radix `Accordion.Content` in a `motion.div` for smooth height transitions.
- **Search component:** Client-side filter component (`src/components/faq/FAQSearch.tsx`) using controlled input with debounced `useState`. Filters the question list by matching against question text and answer text. Requires `"use client"` directive.
- **Schema generation:** Build a utility function `generateFAQSchema(questions)` in `src/lib/schema.ts` that takes an array of Q&A pairs and returns valid `FAQPage` JSON-LD. Use this on both the FAQ page and any page embedding FAQ sections.
- **Anchor links:** Use `id` attributes on category headings (e.g., `id="pricing"`, `id="process"`). Smooth scroll behavior via CSS `scroll-behavior: smooth`.
- **Rich text answers:** CMS-driven answers support rich text/markdown rendering with inline links to internal pages.
- **Reusable component:** `src/components/faq/FAQSection.tsx` accepts `category` or `questions` prop for embedding on other pages. The full FAQ page composes multiple `FAQSection` instances.
- **Analytics events:** Track `faq_page_view`, `faq_question_expand` (with question text or ID), `faq_category_view`, `faq_search`, `faq_cta_click` via PostHog. Track which questions are expanded most frequently to inform content strategy.
- **SEO:** The FAQ page targets long-tail question keywords. Each question should naturally include relevant keywords (Colorado, wedding planner, mountain wedding, etc.). Target: rich snippet FAQ results in Google SERPs.

---

## Dependencies

- **Epic 01 US-003:** Accordion UI component from the component library (Radix Accordion base)
- **Epic 01 US-005:** CMS content infrastructure (FAQ content model with question, answer, category, sort order fields)
- **Epic 02 US-002:** Services hub page should embed the pricing FAQ subset (coordinate implementation)
- **From Stephanie:** Personalized answers to all 25 questions written in her voice, or interview responses for us to polish. Answers should reference specific Colorado details, her personal experience, and link to relevant pages.

---

## Definition of Done

- [ ] FAQ page renders with all 25 questions organized into 5 categories
- [ ] Search/filter functionality filters questions in real-time and displays results correctly
- [ ] Accordion open/close animations are smooth and performant
- [ ] All accordion items are keyboard accessible (Enter/Space to toggle, arrow keys to navigate)
- [ ] Screen reader announces expanded/collapsed state correctly via ARIA attributes
- [ ] `FAQPage` schema markup validates on Google Rich Results Test with all 25 Q&A pairs
- [ ] FAQ accordion component successfully embeds on the Services hub page with filtered pricing questions
- [ ] Anchor links to categories work correctly (e.g., `/faq/#pricing`, `/faq/#colorado`)
- [ ] Rich text answers render correctly with inline links to relevant site pages (`/services/`, `/process/`, `/contact/`)
- [ ] FAQ content is CMS-driven and Stephanie can update answers without code deployment
- [ ] Page renders correctly on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Touch interactions work correctly on mobile (accordion triggers, search input, category navigation)
- [ ] CTA at the bottom links correctly to `/contact/`
- [ ] PostHog analytics events fire on question expand, search usage, and CTA clicks
- [ ] Page achieves Lighthouse Performance score > 85 on mobile
- [ ] Content reviewed and approved by Stephanie
- [ ] Passes accessibility audit (keyboard navigation, `aria-expanded` states, screen reader, color contrast, focus indicators)
