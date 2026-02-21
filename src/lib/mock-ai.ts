import type {
  ClaimAnalysis,
  SourceCheck,
  ArgumentAnalysis,
  StressTestResult,
  ClaimType,
} from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CLAIM_TYPES: { type: ClaimType; keywords: string[]; explanation: string }[] = [
  {
    type: "causal",
    keywords: ["causes", "leads to", "results in", "because", "due to", "effect"],
    explanation:
      "This appears to be a causal claim — it asserts that one thing brings about another.",
  },
  {
    type: "predictive",
    keywords: ["will", "going to", "likely", "expect", "future", "trend"],
    explanation:
      "This looks like a predictive claim — it makes an assertion about what will happen.",
  },
  {
    type: "value",
    keywords: ["should", "ought", "better", "worse", "best", "important", "moral", "right", "wrong"],
    explanation:
      "This is a value claim — it expresses a judgment about what is good, bad, or important.",
  },
  {
    type: "definitional",
    keywords: ["is a", "means", "defined as", "refers to", "consists of"],
    explanation:
      "This is a definitional claim — it asserts what something is or what a term means.",
  },
  {
    type: "empirical",
    keywords: [],
    explanation:
      "This appears to be an empirical claim — it makes an assertion about observable facts.",
  },
];

function detectClaimType(text: string): { type: ClaimType; explanation: string } {
  const lower = text.toLowerCase();
  for (const ct of CLAIM_TYPES) {
    if (ct.keywords.some((kw) => lower.includes(kw))) {
      return { type: ct.type, explanation: ct.explanation };
    }
  }
  return { type: "empirical", explanation: CLAIM_TYPES[4].explanation };
}

export async function analyzeClaim(text: string): Promise<ClaimAnalysis> {
  await delay(1500);

  const { type, explanation } = detectClaimType(text);
  const wordCount = text.split(/\s+/).length;
  const confidence = Math.min(85, Math.max(25, 40 + wordCount * 2));

  return {
    claimType: type,
    claimTypeExplanation: explanation,
    justificationPrompts: [
      "What evidence would you need to see to be confident this is true?",
      "Could someone reasonable disagree with this? What might they say?",
      "Is this claim specific enough to be tested or evaluated?",
    ],
    assumptions: [
      "The terms used have a shared, agreed-upon meaning.",
      "The claim applies universally rather than to a specific context.",
      "There are no important exceptions being overlooked.",
    ],
    confidenceScore: confidence,
    confidenceExplanation:
      confidence > 60
        ? "This claim is fairly specific and could potentially be evaluated, though more context would help."
        : "This claim is quite broad — narrowing it down would make it easier to examine.",
  };
}

export async function checkSource(source: string): Promise<SourceCheck> {
  await delay(1000);

  const lower = source.toLowerCase();
  if (lower.includes(".gov") || lower.includes(".edu") || lower.includes("journal")) {
    return {
      reliabilityTier: "high",
      reliabilityLabel: "Generally reliable",
      questions: [
        "Is this source reporting primary research or summarizing others' work?",
        "When was this published? Is the information still current?",
      ],
    };
  }
  if (lower.includes(".org") || lower.includes("news") || lower.includes("times")) {
    return {
      reliabilityTier: "moderate",
      reliabilityLabel: "Moderate — worth cross-referencing",
      questions: [
        "Does this source have a known editorial perspective?",
        "Can you find the same claim reported by other independent sources?",
        "Is the author identified and do they have relevant expertise?",
      ],
    };
  }
  return {
    reliabilityTier: "unknown",
    reliabilityLabel: "Unknown — approach with healthy curiosity",
    questions: [
      "Who created this content and what might their motivation be?",
      "Is this a primary source, or is it interpreting someone else's work?",
      "Can you trace the claim back to its original source?",
      "Does the source provide references for its key claims?",
    ],
  };
}

export async function analyzeArgument(
  conclusion: string,
  premises: string[]
): Promise<ArgumentAnalysis> {
  await delay(1500);

  const filledPremises = premises.filter((p) => p.trim().length > 0);
  const clarityScore = Math.min(90, 30 + filledPremises.length * 20 + conclusion.length / 3);

  return {
    clarityScore: Math.round(clarityScore),
    clarityFeedback:
      filledPremises.length >= 2
        ? "Your argument has a clear structure with multiple supporting reasons. Nice work."
        : "Consider adding more supporting reasons to strengthen your argument's foundation.",
    missingPremises: [
      "You might be assuming a general principle that connects your evidence to your conclusion.",
      "Consider whether there's an unstated assumption about the scope or context.",
    ],
    strongerVersion: `Based on your reasoning: ${filledPremises.join(". Additionally, ")}. Therefore, we can conclude that ${conclusion.toLowerCase()}`,
    logicalStructure:
      filledPremises.length >= 2
        ? "Your argument follows a reasonable structure: multiple premises supporting a conclusion."
        : "Your argument could benefit from additional premises to create a stronger logical chain.",
  };
}

export async function stressTest(argument: string): Promise<StressTestResult> {
  await delay(1800);

  return {
    steelman: `Here's the strongest version of this argument: "${argument}" — interpreted charitably, this suggests a well-considered position that accounts for complexity and nuance. The core insight appears to be about balancing competing considerations thoughtfully.`,
    counterargument:
      "A thoughtful critic might respond: while the reasoning has merit, it may not fully account for alternative explanations or edge cases. Consider whether the conclusion holds if key assumptions are relaxed or if the context changes significantly.",
    vulnerabilities: [
      {
        issue: "Scope sensitivity",
        suggestion:
          "The argument may hold in some contexts but not others. Try specifying exactly when and where it applies.",
      },
      {
        issue: "Implicit assumptions",
        suggestion:
          "There appear to be unstated premises. Making these explicit would strengthen the argument.",
      },
      {
        issue: "Alternative explanations",
        suggestion:
          "Consider whether the same evidence could support a different conclusion entirely.",
      },
    ],
  };
}
