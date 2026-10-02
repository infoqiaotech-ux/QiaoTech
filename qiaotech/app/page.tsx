import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import ProjectsSection from "./components/ProjectsSection";
import WhyUsSection from "./components/WhyUsSection";
import ProcessSection from "./components/ProcessSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "QIAO TECH – Clever AI. Smart Automation. | Pune, India",
  description:
    "From Business Problems to Smart Digital Solutions. QIAO TECH delivers AI automation, web apps, ERP systems, OCR/ICR, and branding — engineered in Pune, India.",
};

export default function HomePage() {
  return (
    <>
      {/* Fixed ambient background glow — rendered once for entire page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-secondary/4 rounded-full blur-[200px]" />
        <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[150px]" />
      </div>

      <Navbar />

      <main id="main-content" className="relative z-10 w-full">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <WhyUsSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
