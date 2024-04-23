import { auth } from "@/auth";

import { Ingredient } from "@/lib/composite/ingredient";

import { RecipeBuilder } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-builder";

import {
  getIngredientComponents,
  getRecipeComponents,
} from "@/app/[locale]/(protected)/recipes/add-recipe/_actions/composite-components-action";
import { RecipeComponentsProvider } from "@/providers/recipe-components";

export default async function RecipeBookPage() {
  const session = await auth();

  if (session) {
    const ingredients: Ingredient[] =
      (await getIngredientComponents(session.user.id as string)) || [];
    const ingredientJSON = JSON.stringify(ingredients);

    const { recipeComponents = [], recipeIngredients = [] } =
      await getRecipeComponents(session.user.id as string);
    const recipeJSON = JSON.stringify(recipeComponents);
    const recipeIngredientJSON = JSON.stringify(recipeIngredients);

    return (
      <RecipeComponentsProvider
        ingredients={ingredientJSON}
        recipes={recipeJSON}
        recipeIngredients={recipeIngredientJSON}>
        <RecipeBuilder />
      </RecipeComponentsProvider>
    );
  } else {
    return <div>Unauthorized access</div>;
  }
}
