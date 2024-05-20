import { BadgeX } from "lucide-react";
import { RecipeComponent } from "@/lib/composite/recipe";
import { Label } from "@/components/ui/label";
import { useNewRecipe } from "@/hooks/useNewRecipe";

export function IngredientItem({
  index,
  ingredient,
}: {
  index: number;
  ingredient: RecipeComponent;
}) {
  const { ctx } = useNewRecipe();

  const handleRemoveIngredient = () => {
    const updatedIngredients = ctx.ingredients.filter(
      (_, idx) => idx !== index
    );
    ctx.setIngredients([...updatedIngredients]);
  };

  return (
    <div className='flex gap-2 w-full p-2 border rounded-lg mb-2 bg-stone-100 hover:bg-stone-300/50 items-center'>
      <div onClick={handleRemoveIngredient}>
        <BadgeX
          className='mr-5 cursor-pointer text-destructive/15 hover:text-red-700'
          size={20}
        />
      </div>
      <Label className='flex gap-2 items-start w-full'>
        <div className='text-sm font-semibold py-1 leading-5'>
          {ingredient.quantity} {ingredient.unit}
        </div>
        <span className='text-normal p-1 leading-5 '>{ingredient.name}</span>
      </Label>
    </div>
  );
}
