"use client";

import React, { useState } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import Link from "next/link";
import {
  IoEyeOutline,
  IoDocumentTextOutline,
  IoLogoUsd,
  IoCalendarOutline,
  IoMailOutline,
  IoOpenOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoSparkles,
  IoBulbOutline,
  IoTrendingUpOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { summarizeAIProposal } from "@/lib/actions/ai";
import { toast } from "react-toastify";

export default function ViewProposalModal({ proposal }) {
  const [aiSummary, setAiSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!proposal) return null;

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    try {
      const res = await summarizeAIProposal({
        taskTitle: proposal.taskTitle,
        proposedBudget: proposal.proposedBudget,
        estimatedDays: proposal.estimatedDays,
        coverNote: proposal.coverNote,
        status: proposal.status,
      });

      if (res?.success && res?.data) {
        setAiSummary(res.data);
        toast.success("AI Proposal Summary generated! ✨");
      } else {
        toast.error(res?.message || "Failed to generate summary.");
      }
    } catch (_err) {
      toast.error("Error generating AI summary.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <Modal>
      <Button
        variant="secondary"
        className="inline-flex items-center gap-1.5 font-bold text-xs bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-600 hover:text-white rounded-xl transition-all duration-200 h-8 px-3 cursor-pointer"
      >
        <IoEyeOutline className="w-3.5 h-3.5" />
        <span>View Details</span>
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-white font-manrope shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="pb-3 border-b border-zinc-800/80">
              <div className="flex items-center justify-between gap-3 w-full pr-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-brand-accent">
                    <IoDocumentTextOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <Modal.Heading className="text-base sm:text-lg font-bold text-white">
                      Proposal Details
                    </Modal.Heading>
                    <span className="text-xs text-zinc-400">
                      Submitted on {proposal?.createdAt ? new Date(proposal.createdAt).toLocaleDateString("en-GB") : "Recently"}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${
                    proposal.status === "pending"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : proposal.status === "accepted"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : proposal.status === "submitted"
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                      : proposal.status === "completed"
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  }`}
                >
                  {proposal.status ? proposal.status.toUpperCase() : "PENDING"}
                </span>
              </div>
            </Modal.Header>

            <Modal.Body className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
              {/* Task Title & Link */}
              <Surface
                variant="default"
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Applied Task
                    </h4>
                    <p className="text-sm sm:text-base font-bold text-white leading-snug">
                      {proposal.taskTitle}
                    </p>
                  </div>
                  {proposal.taskId && (
                    <Link
                      href={`/tasks/${proposal.taskId}`}
                      className="inline-flex items-center gap-1 text-xs text-brand-accent hover:text-violet-300 font-semibold px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/20 transition-colors shrink-0"
                    >
                      <span>Open Task</span>
                      <IoOpenOutline className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </Surface>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 mb-1 font-medium">
                    <IoLogoUsd className="w-3.5 h-3.5 text-emerald-400" />
                    Proposed Bid
                  </span>
                  <p className="text-base font-extrabold text-emerald-400">
                    ${proposal.proposedBudget}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 mb-1 font-medium">
                    <IoCalendarOutline className="w-3.5 h-3.5 text-blue-400" />
                    Duration
                  </span>
                  <p className="text-base font-bold text-white">
                    {proposal.estimatedDays} {Number(proposal.estimatedDays) === 1 ? "Day" : "Days"}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/30 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 mb-1 font-medium">
                    <IoMailOutline className="w-3.5 h-3.5 text-violet-400" />
                    Client
                  </span>
                  <p className="text-xs font-semibold text-zinc-300 truncate" title={proposal.clientEmail}>
                    {proposal.clientEmail || "N/A"}
                  </p>
                </div>
              </div>

              {/* AI Proposal Summary Section */}
              <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-purple-950/20 to-zinc-950/60 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-violet-600/30 text-violet-300">
                      <IoSparkles className="w-4 h-4 text-violet-300 animate-pulse" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      AI Proposal Summary & Strategy
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateSummary}
                    disabled={isSummarizing}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white shadow-sm shadow-violet-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <IoSparkles className={`w-3 h-3 ${isSummarizing ? "animate-spin" : ""}`} />
                    <span>{isSummarizing ? "Analyzing..." : aiSummary ? "Re-analyze" : "Generate Summary ✨"}</span>
                  </button>
                </div>

                {aiSummary ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    {/* Executive Pitch */}
                    <div className="p-3 rounded-xl bg-zinc-950/70 border border-violet-500/20">
                      <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider block mb-1">
                        Executive Pitch Summary
                      </span>
                      <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                        {aiSummary.executiveSummary}
                      </p>
                    </div>

                    {/* Strengths & Win Score */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                          <IoShieldCheckmarkOutline className="w-3.5 h-3.5 text-emerald-400" />
                          Key Proposal Strengths
                        </span>
                        <ul className="space-y-1">
                          {aiSummary.keyStrengths?.map((str, idx) => (
                            <li key={idx} className="text-[11px] text-zinc-300 flex items-start gap-1.5 leading-snug">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between text-center sm:text-left">
                        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                          <IoTrendingUpOutline className="w-3.5 h-3.5 text-brand-accent" />
                          Match Rating
                        </span>
                        <div className="my-1">
                          <span className="text-2xl font-black text-brand-accent">
                            {aiSummary.competitivenessScore}%
                          </span>
                          <span className="text-[10px] text-zinc-400 block font-medium">
                            Competitive Bid
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Win Strategy Coaching Tip */}
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                      <IoBulbOutline className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                          AI Coach Tip for Winning
                        </span>
                        <p className="text-[11px] text-amber-200/90 leading-relaxed mt-0.5">
                          {aiSummary.winStrategyTip}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Click <strong className="text-violet-300">Generate Summary ✨</strong> to get an instant AI executive breakdown of this proposal, pitch strengths, and winning strategy tips.
                  </p>
                )}
              </div>

              {/* Revision Notes Alert if requested */}
              {proposal.revisionNotes && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                    <IoAlertCircleOutline className="w-4 h-4" />
                    <span>Client Revision Feedback</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 whitespace-pre-line leading-relaxed">
                    {proposal.revisionNotes}
                  </p>
                </div>
              )}

              {/* Cover Note Section */}
              <Surface
                variant="default"
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2"
              >
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Your Cover Note
                </h4>
                <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                  {proposal.coverNote || "No cover note provided."}
                </div>
              </Surface>

              {/* Submitted Deliverable if exists */}
              {proposal.deliverableUrl && (
                <Surface
                  variant="default"
                  className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <IoCheckmarkCircleOutline className="w-4 h-4" />
                    <span>Submitted Deliverable</span>
                  </div>
                  <a
                    href={proposal.deliverableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-accent hover:underline break-all"
                  >
                    <span>{proposal.deliverableUrl}</span>
                    <IoOpenOutline className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  {proposal.submissionNotes && (
                    <p className="text-xs text-zinc-400 italic mt-1">
                      &ldquo;{proposal.submissionNotes}&rdquo;
                    </p>
                  )}
                </Surface>
              )}
            </Modal.Body>

            <Modal.Footer className="pt-3 border-t border-zinc-800/80">
              <Button slot="close" variant="secondary" className="px-5 rounded-xl text-xs font-semibold">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
