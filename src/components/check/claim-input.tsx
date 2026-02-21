"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ClaimInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function ClaimInput({ value, onChange, onSubmit, loading }: ClaimInputProps) {
  return (
    <div className="space-y-4">
      <Textarea
        id="claim-input"
        label="What claim would you like to examine?"
        placeholder='e.g. "Social media causes anxiety in teenagers" or "Democracy is the best form of government"'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        onClick={onSubmit}
        disabled={!value.trim() || loading}
        className="w-full sm:w-auto"
      >
        <span className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          {loading ? "Examining..." : "Let\u2019s examine this"}
        </span>
      </Button>
    </div>
  );
}
