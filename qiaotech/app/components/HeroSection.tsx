"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Database } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import LogoBadge from "./LogoBadge";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.8, ease: 'easeOut' as const },
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleLogo = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden"
      style={{ padding: "6rem 1.25rem 4rem" }}
    >
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Parallax Ambient Orbs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(ellipse, rgba(234,192,120,0.1) 0%, rgba(91,223,255,0.06) 50%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(61,220,255,0.08)" }} />
      </motion.div>

      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Text Column */}
        <motion.div
          style={{ opacity: opacityText, y: yText }}
          className="lg:col-span-7 flex flex-col gap-6 items-start"
        >
          {/* Eyebrow Pill */}
          <motion.div
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-glow-gold"
          >
            <div className="absolute inset-0 rounded-full glass pointer-events-none -z-10" />
            <span className="w-2 h-2 rounded-full bg-[#5bdfff] animate-pulse" style={{ boxShadow: "0 0 10px #5bdfff" }} aria-hidden="true" />
            <span className="eyebrow text-[#5bdfff]">
              Next-Gen AI Automation & Software · Pune, India
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="font-display leading-[1.05] tracking-tight text-[#dce1ff]"
            style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
          >
            From Business Problems to <br/>
            <span className="text-gradient-anim relative inline-block">
              Smart Digital Solutions.
              <span className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full opacity-50 blur-[2px]" style={{ background: "linear-gradient(90deg, #eac078, #5bdfff)" }} />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-lg leading-relaxed text-[#d1c5b4] max-w-2xl"
            style={{ fontFamily: "var(--font-manrope, sans-serif)", fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            AI Software · Automation · Web Apps · ERP · Digital Design — engineered
            with sovereign precision to eliminate repetitive manual work and unlock
            hyper-scale growth.
          </motion.p>

          {/* Motto */}
          <motion.div
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex items-center gap-3 px-5 py-2.5 rounded-lg glass border border-[rgba(201,162,93,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <span className="text-[#eac078] text-lg" style={{ filter: "drop-shadow(0 0 8px rgba(234,192,120,0.6))" }} aria-hidden="true">✦</span>
            <span className="text-[#eac078] text-[13px] font-semibold tracking-wide italic"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              &quot;Your Requirement. Our Technology. One Smart Solution.&quot;
            </span>
          </motion.div>

          {/* Dual CTAs */}
          <motion.div
            custom={4} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <Link href="/#contact" className="btn-primary" aria-label="Start your project with QIAO TECH"
              style={{ padding: "1rem 2.5rem", fontSize: "14px" }}>
              Start Your Project
              <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/#projects" className="btn-ghost" aria-label="View QIAO TECH's work"
              style={{ padding: "1rem 2.5rem", fontSize: "14px" }}>
              View Our Work
              <Database size={16} className="text-[#5bdfff]" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Telemetry Tickers */}
          <motion.div
            custom={5} initial="hidden" animate="visible" variants={fadeUp}
            className="grid grid-cols-3 gap-6 pt-6 w-full max-w-[420px]"
            aria-label="Key performance metrics"
          >
            {[
              { label: "Extraction Latency", value: "< 380ms", color: "#5bdfff" },
              { label: "Accuracy Score", value: "99.4%", color: "#eac078" },
              { label: "Manual Labor Cut", value: "10× Speed", color: "#5bdfff" },
            ].map((stat) => (
               <div key={stat.label} className="flex flex-col relative group">
                <span className="eyebrow text-[#9a8f80] transition-colors group-hover:text-[#d1c5b4]">{stat.label}</span>
                <span className="font-bold mt-1 tracking-tight" style={{ fontFamily: "var(--font-sora)", fontSize: "22px", color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Graphic Column — Logo Emblem */}
        <motion.div
          style={{ scale: scaleLogo }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[400px]"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.3 }}
        >
          <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center perspective-[1000px]">
            {/* Pulsing Rings */}
            <div className="absolute inset-0 rounded-full blur-[40px] animate-pulse"
              style={{ background: "rgba(201,162,93,0.12)" }} aria-hidden="true" />

            {/* Circuit SVG Rings (3D rotated slightly) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 500" fill="none" aria-hidden="true"
              style={{ transform: "rotateX(10deg) rotateY(-5deg)" }}
            >
              <circle cx="250" cy="250" r="230" stroke="rgba(201,162,93,0.3)" strokeWidth="1.5" strokeDasharray="4 8"
                style={{ animation: "spin 60s linear infinite", transformOrigin: "center" }} />
              <circle cx="250" cy="250" r="185" stroke="rgba(61,220,255,0.25)" strokeWidth="1" strokeDasharray="6 12" />
              <circle cx="250" cy="250" r="140" stroke="rgba(201,162,93,0.4)" strokeWidth="1.5" />
            </svg>

            {/* Central Emblem */}
            <div className="relative z-10 flex items-center justify-center">
              <LogoBadge />
            </div>

            {/* Floating Capsule — Top Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-0 z-20 px-5 py-3 rounded-xl glass-gold shadow-2xl flex items-center gap-3 backdrop-blur-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#5bdfff] animate-pulse" style={{ boxShadow: "0 0 10px #5bdfff" }} aria-hidden="true" />
              <div className="flex flex-col">
                <span className="eyebrow text-[#9a8f80]">Neural Agent</span>
                <span className="text-[#eac078] font-bold text-[15px]" style={{ fontFamily: "var(--font-space-grotesk)" }}>10× Faster Workflows</span>
              </div>
            </motion.div>

            {/* Floating Capsule — Bottom Left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              className="absolute -bottom-2 -left-4 z-20 px-5 py-3 rounded-xl glass-cyan shadow-2xl flex items-center gap-3 backdrop-blur-xl"
            >
              <span className="text-[#5bdfff] text-xl" style={{ filter: "drop-shadow(0 0 8px #5bdfff)" }} aria-hidden="true">⊙</span>
              <div className="flex flex-col">
                <span className="eyebrow text-[#9a8f80]">Smart OCR</span>
                <span className="text-[#5bdfff] font-bold text-[15px]" style={{ fontFamily: "var(--font-space-grotesk)" }}>99.4% Extraction Acc.</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="/#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#9a8f80] hover:text-[#eac078] transition-colors"
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to services"
      >
        <span className="eyebrow text-[11px] tracking-[0.2em]">Scroll</span>
        <span className="text-[#5bdfff] text-xl mt-1">↓</span>
      </motion.a>
    </section>
  );
}
