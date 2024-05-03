import { auth } from "@/auth";
import { isAllowed } from "./_action/kitchenid-action";
import { KitchenAdminDashboard } from "./_components/kitchen-admin-dashboard";

export default async function KitchenPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const kitchenId = searchParams.id as string;
  const session = await auth();

  if (!session) {
    return <div>Unauthorized access</div>;
  }

  const userId = session.user.id as string;

  const { isAdmin, isMember } = await isAllowed(kitchenId, userId);

  if (isAdmin) {
    return <KitchenAdminDashboard kitchenId={kitchenId} />;
  } else if (isMember) {
    return <div>Member</div>;
  } else {
    return <div>Unauthorized access</div>;
  }
}
