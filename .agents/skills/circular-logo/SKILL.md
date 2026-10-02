---
name: circular-logo
description: "Circular logo badge specification for QIAO TECH. Use whenever placing the logo in any context: header, footer, hero, mobile menu. Contains HTML snippet, CSS, size table, and verification guide."
risk: safe
source: custom
date_added: "2026-09-30"
---

# QIAO TECH — Circular Logo Badge

## Root-Cause Context
The Tailwind config originally set `borderRadius.full = "0.75rem"` — meaning every
`rounded-full` class produced a 12px-radius rectangle, not a circle. The fix:
```js
borderRadius: { ..., full: "9999px", circle: "50%" }
```

## HTML Component

```html
<span class="logo-badge" style="--size:44px">
  <img 
    src="assets/logo/logo-44.webp"
    srcset="assets/logo/logo-44.webp 1x, assets/logo/logo-88.webp 2x"
    width="44" height="44"
    alt="QIAO TECH emblem"
    decoding="async"
    loading="lazy">
</span>
```

For the **header** logo (critical path, not lazy):
```html
<span class="logo-badge" style="--size:44px">
  <img ... fetchpriority="high" decoding="async">
  <!-- do NOT use loading="lazy" on above-fold logo -->
</span>
```

## CSS (in site.css or <style>)

```css
.logo-badge {
  --size: 44px;
  inline-size: var(--size);
  block-size: var(--size);
  aspect-ratio: 1 / 1;
  flex: none;                          /* never squashed in flex rows */
  display: grid;
  place-items: center;
  border-radius: 50%;
  overflow: hidden;
  isolation: isolate;
  padding: calc(var(--size) * 0.12);   /* 12% safe-zone so emblem breathes */
  background: radial-gradient(circle at 30% 25%, #222941 0%, #060d24 75%);
  box-shadow:
    0 0 0 1px rgb(234 192 120 / 0.45),
    0 0 calc(var(--size) * 0.5) rgb(234 192 120 / 0.22),
    inset 0 0 calc(var(--size) * 0.25) rgb(91 223 255 / 0.10);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.logo-badge > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  border-radius: 50%;
  display: block;
}

.logo-badge:hover {
  transform: scale(1.06);
  box-shadow:
    0 0 0 1px #eac078,
    0 0 calc(var(--size) * 0.7) rgb(234 192 120 / 0.4);
}

/* Hero orb variant */
.logo-badge--hero {
  padding: 12%;
}

.logo-badge--hero .glint {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgb(91 223 255 / 0.18),
    transparent
  );
  transform: translateY(-100%);
  transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

/* Fix defect #4: glint must be group-hover, not self-hover */
.logo-badge--hero:hover .glint {
  transform: translateY(100%);
}

/* Spinning gradient ring around hero orb */
.emblem-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 6px;
  background: conic-gradient(from 0deg, #eac078, #5bdfff, #c9a25d, #eac078);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spin 16s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .emblem-ring { animation: none; }
  .logo-badge { transition: none; }
}
```

## Size Table

| Location | `--size` | `<img>` src |
|---|---|---|
| Header (≥640px) | `44px` | `logo-44.webp` |
| Header (<640px) | `40px` | `logo-44.webp` (same, just CSS smaller) |
| Mobile menu | `72px` | `logo-72.webp` |
| Footer | `40px` | `logo-44.webp` |
| Hero orb (≥768px) | `288px` | `logo-288.webp` |
| Hero orb (<768px) | `256px` | `logo-288.webp` (downscaled by CSS) |

## Hero Orb HTML

```html
<div class="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
  <!-- Outer ambient glow ring -->
  <div class="absolute inset-0 rounded-full bg-secondary/5 blur-xl animate-pulse" 
       style="border-radius:50%" aria-hidden="true"></div>
  <!-- Frosted glass ring -->
  <div class="absolute" style="inset:3%;border-radius:50%;background:rgba(34,41,65,.4);backdrop-filter:blur(24px);" 
       aria-hidden="true"></div>
  <!-- SVG circuit rings -->
  <svg class="absolute inset-0 w-full h-full pointer-events-none" ...>...</svg>
  <!-- Spinning conic ring + emblem -->
  <div class="relative z-10 shrink-0 aspect-square w-64 md:w-72">
    <span class="emblem-ring" aria-hidden="true"></span>
    <div class="logo-badge logo-badge--hero group absolute inset-[7px]" style="--size:100%">
      <img src="assets/logo/logo-288.webp"
           srcset="assets/logo/logo-288.webp 1x, assets/logo/logo-576.webp 2x"
           width="288" height="288"
           alt="QIAO TECH sovereign AI crest emblem"
           fetchpriority="high"
           decoding="async">
      <span class="glint" aria-hidden="true"></span>
    </div>
  </div>
</div>
```

## Verification Checklist
After any change to the logo component:
- [ ] Width === height (±0.5px) for every `.logo-badge` instance at 320, 768, 1440px
- [ ] `getComputedStyle(el).borderRadius` resolves to `50%` (or equivalent px ≥ half width)
- [ ] No overflow clip of the emblem (12% padding is the safe-zone)
- [ ] Hover glow fires on `.logo-badge:hover`
- [ ] Glint sweep on `.logo-badge--hero:hover .glint` (not self-hover)
- [ ] Reduced-motion: ring stops spinning, transitions disabled
- [ ] `alt` text present on all logo `<img>` elements
- [ ] No remote `lh3.googleusercontent.com` URLs remain

---

## Emblem Ring System (Hero — Watch-Bezel)

> Updated 2026-09-30 after ring concentricity fix. This section supersedes the "Spinning gradient ring" code above for the **hero orb only**.

### Root Cause of Previous Crescent Bug
Three compounding failures:
1. **Wrong stacking model.** `flex items-center justify-center` parent + `absolute` children do NOT share a geometric centre when the flex item size differs from the parent. Any sub-pixel difference between the flex-centred ring wrapper (`w-64/w-72`) and the `absolute inset-0` glass/aura disc shifts layers to different centres → crescent appears.
2. **`padding` ring technique without `box-sizing`.** The old `.emblem-ring { padding: 6px; -webkit-mask: linear-gradient… content-box… }` mask ring inflated the element's box by 6 px in all directions (content-box default), so `inset: 0` on the ring-wrapper and the medallion's `inset-[7px]` produced different offsets at different viewports.
3. **Non-metallic conic.** `conic-gradient(from 0deg, #eac078, #5bdfff, #c9a25d)` — cyan midstop flattened the ring to a blue-teal appearance; brand spec requires pure gold metallic.

### Fix: Concentricity by Construction (CSS Grid)

**Rule:** Make the stage a CSS grid; every layer gets `grid-area: 1/1`. No `absolute` positioning between layers except the telemetry capsules. Concentricity then cannot drift regardless of viewport, DPR, or sibling size.

### Anatomy (outside → in)

```
Stage (max 480px square)
  ① emblem-aura   — blurred radial glow (100% of stage)
  ② emblem-glass  — frosted disc 94% of stage
  ③ emblem-orbits — SVG dashed rings, all cx=cy=250
  ④ .emblem       — sized by --d; its own nested grid
       ⑤ emblem-ring     — metallic conic, radial-mask cut
       ⑥ emblem-comet    — cyan 7px dot orbiting ring
       ⑦ emblem-medallion — navy disc, logo fills 100%
            img           — object-fit:contain, 100%×100%
            emblem-glint  — sweep overlay, clipped by overflow:hidden
```

### CSS Proportions (single token `--d`)

| Token | Formula | At `--d: 288px` |
|---|---|---|
| `--d` | `clamp(236px, 44vw, 288px)` | 288 px |
| `--ring` | `calc(var(--d) * 0.021)` | ≈ 6.05 px |
| `--gap` | `calc(var(--d) * 0.034)` | ≈ 9.79 px |
| Medallion diameter | `d − 2×(ring+gap)` | ≈ 256 px |

### Key CSS Rules

```css
/* @property for animatable angle — must be OUTSIDE @layer */
@property --a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

/* Stage: every child gets grid-area:1/1 */
.emblem-stage {
  inline-size: 100%; max-inline-size: 480px;
  aspect-ratio: 1/1; display: grid; place-items: center; isolation: isolate;
}
.emblem-stage > * { grid-area: 1/1; }

/* Emblem unit */
.emblem {
  --d: clamp(236px, 44vw, 288px);
  --ring: calc(var(--d) * 0.021);
  --gap:  calc(var(--d) * 0.034);
  inline-size: var(--d); aspect-ratio: 1;
  display: grid; place-items: center; isolation: isolate;
}
.emblem > * { grid-area: 1/1; }

/* ④ Metallic ring: radial-gradient MASK guarantees uniform width on all sides */
.emblem-ring {
  inline-size: 100%; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(from var(--a),
    #8a6a2b 0%, #c9a25d 10%, #eac078 16%, #fff1c9 19%, #eac078 23%,
    #c9a25d 40%, #8a6a2b 58%, #c9a25d 76%, #eac078 90%, #8a6a2b 100%);
  -webkit-mask: radial-gradient(farthest-side,
    transparent calc(100% - var(--ring)), #000 calc(100% - var(--ring) + 0.5px));
  mask: radial-gradient(farthest-side,
    transparent calc(100% - var(--ring)), #000 calc(100% - var(--ring) + 0.5px));
  filter: drop-shadow(0 0 10px rgb(234 192 120/.4));
  animation: sweep 12s linear infinite;
}
@keyframes sweep { to { --a: 360deg; } }

/* ⑦ Medallion: fills ring opening exactly */
.emblem-medallion {
  inline-size: calc(100% - 2 * (var(--ring) + var(--gap)));
  aspect-ratio: 1; border-radius: 50%; overflow: hidden;
  background: radial-gradient(circle at 50% 38%, #16204a 0%, #060d24 78%);
}
.emblem-medallion img { inline-size: 100%; block-size: 100%; object-fit: contain; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .emblem-ring, .emblem-comet, .emblem-aura { animation: none; }
}
/* conic-gradient fallback */
@supports not (background: conic-gradient(from 1turn at 0 0, red, blue)) {
  .emblem-ring { background: #c9a25d; }
}
```

### Logo Asset Requirements
- Use `logo-medallion-288.webp` / `logo-medallion-576.webp` (not `logo-288.webp`)
- These have the dark square background trimmed to transparency (sharp threshold 60)
- Emblem circle touches all 4 canvas edges → `object-fit: contain` = rim-to-rim

### Emblem Ring Verification Checklist
- [ ] `getBoundingClientRect()` centres of `.emblem-stage`, `.emblem-glass`, `.emblem-ring`, `.emblem-medallion` all match within ≤ 0.5 px
- [ ] Width === height (±0.5 px) for every circular layer at 390 and 1440 px
- [ ] Ring looks metallic gold (not cyan), no crescent visible at any angle
- [ ] Comet (cyan 7px dot) orbits the ring without overlapping the medallion
- [ ] Medallion hover scale ≤ 1.025 (stays within the gap, never touches the ring)
- [ ] Glint stays inside medallion (clipped by `overflow: hidden`)
- [ ] `@property --a` declared outside `@layer` (required for Chrome animation)
- [ ] Reduced-motion: all three animations (ring, comet, aura) stop
- [ ] `logo-medallion-288.webp` used (not `logo-288.webp`)
