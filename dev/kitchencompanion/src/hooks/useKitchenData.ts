import { KitchenDataContext } from "@/contexts/kitchen-data";
import { useContext } from "react";

export function useKitchenData() {
  const context = useContext(KitchenDataContext);
  if (context === null) {
    throw new Error("useKitchenData must be used within a KitchenDataProvider");
  }
  return context;
}
