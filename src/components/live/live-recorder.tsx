"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSpeechRecognition } from "@/lib/use-speech-recognition";

interface LiveRecorderProps {
  onAnalyze: (transcript: string) => void;
}

export function LiveRecorder({ onAnalyze }: LiveRecorderProps) {
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    start,
    stop,
    reset,
  } = useSpeechRecognition();

  const hasTranscript = transcript.trim().length > 0;
  const canAnalyze = hasTranscript && !isListening;

  if (!isSupported) {
    return (
      <Card>
        <div className="text-center py-8 space-y-3">
          <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto">
            <MicOff className="w-6 h-6 text-stone-400" />
          </div>
          <p className="text-sm text-stone-500">
            Speech recognition is not supported in this browser. Please try
            Chrome or Edge for the best experience.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-rose-400"
              />
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? stop : start}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
              isListening
                ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
            aria-label={isListening ? "Stop recording" : "Start recording"}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </motion.button>
        </div>

        <p className="text-sm text-stone-400">
          {isListening ? "Listening... tap to stop" : "Tap to start listening"}
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600">
              Transcript
            </span>
            {hasTranscript && (
              <button
                onClick={reset}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          <div className="min-h-[120px] text-sm leading-relaxed">
            {!hasTranscript && !interimTranscript ? (
              <p className="text-stone-300 italic">
                Your conversation will appear here as you speak...
              </p>
            ) : (
              <p>
                <span className="text-stone-900">{transcript}</span>
                {interimTranscript && (
                  <span className="text-stone-400 italic">
                    {" "}
                    {interimTranscript}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {canAnalyze && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <Button onClick={() => onAnalyze(transcript)}>
              <span className="flex items-center gap-2">
                Analyze this <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
