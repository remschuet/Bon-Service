"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { RecipeGeneral } from "@/app/[locale]/(protected)/recipes/_components/recipe-general";
import { RecipeInputBox } from "@/app/[locale]/(protected)/recipes/_components/recipe-input-box";

export default function RecipePage() {
  useRedirectMembers();

  return (
    <div>
      <RecipeGeneral />
      <RecipeInputBox />
    </div>
  );
}
