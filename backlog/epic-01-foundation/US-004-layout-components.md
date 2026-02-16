# US-004: Layout Components

**Epic:** [01 — Foundation & Design System](README.md)
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Build the site-wide layout components that wrap every page: the sticky header with scroll-aware transformations, the full footer with contact and newsletter, the content container, the section wrapper with alternating background support, the reusable page hero, and the floating CTA. These components establish the visual shell and navigational structure that all page content lives within.

---

## Acceptance Criteria

### Header / Navigation (`src/components/layout/header.tsx`)
- [ ] Sticky header fixed to top of viewport on all pages
- [ ] **Full state** (at top of page): taller height, full logo, transparent or cream background
- [ ] **Compact state** (after scrolling ~80px): reduced height, smaller logo, glassmorphism background (`backdrop-blur` + semi-transparent)
- [ ] Smooth transition between full and compact states (disabled with `prefers-reduced-motion`)
- [ ] **Desktop navigation:** horizontal nav links matching PLAN.md sitemap:
  - Home, Services (with mega menu dropdown), Portfolio, Venues (with dropdown), About, Blog
  - Primary CTA button: "Start Planning" (accent color, always visible)
- [ ] **Services mega menu:** dropdown panel showing all service tiers (Full Service, Wedding Management, Elopements, Events) with brief descriptions and links
- [ ] **Venues dropdown:** list of venue guide locations (Vail, Beaver Creek, Aspen, Breckenridge, Keystone)
- [ ] **Mobile navigation:**
  - Hamburger menu icon (3-line, animated to X on open)
  - Full-screen or slide-in overlay menu
  - All nav items accessible including Services sub-items and Venues sub-items
  - "Start Planning" CTA prominently placed in mobile menu
  - Body scroll locked when mobile menu is open
- [ ] Keyboard accessible: all nav items reachable via Tab, dropdowns toggleable via Enter/Space, Escape closes open menus
- [ ] Active page indicator on current nav item
- [ ] Logo links to homepage
- [ ] `aria-label` on navigation landmark, mobile menu toggle

### Footer (`src/components/layout/footer.tsx`)
- [ ] Dark background (#1A1918) with light text — all content readable (WCAG AA contrast)
- [ ] **Contact info section:** phone number, email, service area ("Serving Vail, Beaver Creek, Aspen, Breckenridge & beyond")
- [ ] **Navigation links:** mirroring main nav structure (Home, Services, Portfolio, Venues, About, Blog, Contact, FAQ, Process)
- [ ] **Social media icons:** Instagram, Pinterest, Facebook (at minimum) — link to Stephanie's profiles, open in new tab with `rel="noopener noreferrer"`
- [ ] **Newsletter signup:** email input + submit button, connected to ConvertKit or email service placeholder
- [ ] **"As Featured In" press logos:** Martha Stewart, Brides, The Knot, Buzzfeed, The Sun — displayed as grayscale/muted logos
- [ ] **Legal links:** Privacy Policy, Terms of Service
- [ ] **Copyright:** "2026 Party Girl Events. All rights reserved."
- [ ] Responsive: stacked layout on mobile, multi-column on desktop

### Container Component (`src/components/layout/container.tsx`)
- [ ] Max-width wrapper with horizontal padding
- [ ] Default max-width: 1280px (configurable via prop)
- [ ] Responsive horizontal padding: 1rem on mobile, 2rem on tablet, 4rem on desktop
- [ ] Centered with `margin: 0 auto`
- [ ] Accepts `className` prop for overrides
- [ ] Optional `narrow` variant (max-width: 768px) for text-heavy content

### Section Component (`src/components/layout/section.tsx`)
- [ ] Full-bleed wrapper for page sections with consistent vertical padding
- [ ] **Background variants:**
  - `cream` — warm cream (#FAF7F2) background (default)
  - `white` — white (#FFFFFF) surface background
  - `dark` — near-black (#1A1918) background with light text (auto-applies `.dark` context for child component theming)
  - `image` — accepts a background image with overlay
- [ ] Alternating backgrounds for visual rhythm when sections are stacked
- [ ] Contains a `Container` child by default (configurable — can be full-bleed content)
- [ ] Vertical padding scale: responsive, generous whitespace (e.g., `py-16 md:py-24 lg:py-32`)
- [ ] Optional `id` prop for anchor linking (scroll-to-section navigation)

### PageHero Component (`src/components/layout/page-hero.tsx`)
- [ ] Reusable hero section used at the top of every page
- [ ] **Variants:**
  - `fullscreen` — full viewport height with background image/video, overlaid headline and CTA (homepage)
  - `split` — half image / half text side-by-side (service pages, about page)
  - `video` — background video with text overlay (homepage option)
  - `minimal` — text-only with cream background, no image (blog, FAQ, legal pages)
- [ ] Headline uses fluid typography: `clamp(3rem, 8vw, 12rem)` for fullscreen, smaller for other variants
- [ ] Supports: headline, subheadline, CTA button(s), breadcrumb, background image/video
- [ ] Background images use `next/image` with `priority` loading (LCP optimization)
- [ ] Dark overlay gradient on image/video variants for text readability
- [ ] Responsive: content stacks appropriately on mobile, generous padding
- [ ] Scroll indicator (subtle animated chevron) on fullscreen variant (hidden with `prefers-reduced-motion`)

### Floating CTA (`src/components/layout/floating-cta.tsx`)
- [ ] Persistent "Start Planning" button that appears after user scrolls past the hero section
- [ ] **Desktop:** appears as a fixed button in the bottom-right corner with subtle entrance animation
- [ ] **Mobile:** appears as a fixed bar at the bottom of the screen (full-width, thumb-friendly)
- [ ] Links to the contact/inquiry page
- [ ] Disappears when user scrolls back to the hero section (or when footer is in view)
- [ ] Entrance/exit animation (fade + slide, disabled with `prefers-reduced-motion`)
- [ ] Does not obstruct other content — appropriate z-index management
- [ ] `aria-label="Start planning your wedding"` for screen readers

---

## Technical Notes

- The header scroll behavior should use a scroll event listener (or `IntersectionObserver` for the hero) to toggle between full and compact states. Debounce or throttle the scroll handler for performance.
- The glassmorphism effect on the compact header uses `backdrop-filter: blur(12px)` with a semi-transparent background. Test on Safari which requires the `-webkit-` prefix.
- The mega menu for Services should use Radix UI `NavigationMenu` primitive for accessible dropdown behavior (handles ARIA, keyboard navigation, hover intent).
- The mobile menu can use Radix UI `Dialog` for the overlay behavior (body scroll lock, focus trap, Escape to close).
- The floating CTA uses `IntersectionObserver` on the hero element — when the hero exits the viewport, show the CTA; when it re-enters, hide it. Also hide when the footer is visible.
- All layout components are `"use client"` due to scroll listeners and interactive state. However, keep the markup as semantic as possible: `<header>`, `<nav>`, `<footer>`, `<main>`, `<section>`.
- Consider using CSS `position: sticky` for the header rather than `position: fixed` to simplify scroll management, but note `sticky` doesn't support the glassmorphism transform as cleanly.

### Component File Structure

```
src/components/layout/
├── header.tsx
├── footer.tsx
├── container.tsx
├── section.tsx
├── page-hero.tsx
├── floating-cta.tsx
└── index.ts            # Barrel exports
```

---

## Dependencies

- **US-001** (Project Initialization) — Framer Motion, Radix UI NavigationMenu installed, directory structure in place
- **US-002** (Design Tokens) — Colors, typography, spacing, shadows, transitions defined in Tailwind config
- **US-003** (UI Component Library) — Button component used in header CTA, floating CTA, hero CTAs; Input component used in footer newsletter signup

---

## Definition of Done

- [ ] Header renders in full state at page top and transitions to compact state on scroll
- [ ] Header navigation works on desktop (dropdowns open on hover/click) and mobile (hamburger menu opens full overlay)
- [ ] All navigation links are keyboard accessible and properly labeled with ARIA attributes
- [ ] Footer renders with all sections (contact, nav, social, newsletter, press logos, legal, copyright) and meets contrast requirements on dark background
- [ ] Container constrains content to max-width and applies responsive padding
- [ ] Section component renders all 4 background variants correctly, with dark variant applying inverted text colors
- [ ] PageHero renders all 4 variants (fullscreen, split, video, minimal) and fluid typography scales correctly from 375px to 2560px
- [ ] Floating CTA appears after scrolling past the hero and disappears when hero or footer is in view
- [ ] All layout components render correctly across target viewports: 375px, 390px, 768px, 1024px, 1280px, 1440px, 1920px
- [ ] `prefers-reduced-motion` disables all scroll animations, transitions, and the scroll indicator
- [ ] Layout shell (header + footer + container) wraps a placeholder page and produces a visually complete "empty" site
