import { IngredientItem } from "@/app/[locale]/(protected)/recipes/create/_components/ingredients/ingredient-item";
import { useNewRecipe } from "@/hooks/useNewRecipe";

export function IngredientList() {
  const { ctx } = useNewRecipe();
  return (
    <>
      {ctx.ingredients.map((ingredient, index) => {
        return (
          <IngredientItem
            key={crypto.randomUUID()}
            index={index}
            ingredient={ingredient}
          />
        );
      })}
    </>
  );
}
