import { useEffect, useState } from "react";

export function useSelectedSupplier() {
  const [supplier, setSupplier] = useState<string>("");
  const [isOther, setIsOther] = useState<boolean>(false);

  useEffect(() => {
    setIsOther(supplier === "other");
  }, [supplier]);

  return { setSupplier, isOther };
}
