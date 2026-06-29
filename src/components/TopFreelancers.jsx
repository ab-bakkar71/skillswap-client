import React from 'react';
import AllFreelancerClient from './AllFreelancerClient';
import { getFreelancer } from '@/lib/api/freelancer';

const TopFreelancers = async () => {
    const topFreelancers = await getFreelancer();
    const freelancers = topFreelancers.slice(0, 4);
    

    return (
        <section className='w-full text-white bg-brand-nav/40 py-20 px-6 md:px-16 lg:px-24 font-manrope overflow-hidden z-10 select-none'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 mb-5'>Top Freelancer</h1>

               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {
                freelancers.map(freelancer => <AllFreelancerClient key={freelancer._id} freelancer={freelancer}/>)
            }
           </div>
            </div>
        </section>
    );
};

export default TopFreelancers;