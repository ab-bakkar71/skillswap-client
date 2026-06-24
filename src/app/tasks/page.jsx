import TaskCard from '@/components/TaskCard';
import { getTask } from '@/lib/api/freelancer';
import React from 'react';

const taskPage = async () => {
    const allTasks = await getTask();
    return (
        <section className='w-full max-w-7xl mx-auto px-4 py-8 text-white'>
            <div className='mb-8 border-b border-zinc-800/60 pb-6'>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Discover Available Tasks
                </h1>
                <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                    Explore micro-tasks posted by clients worldwide. Filter by category, check the budget, and pitch your skills to start earning instantly.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {
                    allTasks.map(task => <TaskCard key={task._id} task={task} />)
                }
            </div>
        </section>
    );
};

export default taskPage;