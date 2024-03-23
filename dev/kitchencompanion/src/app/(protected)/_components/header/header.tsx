import { UserSession } from "@/lib/type";
import { UserMenu } from "@/app/(protected)/_components/header/user-menu";
import { Notification } from "@/app/(protected)/_components/header/notifications/notification-menu";
import { HelpMenu } from "@/app/(protected)/_components/header/help-menu";
import { Location } from "./location";

export function Header({
  session,
  className,
}: {
  session: UserSession;
  className?: string;
}) {
  return (
    <div
      className={`flex fixed top-0 justify-between py-2 px-6 border-b shadow-sm ${className}`}>
      <Location />
      <div className='flex items-center space-x-3'>
        <Notification />
        <HelpMenu />
        <UserMenu session={session} />
      </div>
    </div>
  );
}
