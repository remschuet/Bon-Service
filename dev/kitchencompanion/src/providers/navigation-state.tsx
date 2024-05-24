"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/navigation";
import { NavigationState } from "@/contexts/navigation-state";

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
