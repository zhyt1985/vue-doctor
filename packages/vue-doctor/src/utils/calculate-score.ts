import type { Diagnostic, ScoreResult } from "../types.js";
import { PERFECT_SCORE, SCORE_GOOD_THRESHOLD, SCORE_OK_THRESHOLD } from "../constants.js";

const SEVERITY_WEIGHTS: Record<string, number> = {
  error: 3,
  warning: 1,
};

export const calculateScore = (diagnostics: Diagnostic[]): ScoreResult => {
  if (diagnostics.length === 0) {
    return { score: PERFECT_SCORE, label: "Perfect" };
  }

  let totalPenalty = 0;
  for (const diagnostic of diagnostics) {
    const weight = diagnostic.weight ?? SEVERITY_WEIGHTS[diagnostic.severity] ?? 1;
    totalPenalty += weight;
  }

  const score = Math.max(0, Math.round(PERFECT_SCORE - totalPenalty * 0.5));

  let label: string;
  if (score >= SCORE_GOOD_THRESHOLD) {
    label = "Good";
  } else if (score >= SCORE_OK_THRESHOLD) {
    label = "OK";
  } else {
    label = "Needs Work";
  }

  return { score, label };
};
