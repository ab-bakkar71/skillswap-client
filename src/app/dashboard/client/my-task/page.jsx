import MyTaskClient from "@/components/DashBoard/Client/MyTaskClient";
import { getMyTask } from "@/lib/api/client";
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
        const taskData = await getMyTask(email);
        return (
            <div>
               
               <MyTaskClient tasks={taskData}/>
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