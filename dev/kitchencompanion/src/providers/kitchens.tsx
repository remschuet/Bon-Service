"use client";

import { KitchensContext } from "@/contexts/kitchens";
import { getAllKitchensById } from "@/hooks/_action/action";
import { useSession } from "@/hooks/useSession";
import { Kitchen } from "@prisma/client";
import { ReactNode, useCallback, useState } from "react";

export const KitchensProvider = ({ children }: { children: ReactNode }) => {
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const { id } = useSession();

  const fetchKitchens = useCallback(async () => {
    if (id) {
      try {
        const kitchens = await getAllKitchensById(id);
        setKitchens(kitchens);
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  return (
    <KitchensContext.Provider value={{ kitchens, refetch: fetchKitchens }}>
      {children}
    </KitchensContext.Provider>
  );
};
