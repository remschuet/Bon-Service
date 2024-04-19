import { IngredientItem } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/ingredients/ingredient-item";
import { RecipeComponent } from "@/lib/composite/recipe";

export function IngredientList({
  ingredients,
  onRemoveIngredient,
}: {
  ingredients: RecipeComponent[];
  onRemoveIngredient: (id: string) => void;
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
