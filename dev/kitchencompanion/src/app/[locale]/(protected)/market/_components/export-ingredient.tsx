import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { exportIngredientPdf } from "@/app/[locale]/(protected)/market/_export/pdf-ingredient-export";
import { Download } from "lucide-react";

export function ExportIngredient() {
  const { id, name } = useSession();

  function exportToPDF() {
    console.log("ingredient exported to PDF");
    exportIngredientPdf(id, name);
  }
  return (
    <Button
      className='flex gap-2'
      onClick={exportToPDF}>
      {" "}
      <Download className='w-4' />
      Exporter
    </Button>
  );
}
