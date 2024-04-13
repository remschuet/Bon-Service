import { RecipeBook, Allergen, Recipe, Ingredient } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { Prisma } from "@prisma/client";
import { RecipeComponent } from "@/lib/composite/recipe";
import { IngredientDTO, IngredientType } from "@/lib/type";

////////////////////////////////
// TABLES
// Recipe
// recipeAllergen
// recipeCategory
// recipePhoto
////////////////////////////////

/**
 * Create a Recipe with the ingredient (primitive and recipe).
 * @param recipe - The recipe object containing the recipes's details.
 * @param ingredients - The DTO object representing ingredient or recipe.
 * @returns A promise that resolves to the created recipe.
 */
export async function createRecipe(
  recipe: Recipe,
  ingredients: IngredientDTO[]
) {
  let _recipes: IngredientDTO[] = [];
  let _ingredients: IngredientDTO[] = [];
  // For ingredients
  for (let ingredient of ingredients) {
    if (ingredient.type === IngredientType.RECIPE) {
      _recipes.push(ingredient);
    } else if (ingredient.type === IngredientType.INGREDIENT) {
      _ingredients.push(ingredient);
    } else {
      throw new Error("Invalid ingredient type");
    }
    try {
      let steps = recipe.steps as Prisma.JsonArray;
      await db.$transaction([
        db.recipe.create({
          data: {
            versionNumber: recipe.versionNumber,
            name: recipe.name,
            recipeBookId: recipe.recipeBookId,
            recipeCategoryId: recipe.recipeCategoryId,
            recipeState: recipe.recipeState,
            preparationTime: recipe.preparationTime,
            cookingTime: recipe.cookingTime,
            steps: steps,
            yield: recipe.yield,
            unit: recipe.unit,
            objInvestment: recipe.objInvestment,
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,
          },
        }),
        db.recipeIngredient.createMany({
          data: {
            recipeId: recipe.id,
            recipeIngredientId: ingredient.id,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          },
        }),

        db.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          },
        }),
      ]);
    } catch (error) {
      console.error("Error data-access/recipe: createRecipe(), error: ", error);
      throw error;
    }
  }
}

/**
 * Get all recipes associated with the given recipe book IDs.
 *
 * @param recipeBookIds - The IDs of the recipe books to search.
 * @returns a lists containing the matching recipes.
 */
export async function getAllRecipeByRecipeBookIds(recipeBookIds: string[]) {
  try {
    return await db.recipe.findMany({
      where: {
        recipeBookId: {
          in: recipeBookIds,
        },
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: getAllRecipeByRecipeBookId(), error: ",
      error
    );
    throw error;
  }
}

/**
 * link recipe to alergen.
 * @param recipe - The recipe object containing the recipes's details.
 * @param allergen - An element of the allergen enum
 * @returns A promise that resolves to the link recipeAllergen.
 */
export async function linkRecipeAllergen(recipe: Recipe, allergen: Allergen) {
  try {
    return await db.recipeAllergen.create({
      data: {
        recipeId: recipe.id,
        allergen: allergen,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: linkRecipeAllergen(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Create RecipeCategory
 * @param userId - The id of the user.
 * @param category - An string describing the category
 * @returns A promise that resolves to the created recipeCategory.
 */
export async function createRecipeCategory(userId: string, category: string) {
  try {
    return await db.recipeCategory.create({
      data: {
        userId: userId,
        category: category,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: createRecipeCategory(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all the categories for an user.
 * @param userId - the user id.
 * @returns An array of recipe categories.
 */
export async function getRecipeCategoriesByUserId(userId: string) {
  try {
    return await db.recipeCategory.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: getRecipeCategoriesByUserId(), error: ",
      error
    );
    throw error;
  }
}

/**
 * link recipe to photo.
 * @param recipe - The recipe object containing the recipes's details.
 * @param photo - The Amazon S3 key for the photo
 * @returns A promise that resolves to the link recipePhoto.
 */
export async function linkRecipePhoto(recipe: Recipe, photo: string) {
  try {
    return await db.recipePhoto.create({
      data: {
        recipeId: recipe.id,
        photo: photo,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: linkRecipePhoto(), error: ",
      error
    );
    throw error;
  }
}
