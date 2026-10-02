---
name: qiao-brand-system
description: "Brand system for QIAO TECH website. Activate whenever working on any page, component, or asset for this project. Contains palette, typography roles, radius rules, spacing, tone of voice, and what must never change."
risk: safe
source: custom
date_added: "2026-09-30"
---

# QIAO TECH Brand System

## Project Identity (NEVER CHANGE)
- **Name:** QIAO TECH
- **Tagline:** "Clever AI. Smart Automation."
- **Motto / Tagline 2:** "Your Requirement. Our Technology. One Smart Solution."
- **Location:** Pune, Maharashtra, India
- **Industry:** AI Software, Automation, Web Apps, ERP, OCR/ICR, Digital Design

## Palette (Material Design role mapping)

| Role | Hex | Usage |
|---|---|---|
| `background` / `surface` | `#0b1229` | Page background, body bg |
| `surface-container-lowest` | `#060d24` | Darkest card, logo bg |
| `surface-container-low` | `#141a32` | Slight elevation |
| `surface-container` | `#181e36` | Cards, panels |
| `surface-container-high` | `#222941` | Elevated cards |
| `surface-container-highest` | `#2d344c` | Top-most surface |
| `surface-bright` | `#323851` | Highlight surface |
| `on-surface` | `#dce1ff` | Primary text |
| `on-surface-variant` | `#d1c5b4` | Secondary text |
| `outline` | `#9a8f80` | Borders, muted text |
| `outline-variant` | `#4e4639` | Subtle borders |
| `primary` | `#eac078` | Gold — primary accent, headlines |
| `primary-container` | `#c9a25d` | Darker gold |
| `primary-fixed` | `#ffdea9` | Lightest gold |
| `tertiary` | `#e7c08a` | Warm accent (similar to gold) |
| `secondary` | `#5bdfff` | Cyan signal light |
| `secondary-fixed-dim` | `#36d8fb` | Slightly darker cyan |
| `inverse-surface` | `#dce1ff` | Text on dark backgrounds |

## Typography Roles

| Class | Font | Size | Weight | Use |
|---|---|---|---|---|
| `text-display` | Sora | 56px/68px | 700 | Desktop hero H1, stat numerals |
| `text-display-mobile` | Sora | 38px/46px | 700 | Mobile hero H1 |
| `text-headline-lg` | Sora | 40px/48px | 600 | Section headlines |
| `text-headline-lg-mobile` | Sora | 30px/38px | 600 | Mobile section headlines |
| `text-headline-md` | Sora | 28px/36px | 600 | Sub-section titles |
| `text-headline-sm` | Sora | 20px/28px | 500 | Card titles |
| `text-body-lg` | Manrope | 18px/28px | 400 | Hero subheadline |
| `text-body-md` | Manrope | 15px/24px | 400 | Body copy |
| `text-body-sm` | Manrope | 13px/20px | 400 | Small print |
| `text-label-lg` | Space Grotesk | 14px/18px | 600 | Nav links, CTA labels |
| `text-label-md` | Space Grotesk | 12px/16px | 500 | Button labels |
| `text-label-mono` | Space Grotesk | 11px/14px | 600 | Eyebrow pills, data labels |

## Responsive Typography Pattern
Always apply mobile-first, desktop breakpoint:
```html
<!-- H1 example -->
<h1 class="text-display-mobile md:text-display ...">
```

## Radius Rules
```js
// tailwind.config.js
borderRadius: {
  DEFAULT: "0.125rem",  // 2px — sharp (brand look, intentional)
  lg: "0.25rem",        // 4px — slightly less sharp
  xl: "0.5rem",         // 8px — cards, panels
  full: "9999px",       // TRUE pill/circle (FIXED from 0.75rem bug)
  circle: "50%"         // Perfect circle for logo badges
}
```
- `rounded-full` = real pill/circle after the fix
- Use `rounded-xl` for stat cards, glass panels
- Use `rounded` (default 2px) for tags, badges, monospace chips

## Spacing Scale
```
xxs: 0.25rem | xs: 0.5rem | sm: 0.75rem | md: 1rem | lg: 1.5rem
xl: 2rem | 2xl: 3rem | 3xl: 4.5rem | 4xl: 6rem
margin-mobile: 1.25rem | margin-desktop: 3rem | gutter: 1.5rem
```

## Glow/Shadow Recipes

### Gold glow (primary CTA, logo badge)
```css
box-shadow: 0 0 20px rgba(234,192,120,0.35), 0 0 40px rgba(234,192,120,0.18);
```
### Cyan glow (hover state)
```css
box-shadow: 0 0 25px rgba(91,223,255,0.4), 0 0 50px rgba(91,223,255,0.15);
```
### Glass card
```css
background: rgba(24,30,54,0.85);
backdrop-filter: blur(16px);
border: 1px solid rgba(158,143,128,0.15);
box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(234,192,120,0.08);
```

## Motion System
- **One easing:** `cubic-bezier(.22,1,.36,1)` — "natural deceleration"
- **Durations:** 200ms (micro), 400ms (standard), 700ms (slow/reveal)
- **Reveal pattern:** `opacity: 0 → 1`, `translateY: 16px → 0`
- **Stagger:** 60ms between siblings
- **Always wrap in:** `@media (prefers-reduced-motion: reduce) { ... }`

## Tone of Voice
- Confident, technical, sovereign, premium
- No exclamation marks in body copy
- Short, declarative sentences
- Data-first ("150+ Projects" not "many projects")

## What MUST NEVER Change
1. Company name "QIAO TECH"
2. Tagline "Clever AI. Smart Automation."
3. Motto "Your Requirement. Our Technology. One Smart Solution."
4. Palette (navy/gold/cyan)
5. Marketing metrics: < 380ms, 99.4%, 10x Speed, 150+, 85+, 8+, 25+
6. Location "Pune, Maharashtra, India"
