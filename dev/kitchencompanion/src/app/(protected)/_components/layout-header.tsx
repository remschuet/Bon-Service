import { UserSession } from "@/lib/type";
import { DashboardUserMenu } from "@/app/(protected)/_components/header/user-menu";
import { DashboardNotification } from "@/app/(protected)/_components/header/notification-menu";
import { DashboardHelpMenu } from "@/app/(protected)/_components/header/help-menu";
import { DashboardLocation } from "./header/breadcrums-location";

export default function DashboardHeader({ session }: { session: UserSession }) {
  return (
    <div className='flex fixed top-0 left-[4rem] w-[calc(100vw-4rem)] justify-between py-2 px-6 border-b shadow-sm'>
      <DashboardLocation />
      <div className='flex items-center space-x-3'>
        <DashboardNotification />
        <DashboardHelpMenu />
        <DashboardUserMenu session={session} />
      </div>
    </div>
  );
}
