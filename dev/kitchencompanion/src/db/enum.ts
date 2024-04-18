import {
  Unit,
  NotifTypes,
  Allergen,
  UserTypes,
  RecipeState,
} from "@prisma/client";

type EnumType = { [s: string]: string } | ArrayLike<string>;

/**
 * Return all the values of an enum as an array.
 * @param enumObject - The enum object to get the values from.
 * @returns An array of the values of the enum.
 */
function getAllEnumValues<T extends EnumType>(enumObject: T): string[] {
  return Object.values(enumObject) as string[];
}

/**
 * Return an array containing the values of enum UnitMeasure.
 */
export async function getUnitMeasure() {
  try {
    return getAllEnumValues(Unit);
  } catch (error) {
    console.error("Error data-access/enum: getUnitMeasure(), error: ", error);
    throw error;
  }
}

/**
 * Return an array containing the values of enum NotifType.
 */
export async function getNotifType() {
  try {
    return getAllEnumValues(NotifTypes);
  } catch (error) {
    console.error("Error data-access/enum: getNotifType(), error: ", error);
    throw error;
  }
}

/**
 * Return an array containing the values of enum Allergen.
 */
export async function getAllergens() {
  try {
    return getAllEnumValues(Allergen);
  } catch (error) {
    console.error("Error data-access/enum: getAllergens(), error: ", error);
    throw error;
  }
}

/**
 * Return an array containing the values of enum UserTypes.
 */
export async function getUserTypes() {
  try {
    return getAllEnumValues(UserTypes);
  } catch (error) {
    console.error("Error data-access/enum: getUserTypes(), error: ", error);
    throw error;
  }
}

/**
 * Return an array containing the values of enum RecipeState.
 */
export async function getRecipeStates() {
  try {
    return getAllEnumValues(RecipeState);
  } catch (error) {
    console.error("Error data-access/enum: getRecipeStates(), error: ", error);
    throw error;
  }
}
