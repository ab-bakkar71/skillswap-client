import { Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { GoGitCommit } from 'react-icons/go';
import { IoLogoUsd } from 'react-icons/io';
import { IoCalendarNumberOutline } from 'react-icons/io5';

const MyTaskClient = ({ tasks }) => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
            <div className="mb-8 border-b border-zinc-800/60 pb-6">
                <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400'>
                    My Tasks
                </h1>
                <p className='text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed'>
                    View In-progress, completed, or open tasks. Check incoming freelancer proposals to find the perfect match.
                </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
                {
                    tasks.map((task, i) => (
                        <Link key={i} href={`/dashboard/client/my-task/${task._id}`}>
                        <Card
                            className="w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5  transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer"
                            variant="secondary"
                        >
                            <div className="flex items-start justify-between gap-4 w-full">
                                <div className="space-y-1.5 flex-1">
                                    <h2 className="text-base md:text-lg font-bold text-zinc-100 group-hover:text-brand-accent transition-colors tracking-tight line-clamp-1">
                                        {task.title}
                                    </h2>
                                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                                        {task.description}
                                    </p>
                                </div>


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
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/40 w-full mt-auto">


                                <div className="flex flex-wrap items-center gap-3 md:gap-4">

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


                                <div className="flex items-center gap-1 text-zinc-500 text-xs font-medium">
                                    <GoGitCommit className="w-3.5 h-3.5 rotate-90 text-zinc-600" />
                                    <span>2 proposal</span>
                                </div>

                            </div>
                        </Card>
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};

export default MyTaskClient;