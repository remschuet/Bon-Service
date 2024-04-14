"use server";

import {
  createRecipeBook,
  getRecipeBookByName,
} from "@/db/data-access/recipe-book";
import { RecipeBook } from "@prisma/client";

export async function addRecipeBook(recipeBook: RecipeBook) {
  try {
    const existingRecipeBook = await getRecipeBookByName(
      recipeBook.userId,
      recipeBook.name
    );

    if (existingRecipeBook) {
      return {
        error: "Il existe déjà un livre de recettes portant ce nom.",
        status: 500,
      };
    }

    await createRecipeBook(recipeBook);

    return {
      success: "Le livre de recettes a été créé avec succès.",
      status: 200,
    };
  } catch (error) {
    return {
      error:
        "Une erreur interne est survenue, impossible de créer le livre de recettes.",
      status: 500,
    };
  }
}
