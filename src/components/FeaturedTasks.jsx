import { getFeaturedTasks } from '@/lib/api/client';
import { Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const FeaturedTasks = async () => {
    const tasks = await getFeaturedTasks();
    return (
        <section className='w-full bg-black text-white py-24 px-6 md:px-16 lg:px-24 font-manrope overflow-hidden z-10 select-none'>
            <div className='max-w-7xl mx-auto'>

                <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 mb-5'> Latest Featured Tasks</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {
                        tasks.map(task => <div key={task._id}>
                            <Link href={`/tasks/${task._id}`}>
                                <Card
                                    className="w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5 hover:scale-105 transition-all duration-300 flex flex-col justify-between gap-5 group cursor-pointer"
                                    variant="secondary"
                                >

                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xs font-semibold bg-zinc-800/50 border border-zinc-700/40 text-zinc-300 px-2.5 py-1 rounded-full capitalize">
                                            {task.category.replace('-', ' ')}
                                        </span>

                                        <span className="text-xs text-zinc-400 font-medium">
                                            {task.deadline}
                                        </span>

                                    </div>


                                    <div className="space-y-2 flex-1 w-full">
                                        <h2 className="text-base md:text-lg font-extrabold text-zinc-100 group-hover:text-brand-accent transition-colors tracking-tight line-clamp-1">
                                            {task.title}
                                        </h2>
                                        <p className="text-sm md:text-md text-zinc-400 leading-relaxed line-clamp-2">
                                            {task.clientName}
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
                        </div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturedTasks;