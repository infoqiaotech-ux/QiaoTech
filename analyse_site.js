/**
 * QIAO TECH — Full Website Analysis
 * Captures screenshots + metrics for all 5 pages at 1440px and 390px
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8080';
const ART  = 'C:/Users/RADIANCE/.gemini/antigravity-ide/brain/f910cdfe-f806-465d-a15c-252374514463';
const PAGES = [
  { slug: 'index',    file: 'index.html',    title: 'Home' },
  { slug: 'services', file: 'services.html', title: 'Services' },
  { slug: 'projects', file: 'projects.html', title: 'Projects' },
  { slug: 'why-us',   file: 'why-us.html',   title: 'Why Us' },
  { slug: 'contact',  file: 'contact.html',  title: 'Contact' },
];

const VIEWPORTS = [
  { label: 'desktop', w: 1440, h: 900 },
  { label: 'mobile',  w: 390,  h: 844 },
];

async function analysePage(page, url, slug, vp) {
  const errors = [];
  const missingResources = [];

  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => {
    if (!r.ok() && !r.url().includes('favicon')) {
      missingResources.push(`${r.status()} ${r.url().split('/').slice(-2).join('/')}`);
    }
  });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(800); // let animations settle

  // Collect key elements
  const data = await page.evaluate(() => {
    const q  = s => document.querySelector(s);
    const qa = s => [...document.querySelectorAll(s)];
    const text = s => q(s)?.textContent?.trim() || 'NOT FOUND';
    const exists = s => !!q(s);

    // Logo checks
    const logoBadge = q('.logo-badge');
    const logoStyle = logoBadge ? getComputedStyle(logoBadge).borderRadius : 'N/A';

    // Emblem
    const emblemStage   = q('.emblem-stage');
    const emblemRing    = q('.emblem-ring');
    const emblemMedalln = q('.emblem-medallion');
    const ringR = emblemRing?.getBoundingClientRect();
    const medalR = emblemMedalln?.getBoundingClientRect();
    const stageR = emblemStage?.getBoundingClientRect();

    // Nav active link
    const activeNav = q('nav a[aria-current="page"]')?.textContent?.trim() || 'none';

    // Count sections
    const sections = qa('section, [role="region"]').map(s => s.id || s.className.split(' ')[0]);

    // Images with src
    const imgs = qa('img').map(i => ({
      src: i.src.split('/').slice(-1)[0],
      loaded: i.complete && i.naturalWidth > 0,
      w: i.naturalWidth, h: i.naturalHeight
    }));

    // H1
    const h1 = text('h1');

    // Cards count
    const cards = qa('.glass-card, [class*="card"]').length;

    // Footer
    const hasCopyright = document.body.innerHTML.includes('QIAO TECH. All rights reserved');
    const hasDataYear  = !!q('[data-year]');

    // Skip link
    const hasSkipLink = !!q('.skip-link');

    // Ring concentric check (only on home page)
    let ringConc = null;
    if (emblemRing && emblemMedalln) {
      const rc = { x: ringR.left + ringR.width/2, y: ringR.top + ringR.height/2 };
      const mc = { x: medalR.left + medalR.width/2, y: medalR.top + medalR.height/2 };
      ringConc = {
        ringSize:    `${Math.round(ringR.width)}×${Math.round(ringR.height)}`,
        medalSize:   `${Math.round(medalR.width)}×${Math.round(medalR.height)}`,
        stageSize:   stageR ? `${Math.round(stageR.width)}×${Math.round(stageR.height)}` : 'N/A',
        cxDiff:      Math.abs(rc.x - mc.x).toFixed(2),
        cyDiff:      Math.abs(rc.y - mc.y).toFixed(2),
        ringSquare:  Math.abs(ringR.width - ringR.height) <= 0.5,
        medalSquare: Math.abs(medalR.width - medalR.height) <= 0.5,
      };
    }

    return {
      h1, activeNav, sections: sections.slice(0, 10), cards,
      logoStyle, hasCopyright, hasDataYear, hasSkipLink,
      imgCount: imgs.length,
      brokenImgs: imgs.filter(i => !i.loaded).map(i => i.src),
      ringConc,
    };
  });

  return { data, errors, missingResources };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const report  = {};

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 2,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();

    for (const pg of PAGES) {
      const url = `${BASE}/${pg.file}`;
      console.log(`\n[${vp.label}] ${pg.title} — ${url}`);

      try {
        const { data, errors, missingResources } = await analysePage(page, url, pg.slug, vp);

        // Screenshot — full page for desktop index, viewport for others
        const ssName = `site-${pg.slug}-${vp.label}.png`;
        const ssPath = path.join(ART, ssName);
        if (pg.slug === 'index' && vp.label === 'desktop') {
          await page.screenshot({ path: ssPath, fullPage: true });
        } else if (vp.label === 'desktop') {
          await page.screenshot({ path: ssPath, fullPage: true, clip: { x: 0, y: 0, width: vp.w, height: Math.min(1800, vp.h * 3) } });
        } else {
          // Mobile: just the viewport
          await page.screenshot({ path: ssPath });
        }

        const key = `${pg.slug}-${vp.label}`;
        report[key] = { page: pg.title, viewport: vp.label, data, errors, missingResources, screenshot: ssName };

        // Print summary
        console.log(`  H1: "${data.h1.substring(0, 60)}"`);
        console.log(`  Active nav: ${data.activeNav}`);
        console.log(`  Images: ${data.imgCount} total, broken: ${data.brokenImgs.length > 0 ? data.brokenImgs.join(', ') : 'none'}`);
        console.log(`  Console errors: ${errors.length > 0 ? errors.join('; ') : 'none'}`);
        console.log(`  Missing resources: ${missingResources.length > 0 ? missingResources.slice(0,3).join(', ') : 'none'}`);
        if (data.ringConc) {
          const c = data.ringConc;
          console.log(`  Ring: ${c.ringSize} square:${c.ringSquare} | Medallion: ${c.medalSize} square:${c.medalSquare}`);
          console.log(`  Concentricity: CX diff=${c.cxDiff}px, CY diff=${c.cyDiff}px ${(+c.cxDiff <= 0.5 && +c.cyDiff <= 0.5) ? '✓ PASS' : '✗ FAIL'}`);
        }
        console.log(`  📸 ${ssName}`);

      } catch(e) {
        console.error(`  ERROR: ${e.message}`);
      }
    }

    await ctx.close();
  }

  // Write JSON report
  fs.writeFileSync(path.join(ART, 'site-analysis.json'), JSON.stringify(report, null, 2));
  console.log('\n✅ Analysis complete. Report: site-analysis.json');

  await browser.close();
}

run().catch(e => { console.error(e); process.exit(1); });
