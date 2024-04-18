import React from "react";
import { X } from "lucide-react";
import { RecipeComponent } from "@/lib/composite/recipe";

export default function IngredientItem({
  ingredient,
  onRemove,
}: {
  ingredient: RecipeComponent;
  onRemove: (number: string) => void;
}) {
  const handleRemoveDirection = () => {
    onRemove(ingredient.component.id);
  };

  return (
    <div>
      <label id="ingredient">
        <div id="ingredient-quantite">
          {ingredient.} {ingredient.unit}
        </div>
        <div id="ingredient-name">{ingredient.name}</div>
        <div className="remove" onClick={handleRemoveDirection}>
          <X />
        </div>
      </label>
    </div>
  );
}
