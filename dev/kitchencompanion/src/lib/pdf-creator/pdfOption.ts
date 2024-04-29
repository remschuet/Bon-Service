import jsPDF from "jspdf";

interface FontSizes {
  [key: string]: number;
}

const fontSizes: FontSizes = {
  title: 17,
  subTitle: 15,
  normal: 12,
};

export class PdfOptionBuilder {
  private pageWidth: number = -1;
  private pageHeight: number = -1;
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
      this.pageWidth,
      this.pageHeight,
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
    pageWidth: number,
    pageHeight: number,
    pageHeader: number,
    pageFooter: number,
    sizes: FontSizes,
    font: string
  ) {
    this.pageWidth = pageWidth;
    this.pageHeight = pageHeight;
    this.pageHeader = pageHeader;
    this.pageFooter = pageFooter;
    this.sizes = sizes;
    this.font = font;
  }

  public initDoc(doc: jsPDF) {
    this.pageWidth = doc.internal.pageSize.getWidth();
    this.pageHeight = doc.internal.pageSize.getHeight();
    doc.setFont(this.font);
    doc.setFontSize(this.sizes.normal);
    doc.setFont(this.font);
  }
}

/**
 * UTILISATION
 * const doc = new jsPDF();

const pdfOption = new PdfOptionBuilder(doc)
  .setPageHeader(30)
  .setPageFooter(40)
  .setHeaderPercent(30)
  .setFooterPercent(30)
  .build();

// Now you can use pdfOption in your code
console.log(pdfOption.pageWidth); // Output: width of the page
 */
