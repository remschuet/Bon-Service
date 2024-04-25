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

  private async updateTemplate(datas: string) {
    const contactsData = JSON.parse(datas);
    contactsData.forEach((data: any) => {
      this.posY += 10;
      let uid = this.getCuid();

      const newColumn = {
        [uid]: {
          type: "text",
          position: { x: this.posX, y: this.posY },
          width: data.content.length * 3,
          height: 10,
          fontSize: PoliceSize.normal,
        },
      };
      this.template.schemas[0] = { ...this.template.schemas[0], ...newColumn };
      this.inputs[0][uid] = data.content;
    });
  }

  public getCuid(): number {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  public async createPdfPDF(datas: string) {
    console.log("Creating PDF");
    await this.updateTemplate(datas);
    console.log("call generate");
    console.log(this.template.schemas);
    generate({ template: this.template, inputs: this.inputs }).then((pdf) => {
      console.log(pdf);

      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
  }
}
