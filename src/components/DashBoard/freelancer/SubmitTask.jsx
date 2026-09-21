"use client";
import { submitTask } from '@/lib/actions/freelancer';
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiAlertCircle, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SubmitTask = ({ proposal }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const isRevision = Boolean(proposal?.revisionNotes);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const deliverableUrl = formData.get("deliverableUrl")?.toString().trim();
        const submissionNotes = formData.get("submissionNotes")?.toString().trim() || "";

        if (!deliverableUrl) {
            toast.error("Please enter a valid deliverable URL.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await submitTask(proposal._id, deliverableUrl, submissionNotes);
            if (result && (result.success || result.modifiedCount > 0 || result.matchedCount > 0)) {
                toast.success(result.message || "Work submitted successfully for client review! 🎉");
                router.push('/dashboard/freelancer/active-project');
                router.refresh();
            } else {
                toast.error(result?.message || "Failed to submit task deliverable.");
            }
        } catch (_error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Modal>
                <Button
                    variant="secondary"
                    className={`inline-flex items-center gap-1.5 font-bold text-xs rounded-xl transition-all duration-200 h-8 px-3 cursor-pointer ${
                        isRevision
                            ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black animate-pulse"
                            : proposal?.status === "submitted"
                            ? "bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white"
                            : "bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white"
                    }`}
                >
                    {isRevision ? "Fix & Re-submit" : proposal?.status === "submitted" ? "Update Work" : "Submit Work"}
                </Button>

                <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
                    <Modal.Container placement="center">
                        <Modal.Dialog className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">

                            <Modal.CloseTrigger className="absolute right-5 top-5 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer" />

                            <Modal.Header className="border-b border-zinc-900 px-6 pt-6 pb-4">
                                <Modal.Heading className="text-xl font-bold text-white flex items-center gap-2">
                                    <FiSend className="text-brand-accent" />
                                    {isRevision ? "Re-submit Revised Deliverable" : "Submit Deliverable for Review"}
                                </Modal.Heading>

                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    Provide a link to your completed work for this task (Google Docs, GitHub, Figma, etc.).
                                    The client will review and approve your submission.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="px-6 py-5">
                                <Surface variant="default" className="bg-transparent shadow-none p-0">
                                    <form className="space-y-4" onSubmit={handleSubmit}>

                                        {/* Client Revision Feedback Banner if applicable */}
                                        {isRevision && (
                                            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1.5">
                                                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                                                    <FiAlertCircle />
                                                    Client Revision Feedback
                                                </div>
                                                <p className="text-xs text-amber-200/90 leading-relaxed whitespace-pre-line">
                                                    {proposal.revisionNotes}
                                                </p>
                                            </div>
                                        )}

                                        <TextField
                                            isRequired
                                            className="w-full"
                                            name="deliverableUrl"
                                            type="text"
                                            variant="secondary"
                                            defaultValue={proposal?.deliverableUrl || ""}
                                        >
                                            <Label className="mb-2 text-sm font-semibold text-zinc-300">
                                                Deliverable URL *
                                            </Label>

                                            <Input
                                                placeholder="https://github.com/... or https://docs.google.com/..."
                                                className="w-full"
                                                required
                                            />
                                        </TextField>

                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-semibold text-zinc-300">
                                                Submission Notes (Optional)
                                            </Label>
                                            <textarea
                                                name="submissionNotes"
                                                placeholder="Describe what was accomplished or instructions for accessing the deliverables..."
                                                className="w-full text-xs bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand-accent transition-colors resize-y min-h-[80px]"
                                                rows={3}
                                                defaultValue={proposal?.submissionNotes || ""}
                                            />
                                        </div>

                                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3.5">
                                            <p className="text-xs text-zinc-400 leading-relaxed">
                                                <span className="font-semibold text-white">Review Process:</span> Once submitted, the client will inspect your deliverable. When approved, the task is marked completed!
                                            </p>
                                        </div>

                                        <Modal.Footer className="flex gap-3 border-t border-zinc-900 px-0 pt-4 pb-0">
                                            <Button
                                                slot="close"
                                                variant="secondary"
                                                className="flex-1 h-11 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 text-xs font-semibold cursor-pointer">
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                isDisabled={isLoading}
                                                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-brand-accent to-violet-600 font-bold text-white text-xs hover:opacity-90 shadow-lg shadow-violet-500/10 cursor-pointer">
                                                {isLoading ? "Submitting..." : isRevision ? "✓ Submit Revised Work" : "✓ Submit for Review"}
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default SubmitTask;