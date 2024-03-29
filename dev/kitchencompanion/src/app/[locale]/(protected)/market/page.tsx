"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";

import { Input } from "@/components/ui/input";
import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { AddIngredient } from "@/app/[locale]/(protected)/market/_components/add-ingredients";

export default function MarketPage() {
  useRedirectMembers();

  const { isPremium } = useSession();

  return (
    <div className='container mx-auto pt-10'>
      <div className='space-y-5'></div>
      <div className='flex gap-5 justify-end mt-6'>
        <AddIngredient />

        {!isPremium ? (
          <Button variant='outline'>Devenir membre premium</Button>
        ) : (
          <Button>Ajouter un reçu</Button>
        )}
      </div>

      <IngredientsList />
    </div>
  );
}
