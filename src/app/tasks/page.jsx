import React from 'react';

const taskPage = () => {
    return (
        <section className='w-full max-w-7xl mx-auto px-4 py-8 text-white'>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                Discover Available Tasks
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                Explore micro-tasks posted by clients worldwide. Filter by category, check the budget, and pitch your skills to start earning instantly.
            </p>
        </section>
    );
};

export default taskPage;