"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { AddRecipeBook } from "@/app/[locale]/(protected)/recipes/_components/add-recipebook";
import { RecipeBookList } from "@/app/[locale]/(protected)/recipes/_components/recipebook-list";
import { RedirectButton } from "@/components/redirect-button";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";

export default function RecipePage() {
  useRedirectMembers();

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex justify-end mt-6 gap-5">
        <AddRecipeBook />
        <RedirectButton href="/recipes/new%20Recipe">
          <Button className="flex gap-2">
            <BadgePlus className="w-4" />
            <span>Ajouter une recette</span>
          </Button>
        </RedirectButton>
      </div>
      <RecipeBookList />
    </div>
  );
}
