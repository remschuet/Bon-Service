"use client";

import { UserSession } from "@/lib/type";
import { Header } from "@/app/(protected)/_components/header/header";
import { useNavigation } from "@/app/_hooks/useNavigation";
import { CurrentPathProvider } from "@/app/_providers/current-path";

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
    <CurrentPathProvider>
      <Header
        session={session as UserSession}
        className={layoutStyle}
      />
      <div
        className={`absolute min-h-[calc(100vh-85px)] top-[85px] p-6 ${layoutStyle}`}>
        {children}
      </div>
    </CurrentPathProvider>
  );
}
