# US-008 — Legal Pages (Privacy & Terms)

**Epic:** 02 — Core Pages
**Priority:** P1 — Nice to Have
**Points:** 2
**Status:** Not Started

---

## Description

Build the Privacy Policy and Terms of Service pages to satisfy legal compliance requirements and establish user trust. These pages are especially important because the site uses AI-powered features (style quiz, vibe translator, chat), collects personal data through the inquiry form and newsletter signup, processes analytics via multiple third-party services, and syncs data to external CRM and email platforms. The privacy policy must address GDPR and CCPA requirements given the site's reach to destination wedding couples from outside Colorado. Both pages use a clean, typography-focused layout with a table of contents for easy navigation, and content is managed in the CMS so updates can be made by Stephanie or a legal advisor without requiring code deployments.

---

## Acceptance Criteria

### Privacy Policy Page (`/privacy/`)

- [ ] Page title: "Privacy Policy | Party Girl Events"
- [ ] "Last Updated" date displayed prominently at the top of the page (e.g., "Last Updated: February 15, 2026")
- [ ] Effective date stated
- [ ] Table of contents with anchor links to each section for quick navigation

- [ ] **Privacy Policy must address the following sections:**

  **Section 1: Information We Collect**
  - [ ] Personal information collected via inquiry form (name, email, phone, wedding details)
  - [ ] Data collected via style quiz and AI-powered tools (preferences, quiz answers, vibe translator inputs, chat messages)
  - [ ] Newsletter signup data (email, first name via ConvertKit)
  - [ ] Automatically collected data (IP address, browser type, device info, pages visited)
  - [ ] Cookies and tracking technologies used on the site

  **Section 2: How We Use Your Information**
  - [ ] Responding to inquiries and providing wedding planning services
  - [ ] AI data processing: how chat, quiz, and vibe translator data is used and whether it trains models
  - [ ] Sending transactional emails (inquiry confirmation, next steps)
  - [ ] Marketing communications (newsletter, with opt-out)
  - [ ] Analytics and site improvement
  - [ ] Fraud prevention and security

  **Section 3: Cookies & Tracking Technologies**
  - [ ] Cookie categories: strictly necessary, analytics, marketing
  - [ ] Specific trackers disclosed: PostHog, Google Analytics 4 (GA4), Vercel Analytics
  - [ ] How to manage cookie preferences (link to cookie consent settings)
  - [ ] Cookie retention periods for each category

  **Section 4: Third-Party Data Sharing**
  - [ ] Complete list of third-party processors and their purposes:
    - HoneyBook (CRM -- lead management and client communication)
    - Resend (transactional email delivery)
    - ConvertKit (email newsletter and marketing automation)
    - Instagram API (social media feed display)
    - PostHog (product analytics and event tracking)
    - Google Analytics 4 (website analytics)
    - Vercel (hosting, analytics, and edge functions)
    - Supabase (database and authentication)
    - Calendly (discovery call scheduling)
    - Stripe (if payment processing is used)
  - [ ] Each processor listed with: name, purpose, data processed, link to their privacy policy
  - [ ] Statement that data is not sold to third parties
  - [ ] Data processing agreements in place with all processors

  **Section 5: Data Retention**
  - [ ] Retention periods for each data category:
    - Inquiry form data: how long it is kept
    - Analytics data: retention period per platform
    - Email marketing data: retained until unsubscribe
    - Quiz and AI interaction data: retention period
  - [ ] Process for data deletion upon request
  - [ ] Automatic deletion schedules (if applicable)

  **Section 6: GDPR Rights (EU Visitors)**
  - [ ] Right of access: request a copy of personal data
  - [ ] Right to rectification: correct inaccurate data
  - [ ] Right to erasure (right to be forgotten): request deletion
  - [ ] Right to restrict processing
  - [ ] Right to data portability: receive data in machine-readable format
  - [ ] Right to object to processing
  - [ ] Right to withdraw consent
  - [ ] How to exercise these rights (contact information, expected response time)
  - [ ] Right to lodge a complaint with a supervisory authority

  **Section 7: CCPA Rights (California Visitors)**
  - [ ] Right to know what personal information is collected and how it is used
  - [ ] Right to delete personal information
  - [ ] Right to opt out of the sale of personal information (with statement that we do not sell data)
  - [ ] Right to non-discrimination for exercising rights
  - [ ] How to exercise these rights (contact information)

  **Section 8: Children's Privacy (COPPA)**
  - [ ] Statement that the site is not directed at children under 13
  - [ ] No knowing collection of personal information from children
  - [ ] Process if a parent or guardian believes their child has provided data

  **Section 9: Data Security**
  - [ ] Overview of security measures in place (encryption, access controls, secure hosting)
  - [ ] Note that no method of transmission is 100% secure

  **Section 10: Contact Information for Data Requests**
  - [ ] Email address for privacy-related inquiries
  - [ ] Mailing address (if required by law)
  - [ ] Expected response time for data requests (e.g., within 30 days)

  **Section 11: Changes to This Policy**
  - [ ] How users will be notified of changes
  - [ ] Effective date tracking

### Terms of Service Page (`/terms/`)

- [ ] Page title: "Terms of Service | Party Girl Events"
- [ ] "Last Updated" date displayed prominently at the top
- [ ] Effective date stated
- [ ] Table of contents with anchor links to each section

- [ ] **Terms of Service must address the following sections:**

  **Section 1: Acceptance of Terms**
  - [ ] By using the site, visitors agree to these terms
  - [ ] Minimum age requirement (18+)

  **Section 2: Site Usage**
  - [ ] Permitted uses of the website
  - [ ] Prohibited activities (scraping, automated access, misuse)
  - [ ] Account responsibilities (if applicable)

  **Section 3: Intellectual Property**
  - [ ] Ownership of website content (text, design, code)
  - [ ] Ownership of photography and portfolio images (Stephanie's and photographers' rights)
  - [ ] Restrictions on copying, reproducing, or distributing content
  - [ ] Trademarks: "Party Girl Events" name and logo

  **Section 4: User Submissions**
  - [ ] How inquiry form data is handled
  - [ ] How quiz data and AI tool interactions are handled
  - [ ] User grants license for submitted content to be used for service delivery
  - [ ] No expectation of confidentiality for general submissions (distinct from contracted client confidentiality)

  **Section 5: AI Tool Disclaimers**
  - [ ] AI-powered features (style quiz, vibe translator, chat) provide suggestions, not professional advice
  - [ ] Results are for inspiration and planning assistance only
  - [ ] AI tools do not replace professional wedding planning consultation
  - [ ] No guarantee of accuracy or suitability of AI-generated suggestions

  **Section 6: Third-Party Services**
  - [ ] Links to third-party websites (vendor sites, Instagram, etc.) are not endorsements
  - [ ] Third-party services have their own terms and privacy policies
  - [ ] Party Girl Events is not responsible for third-party service availability or content

  **Section 7: Limitation of Liability**
  - [ ] Website provided "as is" and "as available"
  - [ ] No warranty of uninterrupted or error-free operation
  - [ ] Limitation of damages (to the extent permitted by law)
  - [ ] Disclaimer that website content does not constitute a contract for wedding planning services

  **Section 8: Indemnification**
  - [ ] User agrees to indemnify Party Girl Events against claims arising from misuse

  **Section 9: Governing Law**
  - [ ] Governed by the laws of the State of Colorado
  - [ ] Disputes resolved in Colorado courts
  - [ ] Venue: Eagle County, Colorado (or appropriate jurisdiction)

  **Section 10: Changes to Terms**
  - [ ] Right to modify terms at any time
  - [ ] How users will be notified of changes
  - [ ] Continued use constitutes acceptance of modified terms

  **Section 11: Contact Information**
  - [ ] Contact email for questions about these terms
  - [ ] Mailing address

### Layout & Design

- [ ] Both pages use a clean, typography-focused layout optimized for reading:
  - Maximum content width of ~720px (prose-width)
  - Serif or readable body font at a comfortable size (16-18px)
  - Generous line height (1.6-1.8) for readability
  - Ample paragraph spacing
  - Proper heading hierarchy (`<h1>` for page title, `<h2>` for sections, `<h3>` for subsections)
- [ ] Sticky or scrollable table of contents sidebar on desktop; collapsible TOC at the top on mobile
- [ ] Active section highlighted in TOC as user scrolls through the page
- [ ] "Last Updated" date prominently displayed with clear formatting
- [ ] Internal link to cookie consent settings (e.g., "Manage your cookie preferences")
- [ ] Breadcrumb navigation: Home > Privacy Policy / Home > Terms of Service
- [ ] Both pages linked from site footer on every page

### CMS & Content Management

- [ ] Both pages' content managed in CMS for easy updates without code deployments
- [ ] CMS content model (`LegalPage`) with fields: `title` (string), `slug` (string: "privacy" or "terms"), `content` (rich text / long-form markdown), `lastUpdated` (date), `metaRobotsIndex` (boolean, default false)
- [ ] Content supports rich text with headings, paragraphs, lists, links, and bold/italic formatting
- [ ] "Last Updated" date is a CMS field that Stephanie or a legal advisor can update
- [ ] Changes to legal pages rebuild via ISR without a full redeployment

### SEO & Indexing

- [ ] Default: `noindex, follow` meta tag on both pages (prevents indexing but follows internal links)
- [ ] Option to switch to `index, follow` if desired for trust signals (configurable via CMS `metaRobotsIndex` field)
- [ ] Canonical URLs set correctly
- [ ] Open Graph meta tags with appropriate titles and descriptions

### Accessibility

- [ ] Proper heading hierarchy throughout both pages (no skipped heading levels)
- [ ] Readable font size (minimum 16px body text)
- [ ] Sufficient line height for readability (1.6+)
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Table of contents links use proper anchor navigation with focus management
- [ ] Screen reader friendly: semantic HTML, descriptive link text
- [ ] Keyboard navigable throughout

---

## Technical Notes

- **Routes:**
  - Privacy: `src/app/(marketing)/privacy/page.tsx`
  - Terms: `src/app/(marketing)/terms/page.tsx`
- **Rendering:** Static generation with ISR. Content fetched from CMS on build, with ISR revalidation when content is updated.
- **Shared layout:** Both pages share a `LegalPageLayout` component (`src/components/legal/LegalPageLayout.tsx`) that provides the typography-focused layout, table of contents generation, and "Last Updated" display. The component accepts the page content (from CMS) and auto-generates the TOC from heading elements.
- **Styling:** Use Tailwind `prose` class (from `@tailwindcss/typography`) for long-form content styling. Customize prose styles to match the "Elevated Warm Minimalism" design language.
- **Table of contents:** Auto-generated from `<h2>` elements in the rendered content. Use an `IntersectionObserver` to highlight the current section in the TOC as the user scrolls (active section indicator). Component: `src/components/legal/TableOfContents.tsx`.
- **CMS content model:** `LegalPage` model with fields: `title` (string), `slug` (string: "privacy" or "terms"), `content` (rich text / long-form markdown), `lastUpdated` (date), `metaRobotsIndex` (boolean, default false).
- **Cookie consent link:** Link to cookie consent settings modal/banner. If using a consent management platform (e.g., cookie banner from Epic 01 or a library like `cookie-consent`), link directly to the settings trigger.
- **Footer links:** Ensure Footer component (from Epic 01) includes links to `/privacy/` and `/terms/`.
- **Content source:** Initial content should be drafted by a legal advisor familiar with Colorado law and AI/data processing requirements. Stephanie reviews for brand voice in introductory paragraphs. Legal substance should not be modified without legal review.
- **Analytics events:** Track `privacy_page_view`, `terms_page_view`, `legal_toc_click` via PostHog. Minimal tracking -- these are compliance pages, not conversion pages.

---

## Dependencies

- **Epic 01 US-002:** Design tokens (typography scale, spacing, colors)
- **Epic 01 US-003:** UI component library (if TOC component or breadcrumbs are shared components)
- **Epic 01 US-004:** Layout components (Header, Footer with legal page links, Container, Breadcrumbs)
- **Epic 01 US-005:** CMS content infrastructure (LegalPage content model)
- **From Stephanie:** Confirmation of business entity details (legal name, registered address, jurisdiction)
- **From legal advisor:** Privacy policy content addressing all AI features, third-party processors, GDPR/CCPA requirements, and Colorado governing law. Terms of service content addressing AI tool disclaimers, intellectual property, and liability limitations.
- **Cookie consent implementation:** Cookie consent mechanism must be in place (or planned) so the privacy policy can link to cookie settings

---

## Definition of Done

- [ ] Privacy Policy page renders with all 11 sections and complete content
- [ ] Terms of Service page renders with all 11 sections and complete content
- [ ] Both pages display "Last Updated" date prominently at the top
- [ ] Table of contents generates correctly from page headings and anchor links work
- [ ] Active section highlighted in TOC as user scrolls through the page
- [ ] Content is CMS-driven and can be updated by Stephanie or a legal advisor without code deployment
- [ ] Cookie consent settings link functions correctly from within the Privacy Policy
- [ ] `noindex, follow` meta tag present on both pages (or configurable index behavior via CMS field)
- [ ] Both pages render correctly on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Typography is comfortable for long-form reading: adequate font size (16px+), line height (1.6+), content width (~720px), and paragraph spacing
- [ ] Proper heading hierarchy validated (no skipped levels)
- [ ] Both pages accessible via footer links from every page on the site
- [ ] Page achieves Lighthouse Performance score > 90 on mobile (text-heavy pages should score high)
- [ ] Content reviewed and approved by legal advisor
- [ ] Passes accessibility audit (heading hierarchy, readable font size, color contrast, keyboard navigation, screen reader)
