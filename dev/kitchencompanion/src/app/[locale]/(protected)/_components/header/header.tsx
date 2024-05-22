"use client";

import { UserMenu } from "@/app/[locale]/(protected)/_components/header/user-menu";
import { Notification } from "@/app/[locale]/(protected)/_components/header/notifications/notification-menu";
import { HelpMenu } from "@/app/[locale]/(protected)/_components/header/help-menu";
import { Location } from "@/app/[locale]/(protected)/_components/header/location";
import { cn } from "@/lib/utils";

export function Header({
  className,
  params,
}: {
  className?: string;
  params: {
    locale: string;
    recipeBookId: string;
    recipeId?: string;
    kitchenId?: string;
  };
}) {
  return (
    <div
      className={cn(
        "flex fixed top-0 justify-between py-2 px-6 border-b-2 z-10 bg-background h-[4rem]",
        className
      )}>
      <Location params={params} />
      <div className='flex items-center space-x-3'>
        <Notification />
        <HelpMenu />
        <UserMenu />
      </div>
    </div>
  );
}
