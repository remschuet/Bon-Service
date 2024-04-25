"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";

export default function MarketPage() {
  useRedirectMembers();

  return (
    <div className="container mx-auto">
      <div className="flex gap-5 justify-end mt-6">
        <RedirectButton href="/recipes/add-recipe">
          <Button>
            <span>Ajouter une recette</span>
          </Button>
        </RedirectButton>
      </div>
      <IngredientsList />
    </div>
  );
}
