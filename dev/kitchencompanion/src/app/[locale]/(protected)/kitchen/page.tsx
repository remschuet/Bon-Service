"use client";

import { AddKitchen } from "@/app/[locale]/(protected)/kitchen/_components/add-kitchen";
import { OwnedKitchenList } from "@/app/[locale]/(protected)/kitchen/_components/owned-kitchen-list";
import { MemberKitchenList } from "./_components/member-kitchen.list";

export default function KitchenCreationPage() {
  return (
    <div className="container mx-auto space-y-10">
      <div className="flex justify-end mt-6">
        <AddKitchen />
      </div>
      <OwnedKitchenList />
      <MemberKitchenList />
    </div>
  );
}
