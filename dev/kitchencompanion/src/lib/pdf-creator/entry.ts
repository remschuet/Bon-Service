import { PdfTable } from "./pdfTable";
import { TableDataType, Section } from "./TypeEnumPdf";
import { contacts } from "./fakeContact";
import { PdfSection } from "./pdfSection";
import { PdfOptionBuilder } from "./pdfOption";

async function contactCreation() {
  // Exemple d'utilisation
  const pdf = new PdfTable();
  let data = ["name", "description", "phoneNumber", "compteNumber"];

  const jsonContact = JSON.stringify(contacts, null, 2);
  const contactsData: TableDataType[] = JSON.parse(jsonContact);

  await pdf.createGrid(data, contactsData);
  pdf.setHeader("Contacts");
  // pdfGenerator.addText("contact", { x: 20, y: 30 });
  pdf.openPdf();
}

async function testSection() {
  let PdfOption = new PdfOptionBuilder().setPageHeader(10).build();
  const pdf = new PdfSection(PdfOption);
  pdf.setHeader(
    "Recipe",
    "Cuisine Faro",
    "Recette de soupe boloniaise italienne"
  );
  const sections: Section = {
    Ingredients: {
      start: { x: 0, y: 0 },
      end: { x: 2, y: 8 },
    },
    Etapes: {
      start: { x: 2, y: 0 },
      end: { x: 8, y: 9 },
    },
  };
  pdf.createSection(sections);
  pdf.addTextToSection(
    "Ingredients",
    ["INGREDIENTS:", "Tomates2", "salade2", "haricots2"],
    "-"
  );
  pdf.addTextToSection(
    "Etapes",
    [
      "ETAPES",
      "Dans une poêle ou une casserole, faire revenir les légumes doucement dans l’huile environ 5 minutes ou jusqu’à ce qu’ils soient tendres. Ajouter la viande et faire revenir à feu vif en remuant jusqu’à ce qu’elle soit bien émiettée et dorée. Saler et poivrer.",
      "Ajouter la pâte de tomates, le piment et la muscade. Bien mélanger. Poursuivre la cuisson, en remuant fréquemment, environ 3 minutes. Ajouter la crème et le fromage. Réchauffer en remuant. Ajouter de l’eau au besoin pour allonger la sauce. Rectifier l’assaisonnement.",
      "Ajouter des pâtes et mélanger.",
    ],
    "i"
  );
  pdf.openPdf();
}

export async function entryPoint() {
  testSection();
}
