import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ingredient, Unit } from "@prisma/client";
import {
  addMenuToKitchen,
  addMemberToKitchen,
  getNameMemberKitchen,
  getContactForKitchen,
  removeMemberToKitchen,
} from "../_action/kitchenid-action";
import { useSession } from "@/hooks/useSession";
import { useCurrentPath } from "@/hooks/useCurrentPath";

export function VisuelTest() {
  const { id } = useSession();
  const current = useCurrentPath();

  async function addMenu(formData: FormData) {
    formData.append("userId", id);
    formData.append("kitchenName", current.at(-1) as string);
    console.log(await addMenuToKitchen(formData));
  }

  async function removeMember(formData: FormData) {
    formData.append("userId", id);
    formData.append("kitchenName", current.at(-1) as string);
    console.log(await removeMemberToKitchen(formData));
  }

  async function addMember(formData: FormData) {
    formData.append("userId", id);
    formData.append("kitchenName", current.at(-1) as string);
    console.log(await addMemberToKitchen(formData));
  }

  async function getMemberName(formData: FormData) {
    formData.append("userId", id);
    formData.append("kitchenName", current.at(-1) as string);
    console.log(await getNameMemberKitchen(formData));
  }

  async function getContact(formData: FormData) {
    formData.append("userId", id);
    formData.append("kitchenName", current.at(-1) as string);
    console.log(await getContactForKitchen(formData));
  }

  return (
    <>
      <p>Ajouter un menu (non implemente)</p>
      <form action={addMenu}>
        <Button type="submit">Add Menu</Button>
      </form>

      <p>Supprimer un user (non implemente)</p>
      <form action={removeMember}>
        <input
          type="text"
          id="memberEmail"
          name="memberEmail"
          placeholder="email"
        />
        <Button type="submit">Supprimer des membres</Button>
      </form>

      <p>Get contact link avec la cuisine</p>
      <form action={getContact}>
        <Button type="submit">Lister les contact</Button>
      </form>

      <p>Get member</p>
      <form action={getMemberName}>
        <Button type="submit">get Member Name</Button>
      </form>

      <p>Add member to your team</p>
      <form action={addMember}>
        <input
          type="text"
          id="memberEmail"
          name="memberEmail"
          placeholder="email"
        />
        <input
          type="text"
          id="memberName"
          name="memberName"
          placeholder="name"
        />
        <Button type="submit">add Member</Button>
      </form>
    </>
  );
}
