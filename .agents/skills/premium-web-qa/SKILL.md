---
name: premium-web-qa
description: "QA checklist and Definition of Done for QIAO TECH website. Run this before declaring any page or feature complete. Covers logo circles, WCAG, Lighthouse targets, CLS, LCP, and keyboard navigation."
risk: safe
source: custom
date_added: "2026-09-30"
---

# QIAO TECH — Premium Web QA

## Definition of Done

### Logo / Visual
- [ ] Every `.logo-badge` is a perfect circle at 320, 390, 768, 1024, 1440px
- [ ] `getBoundingClientRect().width === height` (±0.5px) for all logo instances
- [ ] `getComputedStyle(el).borderRadius` = `50%` (or px value ≥ half width)
- [ ] No remote image URLs (no `lh3.googleusercontent.com`, no hotlinked assets)
- [ ] All `<img>` have `width`, `height`, `alt`
- [ ] Hero logo: `fetchpriority="high"`, no `loading="lazy"`
- [ ] Footer logo: `loading="lazy"`

### Performance
- [ ] Lighthouse mobile Performance ≥ 95
- [ ] Lighthouse desktop Performance ≥ 95
- [ ] CLS < 0.05
- [ ] LCP < 2.0s on throttled 4G
- [ ] No render-blocking third-party scripts
- [ ] CSS < 30 KB gzipped
- [ ] Images in modern formats (WebP), sized appropriately

### Accessibility (WCAG 2.2 AA)
- [ ] All text contrast ≥ 4.5:1 (including footer "Channels:" label)
- [ ] One `<h1>` per page
- [ ] Skip-link present and functional
- [ ] All interactive elements have visible `:focus-visible` ring
- [ ] Mobile menu: `aria-expanded`, `aria-controls`, ESC to close, focus trap
- [ ] Icon-only buttons: `aria-label` (no bare icon text read aloud)
- [ ] `aria-hidden="true"` on decorative SVGs and spans
- [ ] Full keyboard operability (Tab, Shift+Tab, Enter, Space, Esc)

### Responsiveness
- [ ] No horizontal scroll at 320px
- [ ] H1 uses `text-display-mobile md:text-display` (38px mobile, 56px desktop)
- [ ] Stat numerals use `text-display-mobile md:text-display`
- [ ] Nav collapses to hamburger at <1024px
- [ ] Mobile menu full-screen panel works correctly

### SEO
- [ ] `<title>` unique per page
- [ ] Meta description unique per page
- [ ] Canonical `<link>` set
- [ ] Open Graph: title, description, image (1200×630), url
- [ ] Twitter card meta
- [ ] `theme-color` meta = `#0b1229`
- [ ] JSON-LD `Organization` schema
- [ ] `site.webmanifest` present
- [ ] Favicon set: `favicon.ico`, 32px png, apple-touch-icon 180px, 192px, 512px

### Code Quality
- [ ] Zero console errors
- [ ] No broken links (or all placeholders documented)
- [ ] No orphan `data-path` attributes
- [ ] No duplicate `<link>` tags (Material Symbols was linked twice)
- [ ] Dynamic copyright year (`new Date().getFullYear()`)
- [ ] `prefers-reduced-motion` respected for all animations
- [ ] Slim scrollbar (not globally hidden)
- [ ] All original copy, claims, palette intact

### Motion
- [ ] `animate-ping/pulse/bounce/spin` wrapped in `@media not (prefers-reduced-motion: reduce)`
- [ ] Count-up runs once, uses `tabular-nums`
- [ ] Reveal-on-scroll with `IntersectionObserver` (fade + 16px rise, stagger 60ms)

## Manual Test Script

```
1. Open at 320px width
   - No horizontal scroll
   - H1 readable, not overflowing
   - Logo is circular in header

2. Open mobile menu (hamburger)
   - Full-screen panel opens with animation
   - Logo appears at top of menu
   - All links visible
   - ESC closes it
   - Focus is trapped inside
   - Body scroll is locked

3. Tab through the page
   - Skip-link appears on first Tab
   - All links/buttons reachable
   - Focus ring visible at all times
   - No focus trapped outside menu

4. Resize to 1440px
   - Desktop nav visible
   - Logo badge circular in header AND footer
   - Hero orb is circular (not egg-shaped)
   - Stat cards layout 4-column

5. Hover on "Get a Quote" button
   - Gold glow intensifies
   - No layout shift

6. Hover on hero logo badge
   - Scale up + gold glow
   - Glint sweeps through

7. Emulate prefers-reduced-motion
   - Spinning ring stops
   - Count-up skips to final number
   - No ping/pulse animations

8. Check favicon in browser tab
   - Should show emblem, ideally circular
```
