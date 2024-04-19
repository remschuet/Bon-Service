"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { AddKitchen } from "@/app/[locale]/(protected)/kitchen/_components/add-kitchen";
import { KitchenList } from "@/app/[locale]/(protected)/kitchen/_components/kitchen-list";

export default function KitchenCreationPage() {
  return (
    <div className="container mx-auto space-y-10">
      <div className="flex justify-end mt-6">
        <AddKitchen />
      </div>
      <KitchenList />
    </div>
  );
}
