"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationState } from "@/app/_contexts/navigation-state";

export const NavigationStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname().split("/")[1];

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("/" + path);

  useEffect(() => {
    setIsActive("/" + path);
  }, [path]);

  return (
    <NavigationState.Provider
      value={{ isOpen, setIsOpen, isActive, setIsActive }}>
      {children}
    </NavigationState.Provider>
  );
};
