"use client";

import { useSearchParams } from "next/navigation";
import { BadgePlus } from "lucide-react";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { useRecipes } from "@/hooks/useRecipes";
import { useOwner } from "@/hooks/useOwner";

import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";
import { RecipeList } from "@/app/[locale]/(protected)/recipes/[recipeBook]/_components/recipe-list";

export default function RecipeBooksPage() {
  useRedirectMembers();
  const recipeBookId = useSearchParams().get("recipeBookId") as string;
  const { isOwner, loading } = useOwner(recipeBookId);
  const { recipes } = useRecipes(recipeBookId);

  if (loading) {
    return;
  }

  if (!isOwner) {
    return (
      <div className='container mx-auto'>
        <div className='text-center mt-10'>
          <h1 className='text-2xl font-bold'>
            Vous n'êtes pas autorisé à accéder à cette page
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className='flex gap-5 justify-end mt-6'>
        <RedirectButton href={`/recipes/create/?recipeBookId=${recipeBookId}`}>
          <Button className='flex gap-2'>
            <BadgePlus className='w-4' />
            <span>Ajouter une recette</span>
          </Button>
        </RedirectButton>
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
}
