import { KitchenActionManager } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_components/kitchen-action-manager";
import { KitchenMemberDisplay } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_components/kitchen-member-display";
import { KitchenDataProvider } from "@/providers/kitchen-data";

export async function KitchenAdminDashboard({
  kitchenId,
}: {
  kitchenId: string;
}) {
  return (
    <div className='container flex gap-4'>
      <KitchenDataProvider kitchenId={kitchenId}>
        <KitchenActionManager kitchenId={kitchenId} />
        <KitchenMemberDisplay />
      </KitchenDataProvider>
    </div>
  );
}
