import { useEffect, useState } from "react";

export function useSuppliers(): {
  suppliers: string[];
} {
  const [suppliers, setSuppliers] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers");
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();
  }, []);

  return { suppliers };
}
