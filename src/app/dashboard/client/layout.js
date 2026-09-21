import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function ClientLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "client" && user.role !== "admin") {
    redirect(`/dashboard/${user.role}`);
  }

  return <>{children}</>;
}
