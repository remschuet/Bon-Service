import { PdfTable } from "@/lib/pdf-creator/pdfTable";
import { ExportContactDTO } from "@/lib/type";
import { exportGetContacts } from "./pdf-action-contact-export";
import { PdfOptionBuilder } from "@/lib/pdf-creator/pdfOption";

/**
 * Creates a PDF file containing the specified contact's information.
 *
 * @param id - The unique identifier of the contact to be included in the PDF.
 */
export async function createPdfPDF(id: string) {
  testContact(id);
  /**
   * Tests the creation of a PDF file for a specific contact.
   *
   * @param id - The unique identifier of the contact to be included in the PDF.
   */
  async function testContact(id: string) {
    let PdfOption = new PdfOptionBuilder().setPageHeader(10).build();
    const pdf = new PdfTable(PdfOption);
    let data = ["name", "description", "phoneNumber", "compteNumber"];

    const ingredientDTO = (await exportGetContacts(id)) as ExportContactDTO[];
    const ingredientStringify = JSON.stringify(ingredientDTO, null, 2);
    const ingredientExport = JSON.parse(
      ingredientStringify
    ) as ExportContactDTO[];

    await pdf.createGrid(data, ingredientExport);

    // Set Header
    pdf.setHeader("Ingredients", "Tous les ingredients de la cuisine");

    pdf.openPdf();
  }
}
