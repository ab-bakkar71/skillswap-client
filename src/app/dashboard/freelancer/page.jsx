import DashboardStatistics from '@/components/DashBoard/freelancer/DashboardStatistics';
import { getProposal } from '@/lib/api/freelancer';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const freelancerDashBoardPage = async() => {
    const user = await getUserSession();
    const email = user?.email;
    const proposal = await getProposal(email);

    return (
        <section className='w-full '>
            <div className="mb-8 border-b border-zinc-950 pb-6 font-manrope">
                <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Welcome To Freelancer Dashboard! {user?.name}
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 mt-1.5 leading-relaxed max-w-2xl">
                    Track your active applications, monitor earnings, and manage your ongoing project milestones at a glance.
                </p>
            </div>
            <DashboardStatistics proposal={proposal}/> 
        
        </section>
    );
};

export default freelancerDashBoardPage;