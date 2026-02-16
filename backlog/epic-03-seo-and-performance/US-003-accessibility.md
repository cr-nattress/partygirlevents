# US-003: Accessibility (WCAG 2.2 AA)

**Epic:** [03 — SEO & Performance](README.md)
**Priority:** P1 — Should Have
**Points:** 3
**Status:** Not Started

---

## Description

Audit and remediate the entire site for WCAG 2.2 AA compliance. This covers focus management, target sizes, color contrast, semantic HTML, keyboard navigation, screen reader support, and motion preferences. Accessibility is both a legal consideration and a reflection of Party Girl Events' inclusive values — the site should be usable by everyone, regardless of ability.

---

## Acceptance Criteria

### Focus Management
- [ ] All interactive elements have visible focus indicators using `:focus-visible` (not `:focus`)
- [ ] Focus indicators are at least 2px thick with a minimum 3:1 contrast ratio against adjacent colors
- [ ] Focus indicator style is consistent across all interactive elements (buttons, links, form inputs, tabs, accordions)
- [ ] Focus ring uses the brand accent color (terracotta or sage) for visual consistency
- [ ] No focus traps — users can Tab and Shift+Tab through all interactive elements without getting stuck
- [ ] Modal dialogs trap focus correctly (focus stays within modal while open, returns to trigger on close)

### Target Sizes
- [ ] All interactive elements (buttons, links, form controls) have a minimum target size of 24x24px
- [ ] Touch targets on mobile have adequate spacing (no overlapping tap zones)
- [ ] Icon-only buttons meet the 24x24px minimum without relying on padding alone

### Color Contrast
- [ ] Normal text (< 18px or < 14px bold): minimum 4.5:1 contrast ratio against background
- [ ] Large text (>= 18px or >= 14px bold): minimum 3:1 contrast ratio against background
- [ ] UI components and graphical objects: minimum 3:1 contrast ratio
- [ ] All color combinations in the design system verified (cream background + dark text, white cards + text, accent colors + backgrounds)
- [ ] Text over images uses an overlay or text shadow to ensure contrast
- [ ] Color is not the sole means of conveying information (e.g., form errors use icon + text, not just red color)

### Semantic HTML
- [ ] Page structure uses landmark elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- [ ] Each page has exactly one `<main>` element
- [ ] Navigation uses `<nav>` with `aria-label` to distinguish primary nav from footer nav
- [ ] Lists of items use `<ul>` / `<ol>` / `<li>` (not divs with visual styling)
- [ ] Tables (if any) use proper `<thead>`, `<th>`, `<tbody>`, `<td>` with `scope` attributes
- [ ] Form inputs use `<label>` elements properly associated via `htmlFor`/`id`
- [ ] Required fields indicated with both visual indicator and `aria-required="true"`

### Skip Navigation
- [ ] "Skip to main content" link is the first focusable element on every page
- [ ] Skip link is visually hidden until focused (appears on Tab keypress)
- [ ] Skip link moves focus to the `<main>` element when activated

### ARIA Attributes
- [ ] All icon-only buttons have descriptive `aria-label` attributes (e.g., "Open menu", "Close dialog", "View on Instagram")
- [ ] Decorative images have `alt=""` (empty alt, not missing alt)
- [ ] Informative images have descriptive alt text
- [ ] `aria-expanded` used on toggles (mobile menu, accordions, dropdowns)
- [ ] `aria-current="page"` set on the active navigation link
- [ ] Live regions (`aria-live="polite"`) used for dynamic content updates (form success messages, toast notifications)

### Motion & Animation
- [ ] `prefers-reduced-motion: reduce` media query disables ALL non-essential animations and transitions
- [ ] Scroll-triggered animations (Framer Motion) check the user's motion preference and skip if reduced motion is preferred
- [ ] No auto-playing video or animation that cannot be paused
- [ ] Parallax effects (if any) disabled when reduced motion is preferred
- [ ] A global `useReducedMotion()` hook is available for components to check the preference

### Keyboard Navigation
- [ ] All interactive elements are reachable and operable via keyboard alone (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys)
- [ ] Image gallery / lightbox navigable with Arrow keys, closable with Escape
- [ ] Mobile menu openable and closable with keyboard
- [ ] Form multi-step navigation works with keyboard
- [ ] Accordion sections expandable/collapsible with Enter or Space
- [ ] Tab order follows logical reading order (top to bottom, left to right)

### Screen Reader Testing
- [ ] Full site tested with VoiceOver on macOS/iOS Safari
- [ ] All pages announce meaningful content in logical order
- [ ] Form error messages are announced when they appear
- [ ] Dynamic content changes (toast notifications, form success states) are announced
- [ ] Images, buttons, and links have meaningful accessible names

---

## Technical Notes

- Many accessibility requirements are already handled by Radix UI primitives (Dialog, Accordion, Tabs, etc.) — verify rather than reimplement
- Focus indicator styles should be defined once in `globals.css` or as a Tailwind utility and applied consistently
- The `useReducedMotion()` hook can use `window.matchMedia('(prefers-reduced-motion: reduce)')` — consider using Framer Motion's built-in `useReducedMotion` hook
- Use `eslint-plugin-jsx-a11y` to catch common accessibility issues during development
- Consider running `axe-core` (via `@axe-core/react` in dev mode or Playwright axe integration) for automated accessibility scanning
- The skip navigation link pattern: visually hidden with `sr-only`, becomes visible on `:focus-visible` with absolute positioning

---

## Dependencies

- Epic 01 US-003 (UI Component Library) — components must exist before auditing them
- Epic 02 (Core Pages) — pages must be built before the full accessibility audit
- VoiceOver available on macOS for screen reader testing (built-in, no additional tools needed)

---

## Definition of Done

- [ ] Lighthouse Accessibility score > 90 on all pages
- [ ] axe-core automated scan returns zero critical or serious violations
- [ ] Full keyboard navigation test completed — all interactions work without a mouse
- [ ] VoiceOver screen reader walkthrough completed on all pages — content reads logically
- [ ] All color contrast ratios verified with a contrast checker tool
- [ ] Skip navigation link works on every page
- [ ] `prefers-reduced-motion` disables all non-essential animations (verified by enabling setting in OS)
- [ ] No focus traps outside of modal dialogs
- [ ] All icon-only buttons have descriptive `aria-label` attributes
