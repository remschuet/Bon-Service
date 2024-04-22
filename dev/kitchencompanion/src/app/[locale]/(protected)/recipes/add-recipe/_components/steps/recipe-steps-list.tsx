import RecipeStepsItems from "@/app/[locale]/(protected)/recipes/add-recipe/_components/steps/recipe-steps-item";
import { useNewRecipe } from "@/hooks/useNewRecipe";

export default function RecipeStepsList(): JSX.Element {
  const { ctx } = useNewRecipe();
  return (
    <>
      {ctx.steps.map((step, index) => {
        return (
          <RecipeStepsItems
            key={crypto.randomUUID()}
            direction={step}
            index={index}
          />
        );
      })}
    </>
  );
}
