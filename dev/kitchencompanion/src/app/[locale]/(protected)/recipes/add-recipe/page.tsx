import { auth } from "@/auth";

import { Ingredient } from "@/lib/composite/ingredient";
import { Recipe } from "@/lib/composite/recipe";

import { RecipeBuilder } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-builder";

import {
  getIngredientComponents,
  getRecipeComponents,
} from "@/app/[locale]/(protected)/recipes/add-recipe/_actions/composite-components";
import { RecipeComponentsProvider } from "@/providers/recipe-components";

export default async function RecipeBookPage() {
  const session = await auth();

  if (session) {
    const ingredients: Ingredient[] =
      (await getIngredientComponents(session.user.id as string)) || [];

    const recipes: Recipe[] =
      (await getRecipeComponents(session.user.id as string)) || [];

    const ingredientJSON = JSON.stringify(ingredients);
    const recipeJSON = JSON.stringify(recipes);

    return (
      <RecipeComponentsProvider
        ingredients={ingredientJSON}
        recipes={recipeJSON}>
        <RecipeBuilder />
      </RecipeComponentsProvider>
    );
  } else {
    return <div>Unauthorized access</div>;
  }
}
