import { PdfTable } from "@/lib/pdf-creator/pdfTable";
import { ExportIngredientDTO } from "@/lib/type";
import { exportGetIngredient } from "./pdf-action-ingredient-export";
import { PdfOptionBuilder } from "@/lib/pdf-creator/pdfOption";

/**
 * Creates a PDF file containing the specified ingredient's information.
 *
 * @param id - The unique identifier of the contact to be included in the PDF.
 */
export async function exportIngredientPdf(id: string, name: string) {
  createPDF(id);
  /**
   * Create the PDF file for a specific contact.
   *
   * @param id - The unique identifier of the contact to be included in the PDF.
   */
  async function createPDF(id: string) {
    let PdfOption = new PdfOptionBuilder().setPageHeader(10).build();
    const pdf = new PdfTable(PdfOption);
    let data = ["nom", "categorie", "fournisseur", "origine", "prix", "unité"];

    const contactsDTO = (await exportGetIngredient(
      id
    )) as ExportIngredientDTO[];
    const contactStringify = JSON.stringify(contactsDTO, null, 2);
    const contactExport = JSON.parse(contactStringify) as ExportIngredientDTO[];

    await pdf.createGrid(data, contactExport);

    // Set Header
    pdf.setHeader("Ingredients", "Tous les ingredients de la cuisine");

    pdf.openPdf();
  }
}
