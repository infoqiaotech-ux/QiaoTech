/**
 * Replace Material Symbols icon ligatures with inline SVGs
 */
const fs = require('fs');
const path = require('path');

// SVG icon library — Material Symbols equivalents as inline SVG
const ICONS = {
  // Navigation/action
  'tune': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/></svg>`,
  'arrow_forward': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>`,
  'east': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9h12M9 3l6 6-6 6"/></svg>`,
  'send': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2L9 11M18 2L12 18l-3-7-7-3 16-6z"/></svg>`,
  // Tech/AI
  'smart_toy': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="10" width="20" height="16" rx="2"/><circle cx="12" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M12 14v-2M20 14v-2M16 6v4"/><circle cx="16" cy="5" r="2"/><path d="M6 20H3M26 20h3"/></svg>`,
  'code_blocks': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="11" height="11" rx="1.5"/><rect x="17" y="4" width="11" height="11" rx="1.5"/><rect x="4" y="17" width="11" height="11" rx="1.5"/><rect x="17" y="17" width="11" height="11" rx="1.5"/></svg>`,
  'inventory_2': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="24" height="18" rx="2"/><path d="M4 10l3-6h18l3 6"/><path d="M12 16h8"/></svg>`,
  'document_scanner': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="6" width="16" height="20" rx="1.5"/><path d="M4 12h4M24 12h4M4 20h4M24 20h4M12 10h8M12 14h8M12 18h5"/></svg>`,
  'devices': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="18" height="14" rx="1.5"/><path d="M10 24h6M22 12h6v8h-6"/><circle cx="25" cy="22" r="1"/></svg>`,
  'auto_awesome': `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 4l2.5 7.5L26 14l-7.5 2.5L16 24l-2.5-7.5L6 14l7.5-2.5L16 4z"/><path d="M6 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1L6 4z"/><path d="M24 20l1 3 3 1-3 1-1 3-1-3-3-1 3-1L24 20z"/></svg>`,
  'database': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,
  'monitoring': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="1.5"/><path d="M8 21h8M12 17v4"/><polyline points="6,12 9,9 12,12 15,8 18,11"/></svg>`,
  'sync_alt': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l4-4 4 4M7 4v12M21 16l-4 4-4-4M17 20V8"/></svg>`,
  // Time/feedback
  'schedule': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  'speed': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20a8 8 0 1 0-8-8"/><path d="M12 20a8 8 0 0 0 8-8"/><path d="M12 4v2M4 12H2M12 14l3-5"/></svg>`,
  'rule': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h5M7 12h10M7 16h3"/><path d="M15 10l2 2 3-4"/></svg>`,
  'check_circle': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6 10l3 3 5-5"/></svg>`,
  // Communication
  'chat': `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 3h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 1-2z"/></svg>`,
  'verified_user': `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 2l8 3v7c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V5l8-3z"/><path d="M8 11l2 2 4-4"/></svg>`,
  'call': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 4-2 2a12 12 0 0 0 4 4l2-2 4 2v4a2 2 0 0 1-2 2C6 18 2 8 2 5a2 2 0 0 1 3-2z"/></svg>`,
  'location_on': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6z"/><circle cx="10" cy="8" r="2"/></svg>`,
  // Values/why-us
  'hearing': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M12 3a9 9 0 0 1 9 9c0 2.5-1 5-3 7M12 15v6M9 21h6"/></svg>`,
  'bolt': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  'insights': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>`,
  'all_inclusive': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/></svg>`,
  'star': `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M9 1l2.3 5H17l-4.5 3.5 1.7 5.3L9 12l-5.2 2.8 1.7-5.3L1 5h5.7L9 1z"/></svg>`,
};

const FILES = ['services.html', 'projects.html', 'why-us.html', 'contact.html'];

FILES.forEach(filename => {
  const filePath = path.join('d:/QiaoTech_website', filename);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  
  Object.entries(ICONS).forEach(([name, svg]) => {
    // Replace: <span class="material-symbols-outlined ...">name</span>
    // Pattern variations with different classes and styles
    const patterns = [
      new RegExp(`<span[^>]*class="[^"]*material-symbols-outlined[^"]*"[^>]*>${name}</span>`, 'g'),
      new RegExp(`<span class="material-symbols-outlined text-\\[\\d+px\\]">${name}</span>`, 'g'),
      new RegExp(`<span class="material-symbols-outlined">${name}</span>`, 'g'),
    ];
    
    patterns.forEach(pattern => {
      const before = content;
      content = content.replace(pattern, svg);
      if (content !== before) count++;
    });
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${filename}: replaced icon spans`);
});

// Final check
console.log('\nRemaining material-symbols-outlined:');
FILES.forEach(filename => {
  const filePath = path.join('d:/QiaoTech_website', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const remaining = (content.match(/material-symbols-outlined/g) || []).length;
  console.log(`  ${filename}: ${remaining}`);
});
