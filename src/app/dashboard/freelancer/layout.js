import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function FreelancerLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "freelancer" && user.role !== "admin") {
    redirect(`/dashboard/${user.role}`);
  }

  return <>{children}</>;
}
