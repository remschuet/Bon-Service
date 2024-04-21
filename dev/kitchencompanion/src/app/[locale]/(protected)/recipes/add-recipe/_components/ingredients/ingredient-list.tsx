import { IngredientItem } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/ingredients/ingredient-item";
import { useNewRecipe } from "@/hooks/useNewRecipe";

export function IngredientList() {
  const { ctx } = useNewRecipe();
  return (
    <>
      {ctx.ingredients.map((ingredient) => {
        return (
          <IngredientItem
            key={crypto.randomUUID()}
            ingredient={ingredient}
          />
        );
      })}
    </>
  );
}
