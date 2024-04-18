import React from "react";
import IngredientItem from "./IngredientItem";
import Ingredient from "../classes/Ingredient";

export function IngredientList({
  ingredients,
  onRemoveIngredient,
}: {
  ingredients: Ingredient[];
  onRemoveIngredient: (number: number) => void;
}) {
  return (
    <>
      {ingredients.map((ingredient, key) => {
        return (
          <div key={key}>
            <IngredientItem
              ingredient={ingredient}
              onRemove={onRemoveIngredient}
            />
          </div>
        );
      })}
    </>
  );
}
