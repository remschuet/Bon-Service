import { PdfGenerator } from "./pdf";
import { OrientationPDF, UnitPDF, Coordinates, Section } from "./TypeEnumPdf";
import { PdfOption } from "./pdfOption";

export class PdfSection extends PdfGenerator {
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
    const startY =
      (section.start.y * this.pdfOption.pageHeight) / 10 +
      this.getZeroForBody();

    this.addText(
      content,
      {
        x: startX + this.gridGap,
        y: startY + this.gridGap,
      },
      maxWidth - 30
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
    const startY =
      (section.start.y * this.pdfOption.pageHeight) / 10 +
      this.getZeroForBody();
    let posY = startY;

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

  public addTextToSection(
    sectionName: string,
    content: string | string[],
    spacer: string = ""
  ) {
    const section = this.sections[sectionName];
    const maxWidth = (section.end.x * this.pdfOption.pageWidth) / 10;
    const startX = (section.start.x * this.pdfOption.pageWidth) / 10;
    const startY =
      (section.start.y * this.pdfOption.pageHeight) / 10 +
      this.getZeroForBody();
    let posY = startY;

    if (Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        const text =
          spacer === "i" ? `${i + 1}. ${content[i]}` : spacer + content[i];
        const lines = this.doc.splitTextToSize(content[i], maxWidth - 20);
        const lineHeight = this.doc.getLineHeight();

        let fistLine = true;
        for (const line of lines) {
          let text = line;
          if (fistLine) {
            text = spacer === "i" ? `${i + 1}. ${line}` : spacer + line;
            fistLine = false;
          }
          this.addText(
            text,
            {
              x: startX + this.gridGap,
              y: posY + this.gridGap,
            },
            maxWidth - 10
          );

          posY += lineHeight / 2;
        }
        posY += 8;
      }
    } else {
      this.addText(
        content,
        {
          x: startX + this.gridGap,
          y: startY + this.gridGap,
        },
        maxWidth
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
