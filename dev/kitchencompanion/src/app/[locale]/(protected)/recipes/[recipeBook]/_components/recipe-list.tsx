"use client";

import { Datatable } from "@/components/datatable";
import { columns } from "@/app/[locale]/(protected)/recipes/[recipeBook]/_components/datatable/recipes-columns";
import { Recipe } from "@prisma/client";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <Datatable
      data={recipes}
      columns={columns}
    />
  );
}
