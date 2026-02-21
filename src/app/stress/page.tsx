"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, staggerItem } from "@/components/ui/page-wrapper";
import { StressInput } from "@/components/stress/stress-input";
import { StressResult } from "@/components/stress/stress-result";
import { stressTest } from "@/lib/mock-ai";
import { useRateLimit } from "@/lib/rate-limit";
import type { StressTestResult } from "@/lib/types";

export default function StressPage() {
  const [argument, setArgument] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StressTestResult | null>(null);
  const { check: rateCheck } = useRateLimit();

  const handleSubmit = async () => {
    if (!argument.trim() || !rateCheck()) return;
    setLoading(true);
    setResult(null);
    const data = await stressTest(argument);
    setResult(data);
    setLoading(false);
  };

  return (
    <PageWrapper>
      <motion.div variants={staggerItem}>
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Stress Test
        </h1>
        <p className="text-stone-500 mb-8">
          Submit an argument and we&apos;ll examine it from multiple angles — the
          strongest version, a thoughtful challenge, and potential weak spots.
        </p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <StressInput
          value={argument}
          onChange={setArgument}
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
          Stress testing from multiple angles...
        </motion.div>
      )}

      {result && (
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <StressResult result={result} />
        </motion.div>
      )}
    </PageWrapper>
  );
}
