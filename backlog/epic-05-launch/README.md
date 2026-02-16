# Epic 05 — Launch & Migration

**Phase:** 1
**Weeks:** 6
**Total Points:** 8
**Status:** Not Started
**Dependencies:** Epics 01-04 (ALL prior epics must be complete — this is the final Phase 1 epic)

---

## Goal

Migrate from the existing WordPress site to the new Next.js site on Vercel with zero downtime and zero lost search equity. Map and implement 301 redirects for all existing URLs, perform cross-browser and cross-device testing, execute the DNS cutover, and verify everything works in production. This epic is the bridge between "built" and "live" — it ensures the launch is smooth, nothing breaks, and Stephanie's existing search rankings carry over to the new site.

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| [US-001](US-001-url-redirects-migration.md) | URL Redirects & Migration | P0 | 3 | Not Started |
| [US-002](US-002-cross-browser-testing.md) | Cross-Browser & Device Testing | P0 | 3 | Not Started |
| [US-003](US-003-launch-checklist.md) | Launch Checklist | P0 | 2 | Not Started |
| | **Total** | | **8** | |

---

## Epic-Level Acceptance Criteria

- [ ] Every existing WordPress URL that is indexed in Google returns a 301 redirect to the correct new page
- [ ] Zero 404 errors for previously indexed URLs (verified in Google Search Console after launch)
- [ ] Site tested and rendering correctly on Chrome, Safari, Firefox, Edge (latest 2 versions)
- [ ] Site tested on iOS Safari + Android Chrome across iPhone SE to iPhone 15 Pro Max viewport range
- [ ] All forms tested end-to-end: submit, emails received, data in Supabase, data in HoneyBook
- [ ] DNS cutover from Cloudflare (WordPress) to Vercel completed
- [ ] SSL certificate active and valid on `partygirl.events`
- [ ] Google Search Console updated with new sitemap
- [ ] All directory listings (Google Business Profile, WeddingWire, The Knot, Yelp) updated with new URL if needed
- [ ] No console errors on any page in production
- [ ] Site monitored for 24 hours post-launch with no critical issues

---

## Technical Context

- **Current Site:** WordPress hosted with DNS on Cloudflare
- **New Site:** Next.js 15 on Vercel
- **DNS Migration:** Cloudflare nameservers → Vercel DNS (or Cloudflare proxy → Vercel)
- **Redirects:** next.config.js `redirects` or middleware.ts
- **SSL:** Vercel automatic SSL provisioning
- **Monitoring:** Vercel Analytics, PostHog, Google Search Console

---

## Launch Risk Mitigation

1. **URL Mapping:** Create a complete URL map BEFORE launch day — crawl the existing WordPress site to capture every indexed URL
2. **Staging Verification:** Test all redirects on the Vercel preview deployment before DNS cutover
3. **Rollback Plan:** Keep Cloudflare DNS records for the old WordPress host available for quick rollback (set low TTL before migration)
4. **Monitoring Window:** Dedicate the first 24 hours post-launch to active monitoring — Stephanie should report any issues she encounters
5. **Search Console:** Submit the new sitemap immediately after launch and request re-indexing of key pages

---

## Notes

- DNS cutover should happen during a low-traffic period (Tuesday-Thursday morning, Mountain Time)
- Reduce Cloudflare DNS TTL to 300 seconds (5 minutes) 24-48 hours before migration to ensure fast propagation
- WordPress site should remain accessible at a subdomain (e.g., `old.partygirl.events`) for 30 days as a reference and fallback
- Consider using Vercel's preview deployment to do a full dress rehearsal of the launch with Stephanie before the actual cutover
- All client-facing content must be reviewed and approved by Stephanie before launch — no placeholder text, no lorem ipsum, no TODO comments
