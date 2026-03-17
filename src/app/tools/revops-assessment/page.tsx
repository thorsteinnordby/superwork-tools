"use client";

import { useState } from "react";
import Link from "next/link";
import { QUESTIONS, Answers, QuestionId, DimensionKey } from "@/types/revops";
import { calculateAssessment, getTierDescription, getDimensionInsight } from "@/lib/revopsScoring";

export default function RevOpsAssessmentPage() {
  const [step, setStep] = useState<"intro" | "questions" | "results">("intro");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionId: QuestionId, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance to next question
    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // All questions answered, show results
      setTimeout(() => setStep("results"), 300);
    }
  };

  const results = step === "results" ? calculateAssessment(name, company, answers) : null;

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sw-midnight-50 to-white">
      {/* Header */}
      <div className="border-b border-sw-midnight-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-sw-neutral-400 transition-colors hover:text-sw-violet-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tools
          </Link>
          <h1 className="mb-2 font-heading text-h2 text-sw-neutral-500">RevOps Maturity Assessment</h1>
          <p className="text-body-primary text-sw-neutral-400">
            Evaluate your RevOps maturity across 5 dimensions in 3 minutes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Intro Screen */}
          {step === "intro" && (
            <div className="rounded-xl border border-sw-midnight-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-heading text-2xl font-bold text-sw-neutral-500">
                Discover Your RevOps Maturity Level
              </h2>
              <p className="mb-6 text-body-primary text-sw-neutral-400">
                This assessment evaluates your operations across 5 critical dimensions:
              </p>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-sw-midnight-50 p-4">
                  <div className="mb-2 font-semibold text-sw-neutral-500">📊 Data Trust</div>
                  <div className="text-sm text-sw-neutral-400">Single source of truth, data quality, validation</div>
                </div>
                <div className="rounded-lg bg-sw-midnight-50 p-4">
                  <div className="mb-2 font-semibold text-sw-neutral-500">🔄 Process Adoption</div>
                  <div className="text-sm text-sw-neutral-400">Lifecycle stages, pipeline management, cadence</div>
                </div>
                <div className="rounded-lg bg-sw-midnight-50 p-4">
                  <div className="mb-2 font-semibold text-sw-neutral-500">⚡ Automation</div>
                  <div className="text-sm text-sw-neutral-400">Workflow coverage, stage triggers, data enrichment</div>
                </div>
                <div className="rounded-lg bg-sw-midnight-50 p-4">
                  <div className="mb-2 font-semibold text-sw-neutral-500">🤝 Cross-Team Alignment</div>
                  <div className="text-sm text-sw-neutral-400">Shared definitions, ownership, permissions</div>
                </div>
                <div className="rounded-lg bg-sw-midnight-50 p-4 sm:col-span-2">
                  <div className="mb-2 font-semibold text-sw-neutral-500">🤖 AI Readiness</div>
                  <div className="text-sm text-sw-neutral-400">AI usage, data quality for AI, governance</div>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-sw-midnight-200 bg-white px-4 py-3 text-sm text-sw-neutral-500 transition-all placeholder:text-sw-neutral-400 focus:border-sw-violet-500 focus:shadow-[0_0_0_3px_rgba(106,109,205,0.12)] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-sw-midnight-200 bg-white px-4 py-3 text-sm text-sw-neutral-500 transition-all placeholder:text-sw-neutral-400 focus:border-sw-violet-500 focus:shadow-[0_0_0_3px_rgba(106,109,205,0.12)] focus:outline-none"
                />
                <button
                  onClick={() => setStep("questions")}
                  disabled={!name || !company}
                  className="w-full rounded-full bg-sw-green-500 px-6 py-3 font-body text-base font-semibold text-sw-midnight-500 transition-all hover:bg-sw-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          )}

          {/* Questions Screen */}
          {step === "questions" && (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm text-sw-neutral-400">
                  <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-sw-midnight-100">
                  <div
                    className="h-full bg-sw-violet-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-xl border border-sw-midnight-200 bg-white p-8 shadow-sm">
                <div className="mb-2 text-sm font-semibold text-sw-violet-500">
                  {QUESTIONS[currentQuestion].dimension === "DataTrust" && "📊 Data Trust"}
                  {QUESTIONS[currentQuestion].dimension === "ProcessAdoption" && "🔄 Process Adoption"}
                  {QUESTIONS[currentQuestion].dimension === "Automation" && "⚡ Automation"}
                  {QUESTIONS[currentQuestion].dimension === "Alignment" && "🤝 Cross-Team Alignment"}
                  {QUESTIONS[currentQuestion].dimension === "AIReadiness" && "🤖 AI Readiness"}
                </div>
                <h2 className="mb-6 font-heading text-2xl font-bold text-sw-neutral-500">
                  {QUESTIONS[currentQuestion].title}
                </h2>
                <div className="space-y-3">
                  {QUESTIONS[currentQuestion].options.map((option, index) => {
                    const isSelected = answers[QUESTIONS[currentQuestion].id] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(QUESTIONS[currentQuestion].id, index)}
                        className={`w-full rounded-lg border-2 p-4 text-left text-sm transition-all ${
                          isSelected
                            ? "border-sw-violet-500 bg-sw-violet-500/5"
                            : "border-sw-midnight-200 bg-white hover:border-sw-violet-500/50 hover:bg-sw-midnight-50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="rounded-full border-2 border-sw-midnight-200 bg-white px-6 py-2 text-sm font-semibold text-sw-neutral-500 transition-all hover:bg-sw-midnight-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {currentQuestion === QUESTIONS.length - 1 && answers[QUESTIONS[currentQuestion].id] !== undefined && (
                    <button
                      onClick={() => setStep("results")}
                      className="rounded-full bg-sw-green-500 px-6 py-2 text-sm font-semibold text-sw-midnight-500 transition-all hover:bg-sw-green-700"
                    >
                      See Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {step === "results" && results && (
            <div className="space-y-6">
              {/* Score Overview */}
              <div className="rounded-xl border border-sw-midnight-200 bg-white p-8 shadow-sm">
                <div className="mb-6 text-center">
                  <div className="mb-2 text-sm font-semibold text-sw-neutral-400">Your RevOps Maturity</div>
                  <div className="mb-2 text-6xl font-bold text-sw-violet-500">{results.totalScore}</div>
                  <div className="mb-4 text-2xl font-bold text-sw-neutral-500">{results.tier}</div>
                  <p className="mx-auto max-w-2xl text-sm text-sw-neutral-400">{getTierDescription(results.tier)}</p>
                </div>

                {/* Dimension Scores */}
                <div className="space-y-4">
                  {Object.values(results.dimensions).map((dim) => (
                    <div key={dim.name}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-semibold text-sw-neutral-500">{dim.displayName}</span>
                        <span className="text-sw-neutral-400">{dim.score}/100</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-sw-midnight-100">
                        <div
                          className="h-full bg-sw-violet-500 transition-all"
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div className="rounded-xl border border-sw-midnight-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Key Insights</h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-red-50 p-4">
                    <div className="mb-1 font-semibold text-red-900">Primary Gap: {results.dimensions[results.primaryGap].displayName}</div>
                    <p className="text-sm text-red-800">{getDimensionInsight(results.primaryGap, results.dimensions[results.primaryGap].score)}</p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="mb-1 font-semibold text-orange-900">Secondary Gap: {results.dimensions[results.secondaryGap].displayName}</div>
                    <p className="text-sm text-orange-800">{getDimensionInsight(results.secondaryGap, results.dimensions[results.secondaryGap].score)}</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="mb-1 font-semibold text-green-900">Strength: {results.dimensions[results.strength].displayName}</div>
                    <p className="text-sm text-green-800">{getDimensionInsight(results.strength, results.dimensions[results.strength].score)}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl border border-sw-violet-500 bg-gradient-to-br from-sw-violet-500/5 to-sw-violet-500/10 p-8 shadow-sm">
                <h2 className="mb-4 font-heading text-xl font-bold text-sw-neutral-500">Ready to Level Up Your RevOps?</h2>
                <p className="mb-6 text-sm text-sw-neutral-400">
                  Get a personalized roadmap to improve your {results.dimensions[results.primaryGap].displayName.toLowerCase()} and accelerate growth.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sw-green-500 px-6 py-3 font-body text-base font-semibold text-sw-midnight-500 transition-all hover:bg-sw-green-700"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
