"use server";

import { getAllIngredient } from "@/db/data-access/ingredient";
import { ExportIngredientDTO } from "@/lib/type";

export async function exportGetIngredient(id: string) {
  try {
    const ingredientList = await getAllIngredient(id);

    const exportIngredientList: ExportIngredientDTO[] = ingredientList.map(
      (contact) => ({
        nom: contact.name,
        prix: contact.price as unknown as string,
        unité: contact.unit,
        origine: contact.origin ?? " ",
        fournisseur: contact.supplierName ?? " ",
        categorie: contact.category ?? " ",
      })
    );

    return exportIngredientList;
  } catch (err) {
    return {
      error: "Une érreur est survenu.",
      status: 400,
    };
  }
}
