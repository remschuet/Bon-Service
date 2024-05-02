"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";
import { useSearchParams } from "next/navigation";
import { BadgePlus } from "lucide-react";
import { useRecipes } from "@/hooks/useRecipes";
import { RecipeList } from "./_components/recipe-list";
import { useOwner } from "@/hooks/useOwner";

export default function RecipeBooksPage() {
  useRedirectMembers();
  const recipeBookId = useSearchParams().get("recipeBookId") as string;
  const { isOwner } = useOwner(recipeBookId);
  const { recipes } = useRecipes(recipeBookId);

  if (!isOwner) {
    <div className="container mx-auto">
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">
          Vous n'êtes pas autorisé à accéder à cette page
        </h1>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex gap-5 justify-end mt-6">
        <RedirectButton
          href={`/recipes/add-recipe/?recipeBookId=${recipeBookId}`}
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
