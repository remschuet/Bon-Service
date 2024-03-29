"use client";

import { useIngredients } from "@/hooks/useIngredients";

export function IngredientsList() {
  const ingredients = useIngredients();

  return (
    <div className='container mx-auto py-10'>
      {/* <Datatable ingredients={ingredients} /> */}
    </div>
  );
}
