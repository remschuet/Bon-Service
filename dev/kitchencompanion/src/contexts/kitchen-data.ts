import { createContext } from "react";

interface KitchenDataContextType {
  members: string[][];
  roles: string[];
  refetch: () => void;
}

const defaultContextValue: KitchenDataContextType = {
  members: [],
  roles: [],
  refetch: () => {},
};

export const KitchenDataContext =
  createContext<KitchenDataContextType>(defaultContextValue);
