import ProposalClient from '@/components/DashBoard/Client/ProposalClient';
import { getProposalById } from '@/lib/api/client';
import { getTaskById } from '@/lib/api/freelancer';
import { Button, Card } from '@heroui/react';
import React from 'react';
import { BiGlobe } from 'react-icons/bi';
import { FaRegEdit, FaRegUserCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { IoLogoUsd } from 'react-icons/io';
import { IoCalendarNumberOutline, IoCheckmarkSharp, IoTrashBin } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

const taskIdPage = async ({ params }) => {
    const { id } = await params;
    const task = await getTaskById(id);
    const proposals = await getProposalById(id);
    

    return (
        <section className='max-w-5xl mx-auto'>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight mb-6">{task.title}</h1>
            <Card className='w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5  transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer'>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-200 ${task.status === 'open'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 animate-pulse'
                        : task.status === 'in-progress'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}>
                        {task.status === 'open' && 'Open'}
                        {task.status === 'in-progress' && 'In Progress'}
                        {task.status === 'completed' && 'Completed'}
                    </span>

                    <span className="text-xs font-semibold bg-zinc-800/40 border border-zinc-700/50 text-zinc-300 px-2.5 py-1 rounded-md capitalize">
                        {task.category.replace('-', ' ')}
                    </span>


                    <div className="text-xs flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                        <IoLogoUsd />
                        <span>{task.budget}</span>
                    </div>


                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <IoCalendarNumberOutline className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{task.deadline}</span>
                    </div>

                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                    {task.description}
                </p>
                <div className="flex flex-wrap items-center justify-start gap-3 pt-3 border-t border-zinc-800/40 w-full mt-auto">
                    <Button variant='outline'>
                        <FaRegEdit />
                        Edit
                    </Button>
                    <Button variant="danger">
                        <MdDeleteForever />
                        Delete
                    </Button>
                </div>
            </Card>
                        {/* for proposal */}
            <div className='w-full bg-zinc-900/20 border border-zinc-800/80 mt-7 p-4 rounded-2xl'>

            <p className='text-sm md:text-md text-zinc-400 my-3 max-w-3xl leading-relaxed'>
                        {proposals.length} proposal.
                    </p>
                <div className="grid grid-cols-1 gap-5 w-full">
                    {
                        proposals.map((proposal) => (
                            <Card
                                key={proposal._id}
                                className="w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer"
                                variant="secondary"
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


                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-200 ${proposal.status === 'pending'
                                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                                        : proposal.status === 'accepted'
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                        }`}>
                                        {proposal.status === 'pending' && 'Pending'}
                                        {proposal.status === 'accepted' && 'Accepted'}
                                        {proposal.status === 'rejected' && 'Rejected'}
                                        {!proposal.status && 'Pending'}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/40 w-full mt-auto">
                                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                                        <div className="text-xs flex items-center gap-.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md font-semibold">
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
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="success"
                                            // disabled={isRejecting}
                                            // onClick={() => handleStatusChange('accepted', setIsAccepting)}
                                            className="font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all duration-200 h-9 px-4"
                                        >
                                            <IoCheckmarkSharp className="text-sm" />
                                            Accept
                                        </Button>


                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="danger"
                                            // disabled={isAccepting}
                                            // onClick={() => handleStatusChange('rejected', setIsRejecting)}
                                            className="font-bold text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all duration-200 h-9 px-4"
                                        >
                                            <FaXmark className="text-xs" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default taskIdPage;