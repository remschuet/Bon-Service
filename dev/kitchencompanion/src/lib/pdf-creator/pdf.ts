import {
  OrientationPDF,
  UnitPDF,
  Position,
  ContactData,
} from "./optionEnumPdf";
import { contacts } from "./fakeContact";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
/*
 * DOCS
 * https://www.npmjs.com/package/jspdf
 * https://raw.githack.com/MrRio/jsPDF/master/index.html
 *https://artskydj.github.io/jsPDF/docs/module-cell.html#~table
 */

interface CellConfig {
  id: string;
  name: string;
  prompt: string;
  width: number;
  align: string;
  padding: number;
}

class PdfGenerator {
  private posX: number = 20;
  private posY: number = 0;
  private PAGE_X: number = 208;
  private PAGE_Y: number = 292;
  private PAGE_HEADER: number = 20;
  private PAGE_FOOTHER: number = 20;
  private doc;
  constructor(
    orientation: OrientationPDF = OrientationPDF.Portrait,
    unit: UnitPDF = UnitPDF.cm
  ) {
    this.doc = new jsPDF({ putOnlyUsedFonts: true, orientation: orientation });
  }

  public dowloadPdf() {
    this.doc.save("a4.pdf");
  }

  public openPdf() {
    const pdfBlob = this.doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Ouvrir le PDF dans une nouvelle fenêtre
    window.open(pdfUrl, "_blank");
  }

  public addText(content: string, pos: Position) {
    this.doc.text(content, pos.x, pos.y);
  }

  generateData(amount: number): { [key: string]: string }[] {
    const result: { [key: string]: string }[] = [];
    const data = {
      id: "123",
      coin: "100",
      game_group: "GameGroup",
      game_name: "XPTO2",
      game_version: "25",
      machine: "20485861",
      vlt: "0",
    };
    for (let i = 0; i < amount; i += 1) {
      data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    return result;
  }

  private formatData(contactsData: ContactData[]): ContactData[] {
    const result: ContactData[] = [];
    const amount = contactsData.length; // Obtenir le nombre d'éléments dans contactsData
    for (let i = 0; i < amount; i += 1) {
      const data: ContactData = {};
      for (const key in contactsData[i]) {
        data[key] = contactsData[i][key];
      }
      result.push(data);
    }
    return result;
  }

  createHeaders(keys: string[]): string[] {
    return keys;
  }

  createGrid(colTitle: string[], content: ContactData) {
    const headers = this.createHeaders(colTitle);

    const data = this.generateData(100);
    console.log(content);
    console.log("data:", data);
    this.doc.table(1, 1, data, headers, { autoSize: true });
  }

  createGrid2(colTitle: string[], content: ContactData[]) {
    const headers = this.createHeaders(colTitle);
    // const data = this.formatData(content);

    // Transformez les données en un tableau de tableaux de chaînes
    const data: string[][] = content.map((contact) => [
      contact.id,
      contact.userId,
      contact.name,
      contact.description,
      contact.phoneNumber,
      contact.compteNumber,
      // Ajoutez d'autres propriétés de ContactData selon vos besoins
    ]);

    // this.doc.table(1, 1, data, headers, { autoSize: false });
    console.log(data);
    autoTable(this.doc, {
      head: [headers],
      body: data,
    });
  }
}
export async function entryPoint() {
  // Exemple d'utilisation
  const pdfGenerator = new PdfGenerator();

  let data = [
    "id",
    "coin",
    "game_group",
    "game_name",
    "game_version",
    "machine",
    "vlt",
  ];

  let data2 = [
    "id",
    "userId",
    "name",
    "description",
    "phoneNumber",
    "compteNumber",
  ];

  const jsonContact = JSON.stringify(contacts, null, 2);
  // const contactsData = JSON.parse(jsonContact);
  const contactsData: ContactData[] = JSON.parse(jsonContact);
  // const contactsData: { [key: string]: string }[] = JSON.parse(jsonContact);

  pdfGenerator.createGrid2(data2, contactsData);
  pdfGenerator.openPdf();
}
