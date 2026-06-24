import AllFreelancerClient from '@/components/AllFreelancerClient';
import { getFreelancer } from '@/lib/api/freelancer';
import React from 'react';

const AllFreelancerPage = async () => {
    const freelancers = await getFreelancer();
    console.log(freelancers);
    return (
        <section className='w-full max-w-7xl min-h-screen mx-auto px-4 py-8 text-white'>
            <div className="mb-10 border-b border-zinc-900 pb-6 font-manrope">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Explore Top Tech Talent
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 mt-2 max-w-3xl leading-relaxed">
                    Connect with expert developers, UI/UX designers, and freelancers from the SkillSwap community. Filter by skills, hourly rates, and find the perfect match for your next project.
                </p>
            </div>

           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {
                freelancers.map(freelancer => <AllFreelancerClient key={freelancer._id} freelancer={freelancer}/>)
            }
           </div>
        </section>
    );
};

export default AllFreelancerPage;