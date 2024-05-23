import { useMemberKitchens } from "@/hooks/useMemberKitchens";
import { KitchenCard } from "./kitchen-card";

export function MemberKitchenList() {
  const { memberKitchens } = useMemberKitchens();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Cuisines partagées :</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {memberKitchens.map((kitchen) => (
          <KitchenCard
            kitchen={kitchen}
            chefName={kitchen.chefName}
            member={kitchen.members}
            key={kitchen.id}
          />
        ))}
      </div>
    </div>
  );
}
