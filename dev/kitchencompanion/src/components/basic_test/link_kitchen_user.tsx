import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  linkKitchenUserById,
  getUsersForKitchenById,
} from "@/db/data-access/kitchen";

import { revalidatePath } from "next/cache";
import { Kitchen, User } from "@prisma/client";

export async function LinkKitchenUser() {
  async function handleLinkKitchenUser(formData: FormData) {
    "use server";

    const userId = formData.get("userId") as string;
    const kitchenId = formData.get("kitchenId") as string;

    await linkKitchenUserById(userId, kitchenId);
    revalidatePath("/test");
  }

  return (
    <Card className="w-[350px] h-[450px] grid place-content-center">
      <CardContent>
        <CardHeader>Link User and Kitchen</CardHeader>
        <form action={handleLinkKitchenUser} className="grid gap-2">
          <input
            type="text"
            name="userId"
            id="userId"
            placeholder="Enter userId"
          />
          <input
            type="text"
            name="kitchenId"
            id="kitchenId"
            placeholder="Enter kitchenId"
          />
          <Button type="submit">Link</Button>
        </form>
      </CardContent>
    </Card>
  );
}
