import { Unit } from "@prisma/client";

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

export enum IngredientType {
  "RECIPE",
  "INGREDIENT",
}

export type IngredientDTO = {
  type: IngredientType;
  id: string;
  quantity: number;
  unit: Unit;
};
