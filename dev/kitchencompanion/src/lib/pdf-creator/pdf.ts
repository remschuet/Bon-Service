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
  protected PAGE_X: number = 207;
  protected PAGE_Y: number = 300;
  protected PAGE_HEADER: number = 20;
  protected PAGE_FOOTHER: number = 20;
  protected HEADER_POURCENT = 20;
  protected FOOTER_POURCENT = 20;

  protected pdfOption: PdfOption;

  protected doc;
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm,
    pdfOption: PdfOption | undefined = undefined
  ) {
    this.doc = new jsPDF({ putOnlyUsedFonts: true, orientation: orientation });

    if (pdfOption === undefined) {
      this.pdfOption = new PdfOptionBuilder(this.doc).build();
    } else {
      this.pdfOption = pdfOption;
    }
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

  public setHeader() {
    const text = "Texte centré dans le document PDF";
    const pageWidth = this.doc.internal.pageSize.getWidth();

    this.doc.setFontSize(this.pdfOption.sizes.title);
    const textWidth =
      (this.doc.getStringUnitWidth(text) * this.doc.getFontSize()) /
      this.doc.internal.scaleFactor;
    const centerX = (pageWidth - textWidth) / 2;

    const y = 10;
    this.doc.text(text, centerX, y);
  }

  /**
   * Adds a text to the PDF document at the specified position.
   * @param content The text to be added.
   * @param pos The position where the text will be added.
   */
  public addText(content: string, pos: Position) {
    this.doc.text(content, pos.x, pos.y);
  }
}
