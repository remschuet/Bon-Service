 import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ingredient, Unit } from "@prisma/client";
import { addMenuToKitchen, addMemberToKitchen, getNameMemberKitchen } from "../_action/kitchenid-action";
import { useSession } from "@/hooks/useSession";

export function VisuelTest() {
  const { id } = useSession();

  async function addMenu(formData: FormData) {
    formData.append("userId", id);
    console.log(await addMenuToKitchen(formData));
  }

  async function addMember(formData: FormData) {
    formData.append("userId", id);
    console.log(await addMemberToKitchen(formData));
  }

  async function getMemberName(formData: FormData) {
    formData.append("userId", id);
    console.log(await getNameMemberKitchen(formData));
  }
  
  return (
    <>
      <form action={addMenu}>
        <Button type="submit">Add Menu</Button>
      </form>

      <p>Get member</p>
      <form action={getMemberName}>
        <input type="text" id="kitchenId" name="kitchenId" placeholder="kitcenId (dev)"/>
        <Button type="submit">get Member Name</Button>
      </form>

      <p>Add member to your team</p>
      <form action={addMember}>
        <input type="text" id="memberEmail" name="memberEmail" placeholder="email"/>
        <input type="text" id="kitchenId" name="kitchenId" placeholder="kitcenId (dev)"/>
        <Button type="submit">add Member</Button>
      </form>
    </>
  );
}