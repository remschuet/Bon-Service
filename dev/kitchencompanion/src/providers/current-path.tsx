"use client";

import { usePathname } from "next/navigation";
import { CurrentPath } from "@/contexts/current-path";

export function CurrentPathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let path = usePathname();

  return <CurrentPath.Provider value={path}>{children}</CurrentPath.Provider>;
}
