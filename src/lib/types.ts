export type ClaimType =
  | "empirical"
  | "value"
  | "definitional"
  | "causal"
  | "predictive";

export interface ClaimAnalysis {
  claimType: ClaimType;
  claimTypeExplanation: string;
  justificationPrompts: string[];
  assumptions: string[];
  confidenceScore: number;
  confidenceExplanation: string;
}

export interface SourceCheck {
  reliabilityTier: "high" | "moderate" | "low" | "unknown";
  reliabilityLabel: string;
  questions: string[];
}

export interface ArgumentAnalysis {
  clarityScore: number;
  clarityFeedback: string;
  missingPremises: string[];
  strongerVersion: string;
  logicalStructure: string;
}

export interface StressTestResult {
  steelman: string;
  counterargument: string;
  vulnerabilities: {
    issue: string;
    suggestion: string;
  }[];
}
