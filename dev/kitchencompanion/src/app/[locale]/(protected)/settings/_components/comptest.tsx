import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ingredient, Unit } from "@prisma/client";
import {
  updateUserFacturation,
  updateToAdmin,
  updateProfilUser,
} from "../_action/settings-action";
import { useSession } from "@/hooks/useSession";

export function Test() {
  const { id } = useSession();

  async function updateFacturation(formData: FormData) {
    formData.append("userId", id);
    console.log(await updateUserFacturation(formData));
  }

  async function updateAdminMode() {
    console.log(await updateToAdmin(id));
  }

  async function updateProfil(formData: FormData) {
    formData.append("userId", id);
    console.log(await updateProfilUser(formData));
  }

  return (
    <>
      <form action={updateFacturation}>
        <div>
          <p>Bon Service Pro</p>
          <input type="checkbox" name="facturation" value="PREMIUM" />
        </div>
        <Button type="submit">Modifier la facturation</Button>
      </form>

      <p>Update To admin Mode</p>
      <form action={updateAdminMode}>
        <Button type="submit">Admin Mode</Button>
      </form>
    </>
  );
}
