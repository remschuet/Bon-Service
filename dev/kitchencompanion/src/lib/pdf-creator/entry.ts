import { PdfTable } from "./pdfTable";
import { TableDataType, Section } from "./TypePdf";
import { contacts } from "./fakeContact";
import { PdfSection } from "./pdfSection";
import { PdfOptionBuilder } from "./pdfOption";
import { getAllContact } from "@/db/data-access/contact";
/**
 * This file is the entry point for the pdf creator
 * This is not part of the library, is objectif it's to test the library
 */

/**
 * create contact pdf with table
 */
async function testContact(id: string) {
  await getAllContact(id);

  const pdf = new PdfTable();
  // The data we need to take care in the Contacts listes
  let data = ["name", "description", "phoneNumber", "compteNumber"];
  const jsonContact = JSON.stringify(contacts, null, 2);
  const contactsData: TableDataType[] = JSON.parse(jsonContact);

  // Create pdf grid and set the table
  await pdf.createGrid(data, contactsData);

  // Set Header
  pdf.setHeader("Contacts");

  pdf.openPdf();
}

/**
 * Create recipe pdf with table and information
 */
async function testSection() {
  // Step up specific options for the Pdf
  let PdfOption = new PdfOptionBuilder().setPageHeader(10).build();
  const pdf = new PdfSection(PdfOption);
  // Set up header
  pdf.setHeader(
    "Recipe",
    "Cuisine Faro",
    "Recette de soupe boloniaise italienne"
  );
  // Cut the section, in the option it's on base 10
  // Attribute a name (tag) for the sections
  const sections: Section = {
    Ingredients: {
      start: { x: 0, y: 0 },
      end: { x: 3, y: 8 },
    },
    timer: {
      start: { x: 2, y: 0 },
      end: { x: 8, y: 1 },
    },
    Etapes: {
      start: { x: 2, y: 1 },
      end: { x: 8, y: 9 },
    },
    infos: {
      start: { x: 6.5, y: 8.3 },
      end: { x: 10, y: 10 },
    },
  };
  // Create sections in the pdf
  pdf.createSection(sections);
  // Add text to specific sections
  pdf.addTextToSection(
    "Ingredients",
    [
      "INGREDIENTS",
      "Tomates2",
      "salade2",
      "haricots2",
      "ALERGENES",
      "humeur",
      "humus",
      "Saute",
    ],
    ["INGREDIENTS", "ALERGENES"],
    "-",
    10, // space x
    1 // space y
  );
  pdf.addTextToSection(
    "Etapes",
    [
      "ETAPES",
      "Dans une poêle ou une casserole, faire revenir les légumes dans l’huile environ 5 minutes ou jusqu’à ce qu’ils soient tendres. Ajouter la viande et faire revenir à feu vif en remuant jusqu’à ce qu’elle soit bien émiettée et dorée. Saler et poivrer.",
      "Ajouter la pâte de tomates, le piment et la muscade. Bien mélanger. Poursuivre la cuisson, en remuant fréquemment, environ 3 minutes. Ajouter la crème et le fromage. Réchauffer en remuant. Ajouter de l’eau au besoin pour allonger la sauce. Rectifier l’assaisonnement.",
      "Ajouter des pâtes et mélanger.",
    ],
    ["ETAPES"],
    "i",
    15,
    30
  );
  pdf.addTextToSection("infos", "Created with BonService");
  // Add grid to the pdf at the section
  pdf.addGridToSection(
    "timer",
    ["temps", "cuisson", "temperature"],
    [["120 mins", "30 mins", "350 degrés"]],
    15,
    5
  );
  pdf.openPdf();
}

/**
 * Entry point from the external interface
 */
export async function entryPoint(id: string) {
  testContact(id);
}
