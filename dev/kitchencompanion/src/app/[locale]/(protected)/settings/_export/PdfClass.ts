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
    inputs: InputData[] = [{}]
  ) {
    this.template = template;
    this.inputs = inputs;
  }

  private async updateTemplate(datas: string) {
    const contactsData = JSON.parse(datas);
    contactsData.forEach((data: any) => {
      this.posY += 20;

      let uid = this.getCuid();
      console.log(data.content.length);
      const linesCount = Math.ceil((data.content.length * 50) / 25 / 50);

      console.log(linesCount);
      const newColumn = {
        [uid]: {
          type: "text",
          position: { x: this.posX, y: this.posY },
          width: 50,
          height: 10,
          fontSize: PoliceSize.normal,
        },
      };
      this.template.schemas[0] = { ...this.template.schemas[0], ...newColumn };
      this.inputs[0][uid] = data.content;
    });
  }

  public calculateLineBreaks(
    text: string,
    width: number,
    fontSize: number
  ): number {
    const charSpacing = 0.7;

    // Calcul de la longueur totale du texte en pixels
    const textLength = text.length * charSpacing * (fontSize / 10);

    // Calcul du nombre de caractères par ligne
    const charsPerLine = Math.floor(width / (charSpacing * fontSize));

    // Calcul du nombre approximatif de lignes nécessaires
    const lines = Math.ceil(textLength / (charsPerLine * fontSize));

    return lines;
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
