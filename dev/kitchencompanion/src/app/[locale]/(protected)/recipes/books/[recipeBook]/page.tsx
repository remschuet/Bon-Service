"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";
import { useSearchParams } from "next/navigation";
import { BadgePlus } from "lucide-react";
import { useRecipes } from "@/hooks/useRecipes";
import { RecipeList } from "./_components/recipe-list";

export default function RecipeBooksPage() {
  useRedirectMembers();
  const recipeBookId = useSearchParams();
  const { recipes } = useRecipes(recipeBookId.get("recipeBookId") as string);

  console.log(recipes);

  return (
    <div className="container mx-auto">
      <div className="flex gap-5 justify-end mt-6">
        <RedirectButton
          href={`/recipes/add-recipe/?recipeBookId=${recipeBookId.get(
            "recipeBookId"
          )}`}
        >
          <Button className="flex gap-2">
            <BadgePlus className="w-4" />
            <span>Ajouter une recette</span>
          </Button>
        </RedirectButton>
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
}
