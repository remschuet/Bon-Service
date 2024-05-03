import { KitchenActionManager } from "./kitchen-action-manager";
import { KitchenMemberDisplay } from "./kitchen-member-display";

export const KitchenAdminDashboard = () => {
  return (
    <div className="container flex gap-4">
      <KitchenActionManager />
      <KitchenMemberDisplay />
    </div>
  );
};
