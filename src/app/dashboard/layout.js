import { DashboardSidebar } from "@/components/DashBoard/DashboardSidebar";

export default function DashBoardLayout ({children}){
    return(
        <div className='flex flex-col lg:flex-row min-h-screen'>
            <DashboardSidebar />
            <main className='flex-1 pl-10 pt-8'>
                {children}
            </main>
        </div>
    )}