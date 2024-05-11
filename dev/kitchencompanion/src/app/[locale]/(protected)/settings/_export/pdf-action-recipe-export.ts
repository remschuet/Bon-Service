"use server";

import {
  updateUserUserType,
  updateUser,
  updateUserPremium,
} from "@/db/data-access/user";

import { User, UserTypes } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";
import { getContactForKitchen } from "../../kitchen/_action/kitchen-action";
import { getAllContact, getContact } from "@/db/data-access/contact";
import { ExportContactDTO } from "@/lib/type";
import {
  getRecipe,
  getRecipeIngredientAndRecipe,
  getRecipeIngredientAndRecipeName,
} from "@/db/data-access/recipe";

export async function exportGetRecipe(id: string) {
  try {
    const recipe = await getRecipe(id);
    const ingredients = await getRecipeIngredientAndRecipeName(id);
    return { recipe, ingredients };
  } catch (err) {
    return {
      error: "Une érreur est survenu.",
      status: 400,
    };
  }
}
