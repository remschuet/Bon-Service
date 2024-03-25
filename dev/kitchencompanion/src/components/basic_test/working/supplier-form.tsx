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
  actiionGetSupplierNameById,
} from "@/app/[locale]/(public)/test/supplier/_action/supplier-action";

export function SupplierForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isPending, startTransition] = useTransition();

  async function buildIngredientList(formData: FormData) {
    startTransition(async () => {
      const supplierId = formData.get("supplierName") as string;
      const supplierName = await actiionGetSupplierNameById(supplierId);
      if (supplierName) {
        actionGetIngredients(supplierName).then((ingredients) => {
          setIngredients(ingredients);
        });
      } else {
        console.error("Supplier name is undefined.");
      }
    });
  }
  return (
    <div className='w-full'>
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
            <TableRow
              key={row.id}
              className='flex flex-row'>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CardContent>
        <form
          action={buildIngredientList}
          className='grid gap-2'>
          <input
            type='text'
            name='supplierName'
            id='supplierName'
            placeholder='Enter supplier Name'
          />
          <Button type='submit'>
            display ingredients for supplier Name(DEV)
          </Button>
        </form>
      </CardContent>
    </div>
  );
}
