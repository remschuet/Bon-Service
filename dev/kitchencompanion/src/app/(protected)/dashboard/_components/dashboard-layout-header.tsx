import { UserSession } from "@/lib/type";
import { DashboardUserMenu } from "@/app/(protected)/dashboard/_components/dashboard-user-menu";
import { DashboardNotification } from "@/app/(protected)/dashboard/_components/dashboard-notification";
import { DashboardHelpMenu } from "@/app/(protected)/dashboard/_components/dashboard-help-menu";

export default function DashboardHeader({ session }: { session: UserSession }) {
  return (
    <div className='fixed w-full flex items-center justify-end space-x-4 h-[8%] p-5 bg-slate-400/20'>
      <DashboardNotification />
      <DashboardHelpMenu />
      <DashboardUserMenu session={session} />
    </div>
  );
}
