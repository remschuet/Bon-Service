import OpenAI from "openai";

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY!;

export async function getReceiptData(text: string) {
  // Cette fonction est optimisé pour convertir un reçu Hector Larivée en JSON

  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "The following text is from a receipt. Please convert it to a JSON object. There might be some errors in the item description : For example, '5LB' might had been extracted as 'SLB' since the 5 closely resemble an S. Please fix those errors. The JSON object should only contain the items and it's price per unit. The description will always be formated in the following manner : 'NAME OF THE INGREDIENT(ie: PIMENT JALAPENO) QUANTITY-UNIT(ie: 5LB) PROVENANCE (ie: E.U). make sure those fields are properly seperated. Units that are labeled GR should be changed to G. and the QUANTITY-UNIT should be in 2 unique fields also add a category field. The category should be logical with the item name, and should be in the language of the receipt. Use the following categories : 'Fruit & Vegetable' / 'Fruit & Légume', 'Meat' / 'Viande', 'Fish' / 'Poisson', 'Dairy' / 'Produit Laitier', 'Bakery' / 'Pâtisserie', 'Canned' / 'Cannes', 'Frozen' / 'Congeler', 'Dry' / 'Sec'. If the item is not in the list use 'Other' The JSON structure for an item should be : { 'name': 'NAME OF PRODUCT', 'quantity': number, 'unit': 'UNIT OF PRODUCT', 'origin': 'ORIGIN TAG OF PRODUCT', 'category': 'ONE OF THE CATEGORY', 'price': number }",
          },
          {
            type: "text",
            text: text,
          },
        ],
      },
    ],
  });

  return response;
}
