"use client";

import { useIngredients } from "@/hooks/useIngredients";
import { Datatable } from "@/components/datatable";
import { columns } from "@/app/[locale]/(protected)/market/_components/datatable/ingredients-columns";

export function IngredientsList() {
  const { ingredients } = useIngredients();

  return (
    <Datatable
      data={ingredients}
      columns={columns}
    />
  );
}
