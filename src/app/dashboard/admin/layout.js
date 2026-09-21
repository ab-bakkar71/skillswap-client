import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = await getUserSession();

  if (!user || user.role !== "admin") {
    redirect(user?.role ? `/dashboard/${user.role}` : "/login");
  }

  return <>{children}</>;
}
