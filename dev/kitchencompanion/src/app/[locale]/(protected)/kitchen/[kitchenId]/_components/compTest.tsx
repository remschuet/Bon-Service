import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ingredient, Unit } from "@prisma/client";
import {
  addMenuToKitchen,
  addMemberToKitchen,
  getNameMemberKitchen,
  getContactForKitchen,
  removeMemberToKitchen,
  getAllEmail,
  isAllowed
} from "../_action/kitchenid-action";
import { useSession } from "@/hooks/useSession";
import { useCurrentPath } from "@/hooks/useCurrentPath";

export function VisuelTest() {
  const { id } = useSession();
  const current = useCurrentPath();
  
  // TODO : recuperer avec un hook le id
  const kitchenId = 'clv5j0cm3000144zhbk5x2765'
  verif(kitchenId)

  async function verif(kitchenId: string) {
    console.log(await isAllowed(kitchenId, id))
  }

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
    // TODO: fix the kitchenId
    formData.append("kitchenId", "clv5j0cm3000144zhbk5x2765");
    console.log(await addMemberToKitchen(formData));
  }

  async function getMemberName(formData: FormData) {
    formData.append("userId", id);
    formData.append("kitchenName", current.at(-1) as string);
    console.log(await getNameMemberKitchen(formData));
    const pattern = "r";
    console.log(await getAllEmail(pattern))
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
        <input
          type="text"
          id="menuName"
          name="menuName"
          placeholder="menu Name"
        />
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
        <Button type="submit">add Member</Button>
      </form>
    </>
  );
}
