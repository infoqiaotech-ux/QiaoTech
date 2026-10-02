import type { Metadata } from "next";
import { Sora, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qiaotech.in"),
  title: {
    default: "QIAO TECH – Clever AI. Smart Automation.",
    template: "%s | QIAO TECH",
  },
  description:
    "QIAO TECH is an AI automation and software development company based in Pune, India. We build intelligent systems, web apps, ERP, OCR/ICR, and digital solutions. Your Requirement. Our Technology. One Smart Solution.",
  keywords: [
    "AI automation",
    "software development",
    "ERP systems",
    "OCR",
    "web apps",
    "Pune",
    "India",
    "QIAO TECH",
    "intelligent automation",
  ],
  authors: [{ name: "QIAO TECH" }],
  creator: "QIAO TECH",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://qiaotech.in",
    siteName: "QIAO TECH",
    title: "QIAO TECH – Clever AI. Smart Automation.",
    description:
      "AI Automation, Web Apps, ERP, OCR/ICR, Digital Design — engineered for Pune & beyond. Your Requirement. Our Technology. One Smart Solution.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QIAO TECH – Clever AI. Smart Automation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QIAO TECH – Clever AI. Smart Automation.",
    description:
      "AI Automation & Software Development — Pune, India",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.jpg", type: "image/jpeg", sizes: "512x512" },
    ],
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sora.variable} ${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased min-h-screen overflow-x-hidden" style={{ background: "#0A1128", color: "#dce1ff", fontFamily: "var(--font-manrope, sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
