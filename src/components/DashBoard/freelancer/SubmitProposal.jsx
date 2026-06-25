"use client"
import { postProposal } from '@/lib/actions/client';
import { Button, Card, FieldError, Input, Label, TextArea, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const SubmitProposal = ({ task, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handelProposal = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      taskId: task._id,
      taskTitle: task.title,
      clientEmail: task.clientEmail,

      freelancerName: user.name,
      freelancerEmail: user.email,
      freelancerImage: user.image || "",
      proposedBudget: Number(data.proposedBudget),
      estimatedDays: Number(data.estimatedDays),
      coverNote: data.coverNote,
      status: "pending",
    };

    // backend api call
    const res = await postProposal(finalData);
    if (res.insertedId) {
      toast.success('Proposal submitted successfully!');
      router.push('/dashboard/freelancer/proposals')
    } else {
      toast.error(error.message)
    }
    setIsLoading(false)

  }


  return (
    <Card className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-zinc-900 pb-3">
        <IoPaperPlaneOutline className="text-brand-accent w-5 h-5" />
        <h2>Submit a Proposal</h2>
      </div>

      <form onSubmit={handelProposal} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <TextField isRequired className="w-full max-w-64" name="proposedBudget" type="number">
            <Label>Proposed Budget (USD)</Label>
            <Input placeholder="e.g. 50" variant="bordered" className="w-full text-white" />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>
          <TextField isRequired className="w-full max-w-64" name="estimatedDays" type="number">
            <Label>Estimated Days</Label>
            <Input isRequired placeholder="e.g. 3" variant="bordered" className="w-full text-white" />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="textarea-rows-4">Cover Note</Label>
          <TextArea
            isRequired
            name='coverNote'
            aria-label="Cover Note"
            placeholder="Explain why you're the best fit for this task..."
            variant="bordered"
            rows={4}
            className="w-full text-white"

          />
          <FieldError className="text-rose-400 text-xs mt-1" />
        </div>

        <Button type='submit' className="w-full bg-brand-accent hover:bg-violet-600 text-white font-bold h-11 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/10 active:scale-98">
          <IoPaperPlaneOutline className="text-brand-accent w-5 h-5" />
          {isLoading ? "Submitting Proposal..." : "Submit Proposal"}
        </Button>
      </form>
    </Card>
  );
};

export default SubmitProposal;