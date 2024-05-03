import { auth } from "@/auth";
import { isAllowed } from "./_action/kitchenid-action";
import { KitchenDashboard } from "./_components/kitchen-dashboard";

export default async function KitchenPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const kitchenId = searchParams.id as string;
  const session = await auth();

  if (!session) {
    return <div>Unauthorized access</div>;
  }

  const userId = session.user.id as string;

  verif(kitchenId);

  async function verif(kitchenId: string) {
    console.log(await isAllowed(kitchenId, userId));
  }

  return <KitchenDashboard />;
}
