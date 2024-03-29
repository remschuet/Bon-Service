"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";

import { Input } from "@/components/ui/input";
import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { AddIngredient } from "@/app/[locale]/(protected)/market/_components/add-ingredients";

export default function MarketPage() {
  useRedirectMembers();

  const { isPremium, id } = useSession();

  return (
    <div className=' flex flex-col gap-2 max-w-[80%] mx-auto space-y-20'>
      <div className='space-y-5'>
        <div className='flex gap-5 justify-end mt-6'>
          <AddIngredient />

          {!isPremium ? (
            <Button variant='outline'>Devenir membre premium</Button>
          ) : (
            <Button>Ajouter un reçu</Button>
          )}
        </div>

        <div className='flex justify-end'>
          <Input
            className='md:w-[100px] lg:w-[300px]'
            placeholder='Rechercher...'
            type='search'
          />
        </div>
      </div>

      <IngredientsList />
    </div>
  );
}
