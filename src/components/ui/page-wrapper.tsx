"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`max-w-3xl mx-auto px-4 py-12 ${className}`}
    >
      {children}
    </motion.div>
  );
}
