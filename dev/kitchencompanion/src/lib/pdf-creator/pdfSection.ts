import { PdfGenerator } from "./pdf";
import { OrientationPDF, UnitPDF } from "./TypeEnumPdf";
import { PdfOption } from "./pdfOption";

type Coordinates = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};
export interface Section {
  [key: string]: Coordinates;
}

export class PdfSection extends PdfGenerator {
  protected gridX: number = 10;
  protected gridY: number = 10;
  protected gridGap: number = 10;
  protected sections: Section = {};

  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm,
    pdfOption: PdfOption | undefined = undefined
  ) {
    super(orientation, unit);
  }

  public createSection(sections: Section) {
    for (const key in sections) {
      if (sections.hasOwnProperty(key)) {
        this.sections[key] = sections[key];
      }
    }
  }

  /**
   * Adds a text to a specific section in the PDF.
   *
   * @param sectionName The name of the section to add text to.
   * @param content The text content to be added to the section.
   */
  public addTextSection(sectionName: string, content: string) {
    const section = this.sections[sectionName];
    const maxWidth = (section.end.x * this.pdfOption.pageWidth) / 10;
    const startX = (section.start.x * this.pdfOption.pageWidth) / 10;
    const startY = (section.start.y * this.pdfOption.pageHeight) / 10;
    console.log(maxWidth);
    this.addText(
      content,
      {
        x: startX + this.gridGap,
        y: startY + this.gridGap,
      },
      maxWidth
    );
  }

  /**
   * Adds a text list to a specific section in the PDF.
   *
   * @param sectionName The name of the section to add the text list to.
   * @param content The array of text content to be added to the section.
   * @param spacer A string to be added before each item in the list. Defaults to an empty string.
   * If it's 'i' it will add index of the item
   *
   * @returns Nothing. This method modifies the PDF document directly.
   */
  public addTextListSection(
    sectionName: string,
    content: string[],
    spacer: string = ""
  ) {
    const section = this.sections[sectionName];
    const maxWidth = (section.end.x * this.pdfOption.pageWidth) / 10;
    const startX = (section.start.x * this.pdfOption.pageWidth) / 10;
    const startY = (section.start.y * this.pdfOption.pageHeight) / 10;
    let posY = startY;
    console.log(startX, " - ", maxWidth);
    for (let i = 0; i < content.length; i++) {
      const text =
        spacer === "i" ? `${i + 1}. ${content[i]}` : spacer + content[i];

      this.addText(
        text,
        {
          x: startX + this.gridGap,
          y: posY + this.gridGap,
        },
        maxWidth
      );
      posY += 8;
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
