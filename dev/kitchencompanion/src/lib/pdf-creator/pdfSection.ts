import { PdfGenerator } from "./pdf";
import {
  OrientationPDF,
  UnitPDF,
  Coordinates,
  Section,
  TableDataType,
} from "./TypeEnumPdf";
import { PdfOption } from "./pdfOption";
import { PdfTable } from "./pdfTable";
import autoTable from "jspdf-autotable";

export class PdfSection extends PdfTable {
  protected gridX: number = 10;
  protected gridY: number = 10;
  protected gridGap: number = 10;
  protected sections: Section = {};

  constructor(
    pdfOption: PdfOption | undefined = undefined,
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm
  ) {
    super(orientation, unit, pdfOption);
  }

  public createSection(sections: Section) {
    for (const key in sections) {
      if (sections.hasOwnProperty(key)) {
        this.sections[key] = sections[key];
      }
    }
  }

  public addGridToSection() {
    const headers = ["temps", "cuisson", "temperature"];
    const data = [
      ["120 mins", "30 mins", "350 degrés"],
      ["120 mins", "30 mins", "350 degrés"],
    ];

    autoTable(this.doc, {
      startY: (this.pdfOption.pageHeader * this.pdfOption.pageHeight) / 100,
      head: [headers],
      body: data,
    });
  }

  public addTextToSection(
    sectionName: string,
    content: string | string[],
    title: string[] = [""],
    spacer: string = "",
    leftGap: number = -1,
    rightGap: number = -1
  ) {
    const section = this.sections[sectionName];
    const maxWidth = (section.end.x * this.pdfOption.pageWidth) / 10;
    const startX = (section.start.x * this.pdfOption.pageWidth) / 10;
    const startY =
      (section.start.y * this.pdfOption.pageHeight) / 10 +
      this.getZeroForBody();
    let posY = startY;

    if (Array.isArray(content)) {
      let idx = 0;
      const lineHeight = this.doc.getLineHeight();
      for (let i = 0; i < content.length; i++) {
        let fistLine = true;
        const lines = this.doc.splitTextToSize(content[i], maxWidth - rightGap);

        if (!title.includes(content[i])) {
          idx += 1;
        }

        for (const line of lines) {
          let text = line;
          if (fistLine && !title.includes(content[i])) {
            text = spacer === "i" ? `${idx}. ${line}` : spacer + line;
            fistLine = false;
          }

          this.addText(
            text,
            {
              x: startX + (leftGap === -1 ? this.gridGap : leftGap),
              y: posY + this.gridGap,
            },
            maxWidth - (rightGap === -1 ? this.gridGap : rightGap),
            title.includes(content[i])
              ? this.pdfOption.sizes.subTitle
              : this.pdfOption.sizes.normal
          );
          this.doc.setFontSize(this.pdfOption.sizes.normal);
          posY += lineHeight / 2;
        }
        if (lines.length > 1 || title.includes(content[i + 1])) {
          posY += 8;
        }
      }
    } else {
      this.addText(
        content,
        {
          x: startX + this.gridGap,
          y: startY + this.gridGap,
        },
        maxWidth,
        title.includes(content)
          ? this.pdfOption.sizes.title
          : this.pdfOption.sizes.normal
      );
    }
  }

  private getSectionCoords(sectionName: string) {
    const section = this.sections[sectionName];
    if (!section) {
      console.error(`Section "${sectionName}" not found.`);
      return null;
    }
    return this.sections[sectionName];
  }
}
