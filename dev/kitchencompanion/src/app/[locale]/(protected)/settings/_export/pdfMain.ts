import { Template, BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Contact } from "@prisma/client";
import { PdfGenerator } from "./PdfClass";
import { template } from "./templateTest";
import { contacts } from "./pdfContact";

const inputs: { [key: string]: string }[] = [{ a: "a1", b: "b1", c: "c1" }];

async function updateTemplate() {
  let pos_x = 30;

  contacts.forEach((contact) => {
    pos_x += 10;
    console.log(contact.name);

    // Pour ajouter une nouvelle colonne 'd', par exemple
    const newColumn = {
      [contact.id]: {
        type: "text",
        position: { x: 30, y: pos_x },
        width: 10,
        height: 10,
      },
    };

    // Insérer la nouvelle colonne dans le schéma existant
    template.schemas[0] = { ...template.schemas[0], ...newColumn };
    inputs[0][contact.id] = contact.name;
  });

  console.log("fin generate");
}

export async function createPdfPDF() {
  console.log("Creating PDF");
  const pdf = new PdfGenerator(contacts);
  pdf.createPdfPDF();
}
