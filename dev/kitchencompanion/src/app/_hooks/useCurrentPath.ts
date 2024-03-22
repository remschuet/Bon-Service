import { useContext, useEffect, useState } from "react";
import { CurrentPath } from "@/app/_contexts/path";

export function useCurrentPath() {
  const current = useContext(CurrentPath);
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = current.split("/").slice(1);
    setPath(currentPath);
  }, []);

  return path;
}
