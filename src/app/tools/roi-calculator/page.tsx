"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { RoiInputs, DEFAULT_INPUTS } from "@/types/roi";
import { calculateROI, formatCurrency, formatPercentage, formatNumber } from "@/lib/roiCalculator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

/* ─── Input Field Component ─── */
function CurrencyInput({
  label,
  value,
  onChange,
  tooltip,
  required = false,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  tooltip?: string;
  required?: boolean;
}) {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-sw-neutral-500">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <span className="text-xs font-normal text-sw-neutral-400" title={tooltip}>
            ⓘ
          </span>
        )}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sw-neutral-400">$</span>
        <input
          id={inputId}
          name={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
          placeholder="0"
          min="0"
          step="1"
          className="w-full rounded-lg border border-sw-midnight-200 bg-white py-2.5 pl-8 pr-3.5 text-sm text-sw-neutral-500 transition-all placeholder:text-sw-neutral-400 focus:border-sw-violet-500 focus:shadow-[0_0_0_3px_rgba(106,109,205,0.12)] focus:outline-none"
        />
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  tooltip,
  required = false,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  tooltip?: string;
  required?: boolean;
}) {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-sw-neutral-500">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <span className="text-xs font-normal text-sw-neutral-400" title={tooltip}>
            ⓘ
          </span>
        )}
      </label>
      <input
        id={inputId}
        name={inputId}
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
        placeholder="0"
        min="0"
        step="1"
        className="w-full rounded-lg border border-sw-midnight-200 bg-white px-3.5 py-2.5 text-sm text-sw-neutral-500 transition-all placeholder:text-sw-neutral-400 focus:border-sw-violet-500 focus:shadow-[0_0_0_3px_rgba(106,109,205,0.12)] focus:outline-none"
      />
    </div>
  );
}

function PercentageInput({
  label,
  value,
  onChange,
  tooltip,
  required = false,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  tooltip?: string;
  required?: boolean;
}) {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-sw-neutral-500">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <span className="text-xs font-normal text-sw-neutral-400" title={tooltip}>
            ⓘ
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id={inputId}
          name={inputId}
          type="number"
          value={value}
          onChange={(e) => {
            const val = parseFloat(e.target.value) || 0;
            onChange(Math.min(100, Math.max(0, val)));
          }}
          placeholder="0"
          min="0"
          max="100"
          step="0.1"
          className="w-full rounded-lg border border-sw-midnight-200 bg-white py-2.5 pl-3.5 pr-8 text-sm text-sw-neutral-500 transition-all placeholder:text-sw-neutral-400 focus:border-sw-violet-500 focus:shadow-[0_0_0_3px_rgba(106,109,205,0.12)] focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sw-neutral-400">%</span>
      </div>
    </div>
  );
}

/* ─── Main ROI Calculator Component ─── */
export default function RoiCalculatorPage() {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_INPUTS);

  // Calculate results in real-time
  const results = useMemo(() => calculateROI(inputs), [inputs]);

  // Update input helper
  const updateInput = (field: keyof RoiInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Chart data
  const leadVolumeData = [
    { name: "Current", value: inputs.monthlyMarketingLeads },
    { name: "With HubSpot", value: results.newMonthlyLeads },
  ];

  const closeRateData = [
    { name: "Current", value: inputs.currentDealCloseRate },
    { name: "With HubSpot", value: results.newDealCloseRate },
  ];

  const revenueData = [
    { name: "Current", value: results.currentAnnualRevenue },
    { name: "Projected", value: results.projectedAnnualRevenue },
  ];

  const benefitsData = [
    { name: "Software Savings", value: results.annualSoftwareSavings },
    { name: "Productivity Savings", value: results.annualProductivitySavings },
    { name: "Revenue Lift", value: results.annualRevenueLift },
  ];

  const COLORS = ["#6a6dcd", "#bfe937", "#ff8a5b"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sw-midnight-50 to-white">
      {/* Header */}
      <div className="border-b border-sw-midnight-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-sw-neutral-400 transition-colors hover:text-sw-violet-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tools
          </Link>
          <h1 className="mb-2 font-heading text-h2 text-sw-neutral-500">HubSpot ROI Calculator</h1>
          <p className="text-body-primary text-sw-neutral-400">
            Estimate your savings and revenue lift from switching to HubSpot. Based on real customer data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            {/* Business Metrics Section */}
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Business Metrics</h2>
              <NumberInput
                label="Monthly Marketing Leads"
                value={inputs.monthlyMarketingLeads}
                onChange={(v) => updateInput("monthlyMarketingLeads", v)}
                tooltip="The total number of marketing qualified leads (MQLs) your business generates each month. Include leads from all channels: website forms, social media, paid ads, etc."
                required
              />
              <CurrencyInput
                label="Average Deal Size"
                value={inputs.averageDealSize}
                onChange={(v) => updateInput("averageDealSize", v)}
                tooltip="The average revenue amount per closed deal. Calculate this by dividing your total revenue by the number of closed deals over the past 12 months."
                required
              />
              <PercentageInput
                label="Current Deal Close Rate"
                value={inputs.currentDealCloseRate}
                onChange={(v) => updateInput("currentDealCloseRate", v)}
                tooltip="The percentage of leads that convert to closed deals. Calculate: (Number of closed deals ÷ Total leads) × 100. Industry average is 10-15%."
                required
              />
              <NumberInput
                label="Average Sales Cycle Length (days)"
                value={inputs.averageSalesCycleLength}
                onChange={(v) => updateInput("averageSalesCycleLength", v)}
                tooltip="The average number of days from first contact with a lead to closing the deal. This helps estimate the velocity of your sales process."
              />
              <NumberInput
                label="Number of Sales Representatives"
                value={inputs.numberOfSalesReps}
                onChange={(v) => updateInput("numberOfSalesReps", v)}
                tooltip="Total number of sales team members. Include BDRs, SDRs, and Account Executives. This impacts productivity savings calculations."
                required
              />
              <CurrencyInput
                label="Average Sales Rep Salary (Annual)"
                value={inputs.averageSalesRepSalary}
                onChange={(v) => updateInput("averageSalesRepSalary", v)}
                tooltip="The average annual salary (base + commission) per sales representative. Used to calculate the value of time saved through automation."
                required
              />
            </div>

            {/* Current Software Spend Section */}
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Current Software Spend (Annual)</h2>
              <CurrencyInput
                label="Marketing Software"
                value={inputs.marketingSoftwareSpend}
                onChange={(v) => updateInput("marketingSoftwareSpend", v)}
                tooltip="Annual cost of all marketing tools: email marketing platforms (Mailchimp, Constant Contact), analytics tools (Google Analytics 360), SEO tools (SEMrush, Ahrefs), social media management, advertising platforms, and landing page builders."
              />
              <CurrencyInput
                label="Sales Software"
                value={inputs.salesSoftwareSpend}
                onChange={(v) => updateInput("salesSoftwareSpend", v)}
                tooltip="Annual cost of sales technology: CRM systems (Salesforce, Pipedrive), sales engagement tools (Outreach, SalesLoft), call recording software, forecasting tools, proposal software, and sales intelligence platforms."
              />
              <CurrencyInput
                label="Service/Support Software"
                value={inputs.serviceSoftwareSpend}
                onChange={(v) => updateInput("serviceSoftwareSpend", v)}
                tooltip="Annual cost of customer service tools: help desk software (Zendesk, Freshdesk), live chat platforms, ticketing systems, knowledge base software, customer feedback tools, and support automation platforms."
              />
              <CurrencyInput
                label="CMS/Website Software"
                value={inputs.cmsSoftwareSpend}
                onChange={(v) => updateInput("cmsSoftwareSpend", v)}
                tooltip="Annual cost of website technology: CMS platforms (WordPress premium, Webflow), hosting fees, CDN services, website plugins, form builders, A/B testing tools, and website maintenance subscriptions."
              />
              <CurrencyInput
                label="Other Software"
                value={inputs.otherSoftwareSpend}
                onChange={(v) => updateInput("otherSoftwareSpend", v)}
                tooltip="Annual cost of any other relevant business software that HubSpot could potentially replace or consolidate, such as workflow automation tools, reporting platforms, or collaboration software."
              />
              <div className="mt-4 border-t border-sw-midnight-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-sw-neutral-500">Total Current Spend:</span>
                  <span className="font-bold text-sw-violet-500">{formatCurrency(results.totalCurrentSoftwareSpend)}</span>
                </div>
              </div>
            </div>

            {/* HubSpot Investment Section */}
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">HubSpot Investment</h2>
              <CurrencyInput
                label="Estimated HubSpot Annual Cost"
                value={inputs.estimatedHubspotAnnualCost}
                onChange={(v) => updateInput("estimatedHubspotAnnualCost", v)}
                tooltip="The total annual subscription cost for HubSpot (Marketing Hub, Sales Hub, Service Hub, CMS Hub). Get a custom quote from HubSpot or estimate based on your team size and feature needs. Typical ranges: $10K-$50K+ annually."
                required
              />
              <CurrencyInput
                label="One-Time Implementation Cost"
                value={inputs.oneTimeImplementationCost}
                onChange={(v) => updateInput("oneTimeImplementationCost", v)}
                tooltip="Initial costs for HubSpot setup including: data migration from existing systems, portal configuration, workflow automation setup, integrations, team training, and onboarding services. This cost is amortized over 3 years in ROI calculations."
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-sw-green-500/20 bg-gradient-to-br from-sw-green-500/5 to-sw-green-500/10 p-6">
                <div className="mb-1 text-sm font-semibold text-sw-neutral-400">ROI</div>
                <div className="text-3xl font-bold text-sw-green-900">{formatPercentage(results.roiPercentage, 0)}</div>
              </div>
              <div className="rounded-xl border border-sw-violet-500/20 bg-gradient-to-br from-sw-violet-500/5 to-sw-violet-500/10 p-6">
                <div className="mb-1 text-sm font-semibold text-sw-neutral-400">Total Annual Benefits</div>
                <div className="text-3xl font-bold text-sw-violet-500">{formatCurrency(results.totalAnnualBenefits)}</div>
              </div>
            </div>

            {/* Cost Savings Breakdown */}
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Cost Savings Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-sw-midnight-100 pb-2">
                  <span className="text-sm text-sw-neutral-400">Software Consolidation Savings</span>
                  <span className="font-semibold text-sw-neutral-500">{formatCurrency(results.annualSoftwareSavings)}</span>
                </div>
                <div className="flex justify-between border-b border-sw-midnight-100 pb-2">
                  <span className="text-sm text-sw-neutral-400">Productivity Savings</span>
                  <span className="font-semibold text-sw-neutral-500">{formatCurrency(results.annualProductivitySavings)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-sw-neutral-500">Total Annual Cost Savings</span>
                  <span className="font-bold text-sw-green-700">{formatCurrency(results.totalAnnualCostSavings)}</span>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-sw-midnight-50 p-3 text-xs text-sw-neutral-400">
                <div className="mb-1">
                  <strong>Productivity Savings Details:</strong>
                </div>
                <div>• {formatNumber(results.totalHoursSavedAnnually)} hours saved annually across {inputs.numberOfSalesReps} reps</div>
                <div>• 5 hours saved per rep per week from automation</div>
                <div>• Hourly rate: {formatCurrency(results.hourlyRate)}</div>
              </div>
            </div>

            {/* Revenue Lift Projection */}
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Revenue Lift Projection</h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-sw-midnight-100 pb-2">
                  <span className="text-sm text-sw-neutral-400">Lead Volume Growth (+205%)</span>
                  <span className="font-semibold text-sw-neutral-500">
                    {formatNumber(inputs.monthlyMarketingLeads)} → {formatNumber(results.newMonthlyLeads)} / month
                  </span>
                </div>
                <div className="flex justify-between border-b border-sw-midnight-100 pb-2">
                  <span className="text-sm text-sw-neutral-400">Close Rate Improvement (+311%)</span>
                  <span className="font-semibold text-sw-neutral-500">
                    {formatPercentage(inputs.currentDealCloseRate, 1)} → {formatPercentage(results.newDealCloseRate, 1)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-sw-midnight-100 pb-2">
                  <span className="text-sm text-sw-neutral-400">Additional Deals Closed Annually</span>
                  <span className="font-semibold text-sw-neutral-500">{formatNumber(results.additionalDeals, 0)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-sw-neutral-500">Annual Revenue Lift</span>
                  <span className="font-bold text-sw-green-700">{formatCurrency(results.annualRevenueLift)}</span>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Lead Volume Comparison</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={leadVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => formatNumber(value, 0)}
                  />
                  <Bar dataKey="value" fill="#6a6dcd" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Deal Close Rate Comparison</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={closeRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => formatPercentage(value, 1)}
                  />
                  <Bar dataKey="value" fill="#bfe937" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl border border-sw-midnight-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Annual Revenue Comparison</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="value" fill="#6a6dcd" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 text-center text-sm text-sw-neutral-400">
                Revenue Increase: <span className="font-semibold text-sw-green-700">{formatCurrency(results.revenueIncrease)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assumptions Section */}
        <div className="mx-auto mt-12 max-w-7xl">
          <div className="rounded-xl border border-sw-midnight-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-heading text-2xl font-bold text-sw-neutral-500">Assumptions & Methodology</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-sw-neutral-500">Industry Benchmarks</h3>
                <p className="mb-2 text-sm text-sw-neutral-400">Based on HubSpot customer data (2023-2025):</p>
                <ul className="list-inside list-disc space-y-1 text-sm text-sw-neutral-400">
                  <li><strong>Lead Increase:</strong> +205% more marketing leads</li>
                  <li><strong>Close Rate Increase:</strong> +311% improvement in deal close rate</li>
                  <li><strong>Productivity Gains:</strong> 5 hours saved per sales rep per week</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-sw-neutral-500">Key Assumptions</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-sw-neutral-400">
                  <li>Sales reps work 2,080 hours per year (40 hours/week, 52 weeks)</li>
                  <li>One-time implementation costs are amortized over 3 years</li>
                  <li>Software consolidation savings = Current spend - HubSpot cost (minimum $0)</li>
                  <li>Productivity savings based on average salary and hours saved</li>
                  <li>Revenue lift assumes same average deal size for new deals</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-sw-neutral-500">Data Sources</h3>
                <p className="text-sm text-sw-neutral-400">
                  Benchmarks sourced from <a href="https://www.hubspot.com/roi" className="text-sw-violet-500 hover:underline" target="_blank" rel="noopener noreferrer">HubSpot ROI Research</a> and customer case studies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
