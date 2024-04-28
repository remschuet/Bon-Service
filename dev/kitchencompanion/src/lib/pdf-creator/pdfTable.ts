import { PdfGenerator } from "./pdf";
import {
  OrientationPDF,
  UnitPDF,
  Position,
  TableDataType,
} from "./TypeEnumPdf";
import { contacts } from "./fakeContact";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PdfOption, PdfOptionBuilder } from "./pdfOption";

export class PdfTable extends PdfGenerator {
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm,
    pdfOption: PdfOption | undefined = undefined
  ) {
    super(orientation, unit);
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
      startY: (this.pdfOption.pageHeader * this.pdfOption.pageHeight) / 100,
      head: [headers],
      body: data,
    });
  }
  protected createHeaders(keys: string[]): string[] {
    return keys;
  }
}
