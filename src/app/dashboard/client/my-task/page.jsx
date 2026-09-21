import MyTaskClient from "@/components/DashBoard/Client/MyTaskClient";
import { getMyTask, getProposal } from "@/lib/api/client";
import { getUserSession } from "@/lib/core/session";

const myTaskPage = async() => {
    const user = await getUserSession();
    const email = user?.email;

    if (!email) {
        return (
            <div className="min-h-screen text-red-400 flex items-center justify-center">
                <p>Loading session or unauthorized access...</p>
            </div>
        );
    }
    try {
        const [taskData, proposalData] = await Promise.all([
            getMyTask(email),
            getProposal(email)
        ]);
        return (
            <div>
               <MyTaskClient tasks={taskData} proposals={proposalData} />
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-black text-rose-400 flex items-center justify-center">
                <p>Something went wrong while loading tasks.</p>
            </div>
        );
    }
};

export default myTaskPage;