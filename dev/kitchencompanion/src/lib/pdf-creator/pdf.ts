import { Template, BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import * as fs from "fs"; // Importez le module fs si vous utilisez Node.js
/*
interligne: float
police: string
policeSize: int
policeWeight: int
orientation: enum
template: json|html|md
currentPosiition: tuple
sectionVerticalCount: int
selectionHorizontalCount: int
currentSection: int
sectionList: list
currentPage: int

CreatePDF(name, orientation)
modifyParams(interligne, police, policeSize, policeWeight)
exportPDF(): pdf
resetPDF(): void
addTexte(data: list, sectionId: int): void
addSection(titre: json)
setupSection(default 3)
addTittle(nom: string, sectionId: int): void
addGraph (titre: list, data: json)
addLogo(logo: binary)
addSPdfBg(bg: binary)
setUppdfParams(name, author, description):
addPage(pageName: string)
calculPosition()
*/

export async function generatePDF(
  template: Template = template123,
  inputs: Record<string, string>[] = inputs123
) {
  try {
    const pdf = await generate({ template, inputs });

    // Enregistrez le fichier PDF si vous êtes dans un environnement Node.js
    // fs.writeFileSync("chemin/vers/le/fichier/test.pdf", pdf.buffer);

    // Pour un environnement de navigateur, ouvrez le PDF dans un nouvel onglet
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
    return pdf;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la génération du PDF :",
      error
    );
    return null;
  }
}

// Exemple d'utilisation de la fonction generatePDF
const template123: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: { type: "text", position: { x: 0, y: 0 }, width: 10, height: 10 },
      b: { type: "text", position: { x: 10, y: 10 }, width: 10, height: 10 },
      c: { type: "text", position: { x: 20, y: 20 }, width: 10, height: 10 },
    },
  ],
};

const inputs123 = [{ a: "a1", b: "b1", c: "c1" }];

/*
generatePDF(template123, inputs123).then((pdf) => {
  if (pdf) {
    console.log("Le PDF a été généré avec succès !");
  } else {
    console.log("Une erreur s'est produite lors de la génération du PDF.");
  }
});
*/
