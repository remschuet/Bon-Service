import { Kitchen, Recipe, RecipeBook, Unit } from "@prisma/client";
import { RecipeData } from "@/lib/composite/recipe";

export enum IngredientType {
  "RECIPE",
  "INGREDIENT",
}

export type ResponseMessage = {
  error?: string;
  status: number;
  success?: string;
};

export type UserSession = {
  user: {
    name: string;
    email: string;
    userType: string;
    isPremium: boolean;
    id: string;
  };
};

export type IngredientDTO = {
  type: IngredientType;
  id: string;
  quantity: number;
  unit: Unit;
};

export type IngredientComponentDTO = {
  _id: string;
  _name: string;
  _unit: Unit;
  _price: number;
};

export type RecipeComponentDTO = {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
};

export type RecipeDTO = {
  _name: string;
  _ingredients: RecipeComponentDTO[];
  _recipeData: RecipeData;
};

export type RecipeIngredientDTO = {
  recipeId: string;
  ingredientId: string | null;
  recipeIngredientId: string | null;
  quantity: number;
  unit: Unit;
};

export type CompleteRecipeIngredients = RecipeIngredientDTO & {
  ingredient?: { name: string };
  recipeIngredient?: { name: string };
};

export type CompleteRecipe = Recipe & {
  recipeAllergens: { allergen: { name: string } }[];
  recipeBook: RecipeBook;
};

export type MemberKitchen = Kitchen & {
  chefName: string;
  members: number;
};

export type ExportContactDTO = {
  name: string;
  description: string;
  phoneNumber: string;
  compteNumber: string;
};

export type ExportIngredientDTO = {
  nom: string;
  prix: string;
  unité: Unit;
  categorie: string;
  origine: string;
  fournisseur: string;
};

export type UserInformation = {
  name: string;
  phone: string | null;
  address: string | null;
  avatar_key: string | null;
};
