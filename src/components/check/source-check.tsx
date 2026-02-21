"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LearnMore } from "@/components/ui/learn-more";
import { Button } from "@/components/ui/button";
import { checkSource } from "@/lib/mock-ai";
import type { SourceCheck as SourceCheckType } from "@/lib/types";
import { Globe, HelpCircle } from "lucide-react";

const tierColors: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-700",
  moderate: "bg-amber-100 text-amber-700",
  low: "bg-rose-100 text-rose-700",
  unknown: "bg-stone-100 text-stone-600",
};

export function SourceCheck() {
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SourceCheckType | null>(null);

  const handleCheck = async () => {
    if (!source.trim()) return;
    setLoading(true);
    const data = await checkSource(source);
    setResult(data);
    setLoading(false);
  };

  return (
    <LearnMore title="Check a source">
      <div className="space-y-3">
        <p className="text-stone-500">
          Wondering about a source? Enter a URL or name to think through its reliability.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. nytimes.com, Wikipedia, a blog URL..."
            className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none"
          />
          <Button
            variant="ghost"
            onClick={handleCheck}
            disabled={!source.trim() || loading}
            className="text-xs px-3 py-2"
          >
            <Globe className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 pt-2"
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${tierColors[result.reliabilityTier]}`}
              >
                {result.reliabilityLabel}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-stone-500 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Questions to consider:
              </p>
              <ul className="space-y-1">
                {result.questions.map((q, i) => (
                  <li key={i} className="text-xs text-stone-600 pl-4 relative before:content-['\u2022'] before:absolute before:left-1 before:text-stone-300">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </LearnMore>
  );
}
