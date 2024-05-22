import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { exportCreatePdfRecipe } from "../_export/pdf-recipe-export";
import { useSearchParams } from "next/navigation";

export function RecipeExport() {
  const { id } = useSession();
  const recipeId = useSearchParams().get("recipeId") as string;

  function exportToPDF() {
    console.log("Recipe exported to PDF");
    exportCreatePdfRecipe(id, recipeId);
  }
  return (
    <div className="flex gap-2 justify-end">
      <Button className="w-[25%]" onClick={exportToPDF}>
        Exporter au format PDF
      </Button>
    </div>
  );
}
