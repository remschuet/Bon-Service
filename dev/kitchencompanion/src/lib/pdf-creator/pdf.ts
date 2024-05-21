import { OrientationPDF, UnitPDF, Position } from "./TypePdf";
import jsPDF from "jspdf";
import { PdfOption, fontSizes, PdfOptionBuilder } from "./pdfOption";

/*
 * DOCS used for the comprehesion of the jsPDF library
 * https://www.npmjs.com/package/jspdf
 * https://raw.githack.com/MrRio/jsPDF/master/index.html
 * https://artskydj.github.io/jsPDF/docs/module-cell.html#~table
 */

/**
 * Class PdfGenerator
 * For generating PDF documents.
 * This class provides methods to create, customize, and download PDF files.
 * This class is the first level of the library
 */
export class PdfGenerator {
  protected pdfOption: PdfOption;
  protected doc;

  /**
   * Constructs a new PdfGenerator instance.
   * @param orientation The orientation of the document (default: Portrait).
   * @param unit The unit of measurement for the document (default: cm).
   * @param pdfOption Optional PdfOption object for custom configuration (default: PdfOption).
   */
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm,
    pdfOption: PdfOption | undefined = undefined
  ) {
    this.doc = new jsPDF({ putOnlyUsedFonts: true, orientation: orientation });

    this.pdfOption =
      pdfOption !== undefined ? pdfOption : new PdfOptionBuilder().build();

    // Init the options to the pdf doc
    this.pdfOption.initDoc(this.doc);
  }

  /**
   * Gets the generated PDF document instance.
   * @returns The PDF document instance.
   */
  public getDoc() {
    return this.doc;
  }

  /**
   * Downloads the generated PDF file with the specified name.
   * @param name The desired name for the PDF file.
   */
  public dowloadPdf(name: string) {
    this.doc.save(name + ".pdf");
  }

  /**
   * Opens the generated PDF file in a new browser window.
   */
  public openPdf() {
    const pdfBlob = this.doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  }

  /**
   * Sets various properties for the PDF document, such as title, author, and keywords.
   *
   * @param {Object} options - Optional parameters for setting the document properties.
   * @param options.title - The title of the document.
   * @param options.subject - The subject of the document.
   * @param options.author - The author of the document.
   * @param options.keywords - The keywords for the document.
   * @param options.creator - The creator of the document.
   */
  public setProperties(options?: {
    title?: string;
    subject?: string;
    author?: string;
    keywords?: string;
    creator?: string;
  }) {
    const defaultOptions = {
      title: "Titre du document",
      subject: "Sujet du document",
      author: "Auteur du document",
      keywords: "document, PDF",
      creator: "Creator of the document",
    };

    const finalOptions = { ...defaultOptions, ...options };

    this.doc.setProperties({
      title: finalOptions.title,
      subject: finalOptions.subject,
      author: finalOptions.author,
      keywords: finalOptions.keywords,
      creator: finalOptions.creator,
    });
  }

  /**
   * Sets the header section of the PDF document.
   * @param title The title for the header.
   * @param subTitle The subtitle for the header. Defaults to an empty string.
   * @param description The description for the header. Defaults to an empty string.
   * @param titleSize The font size for the title. Defaults to the 'title'
   * @param subTitleSize The font size for the subtitle. Defaults to the 'subTitle'
   * @param descriptionSize The font size for the description. Defaults to the 'normal'
   */
  public setHeader(
    title: string,
    subTitle: string = "",
    description: string = "",
    titleSize: number = fontSizes.title,
    subTitleSize: number = fontSizes.subTitle,
    descriptionSize: number = fontSizes.normal
  ) {
    this.displayHeader(title, titleSize, 10);
    this.displayHeader(subTitle, subTitleSize, 18);
    this.displayHeader(description, descriptionSize, 25);
  }

  /**
   * Displays a header text in the PDF document.
   *
   * @param text The text content to be displayed in the header.
   * @param size The font size of the header text.
   * @param posY The vertical position (Y-coordinate) of the header text.
   */
  private displayHeader(text: string, size: number, posY: number) {
    this.doc.setFontSize(size);
    const textWidth = this.getTextWidth(text, size);
    const centerX = (this.pdfOption.pageWidth - textWidth) / 2;

    this.doc.text(text, centerX, posY);
  }

  /**
   * Adds text to the PDF document at the specified position.
   *
   * @param content The text content to be added.
   * @param pos The position where the text will be added.
   * @param maxWidth The maximum width for the text.
   * @param fontSize The font size for the text.
   */
  public addText(
    content: string,
    pos: Position,
    maxWidth: number = this.pdfOption.pageWidth,
    fontSize: number = fontSizes.normal
  ) {
    this.doc.setFontSize(fontSize);
    this.doc.text(content, pos.x, pos.y, { maxWidth });
  }

  /**
   * Computes the width of a text based on its font size.
   *
   * @param text The text whose width is to be calculated.
   * @param textSize The font size of the text.
   * @returns The calculated width of the text.
   */
  protected getTextWidth(text: string, textSize: number) {
    return (
      (this.doc.getStringUnitWidth(text) * textSize) /
      this.doc.internal.scaleFactor
    );
  }

  /**
   * Computes the 0 for body, exclude the header size of the document.
   * @returns The computed Y position value.
   */
  protected getZeroForBody() {
    return (this.pdfOption.pageHeader * this.pdfOption.pageHeight) / 100;
  }
}
