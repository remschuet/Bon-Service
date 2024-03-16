import OpenAI from "openai";

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY!;

interface PromptNote {
  [supplier: string]: string;
}

export async function getReceiptData(text: string, supplier: string) {
  const promptNotes: PromptNote = {
    hectorlarrive:
      "Note: The description will always be formatted in the following manner: 'NAME OF THE INGREDIENT (ie: PIMENT JALAPENO) QUANTITY-UNIT (ie: 5LB) PROVENANCE (ie: E.U). Make sure those fields are properly separated. Item descriptions follow the format 'NAME QUANTITY-UNIT ORIGIN'",
    birri:
      "Note: All items in this receipt have an origin of 'QC'. The price may sometimes look like 600 for 6.00$ or 3000 for 30.00$, so you may need to correct those errors. They also have some specific measurement units like 'csse' and 'esse', 'bqt' or 'bat' which should ALWAYS be replaced by 'CS' and 'pot' and 'ut' should be replaced by 'UN'. Whenever the unit is 'UN' or 'CS', the quantity field should be set to 1 regardless of text data. You will also find that the fmt field from the receipt sometimes has the quantity in it (e.g., 15lbs, in that case, the unit quantity should be 15 and the unit 'LB'). This supplier has a specific way of labeling product with the fields 'produits' and 'variété' which should concatenate those together. For example, if you have 'produits': 'Pomme de terre' and 'variété': 'Russet', the name should be 'Pomme de terre Russet'. It is also possible for some words to appear in camel case, like 'PommeDeTerreRusset', in that case, you should separate the words and capitalize the first letter of each word.",
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `The following text is from a receipt. Please convert it to a JSON object. There might be some errors in the item description: For example, '5LB' might have been extracted as 'SLB' since the 5 closely resembles an S. Please fix those errors. The JSON object should only contain the items and their price per unit (if there are two prices for the same item use the smallest of the 2).  Units that are labeled GR should be changed to G. CL is not an origin tag it should be ignored. It is possible for items to not have an origin. The QUANTITY-UNIT should be in 2 unique fields also add a category field. The category should be logical with the item name, and should be in the language of the receipt. Use the following categories: 'Fruit & Vegetable' / 'Fruit & Légume', 'Meat' / 'Viande', 'Fish' / 'Poisson', 'Dairy' / 'Produit Laitier', 'Bakery' / 'Pâtisserie', 'Canned' / 'Cannes', 'Frozen' / 'Congeler', 'Dry' / 'Sec'. If the item is not in the list use 'Other'. The JSON structure for an item should be: { 'name': 'NAME OF PRODUCT', 'quantity': number, 'unit': 'UNIT OF PRODUCT', 'origin': 'ORIGIN TAG OF PRODUCT', 'category': 'ONE OF THE CATEGORY', 'price': number }.  ${promptNotes[supplier]}`,
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
