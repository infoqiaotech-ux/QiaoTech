---
name: ship-check
description: "Build CSS, run QA, produce screenshots + report. Run this workflow to verify the QIAO TECH website before shipping any changes."
---

# QIAO TECH — Ship Check Workflow

## Steps

### 1. Build CSS
```bash
cd d:\QiaoTech_website
npm run build
# Verifies: site.css generated, check gzipped size < 30KB
```

### 2. Start Static Server
```bash
python -m http.server 8080
# Or: npx serve . -p 8080
```

### 3. Check Console Errors
Open each page in browser DevTools, confirm zero console errors:
- http://localhost:8080/index.html
- http://localhost:8080/services.html
- http://localhost:8080/projects.html
- http://localhost:8080/why-us.html
- http://localhost:8080/contact.html

### 4. Logo Circle Verification
For each page, in DevTools console:
```js
document.querySelectorAll('.logo-badge').forEach(el => {
  const r = el.getBoundingClientRect();
  const br = getComputedStyle(el).borderRadius;
  const isCircle = Math.abs(r.width - r.height) < 1;
  console.log(`Logo badge: ${r.width.toFixed(1)}x${r.height.toFixed(1)} | border-radius: ${br} | circle: ${isCircle}`);
});
```
Expected: `circle: true` for all instances.

### 5. Screenshot Viewports
Using browser DevTools device emulation, capture screenshots at:
- 320px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)

Save to: `_qa/screenshots/YYYY-MM-DD/`

### 6. Accessibility Check
- Run axe DevTools or Lighthouse Accessibility
- Tab through entire page manually
- Test mobile menu: open → ESC closes → focus returns to trigger
- Verify skip-link appears on first Tab press

### 7. Lighthouse Audit
Run in Chrome DevTools → Lighthouse:
- Mobile preset, throttled 4G
- Target: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Check CLS < 0.05, LCP < 2.0s

### 8. Contrast Check
Verify in browser or with a contrast tool:
- Footer "Channels:" label against background
- All body text
- Outline/muted text on cards

### 9. Reduced Motion Test
In DevTools → Rendering → Emulate CSS media feature: `prefers-reduced-motion: reduce`
- Spinning emblem ring should stop
- No ping/pulse animations
- Count-up should show final number immediately

### 10. Final Report
Produce a walkthrough artifact with:
- Screenshot carousel (320, 768, 1440) for each page
- Logo circle measurements table
- Lighthouse scores table
- Checklist status (all DoD items)
- Owner Must Verify list

## Quick Commands
```bash
# Full build
npm run build

# Dev watch mode
npm run dev

# Serve locally
python -m http.server 8080

# Check gzipped CSS size
gzip -c assets/css/site.css | wc -c
```
