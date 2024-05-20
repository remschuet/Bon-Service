"use client";

import { useSearchParams } from "next/navigation";

export default function ViewRecipe() {
  const params = useSearchParams();

  return (
    <div>
      <h1>View Recipe</h1>
      <p>Recipe id: {params.get("recipeId")}</p>
    </div>
  );
}
