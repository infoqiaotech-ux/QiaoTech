"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, Code2, Package, ScanLine, Monitor, Palette } from "lucide-react";
import Link from "next/link";

const services = [
  { id: "01", icon: Bot,      title: "AI Automation",    desc: "Smart self-running workflows, automated data routing pipelines, and intelligent triggers that run 24/7 without friction or human supervision.", tags: "Pipelines · Webhooks · Agents",       gold: true },
  { id: "02", icon: Code2,    title: "Web Apps",         desc: "Custom software architecture engineered for your business process. Robust, secure, lightning-fast cloud web platforms built to scale.",         tags: "React · Next.js · FastAPI",          gold: false },
  { id: "03", icon: Package,  title: "ERP Systems",      desc: "End-to-end stock, purchase order lifecycles, real-time inventory reconciliation, and custom enterprise resource planning systems.",             tags: "PostgreSQL · Stock Flow · Audit",    gold: true },
  { id: "04", icon: ScanLine, title: "OCR / ICR",        desc: "AI document data extraction, deep neural optical character recognition for vendor invoices, bills, and messy scanned handwriting.",            tags: "Vision AI · Table Parser · 99% Acc", gold: false },
  { id: "05", icon: Monitor,  title: "Modern Websites",  desc: "High-converting modern business platforms, client dashboards, and lightning-fast portals that reflect technical authority.",                    tags: "High Conversion · SEO · Ultra Fast", gold: true },
  { id: "06", icon: Palette,  title: "Branding Systems", desc: "Crest and logo engineering, visual style guides, corporate brand guidelines, and distinctive typographic identities built for the future.",     tags: "Identity · Design Systems · Prestige", gold: false },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const card3d    = { hidden: { opacity: 0, y: 40, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: 'easeOut' as const } } };

function TiltCard({ s }: { s: typeof services[0] }) {
  const Icon = s.icon;
  const ref  = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx  = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]),  { stiffness: 200, damping: 25 });
  const ry  = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const gold = s.gold;

  return (
    <motion.div variants={card3d} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="service-card border-glow-gold group flex flex-col justify-between h-full"
        role="article" aria-label={s.title}
      >
        {/* Orb corner glow */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: gold ? "radial-gradient(circle, rgba(201,162,93,0.18), transparent 70%)" : "radial-gradient(circle, rgba(61,220,255,0.14), transparent 70%)", filter: "blur(20px)" }}
          aria-hidden="true" />

        <div className="flex flex-col gap-5">
          {/* Icon badge */}
          <div className={gold ? "icon-badge-gold" : "icon-badge-cyan"}>
            <Icon size={26} aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[#9a8f80]">CAPABILITY {s.id}</span>
            <h3 className="font-bold transition-colors duration-300 group-hover:text-[#eac078]"
              style={{ fontFamily: "var(--font-sora)", fontSize: "20px", color: "#dce1ff", letterSpacing: "-0.01em" }}>
              {s.title}
            </h3>
            <p className="text-[#d1c5b4] text-sm leading-relaxed" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.75 }}>
              {s.desc}
            </p>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-between transition-colors duration-300"
          style={{ color: "#9a8f80", borderTop: "1px solid rgba(78,70,57,0.2)" }}>
          <span className="eyebrow group-hover:text-[#eac078] transition-colors">{s.tags}</span>
          <span className="text-lg group-hover:translate-x-1.5 group-hover:text-[#eac078] transition-all duration-300 inline-block">→</span>
        </div>

        {/* Bottom gradient accent line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-b-xl"
          style={{ background: gold ? "linear-gradient(90deg, #C9A25D, rgba(61,220,255,0.4))" : "linear-gradient(90deg, #5bdfff, rgba(201,162,93,0.4))" }}
          aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative section-pad py-20 overflow-hidden" aria-labelledby="services-heading">
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 500, height: 500, top: "-10%", right: "-5%", opacity: 0.6 }} aria-hidden="true" />
      <div className="orb orb-cyan"  style={{ width: 350, height: 350, bottom: "5%", left: "-8%",  opacity: 0.5 }} aria-hidden="true" />

      <div className="max-w-site mx-auto flex flex-col gap-14 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-3 max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-2">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #5bdfff, transparent)" }} aria-hidden="true" />
              <span className="eyebrow text-[#5bdfff]">What We Do</span>
            </motion.div>

            <motion.h2 id="services-heading" initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' as const }}
              className="section-title">
              Intelligent Systems <span className="text-gold-shimmer">Tailored</span> to Your Business
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#d1c5b4] text-base" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
              We engineer mission-critical computational agents, automate error-prone administrative overhead, and construct bulletproof web architectures.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 text-[#eac078] hover:text-[#5bdfff] text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}>
              <span>Explore Custom Solution</span><span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => <TiltCard key={s.id} s={s} />)}
        </motion.div>
      </div>
    </section>
  );
}
