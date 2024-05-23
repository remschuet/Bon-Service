import { RecipeBook, Allergen, Recipe, Ingredient } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { Prisma } from "@prisma/client";
import { RecipeComponent } from "@/lib/composite/recipe";
import { IngredientDTO, IngredientType, RecipeIngredientDTO } from "@/lib/type";

////////////////////////////////
// TABLES
// Recipe
// recipeAllergen
// recipeCategory
// recipePhoto
////////////////////////////////

/**
 * Create a Recipe with the ingredient (primitive and recipe).
 *
 * TODO: ne pas passer le id
 *
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
  }

  try {
    await db.$transaction([
      db.recipe.create({
        data: {
          id: recipe.id,
          versionNumber: recipe.versionNumber,
          name: recipe.name,
          recipeBookId: recipe.recipeBookId,
          recipeState: recipe.recipeState,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          cost: recipe.cost,
          description: recipe.description,
          steps: recipe.steps,
          yield: recipe.yield,
          unit: recipe.unit,
          objInvestment: recipe.objInvestment,
          createdAt: recipe.createdAt,
          updatedAt: recipe.updatedAt,
        },
      }),

      ..._recipes.map((currRecipe) => {
        return db.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            recipeIngredientId: currRecipe.id,
            quantity: currRecipe.quantity,
            unit: currRecipe.unit,
          },
        });
      }),

      ..._ingredients.map((ingredient) => {
        return db.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          },
        });
      }),
    ]);
  } catch (error) {
    console.error("Error data-access/recipe: createRecipe(), error: ", error);
    throw error;
  }
}

export async function getRecipe(recipeId: string) {
  try {
    return await db.recipe.findFirst({
      where: {
        id: recipeId,
      },
      include: {
        recipeAllergens: true,
        recipeBook: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error data-access/recipe: getRecipe(), error: ", error);
    throw error;
  }
}

export async function getRecipeIngredientAndRecipeName(recipeId: string) {
  try {
    const ingredients = await db.recipeIngredient.findMany({
      where: { recipeId: recipeId },
      include: {
        ingredient: {
          select: {
            name: true,
          },
        },
        recipeIngredient: {
          select: {
            name: true,
          },
        },
      },
    });

    return ingredients;
  } catch (error) {
    console.error(
      "Error data-access/recipe: getRecipeIngredientRecipe(), error: ",
      error
    );
    throw error;
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
 * Get all recipes associated with the given userId.
 *
 * @param userId - The IDs of the user.
 * @returns a lists containing the matching recipes.
 */
export async function getAllRecipe(userId: string) {
  try {
    return await db.recipe.findMany({
      where: {
        recipeBook: {
          userId: userId,
        },
      },
    });
  } catch (error) {
    console.error("Error data-access/recipe: getAllRecipe(), error: ", error);
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

/**
 * Get all the ingredientsId and recipesId in a specific recipeId.
 *
 * @param recipeId - The ID of the recipe to search for ingredients and recipes.
 * @returns two arrays: 'ingredients' and 'recipeIngredients'.
 * @return example: ["1", "2", "3"] ["1", "2"]
 */
export async function getRecipeIngredientAndRecipe(recipeId: string) {
  try {
    // Get the ingredients
    const ingredients: RecipeIngredientDTO[] =
      await db.recipeIngredient.findMany({
        where: { recipeId: recipeId },
      });

    return ingredients;
  } catch (error) {
    console.error(
      "Error data-access/recipe: getRecipeIngredientRecipe(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all recipes that contain the specified ingredient.
 *
 * @param ingredientId - The ID of the ingredient to search for in recipes.
 * @returns An array of recipe IDs where the specified ingredient is used.
 * @returns example: ["3", "4", "5", "6"]
 */
export async function getAllRecipeFromIngredient(ingredientId: String) {
  try {
    // Prisma.StringFilter to remove possibility of null values
    const recipeIngredients = await db.recipeIngredient.findMany({
      where: { ingredientId: { equals: ingredientId } as Prisma.StringFilter },
      select: { recipeId: true },
    });
    const recipeIds = recipeIngredients.map((ri) => ri.recipeId);
    return recipeIds;
  } catch (error) {
    console.error(
      "Error data-access/recipe: getAllRecipeFromIngredient(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all recipes that contain the specified recipeIngredient.
 *
 * @param RecipeIngredientId - The ID of the recipeIngredient to search for in recipes.
 * @returns An array of recipe IDs where the specified ingredient is used.
 * @returns example: ["3", "4", "5", "6"]
 */
export async function getAllRecipeFromRecipeIngredient(
  RecipeIngredientId: String
) {
  try {
    // Prisma.StringFilter to remove possibility of null values
    const recipeIngredients = await db.recipeIngredient.findMany({
      where: {
        recipeIngredientId: {
          equals: RecipeIngredientId,
        } as Prisma.StringFilter,
      },
      select: { recipeId: true },
    });
    const recipeIds = recipeIngredients.map((ri) => ri.recipeId);
    return recipeIds;
  } catch (error) {
    console.error(
      "Error data-access/recipe: getAllRecipeFromIngredient(), error: ",
      error
    );
    throw error;
  }
}
