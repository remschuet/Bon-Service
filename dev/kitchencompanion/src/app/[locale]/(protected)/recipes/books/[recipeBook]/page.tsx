"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { AddIngredient } from "@/app/[locale]/(protected)/market/_components/add-ingredient";
import { UploadReceipt } from "@/app/[locale]/(protected)/market/_components/upload-receipt";
import { useSession } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";

export default function MarketPage() {
  useRedirectMembers();
  const { isPremium } = useSession();

  return (
    <div className='container mx-auto'>
      <div className='flex gap-5 justify-end mt-6'>
        <RedirectButton href='/recipes/*/add-recipe'>
          <Button>
            <span>Retour à la page d'accueil</span>
          </Button>
        </RedirectButton>
      </div>
      <IngredientsList />
    </div>
  );
}
