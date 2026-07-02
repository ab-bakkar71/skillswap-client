import { Table } from "@heroui/react";
import React from "react";
import SubmitTask from "./SubmitTask";
import ViewSubmission from "./ViewSubmission";

const ActiveProposal = ({ activeProposal }) => {
  if (!Array.isArray(activeProposal) || activeProposal.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 text-sm border border-dashed border-zinc-900 rounded-2xl font-manrope">
        No active tasks at the moment.
      </div>
    );
  }

  return (
    <Table className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 font-manrope">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Freelancer Active Tasks"
          className="min-w-[650px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Task Title</Table.Column>
            <Table.Column>Client Email</Table.Column>
            <Table.Column>Your Bid</Table.Column>
            <Table.Column>Duration</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="text-center">Action</Table.Column>
          </Table.Header>

          <Table.Body>
            {activeProposal.map((proposal) => (
              <Table.Row
                key={proposal._id}
                className="border-b border-zinc-900/60 hover:bg-zinc-900/10"
              >
                <Table.Cell className="font-semibold text-white max-w-[220px] truncate">
                  {proposal.taskTitle}
                </Table.Cell>

                <Table.Cell className="text-zinc-400">
                  {proposal.clientEmail}
                </Table.Cell>

                <Table.Cell className="font-black text-emerald-400">
                  ${proposal.proposedBudget}
                </Table.Cell>

                <Table.Cell className="text-zinc-500 text-xs">
                  {proposal.estimatedDays}{" "}
                  {Number(proposal.estimatedDays) === 1 ? "Day" : "Days"}
                </Table.Cell>

                <Table.Cell>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${
                      proposal.status === "accepted"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : proposal.status === "completed"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {proposal.status}
                  </span>
                </Table.Cell>

                <Table.Cell className="text-center">
                  {proposal.status === "accepted" ? (
                    <SubmitTask proposal={proposal} />
                  ) : proposal.status === "completed" ? (
                    <ViewSubmission proposal={proposal} />
                  ) : (
                    <span className="text-zinc-500 text-xs">--</span>
                  )}
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