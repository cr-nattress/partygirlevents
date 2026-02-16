# Epic 08 — Content Pipeline

**Phase:** Ongoing
**Timeline:** Continuous (parallel to all phases)
**Total Points:** 16
**Status:** Not Started
**Dependencies:** Epic 02 (Core Pages) — case study template, blog template, FAQ page, and venue guide templates must be built before content can be produced

---

## Goal

Produce the ongoing content that fills the templates and systems built in Epics 02, 06, and 07. This epic is not a build sprint — it is a continuous production pipeline that runs parallel to all phases. Case studies bring the portfolio to life with narrative storytelling. Blog content targets high-intent SEO keywords on a structured calendar. Venue guide content populates the dedicated location pages. FAQ content answers real questions from real couples. Together, this content transforms a well-built website into an organic traffic engine that compounds over time.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-case-study-production.md) | Case Study Production | P0 | 5 | Not Started |
| [US-002](US-002-blog-content-calendar.md) | Blog Content Calendar Execution | P1 | 5 | Not Started |
| [US-003](US-003-venue-guide-content.md) | Venue Guide Content | P1 | 3 | Not Started |
| [US-004](US-004-faq-content.md) | FAQ Content | P1 | 3 | Not Started |
| | **Total** | | **16** | |

---

## Epic-Level Acceptance Criteria

- [ ] 5-8 narrative case studies published following the Epic 02 template, with Event + Review schema markup
- [ ] 6-month blog content calendar executed: 3 posts/month minimum (TOFU + MOFU + BOFU)
- [ ] 5 venue guide pages populated with 8-10 venues each, including Stephanie's personal notes
- [ ] 25 FAQ answers written and published across 5 categories in Stephanie's voice
- [ ] All content SEO-optimized with target keywords, internal links, and structured headings
- [ ] Content published on schedule: 1-2 case studies/month, 3 blog posts/month
- [ ] All published content reviewed and approved by Stephanie before going live
- [ ] Content performance tracked via PostHog and Google Search Console

---

## Content Production Cadence

```
Monthly Target:
├── 1-2 Case Studies (US-001)
├── 3 Blog Posts (US-002)
│   ├── 1 TOFU (top-of-funnel: guides, education)
│   ├── 1 MOFU (middle-of-funnel: comparisons, process)
│   └── 1 BOFU (bottom-of-funnel: real weddings, social proof)
├── Venue Guide Updates (US-003) — quarterly
└── FAQ Updates (US-004) — quarterly
```

---

## Content Dependencies on Stephanie

This epic has the heaviest dependency on client input of any epic. Every piece of content requires Stephanie's knowledge, stories, recommendations, or approval.

| Item | Needed By | Story | Ongoing? | Status |
|------|-----------|-------|----------|--------|
| Couple stories, narratives, and planning details | Per case study | US-001 | Yes | Pending |
| Client testimonial quotes (written approval) | Per case study | US-001 | Yes | Pending |
| 15-25 curated photos per case study | Per case study | US-001 | Yes | Pending |
| Vendor credit lists per wedding | Per case study | US-001 | Yes | Pending |
| Blog post review and approval | Per post | US-002 | Yes | Pending |
| Colorado wedding expertise and tips | Per post | US-002 | Yes | Pending |
| Venue recommendations (8-10 per location) | Week 8 | US-003 | Quarterly | Pending |
| Personal venue notes and experience | Week 8 | US-003 | Quarterly | Pending |
| FAQ answers personalized in Stephanie's voice | Week 3 | US-004 | Quarterly | Pending |

---

## Relationship to Other Epics

- **Epic 02 (Core Pages):** Provides the case study template (US-003), FAQ page template (US-006), and the overall content structure that this epic populates.
- **Epic 06 (Differentiators):** Provides the blog system (US-003), venue guide page templates (US-002), and the content calendar framework.
- **Epic 07 (AI Features):** AI blog pipeline (US-010) accelerates production of blog content in this epic. Smart gallery tags from US-007 apply to case study images.
- **Epic 03 (SEO):** All content produced here follows the SEO foundation established in Epic 03 — schema markup, meta tags, internal linking strategy.

---

## Notes

- Case studies (US-001) are the most impactful content type for conversion — they demonstrate real results and build trust through storytelling.
- Blog content (US-002) is the primary SEO growth driver — the 6-month calendar targets keywords that will compound traffic over time.
- Content quality matters more than quantity. A well-written, SEO-optimized post published monthly is better than 4 rushed posts that nobody reads.
- This epic never truly "completes" — it represents an ongoing commitment to content production that should continue indefinitely.
- When Epic 07 US-010 (AI Blog Pipeline) is live, blog production can accelerate from 3 posts/month to 4-8 posts/month with Stephanie spending 15-30 minutes editing AI drafts instead of 2-3 hours writing from scratch.
