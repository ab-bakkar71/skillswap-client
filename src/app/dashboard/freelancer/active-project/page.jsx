
import ActiveProposal from '@/components/DashBoard/freelancer/ActiveProposal';
import { getActiveProposal } from '@/lib/api/freelancer';
import { getUserSession } from '@/lib/core/session';
import { Table } from '@heroui/react';
import React from 'react';
import { FiSend } from 'react-icons/fi';

const activeProjectPage = async () => {
    const user = await getUserSession();
    const email = user?.email;
    const activeProposal = await getActiveProposal(email)

    return (
        <section className='w-full max-w-7xl mx-auto px-4'>
            <div className="mb-8 border-b border-zinc-800/60 pb-6">
                <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400'>
                    My Active Proposal
                </h1>
                <p className='text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed'>
                    {activeProposal.length} proposal active.
                </p>
            </div>

            <ActiveProposal activeProposal={activeProposal}/>
        </section>
    );
};

export default activeProjectPage;