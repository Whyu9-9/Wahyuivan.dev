# UI Polish & Consistency — Design Spec
**Date:** 2026-04-03  
**Scope:** Visual polish, scroll animations, hover transitions, cross-section consistency, mobile improvements

---

## Goal
Make the portfolio feel more polished and professional without changing the One Dark theme or terminal aesthetic. No new runtime dependencies.

---

## 1. Scroll-Reveal Animations

### What
Every top-level section fades up + slides in when it enters the viewport.

### How
- Create `src/composables/useScrollReveal.js` — wraps `IntersectionObserver`, attaches a CSS class (`reveal-visible`) when element crosses threshold (0.1)
- Default animation: `opacity: 0; transform: translateY(20px)` → `opacity: 1; transform: translateY(0)` over `0.5s ease-out`
- Add `will-change: transform, opacity` for GPU compositing
- Respects `prefers-reduced-motion`: if set, skip animation entirely (apply visible state immediately)
- Apply to each section wrapper in `HomeView.vue` via `ref` + composable call in `onMounted`

### Files changed
- `src/composables/useScrollReveal.js` (new)
- `src/assets/base.css` (add `.reveal`, `.reveal-visible` utility classes)
- `src/views/HomeView.vue` (apply to section wrappers)

---

## 2. Hover Transitions

### Cards (Blogs, GitHub repos)
- Add `hover:-translate-y-1 hover:border-one-dark-gray transition-all duration-200` to all card `<a>` elements
- Ensures a subtle lift + border highlight on hover

### Project Carousel
- Add visible prev/next `<button>` arrows overlaid on the carousel (left/right sides)
- Arrow buttons: `w-10 h-10` on desktop, `w-8 h-8` on mobile, semi-transparent background, centered vertically
- Keyboard: add `@keydown.left` / `@keydown.right` on the carousel container (focus-visible only)
- Touch swipe already works — no change needed

### Experience Timeline Dots
- Add `hover:ring-2 hover:ring-one-dark-green transition-all duration-200` to timeline dots

### Social Icons (Header)
- Add `hover:scale-125 transition-transform duration-150` to social icon `<a>` elements (in addition to existing tooltip)

---

## 3. Visual Consistency Fixes

### Experience section
- **Problem:** Left-side titles use `text-2xl`, right-side uses `text-xl` — inconsistent
- **Fix:** Set both to `text-xl` (more readable at smaller sizes across both mobile and desktop)
- **Mobile:** Remove `hidden md:block` from description `<p>` tags — show descriptions on all screen sizes with `text-xs` size already appropriate

### Blogs section
- **Problem:** `object-contain` causes inconsistent card image heights
- **Fix:** Change to `object-cover` for uniform card image height

### Tools section
- **Problem:** Icons have no labels — hard to identify
- **Fix:** Add tooltip on hover (desktop) and on tap (mobile) — same pattern as Header social icons. Tooltip shows icon name from the `devicon` class string (e.g. `devicon-react-original` → "React")
- Helper function: parse name from class string — split by `-`, take index [1], capitalize first letter (e.g. `devicon-react-original colored` → "React")

### Card style audit
All cards already use `bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg` — consistent. No change needed.

### Spacing
- `HomeView.vue`: normalize all section wrappers to `mb-12` (currently mix of `mb-10` and `mb-16`)

---

## 4. Mobile Improvements

- Carousel arrow buttons use larger tap targets on mobile (`min-w-[44px] min-h-[44px]` per WCAG)
- Experience descriptions shown on mobile (currently hidden)
- Tools tooltips: use `focus-visible` + touch tap toggle for mobile accessibility
- Scroll-reveal: `prefers-reduced-motion` respected — no janky animations on low-power devices
- Verify all section paddings remain comfortable on small screens (≥375px)

---

## Out of Scope
- Navbar / sticky header
- Color scheme changes
- New sections or content
- Parallax effects
- New runtime npm dependencies

---

## Files to Change

| File | Change |
|------|--------|
| `src/composables/useScrollReveal.js` | New — scroll reveal composable |
| `src/assets/base.css` | Add `.reveal` / `.reveal-visible` classes |
| `src/views/HomeView.vue` | Apply scroll reveal, normalize spacing |
| `src/components/Header.vue` | Add scale transition to social icons |
| `src/components/Tools.vue` | Add icon tooltips |
| `src/components/Project.vue` | Add prev/next arrows, keyboard nav |
| `src/components/Experience.vue` | Fix font size parity, show descriptions on mobile |
| `src/components/Blogs.vue` | Fix `object-contain` → `object-cover` |
| `src/components/Github.vue` | Add hover transition to repo cards |
