import { CompleteRecipeIngredients } from "@/lib/type";

export function RecipeIngredients({
  ingredients,
  multiplier,
}: {
  ingredients: CompleteRecipeIngredients[];
  multiplier: number;
}) {
  return (
    <fieldset className='grid gap-6 rounded-lg border p-4'>
      <legend className='ml-1 px-1 text-sm font-medium'>
        <h2 className='font-bold text-xl'>Ingrédients</h2>
      </legend>
      <ul className='m-5'>
        {ingredients.map((ingredient) => (
          <li
            className='flex gap-4'
            key={ingredient.ingredientId || ingredient.recipeIngredientId}>
            <div>
              {ingredient.quantity * multiplier} {ingredient.unit.toLowerCase()}
            </div>
            <div>
              {ingredient.ingredient?.name || ingredient.recipeIngredient?.name}
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
