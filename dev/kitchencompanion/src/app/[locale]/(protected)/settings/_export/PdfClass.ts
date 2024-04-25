import { Template, BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Contact } from "@prisma/client";
import { InputData } from "./interfacePdf";

export class PdfGenerator {
  private contacts: Contact[];
  private template: Template;
  private inputs: InputData[];

  constructor(
    contacts: Contact[],
    template: Template = { basePdf: BLANK_PDF, schemas: [{}] },
    inputs: InputData[] = [{ a: "a1", b: "b1", c: "c1" }]
  ) {
    this.contacts = contacts;
    this.template = template;
    this.inputs = inputs;
  }

  private async updateTemplate() {
    let pos_x = 30;

    this.contacts.forEach((contact) => {
      pos_x += 10;
      console.log(contact.name);

      const newColumn = {
        [contact.id]: {
          type: "text",
          position: { x: 30, y: pos_x },
          width: 10,
          height: 10,
        },
      };

      this.template.schemas[0] = { ...this.template.schemas[0], ...newColumn };
      this.inputs[0][contact.id] = contact.name;
    });

    console.log("fin generate");
  }

  public async createPdfPDF() {
    console.log("Creating PDF");
    await this.updateTemplate();
    console.log("call generate");
    console.log(this.template.schemas);
    generate({ template: this.template, inputs: this.inputs }).then((pdf) => {
      console.log(pdf);

      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
  }
}
