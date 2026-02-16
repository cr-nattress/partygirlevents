# US-003: Launch Execution

**Epic:** [05 — Launch & Migration](README.md)
**Priority:** P0 — Must Have
**Points:** 2
**Status:** Not Started

---

## Description

Execute the production launch of the new Next.js site on Vercel, replacing the existing WordPress site. This story covers the launch day procedure — DNS cutover, SSL verification, redirect validation, search engine and directory listing updates, social media announcement, and 24-hour post-launch monitoring — plus the post-launch Week 1 tasks that ensure the migration is fully settled. A documented rollback plan ensures quick recovery if critical issues are discovered.

---

## Acceptance Criteria

### Pre-Launch Preparation (24-48 Hours Before)
- [ ] DNS TTL on Cloudflare reduced to 300 seconds (5 minutes) to ensure fast propagation during cutover
- [ ] Domain `partygirl.events` added to the Vercel project and ownership verified
- [ ] Vercel SSL certificate provisioned and validated for `partygirl.events` and `www.partygirl.events`
- [ ] All US-001 redirects verified on Vercel preview deployment — every old URL returns correct 301
- [ ] All US-002 testing checklist items passed — zero blockers remaining
- [ ] WordPress site snapshot taken (database backup + file backup) for archival
- [ ] WordPress site configured to be accessible at `old.partygirl.events` subdomain for 30-day fallback
- [ ] `old.partygirl.events` is password-protected or has `noindex` meta tag to avoid duplicate content
- [ ] Rollback plan reviewed and documented (see Rollback Plan section below)
- [ ] Stephanie notified of launch window and asked to be available for 2-3 hours post-cutover
- [ ] Launch scheduled for a low-traffic period (Tuesday-Thursday morning, Mountain Time)
- [ ] Social media announcement post drafted and approved by Stephanie before launch day
- [ ] UptimeRobot (or similar) monitoring configured for homepage, contact page, and `/api/health` endpoint

### Launch Day — Step 1: DNS Cutover
- [ ] Update DNS A record on Cloudflare to point to Vercel IP (`76.76.21.21`)
- [ ] Add CNAME record for `www.partygirl.events` pointing to `cname.vercel-dns.com`
- [ ] Configure canonical domain (apex vs www) with one redirecting to the other
- [ ] Verify DNS propagation using `dig` command and https://www.whatsmydns.net/
- [ ] If Cloudflare proxy is active (orange cloud): set SSL mode to "Full (Strict)" to avoid redirect loops

### Launch Day — Step 2: SSL Verification
- [ ] Verify SSL certificate is active and valid — site loads over HTTPS with no certificate warnings
- [ ] Verify HTTP → HTTPS redirect is working (Vercel handles this automatically)
- [ ] Test both `https://partygirl.events` and `https://www.partygirl.events` — one should redirect to canonical
- [ ] Clear Cloudflare cache (if Cloudflare is still in the DNS path as a proxy)

### Launch Day — Step 3: Redirect Verification
- [ ] Run `scripts/validate-redirects.ts` against the live production domain
- [ ] Spot-check 10-15 high-traffic old WordPress URLs manually in the browser — confirm 301 redirects fire
- [ ] Verify WordPress admin paths (`/wp-admin/`, `/wp-login.php`) return 404 or are blocked (not redirected)
- [ ] Verify `/wp-content/`, `/wp-includes/`, `/wp-json/` paths are handled (410 Gone or redirect)
- [ ] Check for redirect loops — no URL should redirect to itself or create circular chains
- [ ] Verify no redirect chain exceeds 1 hop (old URL → new URL directly, no intermediary)

### Launch Day — Step 4: Functional Verification
- [ ] Submit a test inquiry form on the live site:
  - Verify data appears in Supabase `leads` / `inquiries` table
  - Verify Stephanie receives notification email with all lead data
  - Verify test email address receives confirmation email with branding and Calendly link
  - Verify contact is created/updated in HoneyBook
- [ ] Verify Calendly embed loads and booking flow completes on the production domain
- [ ] Verify analytics events fire on the live domain (PostHog, GA4)
- [ ] Verify cookie consent banner appears and blocks analytics until consent is given

### Launch Day — Step 5: Search Engine Updates
- [ ] Log into Google Search Console for `partygirl.events`
- [ ] Submit the updated XML sitemap (`https://partygirl.events/sitemap.xml`)
- [ ] Request re-indexing of key pages: homepage, services, portfolio, about, contact, FAQ
- [ ] Verify the sitemap is accepted and processing begins
- [ ] Check the Coverage report for any immediate crawl errors or warnings
- [ ] Verify Google Business Profile:
  - Website URL is `https://partygirl.events`
  - Business name, address, phone, hours, categories, and description are accurate
  - Photos are current

### Launch Day — Step 6: Directory Listing Updates
- [ ] **WeddingWire:** Update listing with website URL `https://partygirl.events`, verify all profile information
- [ ] **The Knot:** Update listing with website URL `https://partygirl.events`, verify all profile information
- [ ] **Yelp:** Update listing with website URL `https://partygirl.events`, verify all profile information
- [ ] **Zola:** Update listing if applicable
- [ ] **Facebook page:** Update website URL in the About section
- [ ] **Instagram bio:** Update link in bio to `https://partygirl.events` (or Linktree/link-in-bio if used)
- [ ] All directory URLs point to `https://partygirl.events` (no `www.`, no `http://`, no old domain variants)

### Launch Day — Step 7: Social Media Announcement
- [ ] Instagram post/story announcing the new website with CTA to visit
- [ ] Facebook post announcing the new website
- [ ] Any other social channels Stephanie uses (Pinterest, TikTok) updated as appropriate
- [ ] Email to existing client/contact list (via ConvertKit or Resend) announcing the new site (if desired)

### Launch Day — 24-Hour Monitoring
- [ ] **Vercel dashboard:** Monitor deployment status — no build errors, no function errors, no edge function timeouts
- [ ] **PostHog:** Verify events are firing in production — page views, CTA clicks, form interactions
- [ ] **GA4:** Verify real-time reports show traffic flowing
- [ ] **Resend dashboard:** Monitor email sends — confirm lead notification and confirmation emails are delivering
- [ ] **Supabase dashboard:** Verify form submissions are appearing in the `leads` / `inquiries` table
- [ ] **Google Search Console:** Check for crawl errors as Googlebot begins indexing the new site
- [ ] **UptimeRobot:** Confirm uptime monitoring is active with 5-minute checks, no downtime alerts
- [ ] **Error monitoring:** Watch for any JavaScript errors, API route failures, or 5xx responses
- [ ] **Stephanie feedback:** Stephanie navigates the live site on her phone and reports any issues
- [ ] Zero critical issues reported during 24-hour monitoring window

### Post-Launch Week 1 Tasks
- [ ] **Day 2-3:** Review Google Search Console Coverage report — identify any crawl errors or 404s from Googlebot
- [ ] **Day 2-3:** Fix any 404s from unmapped old URLs that were discovered post-launch (add redirects to `next.config.js`)
- [ ] **Day 3-5:** Review initial analytics data in PostHog and GA4:
  - Traffic volume compared to WordPress baseline
  - Top landing pages and exit pages
  - Form start rate vs. completion rate — identify drop-off steps
  - Bounce rate on key pages (homepage, services, contact)
  - Device and browser breakdown
- [ ] **Day 5-7:** Set up A/B test on hero headline using PostHog feature flags (test 2-3 variants, track `hero_cta_click` conversion rates per variant)
- [ ] **Day 5-7:** Stephanie reviews first real leads that come through the new site — assess lead quality, data completeness, email formatting
- [ ] **Day 7:** Verify that old WordPress site is still accessible at `old.partygirl.events` (30-day reference window)
- [ ] **Day 7:** Increase Cloudflare DNS TTL back to standard (3600s or higher) once migration is confirmed stable
- [ ] **Day 30:** Decommission WordPress site at `old.partygirl.events` (keep database backup for 6 months)

---

## Rollback Plan

If critical issues are discovered post-launch that cannot be resolved within 2 hours:

### Rollback Procedure
1. **Revert DNS:** Change A/CNAME records on Cloudflare back to the WordPress host IP/domain
2. **Wait for propagation:** With TTL at 300s, full propagation takes 5-10 minutes
3. **Verify WordPress site:** Confirm the old WordPress site loads correctly at `partygirl.events`
4. **Notify Stephanie:** Communicate the rollback and expected resolution timeline
5. **Diagnose and fix:** Resolve the issue on the Vercel deployment and verify on preview URL
6. **Re-attempt cutover:** Schedule a new launch window once the fix is verified

### Rollback Triggers (any of these warrant immediate rollback)
- Homepage or contact page returns 500 error and cannot be resolved in 30 minutes
- Form submissions are failing and data is being lost (not stored in Supabase)
- SSL certificate is not provisioning and site shows security warnings
- DNS propagation is causing the site to be completely unreachable for extended periods
- Stephanie reports that the site is fundamentally broken or misrepresenting her business

### Issues That Do NOT Warrant Rollback (fix forward)
- Minor visual glitches on a specific browser or viewport
- A single old URL returning 404 (add the redirect)
- Analytics not firing on one page (debug and fix)
- Instagram feed not loading (graceful fallback should be in place)
- Slow performance on a single page (optimize, does not block functionality)

---

## Technical Notes

- **DNS cutover approach:** The safest approach is to update DNS records on Cloudflare to point to Vercel while keeping Cloudflare as the DNS provider (not moving nameservers). This means: change the A record to Vercel's IP (`76.76.21.21`) or add a CNAME record pointing to `cname.vercel-dns.com`.
- **Vercel domain configuration:** In the Vercel project settings, add `partygirl.events` as a production domain. Vercel will provide DNS configuration instructions and automatically provision an SSL certificate via Let's Encrypt once DNS is verified.
- **www redirect:** Configure one of these:
  - `www.partygirl.events` → `partygirl.events` (apex is canonical) — more common for modern sites
  - `partygirl.events` → `www.partygirl.events` (www is canonical) — works better with some CDN setups
  - Choose one and be consistent across all listings and links
- **Cloudflare proxy mode:** If keeping Cloudflare in proxy mode (orange cloud), ensure Cloudflare SSL mode is set to "Full (Strict)" to avoid redirect loops between Cloudflare and Vercel's SSL.
- **Launch timing:** Tuesday-Thursday morning Mountain Time is ideal because:
  - Wedding website traffic is lowest mid-week mornings
  - Full business day available for monitoring and fixes
  - Stephanie is available during business hours
  - Avoids weekend traffic peaks when couples are actively researching
- **WordPress preservation:** The old WordPress site at `old.partygirl.events` serves two purposes:
  1. Quick reference if content questions arise ("what did the old site say about X?")
  2. Emergency fallback if a prolonged rollback is needed
  - This subdomain should be password-protected or have `<meta name="robots" content="noindex">` to avoid duplicate content issues
- **Security headers** can be configured in `next.config.js`:
  ```javascript
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      ]
    }]
  }
  ```
- **A/B test on hero headline:** Use PostHog feature flags to serve different headline variants, track `hero_cta_click` conversion rates per variant
- Vercel handles HTTPS enforcement automatically — all HTTP requests redirect to HTTPS
- Google Search Console may take a few days to reflect the new sitemap and start showing data for the new site structure
- Keep the WordPress database backup for at least 6 months in case any old content needs to be referenced
- **Monitoring tools during the 24-hour window:**
  - Vercel dashboard (deployment status, function logs, edge logs)
  - PostHog (real-time events)
  - GA4 (real-time reports)
  - Google Search Console (indexing status)
  - UptimeRobot or similar (5-minute uptime checks on homepage, contact page, `/api/health`)

---

## Dependencies

- Epic 05 US-001 (URL Redirects & Migration) — all redirects must be implemented and tested
- Epic 05 US-002 (Cross-Browser & Device Testing) — all testing must pass before launch, zero blockers
- All previous epics (01-04) — all pages, integrations, and content must be live on Vercel preview
- Stephanie's final content approval (all copy reviewed, no placeholder content)
- Cloudflare account access (or current DNS provider) with permissions to modify DNS records
- Google Search Console access (verified ownership of `partygirl.events`)
- Google Business Profile access
- WeddingWire, The Knot, Yelp account access for listing updates
- Stephanie's social media account access (or Stephanie available to post)
- Stephanie available for 2-3 hours on launch day for testing and feedback

---

## Definition of Done

- [ ] DNS cutover complete — `partygirl.events` resolves to the Vercel deployment
- [ ] SSL certificate active — site loads over HTTPS with no warnings
- [ ] www redirect configured — one canonical domain, no ambiguity
- [ ] All 301 redirects verified working on the production domain
- [ ] Test form submission successful on the live site (Supabase + emails + CRM verified)
- [ ] Google Search Console: new sitemap submitted, key pages requested for re-indexing
- [ ] Google Business Profile verified with correct URL and information
- [ ] WeddingWire, The Knot, Yelp listings updated with `https://partygirl.events`
- [ ] Social media announcement posted (Instagram + Facebook at minimum)
- [ ] 24-hour monitoring completed with zero critical issues
- [ ] Post-launch Week 1 tasks completed: Search Console reviewed, analytics baseline established, Stephanie has reviewed first leads
- [ ] A/B test on hero headline configured and running
- [ ] Old WordPress site accessible at `old.partygirl.events` as 30-day fallback (noindexed/password-protected)
- [ ] Rollback plan documented and accessible to the team
- [ ] DNS TTL restored to standard after 7 days of stable operation
- [ ] No critical issues remaining — site is stable and production-ready
