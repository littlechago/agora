"use client";

import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  score: number;
  label?: string;
}

function getColor(score: number): string {
  if (score >= 70) return "from-emerald-400 to-emerald-500";
  if (score >= 40) return "from-amber-400 to-amber-500";
  return "from-rose-400 to-rose-500";
}

function getTextColor(score: number): string {
  if (score >= 70) return "text-emerald-700";
  if (score >= 40) return "text-amber-700";
  return "text-rose-700";
}

export function ConfidenceMeter({ score, label = "Clarity score" }: ConfidenceMeterProps) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-600">{label}</span>
        <motion.span
          className={`text-lg font-semibold ${getTextColor(clamped)}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {clamped}/100
        </motion.span>
      </div>
      <div className="h-3 rounded-full bg-stone-100 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getColor(clamped)}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1, ease: "easeOut" as const, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
