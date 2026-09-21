import BrowseTasksClient from '@/components/BrowseTasksClient';
import { getTask } from '@/lib/api/freelancer';
import React from 'react';

export const metadata = {
    title: "Browse Tasks | SkillSwap",
    description: "Explore micro-tasks posted by clients worldwide. Filter by category, budget, and skills to start earning instantly.",
};

const TaskPage = async ({ searchParams }) => {
    const resolvedParams = searchParams ? await searchParams : {};
    const category = resolvedParams?.category || "all";
    const rawTasks = await getTask();
    const allTasks = Array.isArray(rawTasks) ? rawTasks : [];
    
    return <BrowseTasksClient initialTasks={allTasks} initialCategory={category} />;
};

export default TaskPage;