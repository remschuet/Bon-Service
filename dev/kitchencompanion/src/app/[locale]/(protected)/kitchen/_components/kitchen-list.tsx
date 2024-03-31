import { useKitchens } from "@/hooks/useKitchens";
import { KitchenCard } from "./kitchen-card";

export function KitchenList() {
  const { kitchens } = useKitchens();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {kitchens.map((kitchen) => (
        <KitchenCard
          {...kitchen}
          key={kitchen.id}
        />
      ))}
    </div>
  );
}
