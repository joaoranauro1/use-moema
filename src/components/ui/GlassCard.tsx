"use client";

import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}

export function GlassCard({
  children,
  className = "",
  strong = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`rounded-2xl ${strong ? "glass-strong" : "glass"} p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
