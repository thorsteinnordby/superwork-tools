import { RoiInputs, RoiResults, ROI_BENCHMARKS } from "@/types/roi";

/**
 * Calculate software consolidation savings
 */
function calculateSoftwareSavings(inputs: RoiInputs): number {
  const totalCurrentSoftwareSpend =
    inputs.marketingSoftwareSpend +
    inputs.salesSoftwareSpend +
    inputs.serviceSoftwareSpend +
    inputs.cmsSoftwareSpend +
    inputs.otherSoftwareSpend;

  const savings =
    totalCurrentSoftwareSpend - inputs.estimatedHubspotAnnualCost;

  // If HubSpot costs more, show $0 savings
  return Math.max(0, savings);
}

/**
 * Calculate productivity savings from automation
 */
function calculateProductivitySavings(inputs: RoiInputs): number {
  const hourlyRate =
    inputs.averageSalesRepSalary / ROI_BENCHMARKS.WORKING_HOURS_PER_YEAR;
  const hoursSavedPerRepPerYear =
    ROI_BENCHMARKS.SALES_REP_HOURS_SAVED_PER_WEEK * 52;

  return (
    inputs.numberOfSalesReps * hoursSavedPerRepPerYear * hourlyRate
  );
}

/**
 * Calculate revenue lift from improved metrics
 */
function calculateRevenueLift(inputs: RoiInputs): {
  newMonthlyLeads: number;
  newAnnualLeads: number;
  newDealCloseRate: number;
  currentAnnualDeals: number;
  projectedAnnualDeals: number;
  additionalDeals: number;
  annualRevenueLift: number;
} {
  // New lead volume with +205% increase
  const newMonthlyLeads =
    inputs.monthlyMarketingLeads * (1 + ROI_BENCHMARKS.LEAD_VOLUME_INCREASE);
  const newAnnualLeads = newMonthlyLeads * 12;

  // New deal close rate with +311% increase
  const newDealCloseRate =
    inputs.currentDealCloseRate * (1 + ROI_BENCHMARKS.DEAL_CLOSE_RATE_INCREASE);

  // Calculate deals
  const currentAnnualDeals =
    (inputs.monthlyMarketingLeads * 12 * inputs.currentDealCloseRate) / 100;
  const projectedAnnualDeals = (newAnnualLeads * newDealCloseRate) / 100;
  const additionalDeals = projectedAnnualDeals - currentAnnualDeals;

  // Revenue lift from additional deals
  const annualRevenueLift = additionalDeals * inputs.averageDealSize;

  return {
    newMonthlyLeads,
    newAnnualLeads,
    newDealCloseRate,
    currentAnnualDeals,
    projectedAnnualDeals,
    additionalDeals,
    annualRevenueLift,
  };
}

/**
 * Main ROI calculation function
 */
export function calculateROI(inputs: RoiInputs): RoiResults {
  // Cost savings
  const annualSoftwareSavings = calculateSoftwareSavings(inputs);
  const annualProductivitySavings = calculateProductivitySavings(inputs);
  const totalAnnualCostSavings =
    annualSoftwareSavings + annualProductivitySavings;

  // Revenue lift
  const revenueLiftData = calculateRevenueLift(inputs);

  // Overall ROI
  const totalAnnualBenefits =
    totalAnnualCostSavings + revenueLiftData.annualRevenueLift;
  const amortizedImplementationCost =
    inputs.oneTimeImplementationCost / ROI_BENCHMARKS.AMORTIZATION_PERIOD_YEARS;
  const totalAnnualCosts =
    inputs.estimatedHubspotAnnualCost + amortizedImplementationCost;

  const roiPercentage =
    totalAnnualCosts > 0
      ? ((totalAnnualBenefits - totalAnnualCosts) / totalAnnualCosts) * 100
      : 0;

  // Revenue metrics
  const currentAnnualRevenue =
    (inputs.monthlyMarketingLeads *
      12 *
      (inputs.currentDealCloseRate / 100) *
      inputs.averageDealSize);
  const projectedAnnualRevenue =
    (revenueLiftData.newMonthlyLeads *
      12 *
      (revenueLiftData.newDealCloseRate / 100) *
      inputs.averageDealSize);
  const revenueIncrease = projectedAnnualRevenue - currentAnnualRevenue;

  // Additional breakdown data
  const totalCurrentSoftwareSpend =
    inputs.marketingSoftwareSpend +
    inputs.salesSoftwareSpend +
    inputs.serviceSoftwareSpend +
    inputs.cmsSoftwareSpend +
    inputs.otherSoftwareSpend;

  const hourlyRate =
    inputs.averageSalesRepSalary / ROI_BENCHMARKS.WORKING_HOURS_PER_YEAR;
  const hoursSavedPerRepPerYear =
    ROI_BENCHMARKS.SALES_REP_HOURS_SAVED_PER_WEEK * 52;
  const totalHoursSavedAnnually =
    inputs.numberOfSalesReps * hoursSavedPerRepPerYear;

  return {
    // Cost Savings
    annualSoftwareSavings,
    annualProductivitySavings,
    totalAnnualCostSavings,

    // Revenue Lift
    ...revenueLiftData,

    // Overall ROI
    totalAnnualBenefits,
    amortizedImplementationCost,
    totalAnnualCosts,
    roiPercentage,

    // Revenue Metrics
    currentAnnualRevenue,
    projectedAnnualRevenue,
    revenueIncrease,

    // Breakdown
    totalCurrentSoftwareSpend,
    hoursSavedPerRepPerYear,
    totalHoursSavedAnnually,
    hourlyRate,
  };
}

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format number with thousands separators
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
