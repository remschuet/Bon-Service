import { Button } from "@/components/ui/button";

export function RecipeExport() {
  function exportToPDF() {
    console.log("Recipe exported to PDF");
  }
  return (
    <div className='flex gap-2 justify-end'>
      <Button
        className='w-[25%]'
        onClick={exportToPDF}>
        Exporter au format PDF
      </Button>
    </div>
  );
}
