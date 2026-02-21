"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ConfidenceMeter } from "@/components/ui/confidence-meter";
import { LearnMore } from "@/components/ui/learn-more";
import type { ArgumentAnalysis } from "@/lib/types";
import { BarChart3, Lightbulb, Sparkles, GitBranch } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface ArgumentResultProps {
  result: ArgumentAnalysis;
}

export function ArgumentResult({ result }: ArgumentResultProps) {
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
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-stone-600">Clarity assessment</span>
            </div>
            <ConfidenceMeter score={result.clarityScore} label="Clarity score" />
            <p className="text-sm text-stone-600">{result.clarityFeedback}</p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-stone-400" />
              <span className="text-sm font-medium text-stone-600">Logical structure</span>
            </div>
            <p className="text-sm text-stone-600">{result.logicalStructure}</p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-stone-600">
                Possible missing premises
              </span>
            </div>
            <ul className="space-y-2">
              {result.missingPremises.map((premise, i) => (
                <li
                  key={i}
                  className="text-sm text-stone-600 pl-4 relative before:content-['\u2022'] before:absolute before:left-0 before:text-amber-400"
                >
                  {premise}
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
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-medium text-stone-600">
                Stronger version
              </span>
            </div>
            <p className="text-sm text-stone-600 italic leading-relaxed">
              &ldquo;{result.strongerVersion}&rdquo;
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <LearnMore title="Why does structure matter?">
          <p>
            A well-structured argument makes its reasoning transparent. When your
            premises clearly connect to your conclusion, others can engage with your
            thinking more meaningfully — whether they agree or not.
          </p>
        </LearnMore>
      </motion.div>
    </motion.div>
  );
}
