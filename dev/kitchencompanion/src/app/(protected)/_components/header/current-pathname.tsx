"use client";

import { usePathname } from "next/navigation";
import { CurrentPath } from "@/app/_contexts/path";

export function CurrentPathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return <CurrentPath.Provider value={path}>{children}</CurrentPath.Provider>;
}
