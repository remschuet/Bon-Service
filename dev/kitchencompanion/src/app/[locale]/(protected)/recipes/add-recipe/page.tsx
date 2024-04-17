import { RecipeGeneral } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-general";
import { RecipeInputBox } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-input-box";

export default async function RecipeBookPage() {
  return (
    <div className='space-y-2 flex gap-4 justify-center mt-10'>
      <RecipeGeneral />
      <RecipeInputBox />
    </div>
  );
}
