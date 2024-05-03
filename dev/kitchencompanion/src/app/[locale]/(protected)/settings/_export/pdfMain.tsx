import { getAllContact } from "@/db/data-access/contact";
import { entryPoint } from "@/lib/pdf-creator/entry";
import { contacts } from "@/lib/pdf-creator/fakeContact";
import { PdfTable } from "@/lib/pdf-creator/pdfTable";
import { TableDataType } from "@/lib/pdf-creator/TypePdf";

export async function createPdfPDF(id: string = "clvqv6az600009iw5c8dvhx3v") {

  async function testContact(id: string) {
    const pdf = new PdfTable();
    // TODO: call action base donnee pour chercher des DTP
    
    // The data we need to take care in the Contacts listes
    let data = ["name", "description", "phoneNumber", "compteNumber"];
    const jsonContact = JSON.stringify(contacts, null, 2);
    const contactsData: TableDataType[] = JSON.parse(jsonContact);
  
    // Create pdf grid and set the table
    await pdf.createGrid(data, contactsData);
  
    // Set Header
    pdf.setHeader("Contacts");
  
    pdf.openPdf();
  }
  testContact(id);
}
