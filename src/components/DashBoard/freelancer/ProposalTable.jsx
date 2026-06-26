import { Card, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoLogoUsd } from 'react-icons/io';
import { IoCalendarNumberOutline } from 'react-icons/io5';

const ProposalTable = ({ proposals }) => {

    console.log(proposals);


    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
            <div className="mb-8 border-b border-zinc-800/60 pb-6">
                <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400'>
                    My Proposals
                </h1>
                <p className='text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed'>
                    {proposals.length} proposal submitted.
                </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
                {
                    proposals.map((proposal) => (
                        <Card
                            key={proposal._id}
                            className="w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5 hover:scale-105 transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer"
                            variant="secondary"
                        >
                            <div className="flex items-start justify-between gap-4 w-full">
                                <div className="space-y-1.5 flex-1">
                                    <h2 className="text-base md:text-lg font-bold text-zinc-100 group-hover:text-brand-accent transition-colors tracking-tight line-clamp-1">
                                        {proposal.taskTitle}
                                    </h2>
                                    <p className="flex items-center gap-1 text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                                        <FaRegUserCircle />
                                        {proposal.clientEmail}
                                    </p>
                                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                                        Estimated Days: {proposal.estimatedDays}
                                    </p>
                                </div>


                                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-200 ${proposal.status === 'pending'
                                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse' // পেন্ডিং এর জন্য হালকা গ্লো বা পালস
                                        : proposal.status === 'accepted'
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' // এক্সেপ্টেড এর জন্য গ্রিন
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400' // রিজেক্টেড এর জন্য রেড
                                    }`}>
                                    {proposal.status === 'pending' && 'Pending'}
                                    {proposal.status === 'accepted' && 'Accepted'}
                                    {proposal.status === 'rejected' && 'Rejected'}

                                    {/* ডাটাবেজে যদি ডিফল্ট কোনো স্ট্যাটাস না থাকে তবে সেফটি ফলব্যাক */}
                                    {!proposal.status && 'Pending'}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/40 w-full mt-auto">


                                <div className="flex flex-wrap items-center gap-3 md:gap-4">




                                    <div className="text-xs flex items-center gap-.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md font-semibold">
                                        Budget Bid : <IoLogoUsd />
                                        <span>{proposal.proposedBudget}</span>
                                    </div>


                                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold">
                                        <IoCalendarNumberOutline className="w-3.5 h-3.5 text-zinc-500" />
                                        <span>{proposal?.createdAt ? new Date(proposal.createdAt).toLocaleDateString('en-GB') : 'N/A'}</span>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    ))
                }
            </div>
        </section>
    );
};

export default ProposalTable;