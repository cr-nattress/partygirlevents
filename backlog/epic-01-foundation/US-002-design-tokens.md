# US-002: Design Tokens & Tailwind Config

**Epic:** [01 — Foundation & Design System](README.md)
**Priority:** P0 — Must Have
**Points:** 2
**Status:** Not Started

---

## Description

Implement the full design token system from PLAN.md Section 5 into the Tailwind CSS v4 configuration and global CSS. This includes the color palette, typography scale with serif/sans font pairing, spacing scale, border radii, shadows, transitions, and global base styles. The result is a fully tokenized design system that ensures visual consistency across every component and page built in subsequent stories.

---

## Acceptance Criteria

### Color Palette
- [ ] All brand colors implemented as Tailwind theme extensions and available as utility classes:
  - Background: `#FAF7F2` (warm cream) — `bg-background`
  - Surface: `#FFFFFF` (white) — `bg-surface`
  - Text Primary: `#2D2A26` (warm near-black) — `text-primary`
  - Text Secondary: `#6B645C` (warm gray) — `text-secondary`
  - Accent: `#C4926E` (terracotta/warm copper) — `text-accent`, `bg-accent`
  - Secondary: `#8B9E8B` (sage green) — `text-secondary-accent`, `bg-secondary-accent`
  - Mountain: `#5B7B8A` (slate blue) — `text-mountain`, `bg-mountain`
  - Dark: `#1A1918` (near-black for dark sections) — `bg-dark`
  - Error: `#C4534A` — `text-error`, `bg-error`
  - Success: `#5C8A5B` — `text-success`, `bg-success`
- [ ] Each color includes appropriate lighter/darker shades for hover states and variants (at minimum: 50, 100, 200, ..., 900 scale for accent and secondary)
- [ ] Color contrast ratios verified: all text/background combinations meet WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text)

### Typography
- [ ] Serif heading font loaded via `next/font` — Playfair Display or Cormorant Garamond (evaluate both, pick one)
- [ ] Sans-serif body font loaded via `next/font` — Inter or Geist (evaluate both, pick one)
- [ ] Maximum 2 font families loaded (down from current site's 4)
- [ ] Font variables applied to Tailwind config: `font-heading` and `font-body` utilities
- [ ] Typography scale defined in Tailwind config:
  - `text-xs` through `text-6xl` with appropriate line heights and letter spacing
  - Custom `text-hero` utility using `clamp(3rem, 8vw, 12rem)` for fluid oversized hero headings
  - Custom `text-display` utility using `clamp(2rem, 5vw, 4.5rem)` for section headings
- [ ] Font weights configured: 400 (regular), 500 (medium), 600 (semibold), 700 (bold) for body; 400, 700 for headings
- [ ] Font subsetting applied to reduce download size (Latin subset only unless other scripts needed)

### Spacing Scale
- [ ] Custom spacing scale implemented in Tailwind config matching PLAN.md tokens:
  - `space-xs`: 0.25rem (4px)
  - `space-sm`: 0.5rem (8px)
  - `space-md`: 1rem (16px)
  - `space-lg`: 1.5rem (24px)
  - `space-xl`: 2rem (32px)
  - `space-2xl`: 3rem (48px)
  - `space-3xl`: 4rem (64px)
- [ ] Default Tailwind spacing scale also retained for general use

### Border Radii
- [ ] Custom border radius tokens added to Tailwind config:
  - `rounded-sm`: 0.375rem (6px)
  - `rounded-md`: 0.75rem (12px)
  - `rounded-lg`: 1rem (16px)
  - `rounded-full`: 9999px

### Shadows
- [ ] Custom shadow tokens added to Tailwind config:
  - `shadow-sm`: `0 1px 2px rgba(0,0,0,0.05)`
  - `shadow-md`: `0 4px 6px rgba(0,0,0,0.07)`
  - `shadow-lg`: `0 10px 15px rgba(0,0,0,0.1)`
  - `shadow-glow`: subtle warm glow variant for hover states on accent elements

### Transitions
- [ ] Custom transition tokens defined as CSS custom properties and/or Tailwind utilities:
  - Default easing: `cubic-bezier(0.4, 0, 0.2, 1)`
  - Duration fast: 150ms
  - Duration normal: 300ms
  - Duration slow: 500ms

### Global CSS
- [ ] `globals.css` includes Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- [ ] Base styles applied:
  - `html` background set to `#FAF7F2`
  - Body font set to sans-serif body font
  - Default text color set to `#2D2A26`
  - Smooth scroll behavior on `html`
  - Selection/highlight color uses accent palette
  - Antialiased font rendering (`-webkit-font-smoothing: antialiased`)
- [ ] Subtle paper grain/noise texture overlay available as a CSS utility class (`.texture-grain`)
- [ ] `prefers-reduced-motion` media query in global CSS:
  - Disables all CSS transitions and animations
  - Sets `scroll-behavior: auto`
- [ ] CSS custom properties defined for all design tokens (for use outside Tailwind context)

### Fluid Typography
- [ ] Hero heading class produces fluid sizing: `clamp(3rem, 8vw, 12rem)`
- [ ] Section display heading class produces fluid sizing: `clamp(2rem, 5vw, 4.5rem)`
- [ ] Body text remains fixed at appropriate sizes per breakpoint (no fluid body text)

---

## Technical Notes

- Tailwind CSS v4 uses a CSS-first configuration approach — design tokens may be defined in CSS using `@theme` rather than a `tailwind.config.ts` file. Evaluate which approach is cleaner for this project.
- Use `next/font/google` for Google Fonts (Playfair Display, Cormorant Garamond, Inter) or `next/font/local` for Geist. The `next/font` module handles subsetting, preloading, and `font-display: swap` automatically.
- The grain texture overlay should use a base64-encoded SVG noise pattern applied via `background-image` for zero network requests.
- Keep all design token values in a single source of truth — either the Tailwind config or a `tokens.ts` file that the config imports. Avoid scattering magic values across components.
- Test fluid typography at every breakpoint: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1024px (iPad landscape), 1280px (laptop), 1440px (desktop), 1920px (large desktop), 2560px (ultrawide).

---

## Dependencies

- **US-001** (Project Initialization) — Tailwind CSS, `next/font`, and the directory structure must be in place before this work begins.

---

## Definition of Done

- [ ] All colors from the palette render correctly and are usable via Tailwind utilities
- [ ] Heading and body fonts load without FOUT (Flash of Unstyled Text) or layout shift
- [ ] Lighthouse font-related audits pass (no render-blocking font resources)
- [ ] Fluid hero heading scales smoothly from 375px to 2560px viewport width
- [ ] `prefers-reduced-motion: reduce` disables all CSS-based animations and transitions
- [ ] Grain texture overlay renders subtly without impacting performance
- [ ] A simple test page (`/design-system` or similar dev-only route) demonstrates all tokens: color swatches, typography scale, spacing, shadows, radii
- [ ] All text/background color combinations used in the design meet WCAG 2.2 AA contrast requirements
- [ ] No more than 2 font families loaded in network panel
- [ ] Design tokens are documented (in code comments or a dev-only page) for reference during component development
