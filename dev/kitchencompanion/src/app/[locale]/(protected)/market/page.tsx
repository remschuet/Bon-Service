"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { IngredientsList } from "@/app/[locale]/(protected)/market/_components/ingredients-list";
import { AddIngredient } from "@/app/[locale]/(protected)/market/_components/add-ingredient";
import { UploadReceipt } from "@/app/[locale]/(protected)/market/_components/upload-receipt";
import { ExportIngredient } from "@/app/[locale]/(protected)/market/_components/export-ingredient";
import { useSession } from "@/hooks/useSession";
import { IngredientsProvider } from "@/providers/ingredients";

export default function MarketPage() {
  useRedirectMembers();
  const { isPremium } = useSession();

  return (
    <IngredientsProvider>
      <div className="container mx-auto">
        <div className="flex gap-5 justify-end mt-6">
          <AddIngredient />
          {isPremium && <UploadReceipt />}
          <ExportIngredient />
        </div>
        <IngredientsList />
      </div>
    </IngredientsProvider>
  );
}
