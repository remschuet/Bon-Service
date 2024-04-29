import { PdfTable } from "./pdfTable";
import { TableDataType, Section } from "./TypeEnumPdf";
import { contacts } from "./fakeContact";
import { PdfSection } from "./pdfSection";

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

async function testSection() {
  const pdf = new PdfSection();
  const sections: Section = {
    "cle 1": {
      start: { x: 0, y: 0 },
      end: { x: 2, y: 8 },
    },
    "cle 2": {
      start: { x: 2, y: 0 },
      end: { x: 8, y: 9 },
    },
  };
  pdf.createSection(sections);
  pdf.addTextToSection("cle 1", "Voici du texte qui est drolement inutile");
  pdf.addTextToSection("cle 2", ["Tomates2", "salade2", "haricots2"], "-");
  pdf.openPdf();
}

export async function entryPoint() {
  testSection();
}
