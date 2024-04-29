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
  private pageWidth: number;
  private pageHeight: number;
  private pageHeader: number = 20;
  private pageFooter: number = 20;
  private headerPercent: number = 20;
  private footerPercent: number = 20;
  private font: string = "Helvetica";

  private doc: jsPDF;
  private sizes: FontSizes = fontSizes;

  constructor(doc: jsPDF) {
    this.doc = doc;
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.doc.setFont(this.font);
    this.doc.setFontSize(this.sizes.normal);
  }

  public setFontSize(sizeKey: string, sizeValue: number) {
    if (typeof sizeValue !== "number" || isNaN(sizeValue)) {
      throw new Error("La taille de police doit être un nombre.");
    }

    if (!this.sizes.hasOwnProperty(sizeKey)) {
      this.sizes[sizeKey] = sizeValue;
    }

    this.doc.setFontSize(this.sizes[sizeKey]);
    return this;
  }

  public setFont(font: string): PdfOptionBuilder {
    this.font = font;
    this.doc.setFont(this.font);
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

  public setHeaderPercent(headerPercent: number): PdfOptionBuilder {
    this.headerPercent = headerPercent;
    return this;
  }

  public setFooterPercent(footerPercent: number): PdfOptionBuilder {
    this.footerPercent = footerPercent;
    return this;
  }

  public build(): PdfOption {
    return new PdfOption(
      this.pageWidth,
      this.pageHeight,
      this.pageHeader,
      this.pageFooter,
      this.headerPercent,
      this.footerPercent,
      this.doc,
      this.sizes,
      this.font
    );
  }
}

export class PdfOption {
  public readonly pageWidth: number;
  public readonly pageHeight: number;
  public readonly pageHeader: number;
  public readonly pageFooter: number;
  public readonly headerPercent: number;
  public readonly footerPercent: number;
  private readonly doc: jsPDF;
  public readonly sizes: FontSizes;
  public readonly font: string;

  constructor(
    pageWidth: number,
    pageHeight: number,
    pageHeader: number,
    pageFooter: number,
    headerPercent: number,
    footerPercent: number,
    doc: jsPDF,
    sizes: FontSizes,
    font: string
  ) {
    this.pageWidth = pageWidth;
    this.pageHeight = pageHeight;
    this.pageHeader = pageHeader;
    this.pageFooter = pageFooter;
    this.headerPercent = headerPercent;
    this.footerPercent = footerPercent;
    this.doc = doc;
    this.sizes = sizes;
    this.font = font;
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
