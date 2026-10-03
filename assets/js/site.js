/**
 * QIAO TECH — site.js
 * Vanilla JS: mobile menu, scroll header, count-up stats, reveal animations, cursor spotlight
 * No frameworks. prefers-reduced-motion respected throughout.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ────────────────────────────────────────────
     MOBILE MENU — with focus trap, ESC, scroll lock
     ──────────────────────────────────────────── */
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('menu-close-btn');

  if (menuBtn && menu) {
    // Focusable elements inside the menu
    const getFocusable = () =>
      Array.from(menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled') && !el.closest('[hidden]'));

    function openMenu() {
      menu.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus first link
      const els = getFocusable();
      if (els.length) setTimeout(() => els[0].focus(), 50);
    }

    function closeMenu() {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus();
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close when a nav link is clicked
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside tap (tap on the backdrop, not inside a child interactive element)
    menu.addEventListener('click', (e) => {
      // Only close if the direct target is the menu overlay itself (not a child)
      if (e.target === menu) closeMenu();
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    // Auto-close when resized to desktop (≥1024px)
    const mql = window.matchMedia('(min-width: 1024px)');
    function handleBreakpoint(e) {
      if (e.matches && menu.classList.contains('open')) closeMenu();
    }
    if (mql.addEventListener) {
      mql.addEventListener('change', handleBreakpoint);
    } else {
      mql.addListener(handleBreakpoint); // Safari <14 fallback
    }

    // Focus trap inside menu
    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const els = getFocusable();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Initial ARIA state
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'mobile-menu');
  }

  /* ────────────────────────────────────────────
     HEADER — shrink on scroll
     ──────────────────────────────────────────── */
  const header = document.querySelector('header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  /* ────────────────────────────────────────────
     COUNT-UP — stat numbers
     ──────────────────────────────────────────── */
  function countUp(el, target, duration) {
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Observe stat elements with data-count attribute
  const countEls = document.querySelectorAll('[data-count]');
  if (countEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          countUp(el, target, 1800);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => observer.observe(el));
  }

  /* ────────────────────────────────────────────
     REVEAL ON SCROLL
     ──────────────────────────────────────────── */
  if (!prefersReducedMotion) {
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings by 60ms
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const index = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 60);
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealEls.forEach(el => revealObserver.observe(el));
    }
  } else {
    // Show all immediately if reduced motion
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ────────────────────────────────────────────
     CURSOR SPOTLIGHT — stat cards & CTA band
     (CSS variable approach, disabled on touch)
     ──────────────────────────────────────────── */
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice && !prefersReducedMotion) {
    // Stat cards — radial spotlight via --x / --y
    const spotlightCards = document.querySelectorAll('.stat-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--x', x + '%');
        card.style.setProperty('--y', y + '%');
      });
    });

    // Service cards — radial spotlight via --cx / --cy
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = ((e.clientX - rect.left) / rect.width) * 100;
        const cy = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--cx', cx + '%');
        card.style.setProperty('--cy', cy + '%');
      });
    });
  }

  /* ────────────────────────────────────────────
     DYNAMIC YEAR
     ──────────────────────────────────────────── */
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ────────────────────────────────────────────
     ACTIVE NAV LINK — highlight current page
     ──────────────────────────────────────────── */
  const rawPage = window.location.pathname.split('/').pop();
  const currentPage = rawPage === '' ? 'index.html' : rawPage;

  // Desktop nav links (exclude mobile-menu which is handled separately)
  const desktopNav = document.querySelector('header nav');
  if (desktopNav) {
    desktopNav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('nav-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Mobile nav links
  const mobileNav = document.querySelector('#mobile-menu nav');
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('mob-active');
      }
    });
  }

  /* ────────────────────────────────────────────
     SCROLL INDICATOR — animate ping dot
     ──────────────────────────────────────────── */
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }

})();
