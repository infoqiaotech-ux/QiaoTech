# QIAO TECH — Workspace Rules

## Always-On Brand Lock
- Never change the brand name "QIAO TECH", tagline "Clever AI. Smart Automation.", 
  or motto "Your Requirement. Our Technology. One Smart Solution."
- Never alter the palette: navy `#0b1229`, gold `#eac078`, cyan `#5bdfff`.
- Never modify marketing metrics: < 380ms, 99.4%, 10x Speed, 150+, 85+, 8+, 25+.
- Keep all existing body copy unless explicitly told to change it.

## Image Rules
- Never hot-link remote images — all assets must be in `assets/` directory.
- Every `<img>` must have `width`, `height`, and `alt` attributes.
- Above-fold images (header logo, hero): add `fetchpriority="high"`, no `loading="lazy"`.
- Below-fold images: add `loading="lazy"`, `decoding="async"`.

## Accessibility Rules
- Every icon-only interactive element (button, link) must have `aria-label`.
- Decorative SVGs, spans, and icon fonts: add `aria-hidden="true"`.
- Every interactive element must be keyboard-operable.
- Visible `:focus-visible` ring required on all interactive elements.
- Color contrast: all text ≥ 4.5:1 against its background.

## Production Code Rules
- No CDN scripts in production (no `cdn.tailwindcss.com`).
- No render-blocking third-party scripts.
- No global `::-webkit-scrollbar { display: none }` — use slim scrollbar styling instead.
- No `href="#"` placeholder links in production — use real links or mark as `[ASK ME]`.
- No `data-path` orphan attributes — clean them up.
- No hard-coded years — use `new Date().getFullYear()`.
- No duplicate `<link>` stylesheet tags.

## Animation Rules
- All animations using `animate-ping`, `animate-pulse`, `animate-bounce`, 
  `animate-spin` must be wrapped in `@media not (prefers-reduced-motion: reduce)`.
- No continuous animation of `box-shadow` or `filter` — use `transform` and `opacity` only.
- One motion easing throughout: `cubic-bezier(0.22, 1, 0.36, 1)`.

## Content Rules
- Never invent testimonials, client names, case studies, awards, addresses, 
  phone numbers, or social URLs.
- Use `[ASK ME]` for unknown real-world data and document it in the Owner Must Verify list.
- Do not add analytics, trackers, or third-party monitoring scripts.
