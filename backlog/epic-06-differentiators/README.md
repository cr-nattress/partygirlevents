# Epic 06 — Differentiators

**Phase:** 2
**Weeks:** 7-12
**Total Points:** 31
**Status:** Not Started
**Dependencies:** Epic 05 (site live) must be complete — the core site is deployed and receiving traffic before differentiation features are added

---

## Goal

Stand out from every Colorado mountain wedding planner competitor with engagement tools none of them offer. Phase 1 delivered a polished, conversion-optimized site. This epic adds the features that make Party Girl Events impossible to compare with competitors: an interactive wedding style quiz, dedicated venue guide pages targeting uncontested SEO keywords, a blog content system, video testimonials, exit-intent lead capture, email nurture sequences, a curated vendor directory, and seasonal hero rotation. These differentiators generate leads through value-first engagement rather than passive browsing, and they build SEO moats that competitors cannot replicate overnight.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-wedding-style-quiz.md) | Wedding Style Quiz | P0 | 8 | Not Started |
| [US-002](US-002-venue-guide-pages.md) | Venue Guide Pages | P0 | 5 | Not Started |
| [US-003](US-003-blog-content-strategy.md) | Blog Content Strategy & Templates | P1 | 3 | Not Started |
| [US-004](US-004-video-testimonials.md) | Video Testimonials | P1 | 2 | Not Started |
| [US-005](US-005-exit-intent-lead-magnet.md) | Exit-Intent Lead Magnet | P2 | 3 | Not Started |
| [US-006](US-006-email-nurture-sequences.md) | Email Nurture Sequences | P1 | 3 | Not Started |
| [US-007](US-007-vendor-directory.md) | Vendor Directory | P2 | 3 | Not Started |
| [US-008](US-008-seasonal-hero-rotation.md) | Seasonal Hero Rotation | P2 | 2 | Not Started |
| | **Total** | | **31** | |

---

## Epic-Level Acceptance Criteria

- [ ] Wedding style quiz deployed at `/quiz/` with full GPT-4o-mini integration, visual question flow, and personalized results page
- [ ] 5 venue guide pages live at `/venues/[slug]/` with Place schema markup and SEO-optimized content
- [ ] Blog system operational with index page, post template, category filtering, and 4-6 launch posts published
- [ ] Video testimonials embedded on homepage, services, and about pages with accessible playback
- [ ] Exit-intent popup fires on cursor leave with email capture and ConvertKit integration
- [ ] 2 email nurture sequences configured in ConvertKit (quiz lead + guide download)
- [ ] Vendor directory page live with categorized, tagged vendor recommendations
- [ ] Seasonal hero rotation auto-switches based on current date
- [ ] All new pages achieve Mobile PageSpeed Lighthouse score > 85
- [ ] All new features track analytics events via PostHog
- [ ] Lead capture from quiz achieves 70-80% email capture rate among completers
- [ ] Venue guide pages index in Google and begin ranking for target keywords within 4-6 weeks

---

## Competitive Advantage

These features create measurable distance from competitors:

- **Quiz:** No Colorado wedding planner offers an interactive style quiz with AI-generated results. This is the single highest-impact differentiator.
- **Venue Guides:** Dedicated, in-depth venue guide pages for Vail, Beaver Creek, Aspen, Breckenridge, and Keystone. ZERO competitors have this content — these are uncontested SEO keywords.
- **Blog:** Structured content marketing targeting high-intent search queries that competitors are not producing content for.
- **Vendor Directory:** Builds reciprocal relationships (backlinks when vendors link back) and positions Stephanie as the hub of Colorado mountain wedding vendor networks.

---

## Content Dependencies on Stephanie

| Item | Needed By | Story | Status |
|------|-----------|-------|--------|
| Style taxonomy (5-6 named styles with descriptions) | Week 7 | US-001 | Pending |
| Tagged portfolio images (50-100 images tagged by style) | Week 7 | US-001 | Pending |
| Venue recommendations (8-10 per location with notes) | Week 8 | US-002 | Pending |
| Venue photography (or sourcing permissions) | Week 8 | US-002 | Pending |
| 4-6 blog posts for launch (drafts or outlines) | Week 9 | US-003 | Pending |
| 6-month content calendar approval | Week 9 | US-003 | Pending |
| Video testimonial clips (30-90 seconds each) | Week 9 | US-004 | Pending |
| PDF planning guide (draft or outline for AI-assist) | Week 10 | US-005 | Pending |
| Vendor database (names, categories, endorsements) | Week 10 | US-007 | Pending |
| 4 seasonal photo sets for hero | Week 11 | US-008 | Pending |

---

## Relationship to Other Epics

- **Epic 02 (Core Pages):** Quiz links from homepage CTA, venue guides link from homepage venues teaser, blog uses templates built on Epic 02 patterns.
- **Epic 03 (SEO):** Venue guides and blog posts extend the SEO foundation with dedicated keyword-targeting pages and schema markup.
- **Epic 04 (Integrations):** Email nurture sequences build on the ConvertKit integration; quiz results sync to HoneyBook via the existing CRM pipeline.
- **Epic 05 (Launch):** Site must be live and stable before adding these features. Venue guide URLs and blog URLs should be planned to avoid future redirects.
- **Epic 07 (AI Features):** Quiz data feeds into AI personalization. Budget estimator and vibe translator complement the quiz as engagement tools.
- **Epic 08 (Content Pipeline):** Blog templates and venue guide templates established here are used for ongoing content production.

---

## Technical Context

- **Quiz Engine:** Framer Motion animated transitions, React state machine for question flow, GPT-4o-mini for results generation
- **Venue Pages:** Static generation with ISR, Place schema JSON-LD, `next/image` for venue photography
- **Blog:** CMS-driven with Article + BreadcrumbList schema, category taxonomy, pagination
- **Email:** Resend for transactional (quiz results), ConvertKit for nurture sequences
- **Lead Capture:** Cookie-based suppression, PostHog event tracking, Supabase storage
- **Video:** Lazy-loaded player component, no autoplay, transcript fallback

---

## Notes

- US-001 (Wedding Style Quiz) is the single highest-value story in the entire backlog after the core site is live. It should be prioritized first within this epic.
- Venue guide pages (US-002) are the strongest SEO play — they target keywords with high intent and zero competition.
- Several stories can be worked in parallel: US-003/US-004 are independent of US-001/US-002, and US-007/US-008 have no cross-dependencies.
- Exit-intent popup (US-005) requires careful UX — it must feel helpful, not desperate. The lead magnet offer must be genuinely valuable.
- Email nurture sequences (US-006) should be set up before quiz goes live, so the lead pipeline is complete end-to-end.
