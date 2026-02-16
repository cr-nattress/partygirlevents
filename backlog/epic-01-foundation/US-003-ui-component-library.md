# US-003: UI Component Library

**Epic:** [01 — Foundation & Design System](README.md)
**Priority:** P0 — Must Have
**Points:** 5
**Status:** Not Started

---

## Description

Build the core UI component library in `src/components/ui/` using Radix UI primitives with a shadcn/ui-inspired approach (components live in the project, not in `node_modules`). Every component must use the design tokens from US-002, support mobile-first responsive behavior, respect `prefers-reduced-motion`, and meet WCAG 2.2 AA accessibility requirements. These components become the building blocks for all pages across the site.

---

## Acceptance Criteria

### Button Component (`button.tsx`)
- [ ] Variants: `primary` (terracotta accent fill), `secondary` (sage fill), `ghost` (transparent + text), `outline` (border + transparent fill)
- [ ] Sizes: `sm`, `md` (default), `lg`
- [ ] States: default, hover, focus-visible, active, disabled, loading (with spinner)
- [ ] Supports `asChild` pattern for rendering as links (`<a>`) via Radix Slot
- [ ] Loading state shows spinner and disables interaction
- [ ] Focus indicator: 2px ring with 3:1 contrast ratio
- [ ] Minimum target size: 24x24px (WCAG 2.2 AA)

### Card Component (`card.tsx`)
- [ ] Default variant: white surface with subtle shadow, rounded corners
- [ ] Glass variant: frosted glass effect with `backdrop-blur` for use on dark/image backgrounds
- [ ] Hover state: subtle lift with shadow increase (disabled when `prefers-reduced-motion`)
- [ ] Composable sub-components: `CardHeader`, `CardContent`, `CardFooter`, `CardImage`
- [ ] Supports click-to-navigate pattern (entire card as link)

### Badge Component (`badge.tsx`)
- [ ] Variants: `default`, `accent`, `secondary`, `outline`
- [ ] Used for tags, categories, style labels throughout the site
- [ ] Appropriately sized text and padding for readability

### Form Components
- [ ] **Input** (`input.tsx`): text input with label, placeholder, error state, helper text, required indicator
- [ ] **Textarea** (`textarea.tsx`): multi-line input with character count option, auto-resize option
- [ ] **Select** (`select.tsx`): built on Radix UI Select primitive, custom styled dropdown, keyboard navigable
- [ ] **Checkbox** (`checkbox.tsx`): built on Radix UI Checkbox, custom styled check indicator
- [ ] **Radio Group** (`radio-group.tsx`): built on Radix UI RadioGroup, custom styled radio indicators
- [ ] All form components integrate with React Hook Form via `forwardRef` and accept `register` props
- [ ] All form components display error messages from Zod validation
- [ ] All form components have visible labels (no placeholder-only labels)
- [ ] All form inputs have minimum target size of 24x24px

### Accordion Component (`accordion.tsx`)
- [ ] Built on Radix UI Accordion primitive
- [ ] Single and multiple open modes supported
- [ ] Smooth expand/collapse animation (disabled with `prefers-reduced-motion`)
- [ ] Chevron indicator rotates on open/close
- [ ] Keyboard accessible: Enter/Space to toggle, Arrow keys to navigate between items

### Dialog / Modal Component (`dialog.tsx`)
- [ ] Built on Radix UI Dialog primitive
- [ ] Overlay backdrop with blur effect
- [ ] Smooth open/close animation (disabled with `prefers-reduced-motion`)
- [ ] Close on overlay click, Escape key, and explicit close button
- [ ] Focus trapped within dialog when open
- [ ] Body scroll locked when dialog is open
- [ ] Responsive: full-screen on mobile, centered modal on desktop

### Tabs Component (`tabs.tsx`)
- [ ] Built on Radix UI Tabs primitive
- [ ] Underline indicator style with animated transition between tabs
- [ ] Keyboard accessible: Arrow keys to switch tabs
- [ ] Supports controlled and uncontrolled modes
- [ ] Responsive: horizontal scroll on mobile if many tabs, or stack vertically

### Skeleton Component (`skeleton.tsx`)
- [ ] Animated pulse placeholder for loading states
- [ ] Variants matching common content shapes: text line, heading, image, card, avatar
- [ ] Animation disabled with `prefers-reduced-motion` (shows static gray block)

### Toast Component (`toast.tsx`)
- [ ] Built on Radix UI Toast primitive (or a lightweight toast library)
- [ ] Variants: `success`, `error`, `info`, `warning`
- [ ] Auto-dismiss with configurable duration
- [ ] Dismiss on swipe (mobile) and close button (desktop)
- [ ] Stacks multiple toasts with proper spacing
- [ ] Toast provider added to root layout

### Cross-Cutting Requirements (All Components)
- [ ] **Dark section support:** Every component has a `dark` variant or responds to a `.dark` parent class for use in dark (#1A1918) sections
- [ ] **Mobile-first responsive:** All components designed at 375px first, enhanced for larger breakpoints
- [ ] **prefers-reduced-motion:** All animations and transitions disabled when user prefers reduced motion
- [ ] **WCAG 2.2 AA compliance:**
  - Focus indicators: minimum 2px thick with 3:1 contrast ratio against adjacent colors
  - Target sizes: all interactive elements minimum 24x24px
  - Color contrast: all text meets 4.5:1 (normal) or 3:1 (large) against its background
  - Semantic HTML and ARIA attributes where needed
- [ ] **TypeScript:** All components fully typed with exported prop interfaces
- [ ] **Composition:** Components use `className` prop and merge with `cn()` utility for style overrides
- [ ] **Server/Client:** Components marked with `"use client"` only when they require browser APIs or interactivity; purely visual components remain server-compatible

---

## Technical Notes

- Follow the shadcn/ui architecture pattern: each component is a standalone file in `src/components/ui/` that can be copied and modified. No abstraction library — the code lives in the project.
- Use `cva` (class-variance-authority) for managing component variants if the variant logic becomes complex. Otherwise, simple conditional `cn()` calls are fine.
- All Radix UI primitives handle accessibility out of the box (ARIA attributes, keyboard navigation, focus management). Lean on these rather than reimplementing.
- The `cn()` utility from US-001 (`clsx` + `tailwind-merge`) is the standard for all class composition.
- Consider creating a `src/components/ui/index.ts` barrel export for convenient imports.
- For the glass card variant, use `backdrop-filter: blur(16px)` with a semi-transparent background. Test on Safari (which requires `-webkit-backdrop-filter`).
- Form components should be tested with React Hook Form integration to confirm `ref` forwarding works correctly.

### Component File Structure

```
src/components/ui/
├── button.tsx
├── card.tsx
├── badge.tsx
├── input.tsx
├── textarea.tsx
├── select.tsx
├── checkbox.tsx
├── radio-group.tsx
├── accordion.tsx
├── dialog.tsx
├── tabs.tsx
├── skeleton.tsx
├── toast.tsx
└── index.ts            # Barrel exports
```

---

## Dependencies

- **US-001** (Project Initialization) — Radix UI packages, React Hook Form, Zod, and `cn()` utility must be installed
- **US-002** (Design Tokens) — Color palette, typography, spacing, shadows, and transition tokens must be defined in Tailwind config

---

## Definition of Done

- [ ] All 13 component types listed above are implemented and exported from `src/components/ui/`
- [ ] Every component renders correctly on viewports from 375px to 2560px
- [ ] Every interactive component is keyboard navigable
- [ ] Every component has visible focus indicators meeting 2px / 3:1 contrast requirement
- [ ] Every component works in both light (cream background) and dark (#1A1918 background) contexts
- [ ] Animations and transitions are disabled when `prefers-reduced-motion: reduce` is active
- [ ] All form components integrate with React Hook Form (tested with a sample form)
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] Components are visually reviewed against the "Elevated Warm Minimalism" direction (warm, editorial, not cold/corporate)
- [ ] Optional: Storybook or a dev-only `/components` page showcasing all components with variants (nice-to-have, not blocking)
