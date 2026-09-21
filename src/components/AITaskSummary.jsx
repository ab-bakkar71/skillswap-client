"use client";

import React, { useState } from "react";
import {
  IoSparkles,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoInformationCircle,
  IoTimeOutline,
  IoLogoUsd,
  IoLayersOutline,
  IoBulbOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { summarizeAITask } from "@/lib/actions/ai";
import { toast } from "react-toastify";

export default function AITaskSummary({ task }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!task) return null;

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const res = await summarizeAITask({
        title: task.title,
        description: task.description,
        category: task.category,
        budget: task.budget,
        deadline: task.deadline,
      });

      if (res?.success && res?.data) {
        setAnalysis(res.data);
        setIsExpanded(true);
        toast.success("AI Task analysis complete! 🚀");
      } else {
        toast.error(res?.message || "Failed to analyze task.");
      }
    } catch (_err) {
      toast.error("Error analyzing task with AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-violet-950/40 via-zinc-900/50 to-zinc-950/80 border border-violet-500/30 p-5 md:p-6 backdrop-blur-xl shadow-xl font-manrope transition-all">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-violet-600/30 text-violet-300 border border-violet-500/30">
            <IoSparkles className="w-5 h-5 text-violet-300 animate-pulse" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>AI Task Summary & Bid Advisor</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Fit Advisor
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Instant scope breakdown and feasibility check to help you decide before bidding.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md shadow-violet-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <IoSparkles className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>{isLoading ? "Analyzing Scope..." : analysis ? "Re-Analyze ✨" : "Analyze Task with AI ✨"}</span>
          </button>

          {analysis && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label="Toggle analysis"
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              {isExpanded ? <IoChevronUp className="w-4 h-4" /> : <IoChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Analysis Result Body */}
      {analysis ? (
        isExpanded && (
          <div className="mt-5 space-y-4 animate-in fade-in duration-300">
            {/* Verdict Card */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                analysis.verdictType === "positive"
                  ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
                  : analysis.verdictType === "caution"
                  ? "bg-rose-950/30 border-rose-500/30 text-rose-300"
                  : "bg-amber-950/30 border-amber-500/30 text-amber-300"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {analysis.verdictType === "positive" ? (
                  <IoCheckmarkCircle className="w-5 h-5 text-emerald-400" />
                ) : analysis.verdictType === "caution" ? (
                  <IoAlertCircle className="w-5 h-5 text-rose-400" />
                ) : (
                  <IoInformationCircle className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Bidding Verdict:
                  </span>
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    {analysis.verdict}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {analysis.verdictReason}
                </p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1.5">
              <span className="text-[11px] text-violet-400 font-bold uppercase tracking-wider block">
                Executive Task Summary
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                {analysis.executiveSummary}
              </p>
            </div>

            {/* Scope & Effort Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 mb-1 font-medium">
                  <IoLayersOutline className="w-3.5 h-3.5 text-blue-400" />
                  Task Complexity
                </span>
                <p className="text-sm sm:text-base font-bold text-white">
                  {analysis.complexity} Scope
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 mb-1 font-medium">
                  <IoTimeOutline className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Turnaround
                </span>
                <p className="text-sm sm:text-base font-bold text-white">
                  {analysis.estimatedEffort}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 mb-1 font-medium">
                  <IoLogoUsd className="w-3.5 h-3.5 text-emerald-400" />
                  Budget Evaluation
                </span>
                <p className="text-sm sm:text-base font-bold text-emerald-400">
                  {analysis.budgetEvaluation}
                </p>
              </div>
            </div>

            {/* Skills Checklist */}
            {Array.isArray(analysis.requiredSkills) && analysis.requiredSkills.length > 0 && (
              <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/60 space-y-2">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">
                  Core Skills Recommended for this Task:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Winning Pitch Tip */}
            {analysis.winningTip && (
              <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/20 flex items-start gap-2.5">
                <IoBulbOutline className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider block">
                    AI Advisor Tip for Your Proposal
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">
                    {analysis.winningTip}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/40 border border-dashed border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Wondering if this task fits your expertise and offers fair compensation? Click <strong className="text-violet-300">Analyze Task with AI ✨</strong> to generate an instant scope summary, effort estimate, and bidding recommendation.
          </p>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading}
            className="text-xs text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Run Analysis</span>
            <IoSparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
