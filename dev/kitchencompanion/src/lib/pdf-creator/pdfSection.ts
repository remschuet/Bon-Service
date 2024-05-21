import { PdfGenerator } from "./pdf";
import { OrientationPDF, UnitPDF, Section } from "./TypePdf";
import { PdfOption } from "./pdfOption";
import autoTable from "jspdf-autotable";

/**
 * PdfSection extends PdfGenerator
 * The class provides methods for managing sections in a PDF document,
 * including creating sections, adding grids, inserting text with flexible and inserting grid.
 */

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

  /**
   * Creates sections within the PDF based on the provided Section object.
   *
   * @param sections The Section object defining the sections to be created.
   */
  public createSection(sections: Section) {
    for (const key in sections) {
      if (sections.hasOwnProperty(key)) {
        this.sections[key] = sections[key];
      }
    }
  }

  /** IN PROGRESS
   * Adds a grid with customizable styles to the specified section in the PDF.
   *
   * @param sectionName The name of the section to add the grid to.
   * @param leftGap The left margin for the grid. Defaults to 0.
   * @param topGap The top margin for the grid. Defaults to 0.
   */
  public addGridToSection(
    sectionName: string,
    title: string[],
    data: Array<string[]>,
    leftGap: number = 0,
    topGap: number = 0
  ) {
    const section = this.sections[sectionName];
    if (!section) {
      console.error(`Section "${sectionName}" not found.`);
      return null;
    }

    const columnStyles = {
      0: { cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
    };

    // Implementation dans options en cours
    autoTable(this.doc, {
      //headStyles: { fillColor: [0, 153, 153], textColor: [255, 255, 255] },
      styles: { halign: "center" },
      //alternateRowStyles: { fillColor: [102, 255, 255] },
      //tableLineColor: [0, 255, 255],
      startY:
        (section.start.y * this.pdfOption.pageHeight) / 10 +
        this.getZeroForBody() +
        topGap,
      margin: (section.start.x * this.pdfOption.pageWidth) / 10 + leftGap,
      head: [title],
      body: data,

      columnStyles: columnStyles,
    });
  }

  /**
   * Adds text with flexible formatting options to the specified section in the PDF.
   *
   * @param sectionName The name of the section to add the text to.
   * @param content The text content to be added. Can be a single string or an array of strings.
   * @param title An array of strings representing titles. Defaults to an empty array.
   * @param spacer A string to be added before each line of text. Defaults to an empty string.
   * IF spacer == i, it will use iterators
   * @param leftGap The left margin for the text. Defaults to gridGap.
   * @param rightGap The right margin for the text. Defaults to gridGap.
   */
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

  /**
   * Retrieves the coordinates of the specified section.
   *
   * @param sectionName The name of the section to get coordinates for.
   * @returns The coordinates of the section as a Coordinates object.
   */
  private getSectionCoords(sectionName: string) {
    const section = this.sections[sectionName];
    if (!section) {
      console.error(`Section "${sectionName}" not found.`);
      return null;
    }
    return this.sections[sectionName];
  }
}
