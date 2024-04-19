import { auth } from "@/auth";

import { getIngredients, getRecipes } from "@/hooks/_action/action";
import { Ingredient } from "@/lib/composite/ingredient";
import { Recipe, RecipeData } from "@/lib/composite/recipe";

import { RecipeBuilder } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-builder";

export default async function RecipeBookPage() {
  const session = await auth();

  if (session) {
    const recipes: Recipe[] = fetchRecipeComponents(session.user.id as string);
    const ingredients: Ingredient[] = fetchIngredientComponents(
      session.user.id as string
    );
    return (
      <div>
        <RecipeBuilder ingredients={[]} />
      </div>
    );
  } else {
    return <div>Unauthorized access</div>;
  }
}

async function fetchRecipeComponents(id: string) {
  try {
    const recipes = await getRecipes(id);

    if (recipes) {
      const recipeComponents = recipes.map((recipe) => {
        const recipeData: RecipeData = {
          id: recipe.id,
          name: recipe.name,
          cost: recipe.cost,
          yield: recipe.yield,
          unit: recipe.unit,
          description: recipe.description,
          category: recipe.recipeCategoryId,
          recipeType: recipe.recipeState,
          prepTime: recipe.preparationTime,
          cookTime: recipe.preparationTime,
          steps: JSON.parse(recipe.steps),
          version: recipe.versionNumber,
        };

        return new Recipe(recipeData);
      });
      return recipeComponents;
    }
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
}

async function fetchIngredientComponents(id: string) {
  try {
    const result = await getIngredients(id);

    const ingredientComponent = result.map((ingredient) => {
      const ingredientData = {
        id: ingredient.id,
        name: ingredient.name,
        unit: ingredient.unit,
        price: ingredient.price,
      };
      return new Ingredient(ingredientData);
    });

    return ingredientComponent;
  } catch (error) {
    console.error(error);
  }
}
