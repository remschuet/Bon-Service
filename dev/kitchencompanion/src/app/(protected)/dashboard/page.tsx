import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/app/(protected)/_components/dashboard-layout-header";
import { UserSession } from "@/lib/type";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <DashboardHeader session={session as UserSession} />

      <form
        action={async () => {
          "use server";
          await signOut();
        }}>
        <Button type='submit'>Sign Out</Button>
      </form>
    </>
  );
}
