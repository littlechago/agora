"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShieldQuestion } from "lucide-react";

interface StressInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function StressInput({ value, onChange, onSubmit, loading }: StressInputProps) {
  return (
    <div className="space-y-4">
      <Textarea
        id="stress-input"
        label="What argument would you like to stress test?"
        placeholder={"Paste an argument you've been thinking about. For example: \"We should ban social media for children because it harms their mental health, reduces attention spans, and exposes them to cyberbullying.\""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[160px]"
      />
      <Button
        onClick={onSubmit}
        disabled={!value.trim() || loading}
        variant="primary"
        className="w-full sm:w-auto"
      >
        <span className="flex items-center gap-2">
          <ShieldQuestion className="w-4 h-4" />
          {loading ? "Testing..." : "Stress test this"}
        </span>
      </Button>
    </div>
  );
}
