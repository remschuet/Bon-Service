import {
  OrientationPDF,
  UnitPDF,
  Position,
  TableDataType,
} from "./TypeEnumPdf";
import { contacts } from "./fakeContact";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
/*
 * DOCS
 * https://www.npmjs.com/package/jspdf
 * https://raw.githack.com/MrRio/jsPDF/master/index.html
 *https://artskydj.github.io/jsPDF/docs/module-cell.html#~table
 */

class PdfGenerator {
  private posX: number = 20;
  private posY: number = 0;
  private PAGE_X: number = 207;
  private PAGE_Y: number = 300;
  private PAGE_HEADER: number = 20;
  private PAGE_FOOTHER: number = 20;
  private HEADER_POURCENT = 20;
  private FOOTER_POURCENT = 20;

  private doc;
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
    // Définir le texte à afficher
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

  private createHeaders(keys: string[]): string[] {
    return keys;
  }

  /**
   * Formats the content data into a 2D array of strings, where each row represents a record and each column represents a field.
   *
   * @param title - An array of strings representing the column titles for the grid.
   * @param contacts - An array of objects representing the content data for the grid.
   *
   * @returns A 2D array of strings where each row represents a record and each column represents a field.
   */
  private async formatColData(title: string[], contacts: TableDataType[]) {
    const data: string[][] = contacts.map((contact) => {
      const rowData: string[] = [];
      title.forEach((key) => {
        if (contact.hasOwnProperty(key)) {
          rowData.push(contact[key]);
        } else {
          // Si la propriété n'existe pas, ajoutez une chaîne vide
          console.log("proprety doesn't exist: ", key);
          rowData.push("Aucune Valeur");
        }
      });
      return rowData;
    });
    return data;
  }

  /**
   * Creates a grid in the PDF document using the provided column titles and content data.
   *
   * @param colTitle - An array of strings representing the column titles for the grid.
   * @param content - An array of objects representing the content data for the grid.
   */
  public async createGrid(colTitle: string[], content: TableDataType[]) {
    const headers = this.createHeaders(colTitle);
    const data: string[][] = await this.formatColData(colTitle, content);

    autoTable(this.doc, {
      startY: (this.HEADER_POURCENT * this.PAGE_Y) / 100,
      head: [headers],
      body: data,
    });
  }
}
export async function entryPoint() {
  // Exemple d'utilisation
  const pdfGenerator = new PdfGenerator();
  let data = ["name", "description", "phoneNumber", "compteNumber"];

  const jsonContact = JSON.stringify(contacts, null, 2);
  const contactsData: TableDataType[] = JSON.parse(jsonContact);

  await pdfGenerator.createGrid(data, contactsData);
  pdfGenerator.setHeader();
  // pdfGenerator.addText("contact", { x: 20, y: 30 });
  pdfGenerator.openPdf();
}
