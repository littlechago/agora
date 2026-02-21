"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Hammer, ShieldQuestion } from "lucide-react";
import { ClaimResult } from "@/components/check/claim-result";
import { ArgumentResult } from "@/components/build/argument-result";
import { StressResult } from "@/components/stress/stress-result";
import { analyzeClaim, analyzeArgument, stressTest } from "@/lib/mock-ai";
import { useRateLimit } from "@/lib/rate-limit";
import type {
  ClaimAnalysis,
  ArgumentAnalysis,
  StressTestResult,
} from "@/lib/types";

type Tool = "check" | "build" | "stress";

const tools: { id: Tool; label: string; icon: typeof Search }[] = [
  { id: "check", label: "Check a Claim", icon: Search },
  { id: "build", label: "Build an Argument", icon: Hammer },
  { id: "stress", label: "Stress Test", icon: ShieldQuestion },
];

interface LiveResultsProps {
  transcript: string;
}

export function LiveResults({ transcript }: LiveResultsProps) {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(false);
  const [claimResult, setClaimResult] = useState<ClaimAnalysis | null>(null);
  const [argumentResult, setArgumentResult] =
    useState<ArgumentAnalysis | null>(null);
  const [stressResult, setStressResult] = useState<StressTestResult | null>(
    null
  );
  const { check: rateCheck } = useRateLimit();

  const handleTool = async (tool: Tool) => {
    if (!rateCheck()) return;

    setActiveTool(tool);
    setLoading(true);
    setClaimResult(null);
    setArgumentResult(null);
    setStressResult(null);

    switch (tool) {
      case "check": {
        const result = await analyzeClaim(transcript);
        setClaimResult(result);
        break;
      }
      case "build": {
        const sentences = transcript
          .split(/[.!?]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        const conclusion = sentences[0] || transcript;
        const premises = sentences.length > 1 ? sentences.slice(1) : [transcript];
        const result = await analyzeArgument(conclusion, premises);
        setArgumentResult(result);
        break;
      }
      case "stress": {
        const result = await stressTest(transcript);
        setStressResult(result);
        break;
      }
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-stone-600 mb-3">
          Choose an analysis tool
        </p>
        <div className="flex flex-wrap gap-2">
          {tools.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTool(id)}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTool === id
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-stone-400"
        >
          Thinking carefully...
        </motion.div>
      )}

      {claimResult && <ClaimResult result={claimResult} />}
      {argumentResult && <ArgumentResult result={argumentResult} />}
      {stressResult && <StressResult result={stressResult} />}
    </div>
  );
}
