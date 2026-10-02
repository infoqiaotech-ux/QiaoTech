"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

// ─── Zod Schema ────────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(20, "Describe your requirement in at least 20 characters"),
});
type FormData = z.infer<typeof formSchema>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

const projectTypes = [
  { value: "", label: "Select project type..." },
  { value: "ai-automation", label: "AI Automation & Intelligent Workflows" },
  { value: "web-app", label: "Custom Web Application" },
  { value: "erp", label: "ERP & Inventory Systems" },
  { value: "ocr", label: "AI OCR / Document Data Extraction" },
  { value: "website", label: "Modern Business Website & Portal" },
  { value: "branding", label: "Corporate Identity & Branding" },
  { value: "other", label: "Other / Not Listed" },
];

const labelStyle = {
  fontFamily: "var(--font-space-grotesk)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#9a8f80",
  textTransform: "uppercase" as const,
};

export default function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () => {
    setStatus("loading");
    try {
      // ── Activate by wiring /api/contact with Resend or Nodemailer ──────────
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // ────────────────────────────────────────────────────────────────────────
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative section-pad py-24 overflow-hidden" aria-labelledby="contact-heading">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[80%] h-[400px] rounded-[100%] blur-[120px] opacity-20"
          style={{ background: "radial-gradient(ellipse at center, rgba(61,220,255,0.4) 0%, rgba(201,162,93,0.3) 50%, transparent 70%)" }} aria-hidden="true" />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* ─── Form Column ─────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="lg:col-span-7 glass rounded-2xl shadow-2xl flex flex-col gap-8 p-8 md:p-10 relative overflow-hidden group"
        >
          {/* Internal Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: "radial-gradient(circle at top left, rgba(61,220,255,0.08), transparent 60%)" }} aria-hidden="true" />

          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[#5bdfff] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5bdfff] animate-pulse" /> Dispatch Requirement
            </span>
            <h2 id="contact-heading" className="section-title">
              Let&apos;s Build Your <span className="text-gradient-anim">Smart Solution</span>
            </h2>
            <p className="text-[#d1c5b4] text-base" style={{ fontFamily: "var(--font-manrope)", lineHeight: 1.8 }}>
              Tell us what manual bottleneck you want solved. Our engineering team responds within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 relative z-10" aria-label="Contact form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" style={labelStyle} className="ml-1">Your Name</label>
                <input id="contact-name" type="text" placeholder="e.g. Vikramaditya Deshmukh" autoComplete="name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`form-input ${errors.name ? "!border-red-400 !shadow-[0_0_10px_rgba(248,113,113,0.3)]" : ""}`}
                  {...register("name")} />
                {errors.name && <span id="name-error" className="text-xs text-red-400 ml-1" role="alert">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" style={labelStyle} className="ml-1">Business Email</label>
                <input id="contact-email" type="email" placeholder="name@company.com" autoComplete="email"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`form-input ${errors.email ? "!border-red-400 !shadow-[0_0_10px_rgba(248,113,113,0.3)]" : ""}`}
                  {...register("email")} />
                {errors.email && <span id="email-error" className="text-xs text-red-400 ml-1" role="alert">{errors.email.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="project-type" style={labelStyle} className="ml-1">Project Domain</label>
              <select id="project-type" aria-describedby={errors.projectType ? "project-error" : undefined}
                className={`form-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239a8f80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-no-repeat bg-[position:right_1rem_center] pr-10 ${errors.projectType ? "!border-red-400 !shadow-[0_0_10px_rgba(248,113,113,0.3)]" : ""}`}
                {...register("projectType")}>
                {projectTypes.map((opt) => <option key={opt.value} value={opt.value} className="bg-[#0A1128]">{opt.label}</option>)}
              </select>
              {errors.projectType && <span id="project-error" className="text-xs text-red-400 ml-1" role="alert">{errors.projectType.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" style={labelStyle} className="ml-1">Describe Your Requirement / Process Problem</label>
              <textarea id="contact-message" rows={5} placeholder="Outline your current manual workflow or desired software specification..."
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`form-input resize-y min-h-[140px] ${errors.message ? "!border-red-400 !shadow-[0_0_10px_rgba(248,113,113,0.3)]" : ""}`}
                {...register("message")} />
              {errors.message && <span id="message-error" className="text-xs text-red-400 ml-1" role="alert">{errors.message.message}</span>}
            </div>

            <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto self-start mt-2"
              style={{ opacity: status === "loading" ? 0.65 : 1 }} aria-busy={status === "loading"}>
              {status === "loading" ? (
                <><span className="w-4 h-4 rounded-full border-2 border-[#0A1128] border-t-transparent animate-spin" aria-hidden="true" />Transmitting...</>
              ) : (
                <>Send Requirement<Send size={16} aria-hidden="true" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
          </form>

          {/* Status Messages */}
          <div className="absolute top-8 right-8 z-50">
            <AnimatePresence>
              {status === "success" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-4 rounded-xl glass shadow-2xl" style={{ border: "1px solid rgba(234,192,120,0.5)", color: "#eac078", backdropFilter: "blur(20px)" }} role="status" aria-live="polite">
                  <CheckCircle size={20} aria-hidden="true" />
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-manrope)" }}>Requirement transmitted! Our team will connect soon.</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-4 rounded-xl glass shadow-2xl" style={{ border: "1px solid rgba(255,100,100,0.5)", color: "#ffb4ab", backdropFilter: "blur(20px)" }} role="alert" aria-live="assertive">
                  <AlertCircle size={20} aria-hidden="true" />
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-manrope)" }}>Submission failed. Please try again or call us.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── Contact Info Column ──────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.15 }}
          className="lg:col-span-5 glass rounded-2xl shadow-2xl flex flex-col justify-between gap-8 p-8 md:p-10 border-glow-gold relative group"
        >
          {/* Internal Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(circle at top right, rgba(201,162,93,0.1), transparent 60%)" }} aria-hidden="true" />
          
          {/* Company Header */}
          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex items-center gap-5 pb-6" style={{ borderBottom: "1px solid rgba(201,162,93,0.15)" }}>
              <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500"
                style={{ boxShadow: "0 0 0 2px rgba(201,162,93,0.7), 0 0 30px rgba(201,162,93,0.3)", background: "transparent" }}>
                <Image src="/qiaotech_logo_final.png" alt="QIAO TECH Crest" fill sizes="72px" className="object-contain" quality={100} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#dce1ff]" style={{ fontFamily: "var(--font-sora)", fontSize: "24px" }}>
                  QIAO <span className="text-gold-gradient">TECH</span>
                </span>
                <span className="eyebrow text-[#5bdfff]">Clever AI. Smart Automation.</span>
              </div>
            </div>

            {/* Representative */}
            <div className="flex flex-col gap-1.5 p-5 rounded-xl transition-colors duration-300 group-hover:bg-[rgba(24,30,54,0.6)]"
              style={{ background: "rgba(11,18,41,0.6)", border: "1px solid rgba(201,162,93,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
              <span className="eyebrow text-[#eac078] tracking-widest">Official Liaison · Inquiries</span>
              <span className="font-bold text-[#dce1ff]" style={{ fontFamily: "var(--font-sora)", fontSize: "22px" }}>Mr. Somnath Swami</span>
              <span className="text-sm font-semibold text-[#5bdfff]" style={{ fontFamily: "var(--font-manrope)" }}>Marketing Manager</span>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 icon-badge-gold">
                  <Phone size={18} aria-hidden="true" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="font-semibold text-[#dce1ff] text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>Direct Phone Hotline</span>
                  <a href="tel:+919767067561" className="text-[#5bdfff] text-[15px] hover:underline transition-colors mt-0.5 font-medium"
                    style={{ fontFamily: "var(--font-manrope)" }} aria-label="Call QIAO TECH at +91 97670 67561">
                    +91 97670 67561
                  </a>
                  <a href="mailto:info@qiaotech.in" className="text-[#9a8f80] text-[13px] hover:text-[#eac078] transition-colors mt-0.5"
                    style={{ fontFamily: "var(--font-manrope)" }} aria-label="Email QIAO TECH">
                    info@qiaotech.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 icon-badge-gold">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="font-semibold text-[#dce1ff] text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>Innovation Center & HQ</span>
                  <address className="text-[13px] text-[#d1c5b4] leading-relaxed not-italic mt-1" style={{ fontFamily: "var(--font-manrope)" }}>
                    S No 38/6/17 Part, Yeshwant Nagar,<br />
                    Near Prakash Pathare,<br />
                    Pune – 411014, Maharashtra, India.
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Motto */}
          <div className="p-5 rounded-xl text-center relative z-10" style={{ background: "linear-gradient(135deg, rgba(201,162,93,0.1), rgba(11,18,41,0.6))", border: "1px solid rgba(201,162,93,0.25)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
            <span className="eyebrow text-[#9a8f80] block mb-2 opacity-80">Sovereign Core Motto</span>
            <p className="italic font-bold text-gold-gradient" style={{ fontFamily: "var(--font-sora)", fontSize: "16px", lineHeight: 1.6 }}>
              &quot;Your Requirement. Our Technology. One Smart Solution.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
