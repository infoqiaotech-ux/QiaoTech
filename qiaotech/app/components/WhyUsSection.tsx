"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Target, Cpu, TrendingUp, Layers } from "lucide-react";

const advantages = [
  { icon: Target,     number: "01", title: "Requirement First", gold: true,
    desc: "We begin every engagement by deeply understanding your business process before a single line of code is written. No templates, no shortcuts — only purpose-built systems." },
  { icon: Cpu,        number: "02", title: "AI-Assisted Dev",   gold: false,
    desc: "Our development pipeline integrates cutting-edge AI tools to accelerate delivery speed and accuracy, ensuring you receive enterprise-grade software at startup economics." },
  { icon: TrendingUp, number: "03", title: "Practical Results", gold: true,
    desc: "We measure success by real-world business impact — hours saved, errors eliminated, revenue enabled. Every feature we ship must justify itself with quantifiable outcomes." },
  { icon: Layers,     number: "04", title: "End-to-End",        gold: false,
    desc: "From requirement analysis and system design to deployment, training, and ongoing support — QIAO TECH is your single point of accountability for the entire technology lifecycle." },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const item      = { hidden: { opacity: 0, scale: 0.95, y: 24 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } } };

function AdvCard({ adv }: { adv: typeof advantages[0] }) {
  const Icon = adv.icon;
  const ref  = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const rx   = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]),  { stiffness: 180, damping: 22 });
  const ry   = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]),  { stiffness: 180, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };
  const gold = adv.gold;

  return (
    <motion.div variants={item} style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative group rounded-2xl p-8 flex gap-6 overflow-hidden border-glow-gold"
        role="article" aria-label={adv.title}
        data-css-variant={gold ? "glass-gold" : "glass-cyan"}
        
      >
        {/* Inline glass styles to avoid class resolution issues */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
          background:           "rgba(11,18,41,0.55)",
          backdropFilter:       "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          border:               `1px solid ${gold ? "rgba(201,162,93,0.22)" : "rgba(61,220,255,0.18)"}`,
          boxShadow:            gold
            ? "inset 0 1px 0 rgba(234,192,120,0.08), 0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(201,162,93,0.06)"
            : "inset 0 1px 0 rgba(91,223,255,0.06), 0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(61,220,255,0.05)",
          zIndex: 0,
        }} />

        {/* Number watermark */}
        <div className="absolute top-4 right-6 select-none pointer-events-none z-0"
          style={{ fontFamily: "var(--font-sora)", fontSize: "88px", fontWeight: 700, lineHeight: 1,
            color: gold ? "rgba(201,162,93,0.06)" : "rgba(61,220,255,0.06)" }} aria-hidden="true">
          {adv.number}
        </div>

        {/* Icon */}
        <div className={`${gold ? "icon-badge-gold" : "icon-badge-cyan"} shrink-0 relative z-10`}>
          <Icon size={24} aria-hidden="true" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3 relative z-10">
          <h3 className="font-bold text-[#dce1ff] group-hover:text-[#eac078] transition-colors duration-300"
            style={{ fontFamily: "var(--font-sora)", fontSize: "20px", letterSpacing: "-0.01em" }}>
            {adv.title}
          </h3>
          <p className="text-[#d1c5b4] text-sm" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.78 }}>
            {adv.desc}
          </p>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-b-2xl z-10"
          style={{ background: gold ? "linear-gradient(90deg, rgba(201,162,93,0.7), transparent)" : "linear-gradient(90deg, rgba(61,220,255,0.7), transparent)" }}
          aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative section-pad py-24 overflow-hidden" aria-labelledby="why-us-heading">
      {/* Orbs */}
      <div className="orb orb-gold" style={{ width: 400, height: 400, top: "20%", left: "-8%",  opacity: 0.5 }} aria-hidden="true" />
      <div className="orb orb-cyan"  style={{ width: 300, height: 300, bottom: "10%", right: "-5%", opacity: 0.45 }} aria-hidden="true" />

      <div className="max-w-site mx-auto flex flex-col gap-14 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #eac078)" }} aria-hidden="true" />
            <span className="eyebrow text-[#eac078]">Why QIAO TECH</span>
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, #eac078, transparent)" }} aria-hidden="true" />
          </motion.div>

          <motion.h2 id="why-us-heading"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' as const }}
            className="section-title text-center">
            The <span className="text-gold-shimmer">QIAO TECH</span> Advantage
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#d1c5b4] text-base text-center max-w-xl"
            style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
            We operate at the intersection of business strategy, AI engineering, and sovereign design — delivering systems that endure.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv) => <AdvCard key={adv.number} adv={adv} />)}
        </motion.div>
      </div>
    </section>
  );
}
