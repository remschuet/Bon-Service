import { entryPoint } from "@/lib/pdf-creator/entry";

export async function createPdfPDF() {
  console.log("Creating PDF");
  entryPoint();
}
