"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile">
      <div className="text-center flex flex-col items-center gap-lg max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[120px] font-display font-bold text-gold-gradient leading-none select-none"
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-sm"
        >
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
            Signal Lost
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            This route doesn&apos;t exist in our system. Return to base and navigate to an existing page.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link href="/" className="btn-primary">
            Return to Home Base
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
