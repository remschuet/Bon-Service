import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createSupplier, getAllSuppliers } from "@/data-access/supplier";
import { revalidatePath } from "next/cache";
import { Supplier } from "@prisma/client";

export async function CreateSupplier() {
  const suppliers = await getAllSuppliers();

  async function handleCreateSupplier(formData: FormData) {
    "use server";
    const newSupplier = {
      name: formData.get("name") as string,
    };

    await createSupplier(newSupplier as Supplier);
    revalidatePath("/test");
  }

  return (
    <Card className='w-[350px] h-[450px] grid place-content-center'>
      <CardHeader>Create User</CardHeader>
      <CardContent>
        <form
          action={handleCreateSupplier}
          className='grid gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter name'
          />
          <Button type='submit'>Create Supplier</Button>
        </form>
      </CardContent>

      <CardHeader>Display all Supplier</CardHeader>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>{supplier.name}</li>
        ))}
      </ul>
    </Card>
  );
}
