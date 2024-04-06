import { Kitchen } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getAllKitchensById } from "@/hooks/_action/action";

export function useKitchens(): {
  kitchens: Kitchen[];
} {
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const { id } = useSession();

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const kitchens = await getAllKitchensById(id);
        setKitchens(kitchens);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKitchens();
  }, []);

  return { kitchens };
}
