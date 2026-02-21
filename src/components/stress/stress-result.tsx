"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LearnMore } from "@/components/ui/learn-more";
import type { StressTestResult } from "@/lib/types";
import { ThumbsUp, Swords, AlertTriangle, ArrowRight } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface StressResultProps {
  result: StressTestResult;
}

export function StressResult({ result }: StressResultProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <motion.div variants={fadeUp}>
        <Card className="border-l-4 border-l-emerald-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-stone-600">
                Steelman version
              </span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              {result.steelman}
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="border-l-4 border-l-amber-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-stone-600">
                Counterargument
              </span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              {result.counterargument}
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-stone-600">
                Vulnerabilities
              </span>
            </div>
            {result.vulnerabilities.map((v, i) => (
              <div key={i} className="bg-stone-50 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-stone-700">{v.issue}</p>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-amber-500 mt-1 shrink-0" />
                  <p className="text-sm text-stone-500">{v.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <LearnMore title="What is a steelman?">
          <p>
            A steelman is the opposite of a strawman. Instead of weakening an
            argument to attack it, steelmanning means presenting the strongest
            possible version. This is a key skill in charitable, productive
            disagreement.
          </p>
        </LearnMore>
      </motion.div>
    </motion.div>
  );
}
