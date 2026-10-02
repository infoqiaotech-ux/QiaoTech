/**
 * Fix missing H1 on secondary pages — uses any <main> tag, not just id="main-content"
 */
const fs = require('fs');

const FIXES = [
  {
    file: 'd:/QiaoTech_website/services.html',
    h1Text: 'QIAO TECH Services',
    h1Sub:  'Intelligent AI systems, automation pipelines, and digital products — tailored to your business in Pune, India.',
  },
  {
    file: 'd:/QiaoTech_website/projects.html',
    h1Text: 'QIAO TECH Projects',
    h1Sub:  'Real-world AI automation and software case studies — measurable impact, delivered.',
  },
  {
    file: 'd:/QiaoTech_website/why-us.html',
    h1Text: 'Why Choose QIAO TECH',
    h1Sub:  'Sovereign AI expertise, deep automation knowledge, and a proven track record of 150+ delivered projects.',
  },
  {
    file: 'd:/QiaoTech_website/contact.html',
    h1Text: 'Contact QIAO TECH',
    h1Sub:  'Request a consultation, get a quote, or start your AI automation project — Pune, India.',
  },
];

function makePageHero(h1Text, h1Sub) {
  return `
  <!-- ─── Page Hero ─── -->
  <section class="relative z-10 pt-[100px] pb-xl" aria-labelledby="page-title">
    <div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
      <div class="flex flex-col gap-md max-w-3xl">
        <span class="font-label-mono text-label-mono text-secondary uppercase tracking-widest">QIAO TECH</span>
        <h1 id="page-title" class="font-display text-display-mobile md:text-headline-lg text-on-surface font-bold leading-tight tracking-tight">${h1Text}</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">${h1Sub}</p>
        <div class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-xs" aria-hidden="true"></div>
      </div>
    </div>
  </section>

  `;
}

FIXES.forEach(({ file, h1Text, h1Sub }) => {
  let content = fs.readFileSync(file, 'utf8');

  // Already has an H1? Skip
  if (/<h1[\s>]/i.test(content)) {
    console.log(`⏭ ${file.split('/').pop()} already has H1, skipping`);
    return;
  }

  // Find any <main ...> closing bracket
  const mainMatch = content.match(/<main[^>]*>/);
  if (!mainMatch) {
    console.warn(`⚠ No <main> found in ${file.split('/').pop()}`);
    return;
  }

  const insertAt = content.indexOf(mainMatch[0]) + mainMatch[0].length;
  const hero = makePageHero(h1Text, h1Sub);
  content = content.slice(0, insertAt) + hero + content.slice(insertAt);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ ${file.split('/').pop()} — H1 added: "${h1Text}"`);
});

console.log('\n✅ Done');
