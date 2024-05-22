import { createContext, useState, useCallback, ReactNode } from "react";
import { Kitchen } from "@prisma/client";
import { getAllKitchensById } from "@/hooks/_action/action";
import { useSession } from "@/hooks/useSession";

interface KitchensContextType {
  kitchens: Kitchen[];
  refetch: () => void;
}

const defaultContextValue: KitchensContextType = {
  kitchens: [],
  refetch: () => {},
};

export const KitchensContext =
  createContext<KitchensContextType>(defaultContextValue);
