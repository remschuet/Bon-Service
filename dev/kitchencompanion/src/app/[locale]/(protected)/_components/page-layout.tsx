"use client";

import { Header } from "@/app/[locale]/(protected)/_components/header/header";
import { useNavigation } from "@/hooks/useNavigation";
import { CurrentPathProvider } from "@/providers/current-path";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useNavigation();

  const layoutStyle = isOpen
    ? "left-[12rem] w-[calc(100%-12rem)]"
    : "left-[4rem] w-[calc(100%-4rem)]";

  return (
    <CurrentPathProvider>
      <Header className={layoutStyle} />
      <div
        className={`absolute min-h-[calc(100vh-85px)] top-[85px] p-6 ${layoutStyle}`}>
        {children}
      </div>
    </CurrentPathProvider>
  );
}
