"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: "01", title: "AI OCR Engine",
    desc: "Neural optical character recognition system capable of extracting structured data from vendor invoices, handwritten challan forms, and scanned documents at 99.4% accuracy.",
    tags: ["Python", "Computer Vision", "Deep Learning", "Table Parsing"],
    tagGold: [true, false, false, false],
    goldPrimary: true,
  },
  {
    id: "02", title: "Stock ERP System",
    desc: "Full-stack enterprise resource planning platform with real-time inventory tracking, purchase order lifecycle management, and integrated GRN scanning.",
    tags: ["Full Stack Web", "PostgreSQL", "React", "FastAPI"],
    tagGold: [false, true, true, false],
    goldPrimary: false,
  },
  {
    id: "03", title: "Data Dashboards",
    desc: "Interactive business intelligence dashboards with live KPI feeds, custom chart libraries, and role-based access control for enterprise decision-makers.",
    tags: ["UI/UX Design", "React", "Data Viz", "REST APIs"],
    tagGold: [true, false, true, false],
    goldPrimary: true,
  },
  {
    id: "04", title: "Workflow Automation",
    desc: "End-to-end automated business workflows connecting email, Excel, ERP, and messaging platforms through intelligent trigger-based Python pipelines.",
    tags: ["Integrations", "Python", "IMAP", "WhatsApp API"],
    tagGold: [false, true, false, false],
    goldPrimary: false,
  },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' as const } } };

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const gold = project.goldPrimary;

  return (
    <motion.div variants={cardVariants} style={{ perspective: 1000 }}>
      <motion.article
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative group rounded-2xl p-8 flex flex-col gap-5 overflow-hidden border-glow-gold cursor-pointer h-full"
        data-css-variant={gold ? "glass-gold" : "glass-cyan"}
        aria-label={`Project: ${project.title}`}
        
      >
        {/* Glass base */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
          background: "rgba(11,18,41,0.55)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: `1px solid ${gold ? "rgba(201,162,93,0.2)" : "rgba(61,220,255,0.15)"}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
          zIndex: 0,
        }} />

        {/* Hover internal glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{ background: `radial-gradient(circle at top right, ${gold ? "rgba(201,162,93,0.12)" : "rgba(61,220,255,0.1)"}, transparent 60%)` }}
          aria-hidden="true" />

        <div className="relative z-10 flex flex-col gap-4 h-full">
          <div className="flex items-start justify-between">
            <span className="eyebrow text-[#9a8f80] group-hover:text-[#d1c5b4] transition-colors">PROJECT {project.id}</span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${gold ? "group-hover:bg-[rgba(201,162,93,0.15)] group-hover:text-[#eac078] group-hover:shadow-[0_0_15px_rgba(201,162,93,0.3)]" : "group-hover:bg-[rgba(61,220,255,0.15)] group-hover:text-[#5bdfff] group-hover:shadow-[0_0_15px_rgba(61,220,255,0.3)]"}`}
              style={{ background: "rgba(34,41,65,0.8)", color: "#9a8f80", border: "1px solid rgba(78,70,57,0.3)" }}>
              <ExternalLink size={16} aria-hidden="true" className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          
          <h3 className="font-bold text-[#dce1ff] transition-colors duration-300"
            style={{ fontFamily: "var(--font-sora)", fontSize: "22px", letterSpacing: "-0.01em" }}>
            {project.title}
          </h3>
          
          <p className="text-[#d1c5b4] text-sm leading-relaxed flex-1" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
            {project.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-3">
            {project.tags.map((tag, i) => (
              <span key={tag} className="tag-pill"
                style={{
                  color: project.tagGold[i] ? "#eac078" : "#5bdfff",
                  background: "rgba(24,30,54,0.8)",
                  borderColor: project.tagGold[i] ? "rgba(201,162,93,0.3)" : "rgba(61,220,255,0.25)"
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom border glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${gold ? "#eac078" : "#5bdfff"}, transparent)` }} aria-hidden="true" />
      </motion.article>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative section-pad py-24 overflow-hidden" aria-labelledby="projects-heading">
      {/* Background orbs */}
      <div className="orb orb-cyan" style={{ width: 600, height: 600, top: "10%", left: "-15%", opacity: 0.3 }} aria-hidden="true" />
      <div className="orb orb-gold" style={{ width: 400, height: 400, bottom: "-10%", right: "-5%", opacity: 0.4 }} aria-hidden="true" />

      <div className="max-w-site mx-auto flex flex-col gap-14 relative z-10">
        <div className="flex flex-col gap-3 max-w-2xl mx-auto text-center items-center">
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #5bdfff)" }} aria-hidden="true" />
            <span className="eyebrow text-[#5bdfff]">Project Showcase</span>
            <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, #5bdfff, transparent)" }} aria-hidden="true" />
          </motion.div>
          
          <motion.h2 id="projects-heading"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' as const }}
            className="section-title text-center">
            Our Work Speaks for <span className="text-gold-gradient">Itself</span>
          </motion.h2>
          
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#d1c5b4] text-base" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
            Real-world solutions delivered across industries — AI, automation, ERP, and digital design.
          </motion.p>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </motion.div>
      </div>
    </section>
  );
}
