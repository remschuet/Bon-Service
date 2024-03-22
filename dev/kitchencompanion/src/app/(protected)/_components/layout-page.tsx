"use client";

import { UserSession } from "@/lib/type";
import { CurrentPathProvider } from "@/app/(protected)/_components/header/current-pathname";
import { Header } from "@/app/(protected)/_components/layout-header";
import { useNavigation } from "@/app/_providers/navigation-provider";

export function PageLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: UserSession;
}) {
  const { isOpen } = useNavigation();

  const layoutStyle = isOpen
    ? "left-[12rem] w-[calc(100%-12rem)]"
    : "left-[4rem] w-[calc(100%-4rem)]";

  return (
    <div>
      <CurrentPathProvider>
        <Header
          session={session as UserSession}
          className={layoutStyle}
        />
      </CurrentPathProvider>
      {children}
    </div>
  );
}
