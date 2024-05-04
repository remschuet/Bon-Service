import { getAllContact } from "@/db/data-access/contact";
import { entryPoint } from "@/lib/pdf-creator/entry";
import { contacts } from "@/lib/pdf-creator/fakeContact";
import { PdfTable } from "@/lib/pdf-creator/pdfTable";
import { TableDataType } from "@/lib/pdf-creator/TypePdf";
import { ExportContactDTO } from "@/lib/type";
import { exportGetContacts } from "./settings-action-contact";
import { Contact } from "@prisma/client";

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
    const pdf = new PdfTable();
    let data = ["name", "description", "phoneNumber", "compteNumber"];

    const contactExport = (await exportGetContacts(id)) as ExportContactDTO[];
    const contactExports = JSON.stringify(contactExport, null, 2);
    const contactExportss = JSON.parse(contactExports) as ExportContactDTO[];

    await pdf.createGrid(data, contactExportss);

    // Set Header
    pdf.setHeader("Contacts");

    pdf.openPdf();
  }
}
