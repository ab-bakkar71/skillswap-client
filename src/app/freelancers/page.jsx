import BrowseFreelancersClient from '@/components/BrowseFreelancersClient';
import { getFreelancer } from '@/lib/api/freelancer';
import React from 'react';

export const metadata = {
    title: "Browse Freelancers | SkillSwap",
    description: "Connect with expert developers, UI/UX designers, and freelance engineers. Filter by skills and hourly rates to hire top tech talent.",
};

const AllFreelancerPage = async () => {
    const rawFreelancers = await getFreelancer();
    const freelancers = Array.isArray(rawFreelancers) ? rawFreelancers : [];
    
    return <BrowseFreelancersClient initialFreelancers={freelancers} />;
};

export default AllFreelancerPage;