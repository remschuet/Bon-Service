import { useEffect, useState } from "react";

export function useSelectedUnit() {
  const [unit, setUnit] = useState<string>("");
  const [isCS, setIsCS] = useState<boolean>(false);

  useEffect(() => {
    setIsCS(unit === "CS");
  }, [unit]);

  return { setUnit, isCS };
}
