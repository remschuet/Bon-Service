"use client";

import { Header } from "@/app/[locale]/(protected)/_components/header/header";
import { useNavigation } from "@/hooks/useNavigation";

export function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
    recipeBookId: string;
    recipeId?: string;
    kitchenId?: string;
  };
}) {
  const { isOpen } = useNavigation();

  const layoutStyle = isOpen
    ? "left-[16rem] w-[calc(100%-16rem)]"
    : "left-[4rem] w-[calc(100%-4rem)]";

  return (
    <div>
      <Header
        className={layoutStyle}
        params={params}
      />
      <div
        className={`absolute min-h-[calc(100vh-85px)] top-[85px] p-6 ${layoutStyle}`}>
        {children}
      </div>
    </div>
  );
}
