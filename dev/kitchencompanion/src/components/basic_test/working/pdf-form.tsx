import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ingredient, UnitMeasure } from "@prisma/client";
import { generatePDF } from "@/lib/pdf-creator/pdf";

export function PdfForm() {
  async function createPdf(formData: FormData) {
    generatePDF();
  }

  return (
    <>
      <Card className="w-[350px] h-[450px] grid place-content-center">
        <CardHeader>Create Pdf</CardHeader>
        <CardContent>
          <form action={createPdf} className="grid gap-2">
            <Button type="submit">Create Pdf</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
