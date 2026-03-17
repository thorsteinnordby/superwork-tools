"use client";

import { useState, useCallback, useMemo } from "react";
import type { Metadata } from "next";

/* ─── Preset Data ─── */
const SOURCE_PRESETS = ["google", "linkedin", "facebook", "hubspot", "newsletter", "partner"];
const MEDIUM_PRESETS = ["cpc", "email", "social", "organic", "paid-social", "referral"];

/* ─── Types ─── */
interface HistoryEntry {
  url: string;
  campaign: string;
  source: string;
  medium: string;
  time: string;
}

/* ─── Chip Component ─── */
function PresetChips({
  presets,
  value,
  onChange,
}: {
  presets: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {presets.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(value === p ? "" : p)}
          className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
            value === p
              ? "border-sw-violet-500 bg-sw-violet-500 text-white"
              : "border-sw-midnight-200 bg-sw-midnight-100 text-sw-neutral-400 hover:border-sw-violet-500 hover:text-sw-violet-500"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

/* ─── Copy Button ─── */
function CopyButton({
  text,
  label = "Copy URL",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={copy}
      className={`btn rounded-lg transition-all ${
        copied
          ? "bg-sw-violet-500 text-white"
          : "bg-sw-green-500 text-sw-midnight-500 hover:-translate-y-0.5 hover:bg-sw-green-700 hover:shadow-btn-green"
      } ${className}`}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

/* ─── Main Page ─── */
export default function UtmBuilderPage() {
  const [baseUrl, setBaseUrl] = useState("https://yoursite.com/demo");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  /* Build the URL */
  const generatedUrl = useMemo(() => {
    const base = baseUrl.trim();
    if (!base) return null;
    const params: [string, string][] = [];
    if (source.trim()) params.push(["utm_source", source.trim()]);
    if (medium.trim()) params.push(["utm_medium", medium.trim()]);
    if (campaign.trim()) params.push(["utm_campaign", campaign.trim()]);
    if (term.trim()) params.push(["utm_term", term.trim()]);
    if (content.trim()) params.push(["utm_content", content.trim()]);
    if (params.length === 0) return null;
    const sep = base.includes("?") ? "&" : "?";
    return (
      base +
      sep +
      params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")
    );
  }, [baseUrl, source, medium, campaign, term, content]);

  /* Highlighted URL parts for display */
  const urlDisplay = useMemo(() => {
    if (!generatedUrl) return null;
    const base = baseUrl.trim();
    const sep = base.includes("?") ? "&" : "?";
    const params: [string, string][] = [];
    if (source.trim()) params.push(["utm_source", source.trim()]);
    if (medium.trim()) params.push(["utm_medium", medium.trim()]);
    if (campaign.trim()) params.push(["utm_campaign", campaign.trim()]);
    if (term.trim()) params.push(["utm_term", term.trim()]);
    if (content.trim()) params.push(["utm_content", content.trim()]);

    return (
      <>
        {base}
        {sep}
        {params.map(([k, v], i) => (
          <span key={k}>
            {i > 0 && "&"}
            <span className="font-semibold text-sw-violet-500">{k}</span>=
            <span className="text-sw-green-900">{encodeURIComponent(v)}</span>
          </span>
        ))}
      </>
    );
  }, [generatedUrl, baseUrl, source, medium, campaign, term, content]);

  const addToHistory = useCallback(() => {
    if (!generatedUrl) return;
    setHistory((prev) => {
      if (prev.length > 0 && prev[0].url === generatedUrl) return prev;
      const entry: HistoryEntry = {
        url: generatedUrl,
        campaign: campaign.trim() || "No campaign",
        source: source.trim(),
        medium: medium.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      return [entry, ...prev].slice(0, 10);
    });
  }, [generatedUrl, campaign, source, medium]);

  const handleCopyAndSave = useCallback(async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = generatedUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    addToHistory();
  }, [generatedUrl, addToHistory]);

  const reset = () => {
    setBaseUrl("https://yoursite.com/demo");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  /* ─── Input field helper ─── */
  const InputField = ({
    label,
    param,
    required,
    value,
    onChange,
    placeholder,
    presets,
    isTextArea,
  }: {
    label: string;
    param?: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    presets?: string[];
    isTextArea?: boolean;
  }) => (
    <div className="mb-6">
      <label className="mb-1.5 flex items-center gap-2 text-label text-sw-neutral-500">
        {param && (
          <span className="rounded bg-sw-violet-500/8 px-2 py-0.5 font-mono text-meta text-sw-violet-500">
            {param}
          </span>
        )}
        {label}
        {required !== undefined && (
          <span
            className={`text-meta font-normal ${
              required ? "text-sw-violet-500" : "text-sw-neutral-400"
            }`}
          >
            {required ? "required" : "optional"}
          </span>
        )}
      </label>
      <p className="mb-2 text-meta text-sw-neutral-400">{placeholder}</p>
      <input
        type={param ? "text" : "url"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-sw-midnight-200 bg-white px-3.5 py-2.5 text-sm text-sw-neutral-500 transition-all placeholder:text-sw-neutral-400 focus:border-sw-violet-500 focus:shadow-[0_0_0_3px_rgba(106,109,205,0.12)] focus:outline-none"
      />
      {presets && <PresetChips presets={presets} value={value} onChange={onChange} />}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mx-auto flex max-w-[1120px] items-start gap-6 max-md:flex-col">
        {/* ── Left: Tool ── */}
        <div className="min-w-0 flex-1 max-w-[720px]">
          {/* Header */}
          <div className="rounded-t-lg bg-gradient-to-br from-sw-midnight-500 to-sw-midnight-600 px-8 py-9 text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-sw-green-500 px-3 py-1 text-meta text-sw-midnight-500">
              Free Tool
            </span>
            <h1 className="mb-2 font-heading text-h3">
              HubSpot UTM Tag Builder
            </h1>
            <p className="text-body-base opacity-80">
              Generate campaign-tracked URLs for HubSpot reporting
            </p>
          </div>

          {/* Card body */}
          <div className="rounded-b-lg bg-white p-8 shadow-card-hover">
            <InputField
              label="Landing Page URL"
              required={true}
              value={baseUrl}
              onChange={setBaseUrl}
              placeholder="https://yoursite.com/landing-page"
            />

            <hr className="my-7 border-sw-midnight-200" />
            <p className="mb-4 text-meta text-sw-neutral-400">
              UTM Parameters
            </p>

            <InputField
              label="Traffic Source"
              param="utm_source"
              required={true}
              value={source}
              onChange={setSource}
              placeholder="e.g., google, linkedin, hubspot"
              presets={SOURCE_PRESETS}
            />
            <InputField
              label="Medium"
              param="utm_medium"
              required={true}
              value={medium}
              onChange={setMedium}
              placeholder="e.g., cpc, email, social"
              presets={MEDIUM_PRESETS}
            />
            <InputField
              label="Campaign Name"
              param="utm_campaign"
              required={true}
              value={campaign}
              onChange={setCampaign}
              placeholder="e.g., q1-2026-product-launch"
            />
            <InputField
              label="Term"
              param="utm_term"
              required={false}
              value={term}
              onChange={setTerm}
              placeholder="e.g., hubspot+crm, sales-leaders"
            />
            <InputField
              label="Content"
              param="utm_content"
              required={false}
              value={content}
              onChange={setContent}
              placeholder="e.g., hero-cta, sidebar-banner, variant-a"
            />

            <hr className="my-7 border-sw-midnight-200" />

            {/* Output */}
            <div
              className={`mb-4 rounded-lg border p-4 transition-all ${
                generatedUrl
                  ? "border-sw-green-500 bg-[rgba(191,233,55,0.06)]"
                  : "border-sw-midnight-200 bg-sw-midnight-100"
              }`}
            >
              <p className="mb-2 text-meta text-sw-neutral-400">
                Generated URL
              </p>
              <div className="min-h-[20px] break-all font-mono text-body-compact leading-relaxed text-sw-neutral-500">
                {urlDisplay ?? (
                  <span className="font-body text-body-compact italic text-sw-neutral-400">
                    Fill in the fields above to generate your tagged URL
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2.5 max-sm:flex-col">
              {generatedUrl ? (
                <CopyButton
                  text={generatedUrl}
                  className="flex-1 px-5 py-2.5 text-sm"
                />
              ) : (
                <button
                  disabled
                  className="flex-1 rounded-lg bg-sw-midnight-200 px-5 py-2.5 text-sm font-semibold text-sw-neutral-400"
                >
                  Copy URL
                </button>
              )}
              <button
                onClick={reset}
                className="btn rounded-lg border border-sw-midnight-200 bg-sw-midnight-100 px-5 py-2.5 text-sw-neutral-500 transition-all hover:bg-sw-midnight-200"
              >
                Reset
              </button>
            </div>

            {/* History */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-meta text-sw-neutral-400">
                  Recent URLs{" "}
                  {history.length > 0 && (
                    <span className="text-sw-neutral-400">({history.length})</span>
                  )}
                </p>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="text-meta text-sw-neutral-400 hover:text-sw-violet-500"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {history.length === 0 ? (
                  <p className="py-5 text-center text-body-compact text-sw-neutral-400">
                    No URLs generated yet
                  </p>
                ) : (
                  history.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-lg border border-sw-midnight-200 bg-sw-midnight-100 px-3.5 py-2.5 transition-all hover:border-sw-violet-500"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-body-compact font-semibold text-sw-neutral-500">
                          {item.campaign}
                        </p>
                        <p className="truncate text-meta text-sw-neutral-400">
                          {item.source} / {item.medium} — {item.time}
                        </p>
                      </div>
                      <CopyButton
                        text={item.url}
                        label="Copy"
                        className="shrink-0 px-3 py-1.5 text-xs"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <aside className="sticky top-[72px] w-[340px] shrink-0 max-md:static max-md:w-full">
          {/* Download CTA */}
          <div className="relative overflow-hidden rounded-lg bg-sw-midnight-500 p-7 shadow-card-hover">
            <div className="absolute -right-10 -top-10 h-[140px] w-[140px] rounded-full bg-sw-green-500 opacity-[0.06]" />
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-sw-green-500/25 bg-sw-green-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-sw-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>
            <div className="mb-5">
              <h3 className="mb-2 font-heading text-body-primary font-bold leading-snug text-white">
                Download the free UTM tracking link builder template
              </h3>
              <p className="text-body-compact leading-relaxed text-sw-neutral-400">
                Pre-built spreadsheet with naming conventions, campaign taxonomy,
                and auto-generated URLs — ready for your whole team.
              </p>
            </div>
            <a
              href="#"
              className="btn flex w-full items-center justify-center gap-2 rounded-lg bg-sw-green-500 px-5 py-3 text-sw-midnight-500 transition-all hover:-translate-y-0.5 hover:bg-sw-green-700 hover:shadow-btn-green"
            >
              Download Free
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>

          {/* Tip card */}
          <div className="mt-4 rounded-lg border border-sw-midnight-200 bg-white p-5 shadow-card">
            <p className="mb-2.5 text-meta text-sw-violet-500">
              UTM Best Practice
            </p>
            <p className="text-body-compact leading-relaxed text-sw-neutral-500">
              Always use{" "}
              <code className="rounded bg-sw-midnight-100 px-1.5 py-0.5 font-mono text-meta text-sw-violet-500">
                lowercase
              </code>{" "}
              and{" "}
              <code className="rounded bg-sw-midnight-100 px-1.5 py-0.5 font-mono text-meta text-sw-violet-500">
                hyphens
              </code>{" "}
              in your UTM values. This keeps HubSpot reports clean —{" "}
              <code className="rounded bg-sw-midnight-100 px-1.5 py-0.5 font-mono text-meta text-sw-violet-500">
                LinkedIn
              </code>{" "}
              and{" "}
              <code className="rounded bg-sw-midnight-100 px-1.5 py-0.5 font-mono text-meta text-sw-violet-500">
                linkedin
              </code>{" "}
              show up as separate sources.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
