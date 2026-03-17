import {
  Answers,
  AssessmentResults,
  DimensionKey,
  DimensionScore,
  DIMENSION_MAPPING,
  DIMENSION_DISPLAY_NAMES,
  TierLevel,
} from "@/types/revops";

/**
 * Calculate score for a single dimension (0-100)
 */
function getDimensionScore(answers: Answers, questionIds: string[]): number {
  const sum = questionIds.reduce((acc, q) => acc + (answers[q] || 0), 0);
  return Math.round((sum / 9) * 100);
}

/**
 * Determine tier based on total score
 */
function getTier(score: number): TierLevel {
  if (score <= 25) return "Reactive";
  if (score <= 50) return "Managed";
  if (score <= 75) return "Scalable";
  return "Optimized";
}

/**
 * Identify key signals/flags from answers
 */
function identifyFlags(answers: Answers): string[] {
  const flags: string[] = [];

  if (answers["DT1"] === 0) flags.push("no_single_source_of_truth");
  if (answers["PA2"] <= 1) flags.push("pipeline_not_enforced");
  if (answers["AU1"] <= 1) flags.push("low_automation");
  if (answers["CA2"] <= 1) flags.push("no_revops_owner");
  if (answers["AI3"] <= 1) flags.push("no_ai_governance");
  if (answers["DT2"] <= 1) flags.push("data_hygiene_issues");
  if (answers["CA1"] <= 1) flags.push("misaligned_teams");
  if (answers["AU2"] === 0) flags.push("no_stage_automation");

  return flags;
}

/**
 * Determine high intent based on score and flags
 */
function determineHighIntent(totalScore: number, flags: string[]): boolean {
  return (
    totalScore >= 40 &&
    (flags.includes("no_single_source_of_truth") ||
      flags.includes("pipeline_not_enforced") ||
      flags.includes("low_automation"))
  );
}

/**
 * Calculate assessment results
 */
export function calculateAssessment(
  name: string,
  company: string,
  answers: Answers
): AssessmentResults {
  // Calculate dimension scores
  const dimensions: Record<DimensionKey, DimensionScore> = {
    DataTrust: {
      name: "DataTrust",
      displayName: DIMENSION_DISPLAY_NAMES.DataTrust,
      score: getDimensionScore(answers, DIMENSION_MAPPING.DataTrust),
      questionIds: DIMENSION_MAPPING.DataTrust,
    },
    ProcessAdoption: {
      name: "ProcessAdoption",
      displayName: DIMENSION_DISPLAY_NAMES.ProcessAdoption,
      score: getDimensionScore(answers, DIMENSION_MAPPING.ProcessAdoption),
      questionIds: DIMENSION_MAPPING.ProcessAdoption,
    },
    Automation: {
      name: "Automation",
      displayName: DIMENSION_DISPLAY_NAMES.Automation,
      score: getDimensionScore(answers, DIMENSION_MAPPING.Automation),
      questionIds: DIMENSION_MAPPING.Automation,
    },
    Alignment: {
      name: "Alignment",
      displayName: DIMENSION_DISPLAY_NAMES.Alignment,
      score: getDimensionScore(answers, DIMENSION_MAPPING.Alignment),
      questionIds: DIMENSION_MAPPING.Alignment,
    },
    AIReadiness: {
      name: "AIReadiness",
      displayName: DIMENSION_DISPLAY_NAMES.AIReadiness,
      score: getDimensionScore(answers, DIMENSION_MAPPING.AIReadiness),
      questionIds: DIMENSION_MAPPING.AIReadiness,
    },
  };

  // Calculate total score
  const totalScore = Math.round(
    (dimensions.DataTrust.score +
      dimensions.ProcessAdoption.score +
      dimensions.Automation.score +
      dimensions.Alignment.score +
      dimensions.AIReadiness.score) /
      5
  );

  // Determine tier
  const tier = getTier(totalScore);

  // Sort dimensions by score to find gaps and strengths
  const sorted = Object.values(dimensions).sort((a, b) => a.score - b.score);

  const primaryGap = sorted[0].name;
  const secondaryGap = sorted[1].name;
  const strength = sorted[4].name;

  // Identify flags
  const flags = identifyFlags(answers);

  // Determine high intent
  const highIntent = determineHighIntent(totalScore, flags);

  return {
    name,
    company,
    totalScore,
    tier,
    dimensions,
    primaryGap,
    secondaryGap,
    strength,
    flags,
    highIntent,
  };
}

/**
 * Get tier description
 */
export function getTierDescription(tier: TierLevel): string {
  const descriptions = {
    Reactive:
      "Your RevOps operates in reactive mode. Data inconsistencies and manual processes slow down growth. Focus: Establish data trust and basic automation.",
    Managed:
      "You have foundational processes in place, but inconsistencies remain. There's opportunity to scale with better automation and alignment.",
    Scalable:
      "Your RevOps is well-structured and mostly automated. You're positioned for growth with strong data governance and cross-team alignment.",
    Optimized:
      "You have best-in-class RevOps maturity. Your systems are fully automated, governed, and continuously improving. You're AI-ready.",
  };
  return descriptions[tier];
}

/**
 * Get dimension insight based on score
 */
export function getDimensionInsight(
  dimensionKey: DimensionKey,
  score: number
): string {
  const insights: Record<DimensionKey, Record<string, string>> = {
    DataTrust: {
      low: "Multiple sources of truth are creating data inconsistencies. Consolidate around HubSpot as your single source.",
      medium: "You have HubSpot as your main system, but manual adjustments suggest gaps in data structure or validation.",
      high: "Strong data governance with automated checks. Your data is trustworthy and actionable.",
    },
    ProcessAdoption: {
      low: "Processes exist on paper but aren't consistently followed. Enforcement and automation are needed.",
      medium: "Processes are defined but lack full automation. Add required fields and workflow triggers.",
      high: "Processes are embedded in the system and continuously optimized. Teams follow them naturally.",
    },
    Automation: {
      low: "Most work is manual, creating inefficiency and errors. Start with high-impact workflows.",
      medium: "Some automation exists but isn't comprehensive. Expand coverage to lifecycle and pipeline stages.",
      high: "Automation is structured and optimized. Manual work is minimal and intentional.",
    },
    Alignment: {
      low: "Teams operate in silos with conflicting definitions. Establish shared language and ownership.",
      medium: "Some alignment exists but isn't formalized. Document definitions and SLAs.",
      high: "Teams are fully aligned with clear ownership, SLAs, and governance.",
    },
    AIReadiness: {
      low: "AI tools aren't in use, or data quality prevents effective AI adoption.",
      medium: "Some AI usage exists, but governance and data quality need attention.",
      high: "AI is embedded in workflows with strong governance and high-quality data.",
    },
  };

  const level = score <= 33 ? "low" : score <= 66 ? "medium" : "high";
  return insights[dimensionKey][level];
}
