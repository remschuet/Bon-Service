import { PdfTable } from "@/lib/pdf-creator/pdfTable";
import { ExportContactDTO } from "@/lib/type";
import { exportGetContacts } from "./pdf-action-contact-export";
import { PdfOptionBuilder } from "@/lib/pdf-creator/pdfOption";

/**
 * Creates a PDF file containing the specified contact's information.
 *
 * @param id - The unique identifier of the contact to be included in the PDF.
 */
export async function exportContactPdf(id: string, name: string) {
  let PdfOption = new PdfOptionBuilder().setPageHeader(13).build();
  const pdf = new PdfTable(PdfOption);
  let data = ["name", "description", "phoneNumber", "compteNumber"];

  const ingredientDTO = (await exportGetContacts(id)) as ExportContactDTO[];
  const ingredientStringify = JSON.stringify(ingredientDTO, null, 2);
  const ingredientExport = JSON.parse(
    ingredientStringify
  ) as ExportContactDTO[];

  await pdf.createGrid(data, ingredientExport);

  // Set Header
  pdf.setHeader("Contacts", "", "responsable: " + name);

  pdf.openPdf();
}
