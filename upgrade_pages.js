/**
 * QIAO TECH — Page Upgrader
 * Replaces the old CDN-based head + header + footer in all HTML pages
 * with the new production-ready versions.
 * Run: node upgrade_pages.js
 */
const fs = require('fs');
const path = require('path');

const PAGES = [
  { file: 'services.html',  title: 'Services | QIAO TECH', desc: 'QIAO TECH Services — AI Automation, Web Apps, ERP, OCR/ICR, Branding. Intelligent systems tailored to your business in Pune, India.', activeLink: 'services.html' },
  { file: 'projects.html',  title: 'Projects | QIAO TECH', desc: 'QIAO TECH Projects — Real AI automation and software case studies. See how we transform business operations.', activeLink: 'projects.html' },
  { file: 'why-us.html',   title: 'Why QIAO TECH | Pune\'s AI Software Engineers', desc: 'Why choose QIAO TECH? Sovereign AI, deep automation expertise, and a track record of 150+ delivered projects in Pune, India.', activeLink: 'why-us.html' },
  { file: 'contact.html',  title: 'Contact QIAO TECH | Get a Quote', desc: 'Contact QIAO TECH — Request a consultation, get a quote for AI automation, web apps, or ERP systems. Pune, India.', activeLink: 'contact.html' },
];

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'services.html', label: 'Services' },
  { href: 'projects.html', label: 'Projects' },
  { href: 'why-us.html', label: 'Why Us' },
  { href: 'contact.html', label: 'Contact' },
];

const MOBILE_NAV_ACTIVE = {
  'index.html': 'Home',
  'services.html': 'Services',
  'projects.html': 'Projects',
  'why-us.html': 'Why Us',
  'contact.html': 'Contact',
};

function buildHead(page) {
  return `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- ─ Primary SEO ─ -->
  <title>${page.title}</title>
  <meta name="description" content="${page.desc}"/>
  <link rel="canonical" href="https://[SITE_URL]/${page.file}"/>

  <!-- ─ Open Graph ─ -->
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${page.title}"/>
  <meta property="og:description" content="${page.desc}"/>
  <meta property="og:url" content="https://[SITE_URL]/${page.file}"/>
  <meta property="og:image" content="https://[SITE_URL]/assets/logo/og-image-1200x630.png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:locale" content="en_IN"/>
  <meta property="og:site_name" content="QIAO TECH"/>

  <!-- ─ Twitter Card ─ -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${page.title}"/>
  <meta name="twitter:description" content="${page.desc}"/>
  <meta name="twitter:image" content="https://[SITE_URL]/assets/logo/og-image-1200x630.png"/>

  <!-- ─ Theme / PWA ─ -->
  <meta name="theme-color" content="#0b1229"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>

  <!-- ─ Favicon set ─ -->
  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png"/>
  <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon-180.png"/>
  <link rel="manifest" href="site.webmanifest"/>

  <!-- ─ Fonts ─ -->
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>

  <!-- ─ Tailwind CLI output ─ -->
  <link rel="stylesheet" href="assets/css/site.css"/>

  <!-- ─ JSON-LD ─ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QIAO TECH",
    "url": "https://[SITE_URL]/",
    "logo": "https://[SITE_URL]/assets/logo/logo-288.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  }
  </script>
</head>`;
}

function buildHeader(activeLink) {
  const navItems = NAV_LINKS.map(link => {
    if (link.href === activeLink) {
      return `        <a href="${link.href}" class="font-label-lg text-label-lg text-primary border-b border-primary font-bold py-xxs" aria-current="page">${link.label}</a>`;
    }
    return `        <a href="${link.href}" class="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-micro ease-brand py-xxs">${link.label}</a>`;
  }).join('\n');

  const mobileNavItems = NAV_LINKS.map(link => {
    const isMobActive = link.href === activeLink ? ' class="mob-active"' : '';
    return `      <a href="${link.href}"${isMobActive}>${link.label}</a>`;
  }).join('\n');

  return `<body class="bg-background font-body-md text-on-surface antialiased relative min-h-screen">

  <!-- ─ Skip link ─ -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- ─ Ambient aurora background ─ -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    <div class="aurora-orb absolute -top-40 left-1/4 w-[600px] h-[600px] bg-secondary/5"></div>
    <div class="aurora-orb absolute top-1/3 -right-20 w-[500px] h-[500px] bg-primary/5" style="animation-delay:-7s;"></div>
  </div>

  <!-- ─── HEADER ─── -->
  <header id="site-header" class="fixed top-0 left-0 w-full z-50 transition-all duration-standard ease-brand bg-surface/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-outline-variant/30" style="height:80px;">
    <div class="h-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-md">
      <a class="flex items-center gap-sm group flex-none" href="index.html" aria-label="QIAO TECH home">
        <span class="logo-badge" style="--size:44px">
          <img src="assets/logo/logo-44.webp" srcset="assets/logo/logo-44.webp 1x, assets/logo/logo-88.webp 2x"
               width="44" height="44" alt="QIAO TECH emblem" fetchpriority="high" decoding="async"/>
        </span>
        <div class="flex flex-col">
          <span class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight leading-none group-hover:text-primary transition-colors duration-micro ease-brand">QIAO <span class="text-primary">TECH</span></span>
          <span class="font-label-mono text-label-mono text-outline uppercase tracking-widest mt-xxs hidden sm:block">Clever AI. Smart Automation.</span>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-xl" aria-label="Main navigation">
${navItems}
      </nav>
      <div class="flex items-center gap-md">
        <a class="btn-primary hidden sm:inline-flex" href="contact.html">Get a Quote</a>
        <button id="menu-btn" class="lg:hidden flex items-center justify-center w-11 h-11 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
                aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="17" y2="14"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- ─── MOBILE MENU ─── -->
  <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <button id="menu-close-btn" class="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded bg-surface-container text-on-surface hover:text-primary transition-colors" aria-label="Close navigation menu">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="5" y1="5" x2="15" y2="15"/><line x1="15" y1="5" x2="5" y2="15"/></svg>
    </button>
    <span class="logo-badge mb-lg" style="--size:72px">
      <img src="assets/logo/logo-72.webp" srcset="assets/logo/logo-72.webp 1x, assets/logo/logo-144.webp 2x"
           width="72" height="72" alt="QIAO TECH emblem" decoding="async"/>
    </span>
    <nav aria-label="Mobile navigation">
${mobileNavItems}
    </nav>
    <a class="btn-primary mt-lg" href="contact.html">Get a Quote</a>
  </div>`;
}

const FOOTER_HTML = `
  <!-- ─── FOOTER ─── -->
  <footer class="relative z-10 w-full bg-surface-container-lowest border-t border-primary/20 pt-3xl pb-2xl">
    <div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter mb-2xl">
        <div class="lg:col-span-4 flex flex-col gap-md">
          <div class="flex items-center gap-sm">
            <span class="logo-badge" style="--size:40px">
              <img src="assets/logo/logo-44.webp" srcset="assets/logo/logo-44.webp 1x, assets/logo/logo-88.webp 2x"
                   width="40" height="40" alt="QIAO TECH emblem" loading="lazy" decoding="async"/>
            </span>
            <span class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">QIAO <span class="text-primary">TECH</span></span>
          </div>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-sm">Your Requirement. Our Technology. One Smart Solution.</p>
          <div class="flex items-start gap-xs text-on-surface-variant">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5bdfff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-xxs flex-none" aria-hidden="true"><path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6z"/><circle cx="10" cy="8" r="2"/></svg>
            <div class="flex flex-col">
              <span class="font-label-md text-label-md text-on-surface">Innovation Hub &amp; HQ</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Pune, Maharashtra, India</span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-2 flex flex-col gap-sm">
          <span class="font-label-mono text-label-mono text-primary uppercase tracking-wider">Architecture</span>
          <ul class="flex flex-col gap-xs list-none m-0 p-0">
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="index.html">Platform Core</a></li>
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="services.html">AI Solutions</a></li>
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="services.html">Automation Pipelines</a></li>
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="projects.html">Enterprise Cases</a></li>
          </ul>
        </div>
        <div class="lg:col-span-2 flex flex-col gap-sm">
          <span class="font-label-mono text-label-mono text-primary uppercase tracking-wider">Organization</span>
          <ul class="flex flex-col gap-xs list-none m-0 p-0">
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="why-us.html">Why QIAO</a></li>
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="projects.html">Showcase</a></li>
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="contact.html">Consultation</a></li>
            <li><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="contact.html">Proposal Dispatch</a></li>
          </ul>
        </div>
        <div class="lg:col-span-4 flex flex-col gap-md">
          <span class="font-label-mono text-label-mono text-primary uppercase tracking-wider">Intelligence Stack</span>
          <div class="flex flex-wrap gap-xs">
            <span class="font-label-mono text-label-mono px-xs py-xxs rounded bg-surface-container-high border border-outline-variant text-secondary">NEURAL NETWORKS</span>
            <span class="font-label-mono text-label-mono px-xs py-xxs rounded bg-surface-container-high border border-outline-variant text-secondary">AUTONOMOUS AGENTS</span>
            <span class="font-label-mono text-label-mono px-xs py-xxs rounded bg-surface-container-high border border-outline-variant text-secondary">HYPER-COMPUTE</span>
            <span class="font-label-mono text-label-mono px-xs py-xxs rounded bg-surface-container-high border border-outline-variant text-secondary">VISION SYSTEMS</span>
            <span class="font-label-mono text-label-mono px-xs py-xxs rounded bg-surface-container-high border border-outline-variant text-secondary">EDGE COGNITION</span>
          </div>
          <div class="flex items-center gap-md pt-xs">
            <span class="font-label-mono text-label-mono text-on-surface-variant uppercase">Channels:</span>
            <a class="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" href="[ASK ME — LinkedIn URL]" aria-label="QIAO TECH on LinkedIn" rel="noopener noreferrer" target="_blank">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2.667 5.333H0V16h2.667V5.333zM1.333 4a1.333 1.333 0 1 0 0-2.667A1.333 1.333 0 0 0 1.333 4zM5.333 5.333V16H8v-5.333c0-1.333.667-2 1.667-2S11.333 9.333 11.333 10.667V16H14v-5.667C14 7 12.667 5.333 10.333 5.333 9 5.333 8 6 7.333 6.667V5.333H5.333z"/></svg>
            </a>
            <a class="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" href="[ASK ME — GitHub URL]" aria-label="QIAO TECH on GitHub" rel="noopener noreferrer" target="_blank">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <a class="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" href="[ASK ME — Twitter/X URL]" aria-label="QIAO TECH on X (Twitter)" rel="noopener noreferrer" target="_blank">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="pt-lg border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-sm text-on-surface-variant">
        <span class="font-body-sm text-body-sm">&copy; <span data-year></span> QIAO TECH. All rights reserved. Sovereign Intelligence Systems.</span>
        <div class="flex items-center gap-lg font-body-sm text-body-sm">
          <a class="hover:text-primary transition-colors" href="[ASK ME — Privacy Policy URL]">Privacy Architecture</a>
          <a class="hover:text-primary transition-colors" href="[ASK ME — Terms URL]">Security Protocol</a>
          <a class="hover:text-primary transition-colors" href="[ASK ME — Status URL]">System Status</a>
        </div>
        <a href="#" class="font-label-mono text-label-mono text-outline hover:text-primary transition-colors uppercase tracking-widest" aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 12V4M3 9l5-5 5 5"/></svg>
        </a>
      </div>
    </div>
  </footer>

  <!-- ─ Site JS ─ -->
  <script src="assets/js/site.js" defer></script>
</body>
</html>`;

// Extract <main> content from existing page  
function extractMain(html) {
  // Get everything between <main ...> and </main>
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    return mainMatch[0]; // return full <main>...</main>
  }
  // Fallback: get content between <div class="flex flex-col..."> blocks inside body
  const bodyMatch = html.match(/<main[^>]*>([\s\S]*)/i);
  return bodyMatch ? bodyMatch[0].replace(/<\/main>[\s\S]*/, '</main>') : '';
}

// Process each page
PAGES.forEach(page => {
  const filePath = path.join('d:/QiaoTech_website', page.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Skipping ${page.file} — file not found`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  const mainContent = extractMain(original);

  if (!mainContent) {
    console.warn(`⚠️  Could not extract <main> from ${page.file}`);
    return;
  }

  // Build new file
  const newHtml = `${buildHead(page)}
${buildHeader(page.activeLink)}

${mainContent}

${FOOTER_HTML}`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`✓ ${page.file} upgraded`);
});

console.log('\n✅ All pages upgraded!');
