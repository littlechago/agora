"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, staggerItem } from "@/components/ui/page-wrapper";
import { ClaimInput } from "@/components/check/claim-input";
import { ClaimResult } from "@/components/check/claim-result";
import { analyzeClaim } from "@/lib/mock-ai";
import { useRateLimit } from "@/lib/rate-limit";
import type { ClaimAnalysis } from "@/lib/types";

export default function CheckPage() {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClaimAnalysis | null>(null);
  const { check: rateCheck } = useRateLimit();

  const handleSubmit = async () => {
    if (!claim.trim() || !rateCheck()) return;
    setLoading(true);
    setResult(null);
    const data = await analyzeClaim(claim);
    setResult(data);
    setLoading(false);
  };

  return (
    <PageWrapper>
      <motion.div variants={staggerItem}>
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Check a Claim
        </h1>
        <p className="text-stone-500 mb-8">
          Paste a claim below and let&apos;s think about it together. We&apos;ll explore what
          kind of statement it is and what questions it raises.
        </p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <ClaimInput
          value={claim}
          onChange={setClaim}
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
          Thinking carefully...
        </motion.div>
      )}

      {result && (
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <ClaimResult result={result} />
        </motion.div>
      )}
    </PageWrapper>
  );
}
