import { createContext } from "react";

// Define the shape of the data in the context
interface KitchenDataContextType {
  members: string[][]; // Assuming members is an array of arrays of strings
  roles: string[]; // Array of strings for roles
  refetch: () => void; // Function that does not take any arguments and returns void
}

// Provide initial values that match the type
const defaultContextValue: KitchenDataContextType = {
  members: [],
  roles: [],
  refetch: () => {}, // No-op function for default case
};

// Create the context with the default value
export const KitchenDataContext =
  createContext<KitchenDataContextType>(defaultContextValue);
