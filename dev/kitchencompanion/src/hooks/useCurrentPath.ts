import { useContext, useEffect, useState } from "react";
import { CurrentPath } from "@/contexts/current-path";

export function useCurrentPath() {
  const current = useContext(CurrentPath);
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = current.split("/").slice(1);
    setPath(currentPath);
  }, [current]);

  return path;
}
