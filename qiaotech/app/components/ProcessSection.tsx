"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: 1,
    label: "Your Problem",
    sub: "Manual bottlenecks, repetitive data entry, disconnected systems",
    icon: "⚠",
    isGold: true,
  },
  {
    id: 2,
    label: "AI + Automation",
    sub: "QIAO TECH engineers intelligent agents, pipelines & software solutions",
    icon: "⚡",
    isGold: false,
  },
  {
    id: 3,
    label: "Smart Result",
    sub: "Faster workflows, zero errors, reduced costs, and measurable ROI",
    icon: "✦",
    isGold: true,
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yOrb = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative section-pad py-24 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "rgba(6,13,36,0.3)" }} />
      <motion.div style={{ y: yOrb }} className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[800px] h-[300px] rounded-[100%] blur-[120px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,162,93,0.08) 0%, rgba(61,220,255,0.05) 50%, transparent 70%)" }} aria-hidden="true" />
      </motion.div>

      <div className="max-w-[1440px] mx-auto flex flex-col gap-20 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #5bdfff)" }} aria-hidden="true" />
            <span className="eyebrow text-[#5bdfff]">Our Process</span>
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, #5bdfff, transparent)" }} aria-hidden="true" />
          </motion.div>

          <motion.h2 id="process-heading"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' as const }}
            className="section-title text-center">
            How We <span className="text-gradient-anim">Transform</span> Your Business
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#d1c5b4] text-base text-center"
            style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
            A clear, three-stage framework that turns your manual pain point into a fully automated, scalable digital solution.
          </motion.p>
        </div>

        {/* Flow Steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 mt-4">
          {steps.map((step, i) => (
            <div key={step.id} className="relative flex flex-col md:flex-row items-center group">
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7, ease: 'easeOut' as const }}
                className="flex flex-col items-center gap-6 w-64 relative"
              >
                {/* 3D Glass Badge */}
                <div className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl relative ${step.isGold ? "icon-badge-gold" : "icon-badge-cyan"}`}
                  style={{ fontSize: "40px", width: "112px", height: "112px", borderRadius: "50%" }}>
                  <span aria-hidden="true" className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </span>

                  {/* Step number */}
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold z-20 shadow-lg border border-[rgba(255,255,255,0.1)]"
                    style={{ background: step.isGold ? "linear-gradient(135deg, #C9A25D, #E8C888)" : "linear-gradient(135deg, #5bdfff, #a2edff)", color: "#0A1128" }}>
                    {step.id}
                  </div>
                </div>

                {/* Text */}
                <div className="text-center flex flex-col gap-2">
                  <h3 className="font-bold transition-colors"
                    style={{ fontFamily: "var(--font-sora)", fontSize: "22px", color: step.isGold ? "#eac078" : "#5bdfff" }}>
                    {step.label}
                  </h3>
                  <p className="text-[#dce1ff] text-[14px] max-w-[220px]" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.6 }}>
                    {step.sub}
                  </p>
                </div>
              </motion.div>

              {/* Connector Arrow */}
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center my-6 md:my-0 md:mx-8 relative z-0">
                  {/* Mobile vertical connector */}
                  <div className="flex md:hidden flex-col items-center gap-2">
                    <motion.div className="w-1 h-16 rounded-full"
                      style={{ background: "linear-gradient(180deg, rgba(201,162,93,0.5), rgba(61,220,255,0.5))" }}
                      initial={{ scaleY: 0, transformOrigin: "top" }}
                      whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.4, duration: 0.6 }} />
                    <span style={{ color: "#5bdfff", fontSize: "24px", filter: "drop-shadow(0 0 8px #5bdfff)" }}>↓</span>
                  </div>

                  {/* Desktop horizontal connector */}
                  <div className="hidden md:flex items-center gap-2">
                    <motion.div className="h-1 w-24 rounded-full"
                      style={{ background: "linear-gradient(90deg, rgba(201,162,93,0.5), rgba(61,220,255,0.5))" }}
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.4, duration: 0.6 }} />
                    <span style={{ color: "#5bdfff", fontSize: "24px", filter: "drop-shadow(0 0 8px #5bdfff)", transform: "translateX(-4px)" }}>→</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }} className="flex justify-center mt-4">
          <Link href="/#contact" className="btn-primary" style={{ padding: "1.1rem 2.5rem", fontSize: "14px" }}>
            Start Your Transformation
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
