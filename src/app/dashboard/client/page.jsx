import DashboardStatsStatic from '@/components/DashBoard/DashboardStatsStatic';
import { getMyTask } from '@/lib/api/client';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const clientDashBoardPage = async () => {
    const user = await getUserSession();
    const email = user?.email;
    const task = await getMyTask(email);
    

    return (
        <section className='w-full '>
            <div className="mb-8 border-b border-zinc-950 pb-6 font-manrope">
                <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Welcome To Client Dashboard! {user?.name}
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 mt-1.5 leading-relaxed max-w-2xl">
                    Track your projects, manage active milestones, and review top talent.
                </p>
            </div>

        <DashboardStatsStatic task={task}/>
        </section>
    );
};

export default clientDashBoardPage;