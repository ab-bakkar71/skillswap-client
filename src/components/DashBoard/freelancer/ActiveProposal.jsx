"use client";

import { Table } from "@heroui/react";
import React from "react";
import Link from "next/link";
import SubmitTask from "./SubmitTask";
import ViewSubmission from "./ViewSubmission";
import ViewProposalModal from "./ViewProposalModal";
import { IoBriefcaseOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const ActiveProposal = ({ activeProposal }) => {
  const safeList = Array.isArray(activeProposal) ? activeProposal : [];

  if (safeList.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 backdrop-blur-xl font-manrope max-w-xl mx-auto">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-violet-500/10 text-brand-accent flex items-center justify-center">
          <IoCheckmarkCircleOutline className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">No Active Tasks In-Progress</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-5 leading-relaxed">
          When a client accepts your proposal and funds the project, it will appear here for you to work on and submit deliverables.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard/freelancer/proposals"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-zinc-700"
          >
            Check My Proposals
          </Link>
          <Link
            href="/tasks"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-accent hover:bg-violet-600 text-white transition-all shadow-md shadow-violet-500/20"
          >
            Browse Available Tasks 🚀
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Table className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 font-manrope shadow-xl">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Freelancer Active Tasks"
          className="min-w-[700px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Task Title</Table.Column>
            <Table.Column>Client Email</Table.Column>
            <Table.Column>Your Bid</Table.Column>
            <Table.Column>Duration</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="text-center">Actions & Details</Table.Column>
          </Table.Header>

          <Table.Body>
            {safeList.map((proposal) => (
              <Table.Row
                key={proposal._id}
                className="border-b border-zinc-900/60 hover:bg-zinc-900/20 transition-colors"
              >
                <Table.Cell className="font-semibold text-white max-w-[200px] truncate" title={proposal.taskTitle}>
                  {proposal.taskTitle}
                </Table.Cell>

                <Table.Cell className="text-zinc-400 text-xs">
                  {proposal.clientEmail}
                </Table.Cell>

                <Table.Cell className="font-black text-emerald-400">
                  ${proposal.proposedBudget}
                </Table.Cell>

                <Table.Cell className="text-zinc-400 text-xs">
                  {proposal.estimatedDays}{" "}
                  {Number(proposal.estimatedDays) === 1 ? "Day" : "Days"}
                </Table.Cell>

                <Table.Cell>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${
                      proposal.status === "accepted" && proposal.revisionNotes
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                        : proposal.status === "accepted"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : proposal.status === "submitted"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/30 animate-pulse"
                        : proposal.status === "completed"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {proposal.status === "accepted" && proposal.revisionNotes
                      ? "Revision Needed"
                      : proposal.status === "accepted"
                      ? "In Progress"
                      : proposal.status === "submitted"
                      ? "Under Review"
                      : proposal.status === "completed"
                      ? "Completed"
                      : proposal.status}
                  </span>
                </Table.Cell>

                <Table.Cell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ViewProposalModal proposal={proposal} />
                    {proposal.status === "accepted" ? (
                      <SubmitTask proposal={proposal} />
                    ) : proposal.status === "submitted" ? (
                      <>
                        <SubmitTask proposal={proposal} />
                        <ViewSubmission proposal={proposal} />
                      </>
                    ) : proposal.status === "completed" ? (
                      <ViewSubmission proposal={proposal} />
                    ) : null}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default ActiveProposal;