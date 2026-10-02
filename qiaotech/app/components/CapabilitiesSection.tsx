"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const capabilities = [
  {
    tag: "CASE STUDY 01 · INTELLIGENT AUTOMATION",
    isGold: false,
    title: "Email → Auto Excel Procurement Pipeline",
    desc: "Customer purchase orders arriving as unstructured email bodies and PDF attachments are automatically intercepted, parsed using NLP models, and written into enterprise ERP master sheets without a single keystroke.",
    tags: ["Python", "IMAP Listeners", "Pandas / Openpyxl", "Webhook Syncer"],
    impact: "Eliminated 4 hours/day of repetitive manual typing with 100% order accuracy.",
    impactGold: true,
    preview: {
      title: "LIVE PIPELINE TELEMETRY",
      isCyan: true,
      lines: [
        { time: "09:41:02", text: "Inbound PO #9842 detected (Outlook IMAP)", status: "OK", isCyan: true },
        { time: "09:41:03", text: "NLP tokenization & SKU entity extraction...", status: "EXTRACTED (4 items)", isCyan: false },
        { time: "09:41:04", text: "Writing to Master_Stock_Orders.xlsx", status: "200 SUCCESS", isCyan: true },
      ],
    },
    reversed: false,
  },
  {
    tag: "CASE STUDY 02 · WEB APP & BOT API",
    isGold: true,
    title: "Leave & HR Management with WhatsApp Integration",
    desc: "Replacing cumbersome legacy HR portals with an agile, mobile-first web console tethered to the WhatsApp Business API. Multi-tier team leads approve leaves directly through secure interactive WhatsApp prompts.",
    tags: ["WhatsApp Cloud API", "React Dashboard", "FastAPI", "PostgreSQL"],
    impact: "Leave approval turnaround dropped from 48 hours to under 3 minutes.",
    impactGold: false,
    preview: {
      title: "WHATSAPP CLOUD API HOOK",
      isCyan: false,
      lines: [
        { time: "", text: "Emp #204 requested 2 days casual leave.", status: "INCOMING", isCyan: true },
        { time: "", text: "Manager 1-Tap Authorization activated", status: "APPROVED", isCyan: false },
        { time: "", text: "HR ledger & calendar sync updated in real time", status: "DONE", isCyan: true },
      ],
    },
    reversed: true,
  },
  {
    tag: "CASE STUDY 03 · COMPUTER VISION & ERP",
    isGold: false,
    title: "Enterprise Stock ERP with Integrated AI OCR",
    desc: "Complete inventory control ecosystem featuring automated GRN camera scanning. Warehouse clerks photograph vendor delivery challans; our neural OCR decodes table structures, verifies quantities, and reconciles back-orders.",
    tags: ["Computer Vision", "Deep Learning OCR", "Inventory Ledger", "Barcode & QR"],
    impact: "99.8% stock reconciliation accuracy and zero inventory shrinkage.",
    impactGold: true,
    preview: {
      title: "SCANNER PIPELINE",
      isCyan: true,
      lines: [
        { time: "GRN SCANS/DAY", text: "3,200+ Instant Table Parsing", status: "LIVE", isCyan: true },
        { time: "MATCH CONFIDENCE", text: "99.85% Fault Tolerant Logic", status: "HIGH", isCyan: false },
        { time: "SYNC STATUS", text: "Auto-Synced to Central ERP Ledger", status: "✓", isCyan: true },
      ],
    },
    reversed: false,
  },
];

const fadeVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 0.8, ease: 'easeOut' as const } },
};

function CapabilityCard({ cap }: { cap: typeof capabilities[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [2, -2]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeVariants}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl p-6 lg:p-10 shadow-2xl relative group ${cap.isGold ? "border-glow-gold" : ""}`}
        data-css-variant={cap.isGold ? "glass-gold" : "glass-cyan"}
        
      >
        {/* Base Glass Layer */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
          background: "rgba(11,18,41,0.55)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: `1px solid ${cap.isGold ? "rgba(201,162,93,0.25)" : "rgba(61,220,255,0.2)"}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 40px rgba(0,0,0,0.5)",
          zIndex: 0,
        }} />

        {/* Text Column */}
        <div className={`lg:col-span-6 flex flex-col gap-6 relative z-10 ${cap.reversed ? "order-1 lg:order-2" : ""}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit"
            style={{ background: cap.isGold ? "rgba(201,162,93,0.12)" : "rgba(61,220,255,0.12)", border: `1px solid ${cap.isGold ? "rgba(201,162,93,0.2)" : "rgba(61,220,255,0.2)"}` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cap.isGold ? "#eac078" : "#5bdfff" }} aria-hidden="true" />
            <span className="eyebrow" style={{ color: cap.isGold ? "#eac078" : "#5bdfff" }}>{cap.tag}</span>
          </div>

          <h3 className="font-bold text-[#dce1ff] leading-tight tracking-tight transition-colors group-hover:text-[#eac078]"
            style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(22px, 2.5vw, 28px)" }}>
            {cap.title}
          </h3>

          <p className="text-[#d1c5b4] text-[15px]" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
            {cap.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5">
            {cap.tags.map((tag) => (
              <span key={tag} className="tag-pill bg-[rgba(24,30,54,0.6)] text-[#dce1ff] border border-[rgba(78,70,57,0.4)]">
                {tag}
              </span>
            ))}
          </div>

          {/* Impact Box */}
          <div className="p-5 rounded-xl flex items-center gap-4 transition-all duration-300 group-hover:bg-[rgba(24,30,54,0.5)]"
            style={{ background: "rgba(11,18,41,0.6)", border: "1px solid rgba(78,70,57,0.3)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${cap.impactGold ? "icon-badge-gold" : "icon-badge-cyan"}`}>
              <span aria-hidden="true" style={{ fontSize: "20px" }}>★</span>
            </div>
            <div>
              <span className="font-bold text-[11px] block mb-1 uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-space-grotesk)", color: cap.impactGold ? "#eac078" : "#5bdfff" }}>
                Quantified Business Impact:
              </span>
              <p className="text-[#dce1ff] text-sm" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.6 }}>
                {cap.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Terminal Preview Block */}
        <div className={`lg:col-span-6 relative z-10 ${cap.reversed ? "order-2 lg:order-1" : ""}`}>
          <div className="w-full rounded-xl p-6 shadow-2xl relative overflow-hidden group/terminal"
            style={{
              background: "rgba(6,13,36,0.85)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${cap.preview.isCyan ? "rgba(61,220,255,0.25)" : "rgba(201,162,93,0.3)"}`,
              boxShadow: `0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 mb-4" style={{ borderBottom: "1px solid rgba(78,70,57,0.3)" }}>
              <span className="flex items-center gap-2 eyebrow" style={{ color: cap.preview.isCyan ? "#5bdfff" : "#eac078" }}>
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: cap.preview.isCyan ? "#5bdfff" : "#eac078", boxShadow: `0 0 8px ${cap.preview.isCyan ? "#5bdfff" : "#eac078"}` }} aria-hidden="true" />
                {cap.preview.title}
              </span>
              <span className="eyebrow text-[#9a8f80]">OPERATIONAL</span>
            </div>

            {/* Terminal Logs */}
            <div className="flex flex-col gap-3.5" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "13px" }}>
              {cap.preview.lines.map((line, i) => (
                <div key={i} className="flex items-start justify-between gap-4 text-[#d1c5b4]">
                  <span className="flex-1 leading-relaxed">
                    {line.time && <span className="text-[#9a8f80] mr-2">[{line.time}]</span>}
                    {line.text}
                  </span>
                  <span className="shrink-0 font-bold" style={{ color: line.isCyan ? "#5bdfff" : "#eac078", textShadow: `0 0 10px ${line.isCyan ? "rgba(61,220,255,0.4)" : "rgba(201,162,93,0.4)"}` }}>
                    {line.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-5 mt-4" style={{ borderTop: "1px solid rgba(78,70,57,0.3)" }}>
              <div className="flex justify-between eyebrow text-[#9a8f80] pb-2">
                <span>PROCESSING EFFICIENCY</span>
                <span className="text-[#eac078] font-bold">98.5%</span>
              </div>
              <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "rgba(34,41,65,0.8)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)" }}>
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: "linear-gradient(90deg, #C9A25D, #3DDCFF)", boxShadow: "0 0 10px rgba(61,220,255,0.5)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "98.5%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                >
                  <div className="absolute inset-0 opacity-50" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)", animation: "shimmerSweep 2s infinite" }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative section-pad py-24 overflow-hidden" aria-labelledby="capabilities-heading">
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 600, height: 600, top: "30%", right: "-10%", opacity: 0.35 }} aria-hidden="true" />
      <div className="orb orb-cyan" style={{ width: 500, height: 500, bottom: "10%", left: "-15%", opacity: 0.3 }} aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 justify-center md:justify-start">
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #eac078)" }} aria-hidden="true" />
            <span className="eyebrow text-[#eac078]">Our Capabilities</span>
            <span className="w-8 h-px md:hidden" style={{ background: "linear-gradient(90deg, #eac078, transparent)" }} aria-hidden="true" />
          </motion.div>
          
          <motion.h2 id="capabilities-heading"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' as const }}
            className="section-title">
            Featured Automation <span className="text-gold-shimmer">Cases</span>
          </motion.h2>
          
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#d1c5b4] text-base" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
            Real problems analyzed, re-architected, and resolved through QIAO TECH intelligent software.
          </motion.p>
        </div>

        {/* Cases */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {capabilities.map((cap) => <CapabilityCard key={cap.title} cap={cap} />)}
        </div>
      </div>
    </section>
  );
}
