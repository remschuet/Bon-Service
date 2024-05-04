import { getRecipeIngredientAndRecipe } from "@/db/data-access/recipe";
import { Section } from "@/lib/pdf-creator/TypePdf";
import { PdfOptionBuilder } from "@/lib/pdf-creator/pdfOption";
import { PdfSection } from "@/lib/pdf-creator/pdfSection";

export async function exportCreatePdfRecipe(form: FormData) {
  const id = form.get("userId");
  const recipeName = form.get("recipeName");
  const idRecipe = "1234";
  // const data = await getRecipeIngredientAndRecipe(idRecipe);
  // console.log(data);
  // return data;

  // Chercher la recette + ingredients
  // Chercher les noms des ingredients

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
