import { Button } from "@/components/ui/button";

export function RecipeExport() {
  return (
    <div className='flex gap-2 justify-end'>
      <Button
        className='w-[25%]'
        onClick={() => console.log("Recipe deleted")}>
        Exporter au format PDF
      </Button>
    </div>
  );
}
