import { KitchenActionManager } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_components/kitchen-action-manager";
import { KitchenMemberDisplay } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_components/kitchen-member-display";
import { getNameMemberKitchen } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_action/kitchenid-action";

export async function KitchenAdminDashboard({
  kitchenId,
}: {
  kitchenId: string;
}) {
  const members = (await getNameMemberKitchen(kitchenId)) as string[][];

  return (
    <div className="container flex gap-4">
      <KitchenActionManager />
      <KitchenMemberDisplay members={members} />
    </div>
  );
}
