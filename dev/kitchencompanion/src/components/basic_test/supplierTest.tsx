import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { revalidatePath } from "next/cache";
import {
  createSupplier,
  getAllSuppliers,
  linkSupplierKitchen,
  getSupplier,
} from "@/db/data-access/supplier";

import {
  createIngredient,
  getIngredientsBySupplierId,
} from "@/db/data-access/ingredient";
import { $Enums, Ingredient, Supplier, UnitMeasure } from "@prisma/client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const data = [
  { id: "1", name: "Product A", price: 10, quantity: "5" },
  { id: 2, name: "Product B", price: 15, quantity: 7 },
  { id: 3, name: "Product C", price: 20, quantity: 3 },
  { id: 4, name: "Product D", price: 25, quantity: 8 },
  { id: 5, name: "Product E", price: 30, quantity: 2 },
];

export default async function handler(supplierId: string) {
  const ingredients = await getIngredientsBySupplierId(supplierId);
  return ingredients;
}

export function DataTableDemo() {
  let filterValue = "";

  async function buildIngredientList(formData: FormData) {
    "use server";
    const ingredientsList = await getIngredientsBySupplierId(
      formData.get("supplierId") as string
    );
    ingredientsList.forEach((ingredient) => {
      data.push({
        id: ingredient.id,
        name: ingredient.name,
        price: ingredient.unitPrice, // Modification de unitPrice à price pour correspondre à la structure de data
        quantity: ingredient.unitMeasure, // Modification de unitMeasure à quantity pour correspondre à la structure de data
      });
    });
  }

  async function linkSupplier(formData: FormData) {
    "use server";

    const supplier = await getSupplier(formData.get("supplierName") as string);

    const kitchenId = formData.get("kitchenId") as string;

    if (supplier) {
      await linkSupplierKitchen(supplier.id, kitchenId);
    }
    revalidatePath("/test");
  }

  async function handleCreateIngredient(formData: FormData) {
    "use server";
    const priceValue = formData.get("price");
    const unitPrice =
      typeof priceValue === "string" ? parseInt(priceValue, 10) : 0;

    const newIngredient = {
      name: formData.get("ingredientName") as string,
      unitPrice: unitPrice,
      unitMeasure: formData.get("measure") as $Enums.UnitMeasure,
      supplierId: formData.get("supplierId") as string,
    };
    await createIngredient(newIngredient as Ingredient);
    revalidatePath("/test");
  }

  async function handleCreateSupplier(formData: FormData) {
    "use server";
    const newSupplier = {
      name: formData.get("name") as string,
    };

    await createSupplier(newSupplier as Supplier);
    revalidatePath("/test");
  }

  return (
    <div className="w-full">
      <Input
        placeholder="Filter by name..."
        // onChange={(event) => (filterValue = event.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((row: any) => (
              <TableRow key={row.id} className="flex flex-row">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <br />
      <br />
      <br />

      <CardContent>
        <form action={linkSupplier} className="grid gap-2">
          <input
            type="text"
            name="kitchenId"
            id="kitchenId"
            placeholder="kitchenId"
          />
          <input
            type="text"
            name="supplierName"
            id="supplierName"
            placeholder="supplierName"
          />
          <Button type="submit">Link Kitchen Supplier</Button>
        </form>
      </CardContent>

      <CardContent>
        <form action={handleCreateSupplier} className="grid gap-2">
          <input type="text" name="name" id="name" placeholder="Enter name" />
          <Button type="submit">Create Supplier (DEV)</Button>
        </form>
      </CardContent>

      <CardContent>
        <form action={handleCreateIngredient} className="grid gap-2">
          <input
            type="text"
            name="ingredientName"
            id="ingredientName"
            placeholder="Enter nom"
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter prix (int)"
          />
          <input
            type="text"
            name="measure"
            id="measure"
            placeholder="Enter unité measure(ENUM)"
          />
          <input
            type="text"
            name="supplierId"
            id="supplierId"
            placeholder="Enter supplierId"
          />
          <Button type="submit">Create Ingredients (DEV)</Button>
        </form>
      </CardContent>

      <CardContent>
        <form action={buildIngredientList} className="grid gap-2">
          <input
            type="text"
            name="supplierId"
            id="supplierId"
            placeholder="Enter supplierId"
          />
          <Button type="submit">display ingredients for supplierId(DEV)</Button>
        </form>
      </CardContent>
    </div>
  );
}
