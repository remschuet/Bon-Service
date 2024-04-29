import { OrientationPDF, UnitPDF, Position } from "./TypeEnumPdf";
import jsPDF from "jspdf";
import { PdfOption, PdfOptionBuilder } from "./pdfOption";

/*
 * DOCS
 * https://www.npmjs.com/package/jspdf
 * https://raw.githack.com/MrRio/jsPDF/master/index.html
 *https://artskydj.github.io/jsPDF/docs/module-cell.html#~table
 */

export class PdfGenerator {
  protected posX: number = 20;
  protected posY: number = 0;

  protected pdfOption: PdfOption;

  protected doc;
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm,
    pdfOption: PdfOption | undefined = undefined
  ) {
    this.doc = new jsPDF({ putOnlyUsedFonts: true, orientation: orientation });

    if (pdfOption === undefined) {
      this.pdfOption = new PdfOptionBuilder().build();
    } else {
      this.pdfOption = pdfOption;
    }
    this.pdfOption.initDoc(this.doc);
  }

  public setOption(option: PdfOption) {
    this.pdfOption = option;
  }

  public getDoc() {
    return this.doc;
  }

  /**
   * Downloads the generated PDF file.
   * @param name The desired name for the PDF file.
   */
  public dowloadPdf(name: string) {
    this.doc.save(name + ".pdf");
  }

  /**
   * Opens the generated PDF file in a new window.
   */
  public openPdf() {
    const pdfBlob = this.doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open url in browser
    window.open(pdfUrl, "_blank");
  }

  public setHeader(
    title: string,
    subTitle: string = "",
    description: string = ""
  ) {
    this.displayHeader(title, this.pdfOption.sizes.title, 10);
    this.displayHeader(subTitle, this.pdfOption.sizes.subTitle, 20);
    this.displayHeader(description, this.pdfOption.sizes.normal, 25);
  }

  private displayHeader(text: string, size: number, posY: number) {
    this.doc.setFontSize(size);
    const textWidth = this.getTextWidth(text, size);
    const centerX = (this.pdfOption.pageWidth - textWidth) / 2;

    this.doc.text(text, centerX, posY);
  }

  /**
   * Adds a text to the PDF document at the specified position.
   * @param content The text to be added.
   * @param pos The position where the text will be added.
   */
  public addText(
    content: string,
    pos: Position,
    maxWidth: number = this.pdfOption.pageWidth
  ) {
    this.doc.setFontSize(this.pdfOption.sizes.normal);
    this.doc.text(content, pos.x, pos.y, { maxWidth });
  }
  protected getTextWidth(text: string, textSize: number) {
    return (
      (this.doc.getStringUnitWidth(text) * textSize) /
      this.doc.internal.scaleFactor
    );
  }
  protected getZeroForBody() {
    return (this.pdfOption.pageHeader * this.pdfOption.pageHeight) / 100;
  }
}
