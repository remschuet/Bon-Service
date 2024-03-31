"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { AddIngredient } from "@/app/[locale]/(protected)/market/_components/add-ingredient";
import { UploadReceipt } from "@/app/[locale]/(protected)/market/_components/upload-receipt";
import { useSession } from "@/hooks/useSession";

export default function MarketPage() {
  useRedirectMembers();
  const { isPremium } = useSession();

  return (
    <div className='container mx-auto'>
      <div className='flex gap-5 justify-end mt-6'>
        <AddIngredient />
        {isPremium && <UploadReceipt />}
      </div>
      <IngredientsList />
    </div>
  );
}
