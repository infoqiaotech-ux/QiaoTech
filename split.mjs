import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('code.html', 'utf8');

// ── Extract head (everything inside <head>…</head>) ──────────────────────────
const headMatch = src.match(/<head>([\s\S]*?)<\/head>/i);
const headContent = headMatch ? headMatch[1] : '';

// ── Extract ambient orb background div ──────────────────────────────────────
const ambientBg = `<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div class="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px]"></div><div class="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px]"></div></div>`;

// ── Extract footer ───────────────────────────────────────────────────────────
const footerMatch = src.match(/<footer[\s\S]*?<\/footer>/i);
const footer = footerMatch ? footerMatch[0] : '';

// ── Shared CSS injected into every head ─────────────────────────────────────
const sharedCSS = `<style>.page-transition{animation:fadeInUp 0.42s cubic-bezier(.22,1,.36,1) both}@keyframes fadeInUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}#mobile-menu{display:none;position:fixed;inset:0;z-index:9999;background:rgba(11,18,41,.97);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:2rem}#mobile-menu.open{display:flex!important}#mobile-menu a{font-size:1.5rem;font-family:'Sora',sans-serif;font-weight:600;color:#dce1ff;text-decoration:none;transition:color .2s}#mobile-menu a:hover,#mobile-menu a.mob-active{color:#eac078}</style>`;

// ── Mobile menu HTML ─────────────────────────────────────────────────────────
function mobileMenu(activePage) {
  const pages = ['index','services','projects','why-us','contact'];
  const labels = ['Home','Services','Projects','Why Us','Contact'];
  const links = pages.map((p,i)=>`<a href="${p}.html" class="${activePage===p?'mob-active':''}">${labels[i]}</a>`).join('');
  return `<div id="mobile-menu"><button onclick="document.getElementById('mobile-menu').classList.remove('open')" style="position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;cursor:pointer;color:#dce1ff"><span class="material-symbols-outlined" style="font-size:2rem">close</span></button>${links}</div>`;
}

// ── Build header for each page ───────────────────────────────────────────────
function makeHeader(active) {
  const navItems = [
    { key: 'home',     label: 'Home',     href: 'index.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'projects', label: 'Projects', href: 'projects.html' },
    { key: 'why-us',   label: 'Why Us',   href: 'why-us.html' },
    { key: 'contact',  label: 'Contact',  href: 'contact.html' },
  ];
  const navLinks = navItems.map(n => {
    if (n.key === active) {
      return `<a href="${n.href}" class="font-label-lg text-label-lg text-primary border-b border-primary font-bold py-xxs" aria-current="page">${n.label}</a>`;
    }
    return `<a href="${n.href}" class="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-xxs">${n.label}</a>`;
  }).join('');

  return `<header class="fixed top-0 left-0 w-full z-50 bg-surface/75 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-outline-variant/30">
<div class="h-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-md">
  <div class="flex items-center gap-md">
    <a class="flex items-center gap-sm group" href="index.html">
      <img alt="QIAO TECH Emblem Logo" class="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1UU7_37u4rKiVgAT0RFJeRso84NjR8K3ruOAMnw_G8-1Wa07ZlLnxyC-6dCOhvtcqwM_G1pzevoYKJzKBN7O4L4mgg4d93ZMEfF-iKVGfAxEBpsGBO85mLABw3y1pJw0DkZqqvuCNCLJ-_vZ1OyNDv0jUMibIvksW2BaQUZkybHSZUlfvE7Fo_a4miyaDm5ER9pKgaBwH-0Tn0xRImrBFe7y6Z3qKKKlvOnWhySRV4ISqsAx58P30RSR0c4"/>
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight leading-none group-hover:text-primary transition-colors">QIAO <span class="text-primary">TECH</span></span>
        <span class="font-label-mono text-label-mono text-outline uppercase tracking-widest mt-xxs">Clever AI. Smart Automation.</span>
      </div>
    </a>
  </div>
  <nav class="hidden lg:flex items-center gap-xl">${navLinks}</nav>
  <div class="flex items-center gap-md">
    <a class="hidden sm:inline-flex items-center justify-center px-lg py-xs rounded-full bg-gradient-to-r from-primary-container via-primary to-tertiary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-[0_0_20px_rgba(234,192,120,0.35)] hover:shadow-[0_0_25px_rgba(91,223,255,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]" href="contact.html">Get a Quote</a>
    <button id="menu-btn" class="lg:hidden flex items-center justify-center w-10 h-10 rounded bg-surface-container-high text-on-surface" aria-label="Open menu"><span class="material-symbols-outlined">menu</span></button>
  </div>
</div>
</header>`;
}

// ── Mobile menu toggle script ────────────────────────────────────────────────
const menuScript = `<script>var btn=document.getElementById('menu-btn');var menu=document.getElementById('mobile-menu');if(btn)btn.addEventListener('click',function(){menu.classList.toggle('open');});</script>`;

// ── Assemble a full page ─────────────────────────────────────────────────────
function makePage(title, active, mainContent) {
  return `<!DOCTYPE html>
<html class="dark" lang="en">
<head>${headContent}${sharedCSS}
<title>${title} | QIAO TECH</title>
<meta name="description" content="QIAO TECH – ${title}. Clever AI. Smart Automation. Pune, India."/>
</head>
<body class="bg-background font-body-md text-on-surface antialiased relative min-h-screen selection:bg-primary selection:text-on-primary">
${ambientBg}
${makeHeader(active)}
${mobileMenu(active)}
<main class="relative z-10 w-full pt-20 bg-transparent min-h-[calc(100vh-20rem)] page-transition">
<div class="flex flex-col w-full overflow-hidden">
${mainContent}
</div>
</main>
${footer}
${menuScript}
</body>
</html>`;
}

// ============================================================
// Extract sections by comment markers / IDs in the original
// ============================================================

// Hero + Stats
const heroSection = src.match(/<section class="relative min-h-\[92vh\][\s\S]*?<\/section>/)?.[0] ?? '';
const statsSection = src.match(/<section class="relative z-20[\s\S]*?id="stats-strip"[\s\S]*?<\/section>/)?.[0] ?? '';

// Services grid section
const servicesSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-3xl bg-surface-container-lowest\/40"[\s\S]*?<\/section>/)?.[0] ?? '';

// Featured capabilities section
const featuredSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-3xl" id="featured-capabilities"[\s\S]*?<\/section>/)?.[0] ?? '';

// Portfolio section
const portfolioSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-3xl bg-surface-container-lowest\/50"[\s\S]*?<\/section>/)?.[0] ?? '';

// Why us section
const whyUsSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-3xl">\s*<div class="max-w-\[1440px\] mx-auto flex flex-col gap-2xl">\s*<div class="text-center[\s\S]*?<\/section>/)?.[0] ?? '';

// Process flow section
const processSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-3xl bg-surface-container-lowest\/30"[\s\S]*?<\/section>/)?.[0] ?? '';

// Tech stack section
const techSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-2xl overflow-hidden"[\s\S]*?<\/section>/)?.[0] ?? '';

// Contact section
const contactSection = src.match(/<section class="relative px-margin-mobile md:px-margin-desktop py-3xl bg-surface-container-lowest\/60" id="contact-hub"[\s\S]*?<\/section>/)?.[0] ?? '';

// ── Fix internal anchor/links for cross-page navigation ─────────────────────
function fixLinks(html) {
  return html
    .replace(/href="#contact-hub"/g, 'href="contact.html"')
    .replace(/href="#featured-capabilities"/g, 'href="projects.html"')
    .replace(/href="#stats-strip"/g, 'href="index.html#stats-strip"');
}

// ── Home page hero CTA banner ────────────────────────────────────────────────
const homeCTA = `<div class="relative px-margin-mobile md:px-margin-desktop py-2xl bg-surface-container-lowest/30">
<div class="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-lg bg-surface-container/80 rounded-xl p-xl shadow-xl backdrop-blur-md">
  <div class="flex flex-col gap-xs">
    <span class="font-label-mono text-label-mono text-secondary uppercase tracking-widest">READY TO TRANSFORM?</span>
    <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Explore what QIAO TECH can build for you.</h2>
  </div>
  <div class="flex flex-wrap gap-md shrink-0">
    <a href="services.html" class="inline-flex items-center gap-sm px-xl py-md rounded-full bg-gradient-to-r from-primary-container via-primary to-tertiary text-on-primary font-label-lg text-label-lg font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">Our Services <span class="material-symbols-outlined text-[20px]">arrow_forward</span></a>
    <a href="contact.html" class="inline-flex items-center gap-sm px-xl py-md rounded-full bg-surface-container-high/60 text-on-surface hover:text-primary hover:bg-surface-container-highest transition-all font-label-lg text-label-lg uppercase tracking-wider">Get a Quote</a>
  </div>
</div>
</div>`;

// ── Write all 5 pages ────────────────────────────────────────────────────────
writeFileSync('index.html',    makePage('Home',     'home',     fixLinks(heroSection + '\n' + statsSection + '\n' + homeCTA)));
writeFileSync('services.html', makePage('Services', 'services', fixLinks(servicesSection + '\n' + featuredSection)));
writeFileSync('projects.html', makePage('Projects', 'projects', fixLinks(portfolioSection)));
writeFileSync('why-us.html',   makePage('Why Us',   'why-us',   fixLinks(whyUsSection + '\n' + processSection + '\n' + techSection)));
writeFileSync('contact.html',  makePage('Contact',  'contact',  fixLinks(contactSection)));

console.log('✅ All 5 pages written:');
console.log('   index.html, services.html, projects.html, why-us.html, contact.html');
