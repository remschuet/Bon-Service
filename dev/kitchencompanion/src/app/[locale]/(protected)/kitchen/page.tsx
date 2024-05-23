"use client";

import { OwnedKitchenList } from "@/app/[locale]/(protected)/kitchen/_components/owned-kitchen-list";
import { MemberKitchenList } from "./_components/member-kitchen.list";
import { KitchensProvider } from "@/providers/kitchens";
import { AddDialogue } from "@/components/add-dialogue";
import { AddKitchenForm } from "@/app/[locale]/(protected)/kitchen/_components/add-kitchen-form";

export default function KitchenCreationPage() {
  return (
    <KitchensProvider>
      <div className='container mx-auto space-y-10'>
        <div className='flex justify-end mt-6'>
          <AddDialogue
            buttonText='Ajouter une cuisine'
            title='Ajouter une nouvelle cuisine'>
            <AddKitchenForm />
          </AddDialogue>
        </div>
        <OwnedKitchenList />
        <MemberKitchenList />
      </div>
    </KitchensProvider>
  );
}
