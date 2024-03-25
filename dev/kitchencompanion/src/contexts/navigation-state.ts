import { createContext } from "react";

export const NavigationState = createContext({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
  isActive: "",
  setIsActive: (value: string) => {},
});
