"use client";
import { postProposal } from '@/lib/actions/freelancer';
import { generateAIProposal } from '@/lib/actions/ai';
import { Button, Card, FieldError, Input, Label, TextArea, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoPaperPlaneOutline, IoSparkles } from 'react-icons/io5';
import { toast } from 'react-toastify';

const SubmitProposal = ({ task, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [proposedBudget, setProposedBudget] = useState(
    task?.budget ? String(Math.max(10, Math.round(Number(task.budget) * 0.95))) : ""
  );
  const [estimatedDays, setEstimatedDays] = useState("3");
  const [coverNote, setCoverNote] = useState("");
  const router = useRouter();

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await generateAIProposal({
        taskTitle: task?.title || "",
        taskDescription: task?.description || "",
        category: task?.category || "",
        budget: task?.budget || 100,
      });

      if (res?.success && res?.data) {
        if (res.data.coverNote) setCoverNote(res.data.coverNote);
        if (res.data.proposedBudget) setProposedBudget(String(res.data.proposedBudget));
        if (res.data.estimatedDays) setEstimatedDays(String(res.data.estimatedDays));
        toast.success("Proposal draft generated with AI! ✨");
      } else {
        toast.error(res?.message || "Failed to generate AI proposal.");
      }
    } catch (err) {
      toast.error("Error generating proposal with AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handelProposal = async (e) => {
    e.preventDefault();

    if (task.clientEmail === user.email) {
      toast.error("You cannot submit a proposal to your own task!");
      return;
    }

    const budget = Number(proposedBudget);
    const days = Number(estimatedDays);

    if (!budget || budget <= 0) {
      toast.error("Proposed budget must be greater than 0.");
      return;
    }

    if (!days || days <= 0) {
      toast.error("Estimated days must be at least 1 day.");
      return;
    }

    if (!coverNote.trim()) {
      toast.error("Please provide a cover note.");
      return;
    }

    setIsLoading(true);

    const finalData = {
      taskId: task._id,
      taskTitle: task.title,
      clientEmail: task.clientEmail,

      freelancerName: user.name,
      freelancerEmail: user.email,
      freelancerImage: user.image || "",
      proposedBudget: budget,
      estimatedDays: days,
      coverNote: coverNote.trim(),
      status: "pending",
    };

    try {
      const res = await postProposal(finalData);

      if (res?.result?.insertedId || res?.success) {
        toast.success("Proposal submitted successfully! 🚀");
        router.push("/dashboard/freelancer/proposals");
      } else {
        toast.error(res?.message || "Failed to submit proposal.");
      }
    } catch (err) {
      toast.error("Failed to submit proposal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <IoPaperPlaneOutline className="text-brand-accent w-5 h-5" />
          <h2>Submit a Proposal</h2>
        </div>
        <button
          type="button"
          onClick={handleAIGenerate}
          disabled={isGeneratingAI || task.status !== "open"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md shadow-violet-500/20 transition-all duration-200 cursor-pointer disabled:opacity-60"
        >
          <IoSparkles className={`w-3.5 h-3.5 ${isGeneratingAI ? "animate-spin" : "animate-pulse"}`} />
          <span>{isGeneratingAI ? "Drafting with AI..." : "Draft with AI ✨"}</span>
        </button>
      </div>

      {/* AI Assistance Hint Banner */}
      <div className="bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-zinc-900/40 border border-violet-800/30 rounded-xl p-3 flex items-start gap-2.5">
        <IoSparkles className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
        <p className="text-xs text-zinc-300 leading-relaxed">
          Need a competitive pitch? Click <strong className="text-violet-300">Draft with AI ✨</strong> to generate a custom proposal tailored to this task.
        </p>
      </div>

      <form onSubmit={handelProposal} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <TextField isRequired className="w-full max-w-64" name="proposedBudget" type="number">
            <Label>Proposed Budget (USD)</Label>
            <Input
              value={proposedBudget}
              onChange={(e) => setProposedBudget(e.target.value)}
              placeholder="e.g. 50"
              variant="bordered"
              className="w-full text-white"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>
          <TextField isRequired className="w-full max-w-64" name="estimatedDays" type="number">
            <Label>Estimated Days</Label>
            <Input
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
              placeholder="e.g. 3"
              variant="bordered"
              className="w-full text-white"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="textarea-rows-4">Cover Note</Label>
            <button
              type="button"
              onClick={handleAIGenerate}
              disabled={isGeneratingAI}
              className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-medium transition-colors"
            >
              <IoSparkles className="w-3 h-3" />
              Auto-fill with AI
            </button>
          </div>
          <TextArea
            isRequired
            name="coverNote"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            aria-label="Cover Note"
            placeholder="Explain why you're the best fit for this task..."
            variant="bordered"
            rows={5}
            className="w-full text-white"
          />
          <FieldError className="text-rose-400 text-xs mt-1" />
        </div>

        <Button
          type="submit"
          isDisabled={task.status !== "open"}
          className="w-full bg-brand-accent hover:bg-violet-600 text-white font-bold h-11 rounded-xl"
        >
          <IoPaperPlaneOutline className="w-5 h-5" />
          {isLoading ? "Submitting Proposal..." : "Submit Proposal"}
        </Button>
      </form>
    </Card>
  );
};

export default SubmitProposal;