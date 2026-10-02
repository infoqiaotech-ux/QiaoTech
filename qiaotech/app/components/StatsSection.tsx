"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  color: "gold" | "cyan";
}

const stats: StatProps[] = [
  { value: 150, suffix: "+", label: "Projects Delivered", sub: "Production-grade AI & Software", color: "gold" },
  { value: 85,  suffix: "+", label: "Happy Clients",      sub: "Global & Pan-India Enterprises", color: "cyan" },
  { value: 8,   suffix: "+", label: "Years of Innovation",sub: "AI & Automation Mastery",        color: "gold" },
  { value: 25,  suffix: "+", label: "Technologies Mastered", sub: "End-to-End Stack",            color: "cyan" },
];

function Counter({ end, suffix, color }: { end: number; suffix: string; color: "gold" | "cyan" }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref} className={`stat-counter ${color === "gold" ? "text-gold-gradient" : "text-[#5bdfff]"}`}
      style={{
        fontFamily: "var(--font-sora)",
        fontSize: "clamp(38px,4vw,60px)",
        fontWeight: 700,
        filter: `drop-shadow(0 0 16px ${color === "gold" ? "rgba(201,162,93,0.3)" : "rgba(61,220,255,0.3)"})`
      }}>
      {count}{suffix}
    </span>
  );
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = { hidden: { opacity: 0, y: 24, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' as const } } };

export default function StatsSection() {
  return (
    <section id="stats" className="relative z-20 section-pad -mt-10 mb-16" aria-label="Company statistics">
      <div className="max-w-site mx-auto border-glow-gold rounded-2xl p-[1px]">
        {/* Glass container */}
        <div className="rounded-2xl py-8 px-6 relative overflow-hidden"
          style={{
            background: "rgba(11,18,41,0.65)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.5)",
          }}>
          
          {/* Subtle background gradient sweep */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,162,93,0.1) 20%, rgba(61,220,255,0.1) 80%, transparent)",
              animation: "shimmerSweep 8s linear infinite"
            }}
          />

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 relative z-10">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={itemVariants}
                className="flex flex-col items-center md:items-start px-2 lg:px-6 relative group"
                style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(201,162,93,0.15)" : "none" }}>
                
                <Counter end={stat.value} suffix={stat.suffix} color={stat.color} />
                
                <span className="font-bold mt-2 text-[#dce1ff] transition-colors group-hover:text-[#eac078]"
                  style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "15px", letterSpacing: "0.06em" }}>
                  {stat.label}
                </span>
                <span className="eyebrow text-[#9a8f80] mt-1 text-center md:text-left">{stat.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
