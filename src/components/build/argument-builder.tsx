"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Hammer } from "lucide-react";

interface ArgumentBuilderProps {
  conclusion: string;
  onConclusionChange: (value: string) => void;
  premises: string[];
  onPremisesChange: (premises: string[]) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function ArgumentBuilder({
  conclusion,
  onConclusionChange,
  premises,
  onPremisesChange,
  onSubmit,
  loading,
}: ArgumentBuilderProps) {
  const addPremise = () => {
    onPremisesChange([...premises, ""]);
  };

  const removePremise = (index: number) => {
    if (premises.length <= 1) return;
    onPremisesChange(premises.filter((_, i) => i !== index));
  };

  const updatePremise = (index: number, value: string) => {
    const updated = [...premises];
    updated[index] = value;
    onPremisesChange(updated);
  };

  const canSubmit = conclusion.trim() && premises.some((p) => p.trim());

  return (
    <div className="space-y-6">
      <Textarea
        id="conclusion"
        label="What's your conclusion?"
        placeholder='e.g. "We should invest more in renewable energy" or "Remote work increases productivity"'
        value={conclusion}
        onChange={(e) => onConclusionChange(e.target.value)}
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-stone-700">
          Supporting reasons (premises)
        </label>
        {premises.map((premise, i) => (
          <div key={i} className="flex gap-2">
            <div className="flex-1">
              <textarea
                value={premise}
                onChange={(e) => updatePremise(i, e.target.value)}
                placeholder={`Reason ${i + 1}...`}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none resize-y min-h-[60px] transition-colors"
              />
            </div>
            {premises.length > 1 && (
              <button
                onClick={() => removePremise(i)}
                className="self-start mt-2 p-1.5 text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                aria-label="Remove premise"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addPremise}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add another reason
        </button>
      </div>

      <Button
        onClick={onSubmit}
        disabled={!canSubmit || loading}
        variant="secondary"
        className="w-full sm:w-auto"
      >
        <span className="flex items-center gap-2">
          <Hammer className="w-4 h-4" />
          {loading ? "Analyzing..." : "Analyze my argument"}
        </span>
      </Button>
    </div>
  );
}
