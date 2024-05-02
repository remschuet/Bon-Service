import { useKitchens } from "@/hooks/useKitchens";
import { KitchenCard } from "./kitchen-card";

export function OwnedKitchenList() {
  const { kitchens } = useKitchens();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Mes cuisines:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kitchens.map((kitchen) => (
          <KitchenCard kitchen={kitchen} key={kitchen.id} />
        ))}
      </div>
    </div>
  );
}
