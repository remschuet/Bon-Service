import { Template, BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Contact } from "@prisma/client";
import { InputData } from "./interfacePdf";
import { PoliceSize } from "./enumPdf";

export class PdfGenerator {
  private template: Template;
  private inputs: InputData[];
  private posX: number = 20;
  private posY: number = 0;

  constructor(
    template: Template = { basePdf: BLANK_PDF, schemas: [{}] },
    inputs: InputData[] = [{ a: "a1", b: "b1", c: "c1" }]
  ) {
    this.template = template;
    this.inputs = inputs;
  }

  private async updateTemplate(contacts: Contact[]) {
    contacts.forEach((contact) => {
      this.posY += 10;
      console.log(contact.name);
      console.log(contact.name.length);
      const newColumn = {
        [contact.id]: {
          type: "text",
          position: { x: this.posX, y: this.posY },
          width: contact.name.length * 3,
          height: 10,
          fontSize: PoliceSize.normal,
        },
      };

      this.template.schemas[0] = { ...this.template.schemas[0], ...newColumn };
      this.inputs[0][contact.id] = contact.name;
    });

    console.log("fin generate");
  }

  public async createPdfPDF(datas: string) {
    const contactsData = JSON.parse(datas);
    console.log("ici", contactsData);
    for (const data of contactsData) {
      console.log("textStyle :", data.textStyle);
      console.log("key :", data.key);
      console.log("content :", data.content);
    }

    /*
    console.log("Creating PDF");
    await this.updateTemplate(data);
    console.log("call generate");
    console.log(this.template.schemas);
    generate({ template: this.template, inputs: this.inputs }).then((pdf) => {
      console.log(pdf);

      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });*/
  }
}
