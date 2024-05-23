import { useContext, useEffect } from "react";
import { KitchensContext } from "@/contexts/kitchens";

export function useKitchens() {
  const { kitchens, refetch } = useContext(KitchensContext);

  useEffect(() => {
    if (kitchens.length === 0) {
      refetch();
    }
  }, [kitchens, refetch]);

  return { kitchens, refetch };
}
