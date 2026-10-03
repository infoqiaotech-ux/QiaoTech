/*!
 * QIAO TECH — Hi-Tech Cursor
 * Zero dependencies. Self-injects its own CSS. Desktop (mouse) only.
 * Usage: <script src="assets/js/cursor.js" defer></script>
 */
(() => {
  'use strict';

  // Mouse/trackpad devices only. Touch phones and tablets are left untouched.
  // Two separate matchMedia calls — more reliable than a combined query string
  // across Chrome, Safari, Firefox and hybrid touch-laptop devices.
  const hasMouse = matchMedia('(any-pointer: fine)').matches &&
    matchMedia('(any-hover: hover)').matches;
  if (!hasMouse) return;
  if (document.getElementById('qt-root')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Brand colours: Imperial Gold -> Cybernetic Cyan
  const GOLD = [234, 192, 120];
  const CYAN = [91, 223, 255];

  const HOVER_SEL =
    'a, button, summary, label, select, [role="button"], [data-cursor], .cursor-pointer';
  const TEXT_SEL = 'input, textarea, [contenteditable="true"]';

  /* ---------- CSS ---------- */
  const style = document.createElement('style');
  style.id = 'qt-cursor-css';
  style.textContent = `
    html.qt-on, html.qt-on * { cursor: none !important; }
    html.qt-on input, html.qt-on textarea, html.qt-on [contenteditable="true"] { cursor: text !important; }

    #qt-root {
      position: fixed; inset: 0; z-index: 2147483000;
      pointer-events: none; overflow: hidden;
      opacity: 0; transition: opacity .35s ease;
      --qt-rgb: 234,192,120;
    }
    #qt-root.qt-vis { opacity: 1; }
    #qt-root.qt-vis.qt-text { opacity: 0; }

    #qt-trail { position: absolute; inset: 0; width: 100%; height: 100%; }

    .qt-glow {
      position: absolute; left: 0; top: 0; width: 0; height: 0;
      display: flex; align-items: center; justify-content: center;
      will-change: transform;
    }
    .qt-glow i {
      flex-shrink: 0; width: 460px; height: 460px; border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--qt-rgb), .20) 0%, rgba(var(--qt-rgb), .07) 38%, transparent 66%);
      mix-blend-mode: screen;
    }

    .qt-dot, .qt-ring {
      position: absolute; left: 0; top: 0; width: 0; height: 0;
      display: flex; align-items: center; justify-content: center;
      will-change: transform;
    }
    .qt-dot i {
      flex-shrink: 0; width: 8px; height: 8px; border-radius: 50%;
      background: rgb(var(--qt-rgb));
      box-shadow: 0 0 10px 2px rgba(var(--qt-rgb), .9), 0 0 28px 6px rgba(var(--qt-rgb), .45);
      transition: transform .2s ease;
    }
    .qt-ring i {
      flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
      border: 1.5px solid rgba(var(--qt-rgb), .85);
      box-shadow: 0 0 14px rgba(var(--qt-rgb), .35), inset 0 0 12px rgba(var(--qt-rgb), .15);
      transition: width .3s cubic-bezier(.2,.8,.2,1), height .3s cubic-bezier(.2,.8,.2,1),
                  background .3s ease, border-color .2s ease;
    }

    /* Hover over links / buttons: bigger HUD ring, rotating dashes */
    #qt-root.qt-hover .qt-ring i {
      width: 68px; height: 68px;
      border-style: dashed;
      background: rgba(var(--qt-rgb), .09);
      animation: qt-spin 7s linear infinite;
    }
    #qt-root.qt-hover .qt-dot i { transform: scale(.55); }

    /* Pressed */
    #qt-root.qt-down .qt-ring i { width: 22px; height: 22px; background: rgba(var(--qt-rgb), .28); }
    #qt-root.qt-down .qt-dot i  { transform: scale(1.5); }

    .qt-ripple {
      position: absolute; width: 0; height: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .qt-ripple i {
      flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
      border: 2px solid rgb(var(--qt-rgb));
      animation: qt-ripple .65s cubic-bezier(.2,.7,.2,1) forwards;
    }

    @keyframes qt-spin   { to { transform: rotate(360deg); } }
    @keyframes qt-ripple { from { transform: scale(.4); opacity: .9; } to { transform: scale(5); opacity: 0; } }

    @media (prefers-reduced-motion: reduce) {
      #qt-root.qt-hover .qt-ring i { animation: none; }
      .qt-ripple { display: none; }
    }
  `;
  document.head.appendChild(style);

  /* ---------- DOM ---------- */
  const mk = (cls, tag = 'div') => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  };

  const root = mk(); root.id = 'qt-root'; root.setAttribute('aria-hidden', 'true');
  const canvas = mk('', 'canvas'); canvas.id = 'qt-trail';
  const glow = mk('qt-glow'); glow.appendChild(mk('', 'i'));
  const ring = mk('qt-ring'); ring.appendChild(mk('', 'i'));
  const dot = mk('qt-dot'); dot.appendChild(mk('', 'i'));
  root.append(canvas, glow, ring, dot);
  document.body.appendChild(root);
  document.documentElement.classList.add('qt-on');

  /* ---------- State ---------- */
  const ctx = canvas.getContext('2d');
  let dpr = 1, W = 0, H = 0;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const s = {
    x: W / 2, y: H / 2,       // real pointer
    rx: W / 2, ry: H / 2,     // ring (follows with lag)
    gx: W / 2, gy: H / 2,     // glow (follows slower)
    lx: W / 2, ly: H / 2,     // last frame pointer
    seen: false, hover: false, hoverBoost: 0
  };
  const particles = [];
  const MAX_PARTICLES = 140;

  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = (a, b, t) => [lerp(a[0], b[0], t) | 0, lerp(a[1], b[1], t) | 0, lerp(a[2], b[2], t) | 0];

  /* ---------- Events ---------- */
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    s.x = e.clientX; s.y = e.clientY;
    if (!s.seen) {
      s.seen = true;
      s.rx = s.gx = s.lx = s.x;
      s.ry = s.gy = s.ly = s.y;
    }
    root.classList.add('qt-vis');
  }, { passive: true });

  document.addEventListener('mouseover', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    s.hover = !!t.closest(HOVER_SEL);
    root.classList.toggle('qt-hover', s.hover);
    root.classList.toggle('qt-text', !!t.closest(TEXT_SEL));
  }, { passive: true });

  document.addEventListener('mouseleave', () => root.classList.remove('qt-vis'));
  document.addEventListener('mouseenter', () => { if (s.seen) root.classList.add('qt-vis'); });
  window.addEventListener('blur', () => root.classList.remove('qt-vis'));

  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    root.classList.add('qt-down');
    if (reduceMotion) return;
    const r = mk('qt-ripple');
    r.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    r.appendChild(mk('', 'i'));
    root.appendChild(r);
    r.addEventListener('animationend', () => r.remove(), { once: true });
  }, { passive: true });
  window.addEventListener('pointerup', () => root.classList.remove('qt-down'), { passive: true });

  /* ---------- Loop ---------- */
  let last = performance.now();

  const frame = (now) => {
    requestAnimationFrame(frame);
    if (document.hidden || !s.seen) return;

    const dt = Math.min((now - last) / 16.67, 3); // frame-rate independent
    last = now;

    // Smooth follow
    const ringK = reduceMotion ? 1 : 1 - Math.pow(1 - 0.2, dt);
    const glowK = reduceMotion ? 1 : 1 - Math.pow(1 - 0.07, dt);
    s.rx += (s.x - s.rx) * ringK; s.ry += (s.y - s.ry) * ringK;
    s.gx += (s.x - s.gx) * glowK; s.gy += (s.y - s.gy) * glowK;

    // Colour: shifts gold <-> cyan with position + time; hover pushes to cyan
    s.hoverBoost = lerp(s.hoverBoost, s.hover ? 1 : 0, 0.12);
    const wave = (Math.sin(now * 0.0012 + (s.x / W) * 3.2 + (s.y / H) * 1.6) + 1) / 2;
    const c = mix(GOLD, CYAN, Math.min(1, wave * 0.85 + s.hoverBoost * 0.6));
    root.style.setProperty('--qt-rgb', `${c[0]},${c[1]},${c[2]}`);

    // Position
    dot.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
    ring.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0)`;
    glow.style.transform = `translate3d(${s.gx}px, ${s.gy}px, 0)`;

    // Particle trail
    if (!reduceMotion) {
      const dx = s.x - s.lx, dy = s.y - s.ly;
      const speed = Math.hypot(dx, dy);
      if (speed > 1.2) {
        const n = Math.min(4, 1 + (speed / 10) | 0);
        for (let i = 0; i < n && particles.length < MAX_PARTICLES; i++) {
          const k = i / n;
          const hue = mix(GOLD, CYAN, (wave + Math.random() * 0.25) % 1);
          particles.push({
            x: s.lx + dx * k + (Math.random() - 0.5) * 6,
            y: s.ly + dy * k + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 0.7 - dx * 0.02,
            vy: (Math.random() - 0.5) * 0.7 - dy * 0.02,
            r: 1.5 + Math.random() * 2.8,
            life: 1,
            decay: 0.017 + Math.random() * 0.02,
            c: hue
          });
        }
      }
      s.lx = s.x; s.ly = s.y;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const [r, g, b] = p.c;
        ctx.fillStyle = `rgba(${r},${g},${b},${p.life * 0.16})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2 * p.life, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},${p.life * 0.75})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
  };
  requestAnimationFrame(frame);
})();
