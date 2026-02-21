"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, staggerItem } from "@/components/ui/page-wrapper";
import { ArgumentBuilder } from "@/components/build/argument-builder";
import { ArgumentResult } from "@/components/build/argument-result";
import { analyzeArgument } from "@/lib/mock-ai";
import { useRateLimit } from "@/lib/rate-limit";
import type { ArgumentAnalysis } from "@/lib/types";

export default function BuildPage() {
  const [conclusion, setConclusion] = useState("");
  const [premises, setPremises] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArgumentAnalysis | null>(null);
  const { check: rateCheck } = useRateLimit();

  const handleSubmit = async () => {
    if (!conclusion.trim() || !rateCheck()) return;
    setLoading(true);
    setResult(null);
    const data = await analyzeArgument(conclusion, premises);
    setResult(data);
    setLoading(false);
  };

  return (
    <PageWrapper>
      <motion.div variants={staggerItem}>
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Build an Argument
        </h1>
        <p className="text-stone-500 mb-8">
          Structure your thinking step by step. Start with your conclusion, then add
          the reasons that support it. We&apos;ll help you see how it all fits together.
        </p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <ArgumentBuilder
          conclusion={conclusion}
          onConclusionChange={setConclusion}
          premises={premises}
          onPremisesChange={setPremises}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-sm text-stone-400"
        >
          Examining your reasoning...
        </motion.div>
      )}

      {result && (
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <ArgumentResult result={result} />
        </motion.div>
      )}
    </PageWrapper>
  );
}
