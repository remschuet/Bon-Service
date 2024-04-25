import { PdfGenerator } from "./PdfClass";
import { template } from "./templateTest";
import { contacts } from "./pdfContact";
import { PoliceSize } from "./enumPdf";
import { templateTable } from "./tableSchema";
import { BLANK_PDF, Template } from "@pdfme/common";
import { Designer } from "@pdfme/ui";
import { generate } from "@pdfme/generator";
import { tableBeta } from "@pdfme/schemas";

interface Data {
  textStyle: PoliceSize;
  key: string;
  content: string;
}
[];

export async function createPdfPDF() {
  console.log("Creating PDF");
  const pdf = new PdfGenerator(templateTable);

  let datacontact: Data[] = [];

  /*Discussion avec Julien, cas si je json pas contact[key] impossible a cause de typescript et du potentiel null*/
  const jsonContact = JSON.stringify(contacts, null, 2);
  const contactsData = JSON.parse(jsonContact);

  contactsData.forEach((contact: any) => {
    for (const key in contact) {
      if (["name", "description", "phoneNumber"].includes(key)) {
        datacontact.push({
          textStyle: PoliceSize.normal,
          key: key,
          content: contact[key],
        });
      }
    }
  });
  const jsonData = JSON.stringify(datacontact, null, 2);

  // pdf.createPdfPDF(jsonData);
  pdf.createTable(3, 5);
  pdf.generatedPdf();
}
