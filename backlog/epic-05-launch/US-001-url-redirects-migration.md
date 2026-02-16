# US-001: URL Redirects & Migration

**Epic:** [05 — Launch & Migration](README.md)
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Map every existing WordPress URL to its corresponding new path and implement 301 permanent redirects so no search equity is lost during the migration. This includes crawling the existing site, building a complete URL map, implementing redirects in next.config.js or middleware.ts, updating the Google Business Profile, updating directory listings, and planning the DNS cutover from Cloudflare to Vercel.

---

## Acceptance Criteria

### URL Audit & Mapping
- [ ] Existing WordPress site crawled to capture every URL (use Screaming Frog, Sitebulb, or `wget --spider`)
- [ ] Google Search Console checked for all indexed URLs (Coverage report)
- [ ] Complete URL mapping document created: old path → new path for every page
- [ ] Key redirects confirmed:
  - `/galleries/` → `/portfolio/`
  - `/galleries/weddings/` → `/portfolio/`
  - `/galleries/[specific-gallery]/` → `/portfolio/` (or specific portfolio page if applicable)
  - `/services-2/` → `/services/`
  - `/about-2/` or `/about-us/` → `/about/`
  - `/contact-2/` or `/contact-us/` → `/contact/`
  - All blog post slugs: `/blog/[slug]/` → `/blog/[slug]/` (preserved) or redirected if slug changed
  - `/wp-content/uploads/*` → handled (either redirect to new image URLs or serve via proxy)
  - `/feed/` → removed or redirected to blog
  - `/wp-admin/` → removed (no redirect needed)
  - `/wp-login.php` → removed (no redirect needed)
- [ ] No old URL that was indexed in Google results in a 404

### Redirect Implementation
- [ ] 301 (permanent) redirects implemented for all mapped URLs
- [ ] Redirects configured in `next.config.js` `redirects()` function for static path mappings
- [ ] Dynamic or pattern-based redirects handled in `middleware.ts` if needed (e.g., `/galleries/*` → `/portfolio/`)
- [ ] WordPress-specific paths blocked or redirected:
  - `/wp-content/*`, `/wp-includes/*`, `/wp-json/*` → 410 Gone or redirect to relevant page
  - `/xmlrpc.php`, `/wp-cron.php` → blocked
- [ ] Redirects tested on Vercel preview deployment before DNS cutover
- [ ] Redirect chain length verified: no chains longer than 1 hop (old URL → final URL directly)

### Google Business Profile
- [ ] Google Business Profile reviewed — website URL confirmed as `https://partygirl.events`
- [ ] Business information verified: name, address, phone, hours, categories, description
- [ ] Photos updated if needed
- [ ] Posts or updates announced with the new site

### Directory Listings
- [ ] WeddingWire listing updated with correct website URL
- [ ] The Knot listing updated with correct website URL
- [ ] Yelp listing updated with correct website URL
- [ ] Any other directory listings identified and updated (Zola, Facebook, etc.)
- [ ] All listing URLs point to `https://partygirl.events` (not `www.` or old domain variants)

### DNS Cutover Plan
- [ ] DNS cutover plan documented step-by-step:
  1. Reduce Cloudflare TTL to 300s, 48 hours before migration
  2. Add domain to Vercel project and verify ownership
  3. Vercel provisions SSL certificate for the domain
  4. Update DNS records: A record and/or CNAME to Vercel
  5. Verify SSL is active and site loads on the domain
  6. Verify all redirects work on the live domain
  7. Monitor for 24 hours
- [ ] Rollback plan documented: how to revert DNS to WordPress if critical issues arise
- [ ] WordPress site preserved at a subdomain (e.g., `old.partygirl.events`) for 30-day reference
- [ ] Cloudflare account access confirmed (or DNS provider credentials available)
- [ ] Domain `partygirl.events` added to Vercel project

---

## Technical Notes

- next.config.js `redirects()` is the simplest approach for static path mappings:
  ```javascript
  async redirects() {
    return [
      { source: '/galleries/:path*', destination: '/portfolio', permanent: true },
      { source: '/services-2', destination: '/services', permanent: true },
      // ...
    ]
  }
  ```
- For complex redirect logic (regex patterns, conditional redirects), use `middleware.ts`
- Redirects in next.config.js run on Vercel's Edge Network — very fast, no cold start
- Maximum redirect count in next.config.js: 1024 (should be more than sufficient)
- Vercel automatically provisions SSL via Let's Encrypt when the domain is added
- Vercel supports both apex domains (`partygirl.events`) and www subdomains — configure both with one redirecting to the other
- Consider adding a `validate-redirects.ts` script that fetches every old URL and verifies it returns a 301 to the expected new URL

---

## Dependencies

- All of Epics 01-04 must be complete (new pages must exist at their new URLs before redirects point to them)
- Access to the existing WordPress site for URL crawl
- Access to Cloudflare account (or current DNS provider) for DNS cutover
- Access to Google Business Profile, WeddingWire, The Knot, and Yelp accounts for listing updates
- Stephanie's approval on the URL mapping (any URL structure changes must be agreed upon)

---

## Definition of Done

- [ ] Complete URL mapping document created and reviewed
- [ ] All 301 redirects implemented and tested on Vercel preview deployment
- [ ] Zero 404 errors for any previously indexed URL
- [ ] No redirect chains longer than 1 hop
- [ ] DNS cutover plan documented with rollback procedure
- [ ] Domain added to Vercel project with SSL provisioned
- [ ] Google Business Profile verified and up to date
- [ ] Directory listings (WeddingWire, The Knot, Yelp) updated
- [ ] WordPress site accessible at fallback subdomain for 30-day reference
- [ ] `validate-redirects.ts` script passes (all old URLs redirect correctly)
