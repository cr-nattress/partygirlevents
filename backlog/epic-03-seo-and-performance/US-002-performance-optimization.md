# US-002: Performance Optimization

**Epic:** [03 — SEO & Performance](README.md)
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Optimize the site to meet Core Web Vitals thresholds and achieve a mobile PageSpeed Lighthouse score above 85. This covers image optimization with next/image, font loading with next/font, code splitting with next/dynamic, skeleton loading screens, edge caching, and a Lighthouse CI script for continuous performance monitoring. A fast site is critical for both search rankings and the user experience of couples browsing on mobile devices.

---

## Acceptance Criteria

### Core Web Vitals
- [ ] **LCP (Largest Contentful Paint):** < 2.5 seconds on mobile (3G Fast connection)
- [ ] **FID/INP (First Input Delay / Interaction to Next Paint):** < 200 milliseconds
- [ ] **CLS (Cumulative Layout Shift):** < 0.1
- [ ] Core Web Vitals measured via Vercel Analytics and confirmed via PageSpeed Insights
- [ ] All Core Web Vitals in "Good" range (green) for 75th percentile of real users

### Image Optimization
- [ ] All images use `next/image` component — no raw `<img>` tags anywhere in the codebase
- [ ] next/image configured to serve AVIF format with WebP fallback
- [ ] Responsive `srcset` with appropriate `sizes` attribute on all images (no oversized images served to mobile)
- [ ] All below-the-fold images use `loading="lazy"` (default next/image behavior)
- [ ] Hero images and above-the-fold images use `priority={true}` for eager loading
- [ ] Image dimensions specified (width/height or fill) on all images to prevent CLS
- [ ] Placeholder blur data URLs (`blurDataURL`) for hero and key images to prevent layout shift during load

### Font Optimization
- [ ] All fonts loaded via `next/font/google` or `next/font/local` — no external font stylesheet requests
- [ ] Maximum 2 font families loaded (serif headings + sans-serif body)
- [ ] Font subsetting enabled (only Latin character set unless multilingual needed)
- [ ] `font-display: swap` applied to prevent invisible text during load
- [ ] Font files preloaded for above-the-fold text
- [ ] Font loading does not contribute to CLS (font size adjust or size-adjust CSS configured)

### Code Splitting
- [ ] Heavy client components loaded with `next/dynamic` and `{ ssr: false }` where appropriate
- [ ] Components that are candidates for dynamic import: image galleries/lightbox, map embeds, form multi-step logic, animation-heavy sections, chat widget
- [ ] Dynamic imports include appropriate loading fallbacks (skeleton or spinner)
- [ ] Bundle analysis run with `@next/bundle-analyzer` to identify oversized chunks
- [ ] No single JS chunk exceeds 150KB gzipped

### Loading States
- [ ] Skeleton screens implemented for all dynamic content sections (testimonials, blog posts, portfolio grid, Instagram feed)
- [ ] Skeletons match the layout dimensions of the loaded content (no layout shift on hydration)
- [ ] Loading states use subtle pulse animation consistent with design system

### Caching
- [ ] Static pages use appropriate `Cache-Control` headers for edge caching
- [ ] ISR pages configured with sensible revalidation intervals (blog: 1 hour, portfolio: 1 hour, static pages: 1 day)
- [ ] API responses include `Cache-Control` headers where appropriate
- [ ] Vercel Edge Network caching verified (check `x-vercel-cache` header returns HIT)

### Performance Monitoring
- [ ] Lighthouse CI script created (`scripts/lighthouse-ci.sh` or `lighthouserc.js`)
- [ ] Script tests homepage, services page, contact page, and one blog post
- [ ] Lighthouse CI asserts: Performance > 85, Accessibility > 90, Best Practices > 90, SEO > 95
- [ ] Script can run in CI/CD pipeline (GitHub Actions) on pull requests
- [ ] Mobile PageSpeed Insights score > 85 for homepage

---

## Technical Notes

- Use `next/image` with the Vercel Image Optimization service (default in Vercel deployments) — no need for a custom image loader
- For hero images, generate `blurDataURL` at build time or store them in the CMS alongside each image
- Font configuration should live in the root layout (`src/app/layout.tsx`) using `next/font` and apply CSS variables for the font families
- Consider using `@next/third-parties` for optimized loading of Google Tag Manager if bundle impact is significant
- Skeleton components should be built as reusable UI primitives in `src/components/ui/skeleton.tsx`
- Run `npx @next/bundle-analyzer` periodically to catch bundle size regressions
- Vercel Speed Insights (`@vercel/speed-insights`) provides real-user Web Vitals data — ensure it is installed from Epic 01

---

## Dependencies

- Epic 01 US-003 (UI Component Library) — skeleton components build on the design system
- Epic 01 US-004 (Layout Components) — hero and layout must be in place to optimize
- Epic 02 (Core Pages) — pages must be built to measure and optimize their performance
- Vercel deployment — image optimization and edge caching require Vercel hosting

---

## Definition of Done

- [ ] Mobile PageSpeed Lighthouse score > 85 on homepage, services, and contact pages
- [ ] All three Core Web Vitals in "Good" range on PageSpeed Insights (mobile)
- [ ] Zero raw `<img>` tags in the codebase — all images use next/image
- [ ] All fonts loaded via next/font with no external stylesheet requests
- [ ] Lighthouse CI script runs and passes threshold assertions
- [ ] Bundle analysis shows no chunk > 150KB gzipped
- [ ] Skeleton screens display for all dynamic content sections
- [ ] No CLS issues visible during page load on mobile
