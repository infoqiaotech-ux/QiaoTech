# QIAO TECH — Project Information

> **Single source of truth for the QIAO TECH website.**
> Do not edit source HTML/CSS/JS files based on this document alone — always verify against the actual files.

---

## 1. Company Overview

| Field | Details |
|---|---|
| **Company Name** | QIAO TECH |
| **Tagline** | *Clever AI. Smart Automation.* |
| **Motto** | *"Your Requirement. Our Technology. One Smart Solution."* |
| **Domain** | https://qiaotech.in |
| **Location** | S No 38/6/17 Part, Yeshwant Nagar, Near Prakash Pathare, Pune, Maharashtra 411014, India |
| **Phone** | +91-97670-67561 |
| **Industry** | AI Software · Automation · Web Apps · ERP · OCR/ICR · Digital Design |

### Key Metrics (as shown on site)
| Metric | Value |
|---|---|
| Projects Delivered | 150+ |
| Happy Clients | 85+ |
| Years of Innovation | 8+ |
| Technologies Mastered | 25+ |

---

## 2. Website Structure

### Pages
| File | URL (clean) | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage — Hero, stats strip, CTA band |
| `services.html` | `/services` | Full service catalogue with demo interactions |
| `projects.html` | `/projects` | Portfolio / case studies showcase |
| `why-us.html` | `/why-us` | Differentiators, trust signals, team values |
| `contact.html` | `/contact` | Contact form, location, direct channels |

### Page Anatomy (shared across all pages)
```
<header>   Fixed top bar — logo + desktop nav + mobile hamburger CTA
<main>     Page-specific sections
<footer>   Brand column · Architecture links · Organization links · Intelligence stack · Socials
<script>   assets/js/site.js (deferred)
```

### Navigation Links
- Home → `index.html`
- Services → `services.html`
- Projects → `projects.html`
- Why Us → `why-us.html`
- Contact → `contact.html`

---

## 3. Tech Stack

### Core (Frontend)
| Layer | Technology | Notes |
|---|---|---|
| Markup | **HTML5** (semantic) | 5 static HTML pages |
| Styling | **Tailwind CSS v3.4** | CLI build (not CDN), output to `assets/css/site.css` |
| Shared CSS | `shared.css` | Minimal cross-page resets / utilities |
| JavaScript | **Vanilla JS** | `assets/js/site.js` — nav, scroll, animations, counters |
| Fonts | **Google Fonts CDN** | Sora · Manrope · Space Grotesk |
| Icons | Inline **SVG** | No icon library dependency |
| Images | **WebP** (with PNG fallbacks) | Logo at multiple densities (1x/2x) |
| PWA | `site.webmanifest` | Standalone display, maskable icon |

### Build Tooling
| Tool | Version | Role |
|---|---|---|
| **Tailwind CSS CLI** | `3.4` | CSS compilation (`npm run dev` / `npm run build`) |
| **Autoprefixer** | `^10.6.1` | CSS vendor prefixes via PostCSS |
| **PostCSS** | `^8.5.28` | PostCSS pipeline |
| **sharp** | `^0.35.5` | Image processing for logo assets |
| **Playwright** | `^1.63.0` | QA / screenshot automation (`_qa/` workflows) |
| **Node.js** | (system) | Build scripts and utility scripts |

### CSS Input
```
src/input.css  →  Tailwind CLI  →  assets/css/site.css
```

### NPM Scripts
```bash
npm run dev    # Watch mode — Tailwind compiles on save
npm run build  # Minified production CSS
npm run logo   # Regenerate logo assets (node generate_logo_assets.js)
```

---

## 4. Deployment

| Field | Details |
|---|---|
| **Platform** | [Vercel](https://vercel.com) |
| **Repository** | https://github.com/infoqiaotech-ux/QiaoTech.git |
| **Branch** | `main` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.` (root — static site) |
| **Clean URLs** | ✅ Enabled (`vercel.json → cleanUrls: true`) |
| **Auto-Deploy** | Every push to `main` triggers a Vercel deploy |

### `vercel.json`
```json
{
    "cleanUrls": true,
    "buildCommand": "npm run build",
    "outputDirectory": "."
}
```

---

## 5. Design System

### Design Theme Name
**Sovereign Cybernetics** — blends imperial luxury with hyper-advanced AI aesthetics.

### Colour Palette
| Role | Token | Hex |
|---|---|---|
| Background / Surface | `surface` | `#0b1229` |
| Primary (Imperial Gold) | `primary` | `#eac078` |
| Secondary (Cybernetic Cyan) | `secondary` | `#5bdfff` |
| On-Surface (Text) | `on-surface` | `#dce1ff` |
| On-Surface Variant | `on-surface-variant` | `#d1c5b4` |
| Surface Container High | `surface-container-high` | `#222941` |
| Outline | `outline` | `#9a8f80` |
| Theme / PWA color | — | `#0b1229` |

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Headings | **Sora** | 700 | 56px desktop / 38px mobile |
| Body copy | **Manrope** | 400 | 18px (lg), 15px (md), 13px (sm) |
| Labels / Telemetry | **Space Grotesk** | 500–600 | 14px, 12px, 11px |

### Spacing Scale
`xxs(4px) · xs(8px) · sm(12px) · md(16px) · lg(24px) · xl(32px) · 2xl(48px) · 3xl(72px) · 4xl(96px)`

### Layout Grid
| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| Desktop (≥ 1280px) | 12 | 24px | 48px |
| Tablet (768–1279px) | 8 | 20px | 32px |
| Mobile (< 768px) | 4 | 16px | 20px |

### Design Language
- **Glassmorphism** surfaces: `backdrop-filter: blur(16–24px)` with translucent navy fills
- **Depth**: 4 elevation levels (Canvas → Structural → Active → Floating)
- **Corner radius**: 0.25rem–0.5rem (no pill/circle shapes on cards)
- **Ambient effects**: Aurora orbs, SVG noise grain overlay (≤ 4% opacity)
- **Hero emblem**: Concentric orbit rings + comet animation + medallion glint

---

## 6. Assets

### Logo Variants (`assets/logo/`)
| File | Size | Usage |
|---|---|---|
| `logo-44.webp` / `logo-88.webp` | 44px / 88px | Header logo (1x / 2x) |
| `logo-72.webp` / `logo-144.webp` | 72px / 144px | Mobile menu logo (1x / 2x) |
| `logo-288.webp` / `logo-576.webp` | 288px / 576px | Footer / large contexts |
| `logo-medallion-288.webp` | 288px | Hero emblem medallion (1x) |
| `logo-medallion-576.webp` | 576px | Hero emblem medallion (2x) |
| `og-image-1200x630.png` | 1200×630 | Open Graph / Twitter card image |
| `logo-master.png` | — | Source master logo PNG |

### Icons (`assets/icons/`)
| File | Usage |
|---|---|
| `favicon-32.png` | Browser tab favicon |
| `apple-touch-icon-180.png` | iOS home screen icon |
| `icon-192.png` | PWA icon (any) |
| `icon-512.png` | PWA icon (any) |
| `icon-maskable-512.png` | PWA icon (maskable) |

### JavaScript (`assets/js/`)
| File | Role |
|---|---|
| `site.js` | Main JS — sticky header, mobile menu, scroll reveal, counter animation, year auto-fill |
| `services-demo.js` | Interactive service demos (used only on `services.html`) |

### CSS (`assets/css/`)
| File | Role |
|---|---|
| `site.css` | Compiled Tailwind output — all utility classes + custom components |
| `services-demo.css` | Additional styles for services interactive demos |

---

## 7. SEO & Meta

### Per-Page SEO
Each page has:
- `<title>` — unique, descriptive
- `<meta name="description">` — compelling summary
- `<link rel="canonical">` — self-referencing canonical URL
- `<meta property="og:*">` — Open Graph tags (title, description, image, type)
- `<meta name="twitter:card">` — Twitter large image card

### PWA Meta Tags (on every page)
```html
<meta name="theme-color" content="#0b1229"/>
<meta name="mobile-web-app-capable" content="yes"/>         <!-- W3C standard -->
<meta name="apple-mobile-web-app-capable" content="yes"/>   <!-- iOS PWA -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
```

### Structured Data (JSON-LD on `index.html`)
- Type: `Organization`
- Includes: name, URL, logo, description, postal address, contact point

---

## 8. Utility & Dev Scripts

| Script | Purpose |
|---|---|
| `generate_logo_assets.js` | Generate all logo WebP sizes from master PNG |
| `extract_logo.js` | Extract/isolate logo from source image |
| `process_medallion.js` | Process medallion variant of the logo |
| `replace_icons.js` | Batch-replace icon assets |
| `upgrade_pages.js` | Bulk page upgrade utility |
| `fix_h1.js` | Fix H1 heading structure across pages |
| `analyse_site.js` | Site analysis / audit script |
| `split.mjs` | CSS/asset splitting utility |
| `verify_emblem.js` | Verify emblem asset integrity |
| `tailwind.config.js` | Full Tailwind config — custom design tokens |
| `src/input.css` | Tailwind CSS entrypoint |

---

## 9. QA & Quality

- **QA folder**: `_qa/` — Playwright-based screenshot and quality checks
- **QA Workflow**: `/ship-check` — builds CSS, runs QA, captures screenshots, produces report
- **Design spec**: `DESIGN.md` — full brand/design system YAML spec
- **Backup**: `_backup/` — previous version backups

### Standards Targeted
- WCAG 2.1 AA accessibility
- Semantic HTML5 throughout
- Keyboard navigable (skip link, aria labels, aria-expanded)
- PWA installable (manifest + icons + service-ready meta)
- Clean URLs via Vercel routing

---

## 10. Repository

| Field | Details |
|---|---|
| **GitHub URL** | https://github.com/infoqiaotech-ux/QiaoTech.git |
| **Default Branch** | `main` |
| **Git Ignore** | `node_modules/`, build artifacts, OS files |
| **`.env.example`** | Template for any future environment variables |

---

*Last updated: October 2026 · Maintained by QIAO TECH development team.*
