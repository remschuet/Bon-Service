import { PdfGenerator } from "./PdfClass";
import { template } from "./templateTest";
import { contacts } from "./pdfContact";
import { PoliceSize } from "./enumPdf";

interface Data {
  textStyle: PoliceSize;
  key: string;
  content: string;
}
[];

export async function createPdfPDF() {
  console.log("Creating PDF");
  const pdf = new PdfGenerator();

  let datacontact: Data[] = [];

  /*Discussion avec Julien, cas si je json pas contact[key] impossible a cause de typescript et du potentiel null*/
  const jsonContact = JSON.stringify(contacts, null, 2);
  const contactsData = JSON.parse(jsonContact);

  contactsData.forEach((contact: any) => {
    for (const key in contact) {
      datacontact.push({
        textStyle: PoliceSize.normal,
        key: key,
        content: contact[key],
      });
    }
  });
  const jsonData = JSON.stringify(datacontact, null, 2);

  pdf.createPdfPDF(jsonData);
}
