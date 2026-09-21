import { DashboardSidebar } from "@/components/DashBoard/DashboardSidebar";
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
    <div className="flex flex-col lg:flex-row min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 pl-10 pt-8">{children}</main>
    </div>
  );
}