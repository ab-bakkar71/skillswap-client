"use client";

import { approveDeliverable, requestRevision } from "@/lib/actions/client";
import { Button, Modal, Surface, Textarea } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiCheckCircle, FiExternalLink, FiRotateCcw } from "react-icons/fi";
import { toast } from "react-toastify";

const ReviewSubmission = ({ proposal }) => {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState("");

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const result = await approveDeliverable(proposal._id);
      if (result && result.success) {
        toast.success("Deliverable approved! Task marked as completed. 🎉");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to approve deliverable.");
      }
    } catch (_error) {
      toast.error("Something went wrong while approving deliverable.");
    } finally {
      setIsApproving(false);
    }
  };

  const handleRevisionSubmit = async (e) => {
    e.preventDefault();
    if (!revisionNotes.trim()) {
      toast.error("Please explain what revisions are needed.");
      return;
    }

    setIsRequestingRevision(true);
    try {
      const result = await requestRevision(proposal._id, revisionNotes);
      if (result && result.success) {
        toast.success("Revision requested. Freelancer has been notified.");
        setShowRevisionForm(false);
        setRevisionNotes("");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to request revision.");
      }
    } catch (_error) {
      toast.error("Something went wrong while requesting revision.");
    } finally {
      setIsRequestingRevision(false);
    }
  };

  return (
    <Modal>
      <Button
        variant="secondary"
        className="inline-flex items-center gap-1.5 font-bold text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-200 h-9 px-3.5 cursor-pointer shadow-sm animate-pulse"
      >
        Review Work
      </Button>

      <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
            <Modal.CloseTrigger className="absolute right-5 top-5 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer" />

            <Modal.Header className="border-b border-zinc-900 px-6 pt-6 pb-4">
              <Modal.Heading className="text-xl font-bold text-white flex items-center gap-2">
                Review Submitted Deliverable
              </Modal.Heading>
              <p className="mt-1 text-xs text-zinc-400">
                Inspect the work submitted by the freelancer. You can approve and release completion, or request revisions.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 py-5 space-y-4">
              {/* Task Title */}
              <Surface variant="default" className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-4">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                  Task
                </span>
                <p className="text-sm font-bold text-zinc-200">{proposal.taskTitle}</p>
                <p className="text-xs text-zinc-500 mt-0.5">Freelancer: {proposal.freelancerEmail}</p>
              </Surface>

              {/* Deliverable Link */}
              <Surface variant="default" className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4">
                <span className="text-[11px] font-semibold text-brand-accent uppercase tracking-wider block mb-1.5">
                  Deliverable URL
                </span>
                <a
                  href={proposal.deliverableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-violet-400 font-semibold hover:text-violet-300 break-all underline decoration-violet-500/40 hover:decoration-violet-400 transition-colors"
                >
                  {proposal.deliverableUrl}
                  <FiExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </Surface>

              {/* Submission Notes */}
              {proposal.submissionNotes && (
                <Surface variant="default" className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-4">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                    Freelancer Notes
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                    {proposal.submissionNotes}
                  </p>
                </Surface>
              )}

              {/* Revision Count Notice */}
              {proposal.revisionCount > 0 && (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                  <FiRotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>Previous Revisions Requested: {proposal.revisionCount}</span>
                </div>
              )}

              {/* Revision Feedback Form */}
              {showRevisionForm && (
                <form onSubmit={handleRevisionSubmit} className="space-y-3 pt-2 border-t border-zinc-900">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-400">
                      Revision Instructions for Freelancer:
                    </label>
                    <Textarea
                      required
                      value={revisionNotes}
                      onChange={(e) => setRevisionNotes(e.target.value)}
                      placeholder="Explain specifically what needs to be fixed, added, or improved..."
                      className="w-full text-xs"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowRevisionForm(false)}
                      className="rounded-xl text-xs h-8 px-3 border border-zinc-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="warning"
                      size="sm"
                      isDisabled={isRequestingRevision}
                      className="rounded-xl text-xs h-8 px-4 bg-amber-500 font-bold text-zinc-950 hover:bg-amber-400"
                    >
                      {isRequestingRevision ? "Submitting..." : "Send Revision Request"}
                    </Button>
                  </div>
                </form>
              )}
            </Modal.Body>

            <Modal.Footer className="flex flex-wrap gap-2.5 border-t border-zinc-900 px-6 py-4 justify-end">
              {!showRevisionForm && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowRevisionForm(true)}
                    className="h-10 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs font-bold cursor-pointer"
                  >
                    <FiRotateCcw className="w-3.5 h-3.5 mr-1" />
                    Request Revision
                  </Button>

                  <Button
                    type="button"
                    onClick={handleApprove}
                    isDisabled={isApproving}
                    className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5 mr-1" />
                    {isApproving ? "Approving..." : "Approve & Complete"}
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ReviewSubmission;
