import { auth } from "@/auth";
import DashboardHeader from "@/app/(protected)/dashboard/_components/dashboard-layout-header";
import { UserSession } from "@/lib/type";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <DashboardHeader session={session as UserSession} />
    </>
  );
}
