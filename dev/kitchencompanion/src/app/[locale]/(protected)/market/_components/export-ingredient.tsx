import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { exportIngredientPdf } from "@/app/[locale]/(protected)/market/_export/pdf-ingredient-export";

export function ExportIngredient() {
  const { id, name } = useSession();

  function exportToPDF() {
    console.log("ingredient exported to PDF");
    exportIngredientPdf(id, name);
  }
  return <Button onClick={exportToPDF}>Exporter</Button>;
}
