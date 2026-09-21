import SubmitProposal from '@/components/DashBoard/freelancer/SubmitProposal';
import { getTaskById } from '@/lib/api/freelancer';
import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import React from 'react';
import { IoLogoUsd } from 'react-icons/io';
import { IoCalendarNumberOutline, IoMailOutline, IoTimeOutline } from 'react-icons/io5';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const task = await getTaskById(id);
    if (!task) {
        return {
            title: "Task Not Found - SkillSwap",
        };
    }
    return {
        title: `${task.title} - SkillSwap`,
        description: task.description ? task.description.slice(0, 160) : "View task details and submit a proposal on SkillSwap.",
    };
}

const TaskDetailPage = async ({ params }) => {
    const { id } = await params;
    const task = await getTaskById(id);
    const user = await getUserSession();

    if (!task) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center font-manrope text-white text-center px-4">
                <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
                <p className="text-zinc-400 text-sm max-w-md">
                    The task you are looking for does not exist or has been deleted.
                </p>
            </div>
        );
    }

    return (
        <section className='w-full max-w-7xl min-h-screen mx-auto px-4 py-8 text-white font-manrope'>
            {/* title, category, status */}
            <div className="space-y-3">
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    {task.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full capitalize">
                        {task.category ? String(task.category).replace(/-/g, ' ') : 'General'}
                    </span>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-200 ${task.status === 'open'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 animate-pulse'
                        : task.status === 'in-progress'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse'
                        }`}>
                        {task.status === 'open' && 'Open'}
                        {task.status === 'in-progress' && 'In Progress'}
                        {task.status === 'completed' && 'Completed'}
                    </span>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8'>
                    {/* Description */}
                    <Card className="bg-zinc-950/40 border border-zinc-900 p-6 md:p-8 rounded-2xl backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Description</h3>
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {task.description}
                        </p>
                    </Card>

                    {/* Submit a Proposal */}
                    <div>
                        {!user ? (
                            <div className="text-center p-6 bg-zinc-900/60 rounded-2xl border border-zinc-800 backdrop-blur-xl">
                                <p className="text-amber-400 text-sm font-semibold mb-2">
                                    Login to Apply
                                </p>
                                <p className="text-zinc-400 text-xs">
                                    Please login with a freelancer account to submit a proposal for this task.
                                </p>
                            </div>
                        ) : user.role === "client" ? (
                            <div className="text-center p-6 bg-zinc-900/60 rounded-2xl border border-zinc-800 backdrop-blur-xl">
                                <p className="text-amber-400 text-sm font-semibold mb-2">
                                    Client Account
                                </p>
                                <p className="text-zinc-400 text-xs">
                                    You are currently logged in as a Client. Clients cannot submit proposals.
                                </p>
                            </div>
                        ) : (
                            <SubmitProposal task={task} user={user} />
                        )}
                    </div>

                    <Card className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl backdrop-blur-xl">
                        <div className="space-y-5">

                            {/* Budget */}
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-brand-accent">
                                    <IoLogoUsd className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium">Budget</p>
                                    <p className="text-lg font-black text-white">${task.budget}</p>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400">
                                    <IoCalendarNumberOutline className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium">Deadline</p>
                                    <p className="text-sm font-bold text-zinc-200">{task.deadline || "Flexible"}</p>
                                </div>
                            </div>

                            {/* Posted Date */}
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400">
                                    <IoTimeOutline className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium">Posted</p>
                                    <p className="text-sm font-bold text-zinc-200">
                                        {task.createAt || task.createdAt ? new Date(task.createAt || task.createdAt).toLocaleDateString('en-GB') : "Recently"}
                                    </p>
                                </div>
                            </div>

                            {/* Client Info */}
                            <div className="flex items-center gap-3.5 border-t border-zinc-900 pt-4">
                                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400">
                                    <IoMailOutline className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-zinc-500 font-medium">Client</p>
                                    <p className="text-sm font-bold text-zinc-200 truncate">{task.clientEmail}</p>
                                </div>
                            </div>

                        </div>
                    </Card>

                </div>
            </div>

        </section>
    );
};

export default TaskDetailPage;