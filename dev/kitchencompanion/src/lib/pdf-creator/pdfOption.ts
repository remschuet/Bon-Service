import jsPDF from "jspdf";

interface FontSizes {
  [key: string]: number;
}

/**
 * This class is a PdfOptionBuilder
 * It returns an instance of PdfOption
 * The variables of PdfOption are mostly readonly
 *
 * All options have default values
 * Each of them can be modified
 *
 * The initDoc method of PdfOption must be called once the jsPDF document is created
 * (The method is by default called in the library regardless of whether we change values in the builder)
 *
 * The method applies certain values to the PDF to set up the predefined values properly
 *
 * INITIALIZED WITHOUT BUILDER, initialization with initDoc
 * pageWidth: number, represents the X size in points (jsPDF)
 * pageHeight: number, represents the Y size in points (jsPDF)
 *
 * INITIALIZED WITH BUILDER
 * pageHeader: number, represents the percentage of space allocated to the header
 * pageFooter: number, represents the percentage of space allocated to the footer
 * font: string, is the font used for the PDF document
 * sizes: fontSize, is a list that defines possible values for text size
 */

export const fontSizes: FontSizes = {
  title: 17,
  subTitle: 15,
  normal: 12,
};

export class PdfOptionBuilder {
  private pageHeader: number = 20;
  private pageFooter: number = 20;
  private font: string = "Helvetica";

  private sizes: FontSizes = fontSizes;

  public setFontSize(sizeKey: string, sizeValue: number) {
    if (typeof sizeValue !== "number" || isNaN(sizeValue)) {
      throw new Error("La taille de police doit être un nombre.");
    }

    if (!this.sizes.hasOwnProperty(sizeKey)) {
      this.sizes[sizeKey] = sizeValue;
    }

    return this;
  }

  public setFont(font: string): PdfOptionBuilder {
    this.font = font;
    return this;
  }

  public setPageHeader(pageHeader: number): PdfOptionBuilder {
    this.pageHeader = pageHeader;
    return this;
  }
  public setPageFooter(pageFooter: number): PdfOptionBuilder {
    this.pageFooter = pageFooter;
    return this;
  }

  public build(): PdfOption {
    return new PdfOption(
      this.pageHeader,
      this.pageFooter,
      this.sizes,
      this.font
    );
  }
}

export class PdfOption {
  public pageWidth: number;
  public pageHeight: number;
  public readonly pageHeader: number;
  public readonly pageFooter: number;
  public readonly sizes: FontSizes;
  public readonly font: string;

  constructor(
    pageHeader: number,
    pageFooter: number,
    sizes: FontSizes,
    font: string
  ) {
    this.pageWidth = -1;
    this.pageHeight = -1;
    this.pageHeader = pageHeader;
    this.pageFooter = pageFooter;
    this.sizes = sizes;
    this.font = font;
  }

  /**
   * Apply the options set up to a specific doc
   *
   * @param doc: a jsPDF document
   */
  public initDoc(doc: jsPDF) {
    this.pageWidth = doc.internal.pageSize.getWidth();
    this.pageHeight = doc.internal.pageSize.getHeight();
    doc.setFont(this.font);
    doc.setFontSize(this.sizes.normal);
    doc.setFont(this.font);
  }
}
