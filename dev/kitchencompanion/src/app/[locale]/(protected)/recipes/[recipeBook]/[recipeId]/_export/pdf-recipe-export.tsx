import { Section } from "@/lib/pdf-creator/TypePdf";
import { PdfOptionBuilder } from "@/lib/pdf-creator/pdfOption";
import { PdfSection } from "@/lib/pdf-creator/pdfSection";
import { exportGetRecipe } from "./pdf-action-recipe-export";

async function getSteps(steps: string) {
  // Divise la chaîne en une liste en fonction des virgules
  const stringList = steps.split('","');
  const cleanedList = stringList.map((item) => item.replace(/\n/g, ""));
  cleanedList.unshift("ETAPES");
  console.log(cleanedList);
  return cleanedList;
}

export async function exportCreatePdfRecipe(id: string, idRecipe: string) {
  const data = await exportGetRecipe(idRecipe);
  let ingredientName: string[] = [];

  console.log(data.recipe);
  console.log(data.ingredients);
  // CHECK
  if (data.recipe == null || data.ingredients == null) {
    return;
  }

  ingredientName.push("INGREDIENTS");
  data.ingredients.forEach((element) => {
    if (element.ingredient != null) {
      ingredientName.push(
        element.ingredient.name +
          " (" +
          element.quantity +
          "-" +
          element.unit +
          ")"
      );
    }
  });

  ingredientName.push("ALERGENES");
  data.recipe.recipeAllergens.forEach((element) => {
    ingredientName.push(element.allergen);
  });

  let PdfOption = new PdfOptionBuilder().setPageHeader(10).build();
  const pdf = new PdfSection(PdfOption);
  // Set up header
  pdf.setHeader(
    data.recipe.name,
    data.recipe.recipeBook.user.name as string,
    data.recipe.description
  );

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
    ingredientName,
    ["INGREDIENTS", "ALERGENES"],
    "-",
    10, // space x
    1 // space y
  );
  const steps = await getSteps(data.recipe.steps);
  pdf.addTextToSection("Etapes", steps, ["ETAPES"], "i", 15, 30);
  pdf.addTextToSection("infos", "Created with BonService");
  // Add grid to the pdf at the section
  pdf.addGridToSection(
    "timer",
    ["Temps preparation", "Temps cuisson", "Rendement"],
    [
      [
        (data.recipe.preparationTime as unknown as string) + " minutes",
        (data.recipe.cookingTime as unknown as string) + " minutes",
        data.recipe.yield + "/" + data.recipe.unit,
      ],
    ],
    15,
    5
  );
  pdf.openPdf();
}
