import { KitchenActionManager } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_components/kitchen-action-manager";
import { KitchenMemberDisplay } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_components/kitchen-member-display";
import { getNameMemberKitchen } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_action/kitchenid-action";
import { getRoleStates } from "@/db/enum";

export async function KitchenAdminDashboard({
  kitchenId,
}: {
  kitchenId: string;
}) {
  const members = (await getNameMemberKitchen(kitchenId)) as string[][];
  const roles = await getRoleStates();

  return (
    <div className='container flex gap-4'>
      <KitchenActionManager
        roles={roles}
        kitchenId={kitchenId}
        members={members}
      />
      <KitchenMemberDisplay members={members} />
    </div>
  );
}
