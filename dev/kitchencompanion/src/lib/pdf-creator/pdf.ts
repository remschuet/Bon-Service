import {
  OrientationPDF,
  UnitPDF,
  Position,
  TableDataType,
} from "./TypeEnumPdf";
import { contacts } from "./fakeContact";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PdfTable } from "@/lib/pdf-creator/pdfTable";
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

  protected doc;
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm
  ) {
    this.doc = new jsPDF({ putOnlyUsedFonts: true, orientation: orientation });
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

    // Définir la taille de la page et obtenir sa largeur
    const pageWidth = this.doc.internal.pageSize.getWidth();

    // Obtenir la largeur du texte en utilisant la méthode getStringUnitWidth
    const fontSize = 12; // Taille de police utilisée
    this.doc.setFontSize(fontSize);

    const textWidth =
      (this.doc.getStringUnitWidth(text) * fontSize) /
      this.doc.internal.scaleFactor;

    // Calculer la position x pour centrer le texte horizontalement
    const centerX = (pageWidth - textWidth) / 2;

    // Définir la position y pour le texte
    const y = 10; // Par exemple, position verticale de 50

    // Ajouter le texte centré dans le document PDF
    console.log(centerX, y);
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
