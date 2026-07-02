"use client";
import { Button, Card } from '@heroui/react';
import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { IoLogoUsd } from 'react-icons/io';
import { IoCalendarNumberOutline, IoCheckmarkSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import RejectProposal from './RejectProposal';
import ViewSubmission from '../freelancer/ViewSubmission';


const ProposalClient = ({ proposals }) => {
    const [loadingProposalId, setLoadingProposalId] = useState(null);

    const handleAcceptTask = async (proposal) => {
        setLoadingProposalId(proposal._id);

        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    proposalId: proposal._id,
                    taskId: proposal.taskId,
                    taskTitle: proposal.taskTitle,
                    proposedBudget: proposal.proposedBudget,
                    freelancerName: proposal.freelancerName,
                }),
            });

            const data = await response.json();


            if (data.url) {
                toast.success("Redirecting to secure payment checkout... 💳");

                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to create checkout session.");
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
            toast.error("Something went wrong. Please try again! ❌");
        } finally {
            setLoadingProposalId(null);
        }
    };

    return (
        <div>
            <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
                <div className="mb-8 border-b border-zinc-800/60 pb-6">
                    <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400'>
                        My Proposals
                    </h1>
                    <p className='text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed'>
                        {proposals?.length || 0} {proposals?.length === 1 ? 'proposal' : 'proposals'}.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
                    {proposals?.map((proposal) => {
                        const isProcessing = loadingProposalId === proposal._id;

                        return (
                            <Card
                                key={proposal._id}
                                className="w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-4 w-full">
                                    <div className="space-y-1.5 flex-1">
                                        <h2 className="text-base md:text-lg font-bold text-zinc-100 group-hover:text-brand-accent transition-colors tracking-tight line-clamp-1">
                                            {proposal.taskTitle}
                                        </h2>
                                        <p className="flex items-center gap-1 text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                                            <FaRegUserCircle />
                                            {proposal.freelancerEmail}
                                        </p>
                                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                                            {proposal.coverNote}
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-200 ${proposal.status === "pending"
                                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse"
                                            : proposal.status === "accepted"
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                                : proposal.status === "completed"
                                                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                            }`}
                                    >
                                        {proposal.status === "pending" && "Pending"}
                                        {proposal.status === "accepted" && "Accepted"}
                                        {proposal.status === "completed" && "Completed"}
                                        {proposal.status === "rejected" && "Rejected"}

                                        {!proposal.status && "Pending"}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/40 w-full mt-auto">
                                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                                        <div className="text-xs flex items-center gap-0.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md font-semibold">
                                            Bid : <IoLogoUsd />
                                            <span>{proposal.proposedBudget}</span>
                                        </div>

                                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                                            {proposal.estimatedDays} days
                                        </p>

                                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold">
                                            <IoCalendarNumberOutline className="w-3.5 h-3.5 text-zinc-500" />
                                            <span>{proposal?.createdAt ? new Date(proposal.createdAt).toLocaleDateString('en-GB') : 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {proposal.status === "pending" ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    color="success"
                                                    variant="flat"
                                                    isLoading={isProcessing}
                                                    onClick={() => handleAcceptTask(proposal)}
                                                    className="font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all duration-200 h-9 px-4"
                                                >
                                                    {!isProcessing && <IoCheckmarkSharp className="text-sm" />}
                                                    Accept
                                                </Button>

                                                <RejectProposal
                                                    proposal={proposal}
                                                    isProcessing={isProcessing}
                                                />
                                            </>
                                        ) : proposal.status === "completed" ? (
                                            <ViewSubmission proposal={proposal} />
                                        ) : (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    isDisabled
                                                    className="font-bold text-xs h-9 px-4"
                                                >
                                                    Accept
                                                </Button>

                                                <RejectProposal
                                                    proposal={proposal}
                                                    isProcessing={true}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default ProposalClient;