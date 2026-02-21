"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, staggerItem } from "@/components/ui/page-wrapper";
import { LiveRecorder } from "@/components/live/live-recorder";
import { LiveResults } from "@/components/live/live-results";

export default function LivePage() {
  const [transcript, setTranscript] = useState<string | null>(null);

  return (
    <PageWrapper>
      <motion.div variants={staggerItem}>
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
          Live Analysis
        </h1>
        <p className="text-stone-500 mb-8">
          Record a real conversation — a phone call, a debate, a discussion —
          and analyze what was said using any of our reasoning tools.
        </p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <LiveRecorder onAnalyze={(t) => setTranscript(t)} />
      </motion.div>

      {transcript && (
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <LiveResults transcript={transcript} />
        </motion.div>
      )}
    </PageWrapper>
  );
}
