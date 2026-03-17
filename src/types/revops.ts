// RevOps Maturity Assessment Types

export type QuestionId =
  | "DT1" | "DT2" | "DT3"
  | "PA1" | "PA2" | "PA3"
  | "AU1" | "AU2" | "AU3"
  | "CA1" | "CA2" | "CA3"
  | "AI1" | "AI2" | "AI3";

export type DimensionKey = "DataTrust" | "ProcessAdoption" | "Automation" | "Alignment" | "AIReadiness";

export type TierLevel = "Reactive" | "Managed" | "Scalable" | "Optimized";

export interface Question {
  id: QuestionId;
  dimension: DimensionKey;
  title: string;
  options: string[];
}

export interface Answers {
  [key: string]: number; // QuestionId -> score (0-3)
}

export interface DimensionScore {
  name: DimensionKey;
  displayName: string;
  score: number;
  questionIds: QuestionId[];
}

export interface AssessmentResults {
  name: string;
  company: string;
  totalScore: number;
  tier: TierLevel;
  dimensions: Record<DimensionKey, DimensionScore>;
  primaryGap: DimensionKey;
  secondaryGap: DimensionKey;
  strength: DimensionKey;
  flags: string[];
  highIntent: boolean;
}

export const DIMENSION_MAPPING: Record<DimensionKey, QuestionId[]> = {
  DataTrust: ["DT1", "DT2", "DT3"],
  ProcessAdoption: ["PA1", "PA2", "PA3"],
  Automation: ["AU1", "AU2", "AU3"],
  Alignment: ["CA1", "CA2", "CA3"],
  AIReadiness: ["AI1", "AI2", "AI3"],
};

export const DIMENSION_DISPLAY_NAMES: Record<DimensionKey, string> = {
  DataTrust: "Data Trust",
  ProcessAdoption: "Process Adoption",
  Automation: "Automation",
  Alignment: "Cross-Team Alignment",
  AIReadiness: "AI Readiness",
};

export const QUESTIONS: Question[] = [
  // Data Trust
  {
    id: "DT1",
    dimension: "DataTrust",
    title: "Source of Truth",
    options: [
      "We rely on multiple systems (HubSpot, spreadsheets, finance), and numbers often don't match",
      "HubSpot is our main source, but reports still need manual adjustments",
      "HubSpot is the primary source with consistent definitions and data structure",
      "We have a fully governed system with automated checks for inconsistencies",
    ],
  },
  {
    id: "DT2",
    dimension: "DataTrust",
    title: "Duplicates & Data Hygiene",
    options: [
      "Duplicate records are a frequent issue, and cleanup happens only when needed",
      "We clean up occasionally, but it's inconsistent",
      "We monitor and clean data with clear ownership",
      "We proactively prevent issues with alerts and automation",
    ],
  },
  {
    id: "DT3",
    dimension: "DataTrust",
    title: "Field Guardrails",
    options: [
      "Many fields are free text and inconsistent",
      "Some dropdowns exist, but limited validation",
      "Key fields are standardized with validation",
      "Data is tightly controlled with validation and standards",
    ],
  },
  // Process Adoption
  {
    id: "PA1",
    dimension: "ProcessAdoption",
    title: "Lifecycle Stages",
    options: [
      "Stages are inconsistent or incorrect",
      "Defined but manually updated",
      "Clearly defined and mostly automated",
      "Automated and continuously improved",
    ],
  },
  {
    id: "PA2",
    dimension: "ProcessAdoption",
    title: "Deal Pipeline",
    options: [
      "Stages are loosely followed",
      "Stages exist but lack enforcement",
      "Aligned with process and required fields",
      "Fully governed and optimized",
    ],
  },
  {
    id: "PA3",
    dimension: "ProcessAdoption",
    title: "Process Cadence",
    options: [
      "No consistent cadence",
      "Meetings exist but low impact",
      "Regular reviews drive improvements",
      "Cross-team cadence drives continuous improvement",
    ],
  },
  // Automation
  {
    id: "AU1",
    dimension: "Automation",
    title: "Workflow Coverage",
    options: [
      "Mostly manual",
      "Some workflows exist",
      "Core processes automated",
      "Automation is structured and optimized",
    ],
  },
  {
    id: "AU2",
    dimension: "Automation",
    title: "Stage-Based Automation",
    options: [
      "No automation",
      "Some notifications",
      "Structured actions triggered",
      "Automation enforces process",
    ],
  },
  {
    id: "AU3",
    dimension: "Automation",
    title: "Data Hygiene & Enrichment",
    options: [
      "Manual or missing data",
      "Some cleanup",
      "Partial automation",
      "Fully automated and governed",
    ],
  },
  // Cross-Team Alignment
  {
    id: "CA1",
    dimension: "Alignment",
    title: "Definitions & Handoffs",
    options: [
      "No shared definitions",
      "Partial alignment",
      "Documented and followed",
      "Fully aligned with SLAs",
    ],
  },
  {
    id: "CA2",
    dimension: "Alignment",
    title: "Ownership",
    options: [
      "No clear owner",
      "Admin without authority",
      "Defined RevOps owner",
      "Governance-backed ownership",
    ],
  },
  {
    id: "CA3",
    dimension: "Alignment",
    title: "Permissions & Access",
    options: [
      "Too open or too restrictive",
      "Inconsistent",
      "Structured permissions",
      "Fully governed access",
    ],
  },
  // AI Readiness
  {
    id: "AI1",
    dimension: "AIReadiness",
    title: "AI Usage",
    options: [
      "Not used",
      "Used occasionally",
      "Used in workflows",
      "Embedded and optimized",
    ],
  },
  {
    id: "AI2",
    dimension: "AIReadiness",
    title: "Data Quality for AI",
    options: [
      "Poor data",
      "Some cleanup",
      "Monitored regularly",
      "Fully governed",
    ],
  },
  {
    id: "AI3",
    dimension: "AIReadiness",
    title: "AI Governance",
    options: [
      "No guidelines",
      "Informal practices",
      "Clear policies",
      "Fully governed",
    ],
  },
];
