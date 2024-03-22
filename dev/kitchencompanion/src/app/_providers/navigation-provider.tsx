"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavigationContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};
