import TaskManagement from '@/components/DashBoard/admin/TaskManagement';
import { getTask } from '@/lib/api/freelancer';
import React from 'react';

const adminTaskPage = async() => {

        const tasks = await getTask();


    return (
        <>
        <div className="mb-4">
            <h3 className="text-sm font-bold text-zinc-400 tracking-wider uppercase">
                Manage Platform Tasks
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
                Review live status and remove any tasks violating guidelines or using inappropriate text.
            </p>

        </div>
            <TaskManagement tasks = {tasks}/>
        </>
    );
};

export default adminTaskPage;