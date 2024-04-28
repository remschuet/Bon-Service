import { PdfTable } from "./pdfTable";
import { TableDataType } from "./TypeEnumPdf";
import { contacts } from "./fakeContact";

async function contactCreation() {
  // Exemple d'utilisation
  const pdf = new PdfTable();
  let data = ["name", "description", "phoneNumber", "compteNumber"];

  const jsonContact = JSON.stringify(contacts, null, 2);
  const contactsData: TableDataType[] = JSON.parse(jsonContact);

  await pdf.createGrid(data, contactsData);
  pdf.setHeader();
  // pdfGenerator.addText("contact", { x: 20, y: 30 });
  pdf.openPdf();
}
export async function entryPoint() {
  contactCreation();
}
