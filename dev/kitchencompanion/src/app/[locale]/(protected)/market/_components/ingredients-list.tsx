"use client";

import { useIngredients } from "@/hooks/useIngredients";
import { IngredientsDatatable } from "@/app/[locale]/(protected)/market/_components/datatable/ingredients-datatable";
import { columns } from "@/app/[locale]/(protected)/market/_components/datatable/columns";

export function IngredientsList() {
  const { ingredients } = useIngredients();

  return (
    <IngredientsDatatable
      data={ingredients}
      columns={columns}
    />
  );
}
