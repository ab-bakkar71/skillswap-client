import { DashboardSidebar } from "@/components/DashBoard/DashboardSidebar";
import NotificationBell from "@/components/NotificationBell";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  if (user.status === "block") {
    redirect("/login?error=blocked");
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-bg text-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Navigation Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 border-b border-brand-border/40 bg-zinc-950/80 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-400 hidden sm:inline">
              SkillSwap Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell userEmail={user?.email} />
            <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-300 font-medium hidden sm:inline truncate max-w-[150px]">
                {user?.name || user?.email}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full capitalize font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/30">
                {user?.role || "client"}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}