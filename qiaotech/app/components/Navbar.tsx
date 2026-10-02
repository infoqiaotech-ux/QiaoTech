"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence,  } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/#hero",     label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#why-us",   label: "Why Us" },
  { href: "/#contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("Home");
  const ctaRef = useRef<HTMLAnchorElement>(null);

  /* scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* magnetic hover on CTA */
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) * 0.25;
    const dy = (e.clientY - rect.top  - rect.height / 2) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  };
  const handleCtaMouseLeave = () => {
    if (ctaRef.current) ctaRef.current.style.transform = "";
  };

  const handleNavClick = (label: string) => {
    setActive(label);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' as const }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={scrolled ? {
          background:        "rgba(6, 13, 36, 0.82)",
          backdropFilter:    "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow:         "0 4px 40px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(201,162,93,0.12)",
          borderBottom:      "1px solid rgba(201,162,93,0.14)",
        } : {
          background:        "linear-gradient(180deg, rgba(6,13,36,0.6) 0%, transparent 100%)",
        }}
      >
        <div className="h-20 max-w-[1440px] mx-auto px-5 md:px-12 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/#hero" className="flex items-center gap-3 group shrink-0" onClick={() => handleNavClick("Home")}>
            <div
              className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 transition-all duration-500"
              style={{
                background:  "transparent",
                boxShadow:   "0 0 0 1px rgba(201,162,93,0.3), 0 0 16px rgba(201,162,93,0.4)",
              }}
            >
              <Image src="/qiaotech_logo_final.png" alt="QIAO TECH Logo" fill sizes="40px"
                className="object-contain transition-transform duration-500 group-hover:scale-110" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none transition-colors group-hover:text-[#eac078]"
                style={{ fontFamily: "var(--font-sora)", fontSize: "18px", color: "#dce1ff" }}>
                QIAO <span style={{ color: "#eac078" }}>TECH</span>
              </span>
              <span className="eyebrow text-[#9a8f80] mt-0.5">Clever AI. Smart Automation.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.label)}
                className="relative py-1 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 hover:text-[#eac078]"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color:      active === link.label ? "#eac078" : "#d1c5b4",
                  letterSpacing: "0.08em",
                }}
              >
                {link.label}
                {active === link.label && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #C9A25D, #5bdfff)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              ref={ctaRef}
              href="/#contact"
              onClick={() => handleNavClick("Contact")}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              className="hidden sm:inline-flex btn-primary"
              style={{ fontSize: "12px", padding: "0.6rem 1.25rem", transition: "transform 0.2s ease, box-shadow 0.3s ease" }}
              aria-label="Get a Quote"
            >
              Get a Quote
            </Link>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
              style={{
                background:  "rgba(11,18,41,0.7)",
                backdropFilter: "blur(12px)",
                border:      "1px solid rgba(201,162,93,0.2)",
                color:       "#dce1ff",
                boxShadow:   "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog" aria-modal="true" aria-label="Mobile navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{
              background:       "rgba(6,13,36,0.96)",
              backdropFilter:   "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              borderLeft:       "1px solid rgba(201,162,93,0.12)",
            }}
          >
            {/* Orbs in drawer */}
            <div className="orb orb-gold" style={{ width: 300, height: 300, top: "-10%", right: "-10%", opacity: 0.5 }} aria-hidden="true" />
            <div className="orb orb-cyan"  style={{ width: 200, height: 200, bottom: "10%", left: "-5%",  opacity: 0.4 }} aria-hidden="true" />

            {/* Close */}
            <div className="flex justify-end p-6 relative z-10">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300"
                style={{
                  background: "rgba(11,18,41,0.8)",
                  border:     "1px solid rgba(201,162,93,0.2)",
                  color:      "#dce1ff",
                  backdropFilter: "blur(12px)",
                }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8 relative z-10">
              <Link href="/#hero" onClick={() => handleNavClick("Home")} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden"
                  style={{ background: "transparent", boxShadow: "0 0 0 2px rgba(201,162,93,0.4), 0 0 20px rgba(201,162,93,0.3)" }}>
                  <Image src="/qiaotech_logo_final.png" alt="QIAO TECH Logo" fill sizes="48px" className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#dce1ff]" style={{ fontFamily: "var(--font-sora)", fontSize: "20px" }}>
                    QIAO <span style={{ color: "#eac078" }}>TECH</span>
                  </span>
                  <span className="eyebrow text-[#9a8f80]">Clever AI. Smart Automation.</span>
                </div>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-5 flex-1 justify-center relative z-10" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' as const }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.label)}
                    className="flex items-center gap-3 mobile-nav-link px-6 py-3 rounded-xl transition-all duration-300"
                    style={{
                      color:      active === link.label ? "#eac078" : "#dce1ff",
                      background: active === link.label ? "rgba(201,162,93,0.08)" : "transparent",
                      border:     active === link.label ? "1px solid rgba(201,162,93,0.2)" : "1px solid transparent",
                    }}
                  >
                    <ChevronRight size={16} style={{ color: active === link.label ? "#eac078" : "#9a8f80" }} />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="p-8 flex justify-center relative z-10">
              <Link href="/#contact" onClick={() => handleNavClick("Contact")} className="btn-primary">
                Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
