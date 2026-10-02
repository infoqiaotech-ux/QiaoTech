"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, MessageCircle, GitBranch, Share2 } from "lucide-react";

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#contact", label: "Contact" },
];

const services = [
  "AI Automation",
  "Web Applications",
  "ERP Systems",
  "OCR / ICR",
  "Modern Websites",
  "Branding Systems",
];

const social = [
  { icon: Globe, href: "https://qiaotech.in", label: "Website" },
  { icon: MessageCircle, href: "https://wa.me/919767067561", label: "WhatsApp" },
  { icon: GitBranch, href: "https://github.com", label: "GitHub" },
  { icon: Share2, href: "https://linkedin.com", label: "LinkedIn" },
];

const techTags = [
  "Neural Networks", "Autonomous Agents", "Vision Systems", "Edge Cognition", "Hyper-Compute",
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-20 pb-10 overflow-hidden" aria-label="Site footer">
      {/* Top glowing border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-30" style={{ background: "linear-gradient(90deg, transparent, #eac078, #5bdfff, transparent)" }} aria-hidden="true" />
      
      {/* Background with slight radial glow */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at top, rgba(11,18,41,0.8) 0%, rgba(6,13,36,1) 100%)" }} />

      <div className="max-w-site mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/#hero" className="flex items-center gap-4 group w-fit" aria-label="QIAO TECH home">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500"
                style={{ boxShadow: "0 0 0 2px rgba(201,162,93,0.5), 0 0 20px rgba(201,162,93,0.3)", background: "transparent" }}>
                <Image src="/qiaotech_logo_final.png" alt="QIAO TECH Logo" fill sizes="48px" className="object-contain" quality={100} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-[#dce1ff] transition-colors"
                  style={{ fontFamily: "var(--font-sora)", fontSize: "20px" }}>
                  QIAO <span className="text-gold-gradient">TECH</span>
                </span>
                <span className="eyebrow text-[#9a8f80] group-hover:text-[#5bdfff] transition-colors">Clever AI. Smart Automation.</span>
              </div>
            </Link>

            <p className="text-[#d1c5b4] text-[14px] max-w-xs leading-relaxed mt-2" style={{ fontFamily: "var(--font-manrope)" }}>
              Your Requirement. Our Technology. One Smart Solution. — Pune, India.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {social.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`QIAO TECH on ${label}`}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#9a8f80] hover:text-[#5bdfff] hover:bg-[rgba(61,220,255,0.1)] transition-all duration-300"
                  style={{ border: "1px solid rgba(78,70,57,0.3)" }}>
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="eyebrow text-[#eac078] tracking-[0.1em]">Navigation</span>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-[#d1c5b4] hover:text-[#5bdfff] transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="eyebrow text-[#eac078] tracking-[0.1em]">Services</span>
            <ul className="flex flex-col gap-3" role="list">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/#services" className="text-[14px] text-[#d1c5b4] hover:text-[#5bdfff] transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence Stack & Contact Quick Info */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
               <span className="eyebrow text-[#eac078] tracking-[0.1em]">Intelligence Stack</span>
               <div className="flex flex-wrap gap-2">
                 {techTags.map((tag) => (
                   <span key={tag} className="px-2 py-1 text-[11px] font-semibold tracking-wider rounded uppercase"
                     style={{ fontFamily: "var(--font-space-grotesk)", background: "rgba(34,41,65,0.6)", color: "#9a8f80", border: "1px solid rgba(78,70,57,0.3)" }}>
                     {tag}
                   </span>
                 ))}
               </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="eyebrow text-[#9a8f80] mb-1">Quick Contact</span>
              <a href="tel:+919767067561" className="text-[14px] text-[#5bdfff] hover:underline transition-colors flex items-center gap-2"
                style={{ fontFamily: "var(--font-manrope)" }} aria-label="Call QIAO TECH">
                <span aria-hidden="true" className="text-[16px]">📞</span> +91 97670 67561
              </a>
              <a href="mailto:info@qiaotech.in" className="text-[14px] text-[#dce1ff] hover:text-[#eac078] transition-colors flex items-center gap-2"
                style={{ fontFamily: "var(--font-manrope)" }} aria-label="Email QIAO TECH">
                <span aria-hidden="true" className="text-[16px]">✉</span> info@qiaotech.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#9a8f80]" style={{ borderTop: "1px solid rgba(78,70,57,0.3)" }}>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-[13px]" style={{ fontFamily: "var(--font-manrope)" }}>
              © {new Date().getFullYear()} QIAO TECH. All rights reserved.
            </span>
            <span className="hidden md:inline text-[13px] text-[#4e4639]">·</span>
            <span className="text-[13px] italic" style={{ fontFamily: "var(--font-manrope)" }}>
              Clever AI. Smart Automation. — Pune, India.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[13px]" style={{ fontFamily: "var(--font-manrope)" }}>
            <a href="#" className="hover:text-[#eac078] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#eac078] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#eac078] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
