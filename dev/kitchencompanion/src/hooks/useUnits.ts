import { getUnitEnum } from "@/db/enum";
import { useEffect, useState } from "react";

export function useUnits(): {
  units: string[];
} {
  const [units, setUnits] = useState<string[]>([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await getUnitEnum();
        setUnits(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnits();
  }, []);

  return { units };
}
