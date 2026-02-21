"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ConfidenceMeter } from "@/components/ui/confidence-meter";
import { SourceCheck } from "@/components/check/source-check";
import type { ClaimAnalysis } from "@/lib/types";
import { Tag, HelpCircle, Lightbulb } from "lucide-react";

const claimTypeColors: Record<string, string> = {
  empirical: "bg-blue-100 text-blue-700",
  value: "bg-purple-100 text-purple-700",
  definitional: "bg-teal-100 text-teal-700",
  causal: "bg-orange-100 text-orange-700",
  predictive: "bg-indigo-100 text-indigo-700",
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface ClaimResultProps {
  result: ClaimAnalysis;
}

export function ClaimResult({ result }: ClaimResultProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <motion.div variants={fadeUp}>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-stone-400" />
              <span className="text-sm font-medium text-stone-600">Claim type</span>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${claimTypeColors[result.claimType]}`}
              >
                {result.claimType}
              </span>
            </div>
            <p className="text-sm text-stone-600">{result.claimTypeExplanation}</p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-stone-600">
                Questions to consider
              </span>
            </div>
            <ul className="space-y-2">
              {result.justificationPrompts.map((prompt, i) => (
                <li
                  key={i}
                  className="text-sm text-stone-600 pl-4 relative before:content-['\u2022'] before:absolute before:left-0 before:text-amber-400"
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-stone-600">
                Hidden assumptions
              </span>
            </div>
            <ul className="space-y-2">
              {result.assumptions.map((assumption, i) => (
                <li
                  key={i}
                  className="text-sm text-stone-600 pl-4 relative before:content-['\u2022'] before:absolute before:left-0 before:text-emerald-400"
                >
                  {assumption}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <ConfidenceMeter
            score={result.confidenceScore}
            label="Evaluability score"
          />
          <p className="text-sm text-stone-500 mt-2">{result.confidenceExplanation}</p>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <SourceCheck />
      </motion.div>
    </motion.div>
  );
}
