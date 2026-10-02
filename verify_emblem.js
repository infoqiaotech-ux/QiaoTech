/**
 * QIAO TECH — Emblem Ring Concentricity Verifier
 * Uses Playwright to measure centre-points, dimensions, and ring uniformity
 * at 390px and 1440px viewport widths.
 *
 * Run: node verify_emblem.js
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:8080/index.html';
const VIEWPORTS = [
  { name: '390px (mobile)', width: 390,  height: 844,  dpr: 2 },
  { name: '1440px (desktop)', width: 1440, height: 900,  dpr: 2 },
];

const OUT_DIR = path.join(__dirname, '_qa');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function measureElement(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    const br = getComputedStyle(el).borderRadius;
    return {
      x: Math.round(r.left * 10) / 10,
      y: Math.round(r.top  * 10) / 10,
      w: Math.round(r.width  * 10) / 10,
      h: Math.round(r.height * 10) / 10,
      cx: Math.round(cx * 10) / 10,
      cy: Math.round(cy * 10) / 10,
      borderRadius: br,
    };
  }, selector);
}

function checkSquare(m) {
  if (!m) return '✗ NOT FOUND';
  const diff = Math.abs(m.w - m.h);
  return diff <= 0.5 ? `✓ square (${m.w}×${m.h})` : `✗ not square (${m.w}×${m.h}, Δ${diff.toFixed(1)}px)`;
}

function checkConcentric(centres, tolerance = 0.5) {
  const cxVals = centres.filter(Boolean).map(c => c.cx);
  const cyVals = centres.filter(Boolean).map(c => c.cy);
  const cxRange = Math.max(...cxVals) - Math.min(...cxVals);
  const cyRange = Math.max(...cyVals) - Math.min(...cyVals);
  const ok = cxRange <= tolerance && cyRange <= tolerance;
  return { ok, cxRange: cxRange.toFixed(2), cyRange: cyRange.toFixed(2) };
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`Viewport: ${vp.name}`);
    console.log('═'.repeat(60));

    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dpr,
      reducedMotion: 'reduce',  // freeze animations for stable measurement
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Wait for emblem to be present
    await page.waitForSelector('.emblem-stage', { timeout: 10000 }).catch(() => {});

    // Measure all layers
    const stage    = await measureElement(page, '.emblem-stage');
    const glass    = await measureElement(page, '.emblem-glass');
    const ring     = await measureElement(page, '.emblem-ring');
    const medalln  = await measureElement(page, '.emblem-medallion');
    const emblem   = await measureElement(page, '.emblem');

    const layers = [
      { name: 'emblem-stage',    m: stage   },
      { name: 'emblem (unit)',   m: emblem  },
      { name: 'emblem-glass',    m: glass   },
      { name: 'emblem-ring',     m: ring    },
      { name: 'emblem-medallion',m: medalln },
    ];

    console.log('\n── Dimensions & centres ──');
    console.log(`${'Layer'.padEnd(22)} ${'W×H'.padEnd(18)} ${'Square?'.padEnd(28)} ${'Centre (cx, cy)'}`);
    console.log('─'.repeat(90));

    for (const { name, m } of layers) {
      if (!m) { console.log(`${name.padEnd(22)} NOT FOUND`); continue; }
      const sq = checkSquare(m);
      const centre = `(${m.cx}, ${m.cy})`;
      console.log(`${name.padEnd(22)} ${`${m.w}×${m.h}`.padEnd(18)} ${sq.padEnd(28)} ${centre}`);
    }

    // Concentricity check
    const centres = layers.map(l => l.m);
    const conc = checkConcentric(centres);
    console.log(`\n── Concentricity (tolerance ≤0.5px) ──`);
    console.log(`CX range: ${conc.cxRange}px | CY range: ${conc.cyRange}px | ${conc.ok ? '✓ PASS' : '✗ FAIL'}`);

    // Ring computed properties
    console.log(`\n── Ring computed CSS ──`);
    const ringCss = await page.evaluate(() => {
      const el = document.querySelector('.emblem-ring');
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        borderRadius: cs.borderRadius,
        width: cs.width,
        height: cs.height,
        background: cs.background.substring(0, 60) + '…',
      };
    });
    if (ringCss) {
      console.log(`border-radius: ${ringCss.borderRadius}`);
      console.log(`size: ${ringCss.width} × ${ringCss.height}`);
      console.log(`background: ${ringCss.background}`);
    }

    // Gap check: ring width − medallion width should = 2*(ring+gap)
    if (ring && medalln) {
      const totalGap = (ring.w - medalln.w) / 2;
      console.log(`\n── Gap uniformity ──`);
      console.log(`Ring diam: ${ring.w}px | Medallion diam: ${medalln.w}px`);
      console.log(`Gap each side: ${totalGap.toFixed(1)}px (= ring_thickness + navy_gap)`);
    }

    // Console errors
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.waitForTimeout(500);
    console.log(`\n── Console errors ──`);
    console.log(errors.length === 0 ? '✓ None' : errors.map(e => '✗ ' + e).join('\n'));

    // Screenshots
    const ssPath = path.join(OUT_DIR, `emblem-${vp.width}px.png`);
    await page.screenshot({ path: ssPath, fullPage: false });
    console.log(`\n📸 Screenshot: ${ssPath}`);

    // Emblem element screenshot for zoom inspection
    const emblemEl = await page.$('.emblem-stage');
    if (emblemEl) {
      const zoomPath = path.join(OUT_DIR, `emblem-zoom-${vp.width}px.png`);
      await emblemEl.screenshot({ path: zoomPath });
      console.log(`📸 Emblem zoom: ${zoomPath}`);
    }

    results.push({
      viewport: vp.name,
      layers,
      concentricity: conc,
      errors,
    });

    await ctx.close();
  }

  await browser.close();

  // Summary
  console.log(`\n${'═'.repeat(60)}`);
  console.log('SUMMARY');
  console.log('═'.repeat(60));
  for (const r of results) {
    const allFound = r.layers.every(l => l.m !== null);
    const sq = r.layers.filter(l => l.m).every(l => Math.abs(l.m.w - l.m.h) <= 0.5);
    console.log(`\n${r.viewport}:`);
    console.log(`  All layers found:   ${allFound ? '✓' : '✗'}`);
    console.log(`  All layers square:  ${sq ? '✓' : '✗'}`);
    console.log(`  Concentric (≤0.5px): ${r.concentricity.ok ? '✓' : '✗'} (CX Δ${r.concentricity.cxRange}, CY Δ${r.concentricity.cyRange})`);
    console.log(`  Console errors:     ${r.errors.length === 0 ? '✓ None' : r.errors.length + ' error(s)'}`);
  }
}

run().catch(err => { console.error(err); process.exit(1); });
