// ROI Calculator Types

export interface RoiInputs {
  // Business Metrics
  monthlyMarketingLeads: number;
  averageDealSize: number;
  currentDealCloseRate: number; // percentage (0-100)
  averageSalesCycleLength: number; // days
  numberOfSalesReps: number;
  averageSalesRepSalary: number; // annual

  // Current Software Spend (Annual)
  marketingSoftwareSpend: number;
  salesSoftwareSpend: number;
  serviceSoftwareSpend: number;
  cmsSoftwareSpend: number;
  otherSoftwareSpend: number;

  // HubSpot Investment
  estimatedHubspotAnnualCost: number;
  oneTimeImplementationCost: number;
}

export interface RoiResults {
  // Cost Savings
  annualSoftwareSavings: number;
  annualProductivitySavings: number;
  totalAnnualCostSavings: number;

  // Revenue Lift
  newMonthlyLeads: number;
  newAnnualLeads: number;
  newDealCloseRate: number;
  currentAnnualDeals: number;
  projectedAnnualDeals: number;
  additionalDeals: number;
  annualRevenueLift: number;

  // Overall ROI
  totalAnnualBenefits: number;
  amortizedImplementationCost: number;
  totalAnnualCosts: number;
  roiPercentage: number;

  // Revenue Metrics
  currentAnnualRevenue: number;
  projectedAnnualRevenue: number;
  revenueIncrease: number;

  // Breakdown
  totalCurrentSoftwareSpend: number;
  hoursSavedPerRepPerYear: number;
  totalHoursSavedAnnually: number;
  hourlyRate: number;
}

// Industry benchmarks from HubSpot research
export const ROI_BENCHMARKS = {
  LEAD_VOLUME_INCREASE: 2.05, // +205%
  DEAL_CLOSE_RATE_INCREASE: 3.11, // +311%
  DEALS_CLOSED_INCREASE: 1.25, // +125%
  SALES_REP_HOURS_SAVED_PER_WEEK: 5,
  WORKING_HOURS_PER_YEAR: 2080,
  AMORTIZATION_PERIOD_YEARS: 3,
} as const;

// Default values to help users get started
export const DEFAULT_INPUTS: RoiInputs = {
  monthlyMarketingLeads: 500,
  averageDealSize: 15000,
  currentDealCloseRate: 15,
  averageSalesCycleLength: 60,
  numberOfSalesReps: 5,
  averageSalesRepSalary: 75000,
  marketingSoftwareSpend: 12000,
  salesSoftwareSpend: 18000,
  serviceSoftwareSpend: 6000,
  cmsSoftwareSpend: 3000,
  otherSoftwareSpend: 5000,
  estimatedHubspotAnnualCost: 30000,
  oneTimeImplementationCost: 15000,
};
