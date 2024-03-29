"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { AddIngredient } from "@/app/[locale]/(protected)/market/_components/add-ingredient";
import { UploadReceipt } from "@/app/[locale]/(protected)/market/_components/upload-receipt";

export default function MarketPage() {
  useRedirectMembers();

  return (
    <div className='container mx-auto pt-10'>
      <div className='space-y-5'></div>
      <div className='flex gap-5 justify-end mt-6'>
        <AddIngredient />
        <UploadReceipt />
      </div>
      <IngredientsList />
    </div>
  );
}
