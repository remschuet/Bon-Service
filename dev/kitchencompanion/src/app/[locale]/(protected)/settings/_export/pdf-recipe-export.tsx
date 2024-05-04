import { getRecipeIngredientAndRecipe } from "@/db/data-access/recipe";

export async function exportCreatePdfRecipe(form: FormData) {
  const id = form.get("userId");
  const recipeName = form.get("recipeName");
  const idRecipe = "1234";
  const data = await getRecipeIngredientAndRecipe(idRecipe);
  console.log(data);
  return data;

  // Chercher la recette + ingredients
  // Chercher les noms des ingredients
}
