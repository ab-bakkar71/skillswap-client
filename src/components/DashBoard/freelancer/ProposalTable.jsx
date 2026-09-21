"use client";

import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";
import { IoCalendarNumberOutline, IoBriefcaseOutline } from "react-icons/io5";
import ViewSubmission from "./ViewSubmission";
import ViewProposalModal from "./ViewProposalModal";

const ProposalTable = ({ proposals }) => {
  const safeProposals = Array.isArray(proposals) ? proposals : [];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white font-manrope">
      <div className="mb-8 border-b border-zinc-800/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            My Proposals
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 leading-relaxed">
            {safeProposals.length} {safeProposals.length === 1 ? "proposal" : "proposals"} submitted.
          </p>
        </div>

        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-accent hover:bg-violet-600 text-white transition-all shadow-md shadow-violet-500/20 self-start sm:self-auto"
        >
          <IoBriefcaseOutline className="w-4 h-4" />
          <span>Browse More Tasks</span>
        </Link>
      </div>

      {safeProposals.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 backdrop-blur-xl max-w-xl mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-violet-500/10 text-brand-accent flex items-center justify-center">
            <IoBriefcaseOutline className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Proposals Yet</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5 leading-relaxed">
            You haven&apos;t submitted any proposals yet. Explore available client tasks and apply with your skills!
          </p>
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-accent hover:bg-violet-600 text-white transition-all shadow-lg shadow-violet-500/20"
          >
            Explore Available Tasks 🚀
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
          {safeProposals.map((proposal) => (
            <Card
              key={proposal._id}
              className="w-full bg-zinc-900/30 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 flex flex-col justify-between gap-4"
              variant="secondary"
            >
              <div className="flex items-start justify-between gap-4 w-full">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-zinc-100 transition-colors tracking-tight line-clamp-1">
                    {proposal.taskTitle}
                  </h2>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-400 leading-relaxed truncate">
                    <FaRegUserCircle className="text-zinc-500 shrink-0" />
                    <span>Client: {proposal.clientEmail}</span>
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Estimated Days: <strong className="text-zinc-200">{proposal.estimatedDays}</strong>
                  </p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm shrink-0 transition-all duration-200 ${
                    proposal.status === "pending"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse"
                      : proposal.status === "accepted"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : proposal.status === "submitted"
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-400 animate-pulse"
                      : proposal.status === "completed"
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  }`}
                >
                  {proposal.status === "pending" && "Pending"}
                  {proposal.status === "accepted" && "Accepted"}
                  {proposal.status === "submitted" && "Submitted"}
                  {proposal.status === "completed" && "Completed"}
                  {proposal.status === "rejected" && "Rejected"}
                  {!proposal.status && "Pending"}
                </span>
              </div>

              {/* Cover Note Sneak-Peek */}
              {proposal.coverNote && (
                <p className="text-xs text-zinc-400 line-clamp-2 bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-800/50 italic leading-relaxed">
                  &ldquo;{proposal.coverNote}&rdquo;
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/60 w-full mt-auto">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-xs flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-bold">
                    Bid: <IoLogoUsd />
                    <span>{proposal.proposedBudget}</span>
                  </div>

                  <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
                    <IoCalendarNumberOutline className="w-3.5 h-3.5 text-zinc-500" />
                    <span>
                      {proposal?.createdAt
                        ? new Date(proposal.createdAt).toLocaleDateString("en-GB")
                        : "Recently"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ViewProposalModal proposal={proposal} />
                  {proposal.status === "completed" && (
                    <ViewSubmission proposal={proposal} />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProposalTable;