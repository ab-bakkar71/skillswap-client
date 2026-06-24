import { Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <Link href={`/tasks/${task._id}`}>
            <Card
                className="w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5 hover:scale-105 transition-all duration-300 flex flex-col justify-between gap-5 group cursor-pointer"
                variant="secondary"
            >

                <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold bg-zinc-800/50 border border-zinc-700/40 text-zinc-300 px-2.5 py-1 rounded-full capitalize">
                        {task.category.replace('-', ' ')}
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


                <div className="space-y-2 flex-1 w-full">
                    <h2 className="text-base md:text-lg font-extrabold text-zinc-100 group-hover:text-brand-accent transition-colors tracking-tight line-clamp-1">
                        {task.title}
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                        {task.description}
                    </p>
                </div>

                <div className="flex items-center justify-between w-full pt-2">

                    <span className="text-lg md:text-xl font-extrabold text-violet-500 tracking-wide">
                        ${task.budget}
                    </span>

                    <span className="text-xs text-zinc-500 font-medium truncate max-w-[180px] sm:max-w-none">
                        {task.clientEmail}
                    </span>
                </div>
            </Card>
        </Link>
    );
};

export default TaskCard;