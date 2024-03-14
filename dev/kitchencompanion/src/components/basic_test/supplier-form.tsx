"use client";

import { Ingredient } from "@prisma/client";
import React, { useState } from "react";
import { useTransition } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  actionGetIngredients,
  actionGetPriceIngredientById,
} from "../../app/(public)/test/supplier/supplier-action";

export function SupplierForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isPending, startTransition] = useTransition();

  async function buildIngredientList(formData: FormData) {
    startTransition(async () => {
      actionGetPriceIngredientById("cltrnj6pz0005a4o9i8y2knqd");
      /*actionGetIngredients(formData.get("supplier Id") as string).then(
        (ingredients) => {
          setIngredients(ingredients);
        }
      );*/
    });
  }
  return (
    <div className="w-full">
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
          {ingredients.map((row) => (
            <TableRow key={row.id} className="flex flex-row">
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.unitMeasure}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
