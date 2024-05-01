import { PdfGenerator } from "./pdf";
import { OrientationPDF, UnitPDF, TableDataType } from "./TypePdf";
import autoTable from "jspdf-autotable";
import { PdfOption, PdfOptionBuilder } from "./pdfOption";

/**
 * PdfTable extends PdfGenerator
 * The class provides methods for generating and formatting tables in a PDF document.
 */
export class PdfTable extends PdfGenerator {
  /**
   * Creates an instance of PdfTable.
   *
   * @param orientation The orientation of the PDF document. Defaults to Portrait.
   * @param unit The unit of measurement for the PDF document. Defaults to cm.
   * @param pdfOption An optional PdfOption object to customize PDF settings.
   */
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm,
    pdfOption: PdfOption | undefined = undefined
  ) {
    super(orientation, unit, pdfOption);
  }

  /**
   * Formats the content data into a 2D array of strings, where each row represents a record and each column represents a field.
   *
   * @param title An array of strings representing the column titles for the grid.
   * @param contacts An array of objects representing the content data for the grid.
   * @returns A 2D array of strings representing the formatted data for the grid.
   */
  private async formatColData(title: string[], contacts: TableDataType[]) {
    const data: string[][] = contacts.map((contact) => {
      const rowData: string[] = [];
      title.forEach((key) => {
        if (contact.hasOwnProperty(key)) {
          rowData.push(contact[key]);
        } else {
          // If the preperty doens't exist append Aucune Valeur
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
   * @param colTitle An array of strings representing the column titles for the grid.
   * @param content An array of objects representing the content data for the grid.
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

  /**
   * Creates headers for the grid based on the provided keys (column titles).
   *
   * @param keys An array of strings representing the column titles for the grid.
   * @returns An array of strings representing the headers for the grid.
   */
  protected createHeaders(keys: string[]): string[] {
    return keys;
  }
}
