import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  createSupplier,
  getAllSuppliers,
  linkSupplierKitchen,
  getSupplier,
} from "@/db/data-access/supplier";
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

  async function linkSupplier(formData: FormData) {
    "use server";

    const supplier = await getSupplier(formData.get("name") as string);
    if (supplier) {
      await linkSupplierKitchen(supplier.id, "kitchen Id");
    }
    revalidatePath("/test");
  }

  return (
    <>
      <Card className="w-[350px] h-[450px] grid place-content-center">
        <CardHeader>Link Supplier</CardHeader>
        <CardContent>
          <form action={handleCreateSupplier} className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Enter name" />
            <Button type="submit">Create Supplier</Button>
          </form>
        </CardContent>

        <CardHeader>Display all Supplier</CardHeader>
        <ul>
          {suppliers.map((supplier) => (
            <li key={supplier.id}>{supplier.name}</li>
          ))}
        </ul>
      </Card>
      <Card className="w-[350px] h-[450px] grid place-content-center">
        <CardHeader>Create Supplier (DEV)</CardHeader>
        <CardContent>
          <form action={handleCreateSupplier} className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Enter name" />
            <Button type="submit">Create Supplier</Button>
          </form>
        </CardContent>

        <CardHeader>Display all Supplier</CardHeader>
        <ul>
          {suppliers.map((supplier) => (
            <li key={supplier.id}>{supplier.name}</li>
          ))}
        </ul>
      </Card>
    </>
  );
}
