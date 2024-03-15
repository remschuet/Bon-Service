import OpenAI from "openai";

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY!;

export async function getReceiptData(text: string) {
  // On doit convertir l'image en base64 pour l'envoyer à l'API

  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "The folowing text is from a receipt. Please convert it to a JSON object. There might be some errors in the item description : For example, '5LB' might had been extracted as 'SLB' since the 5 closely resemble an S. Please fix those errors. The JSON object should only contain the items and it's price per unit. The description you will will be always formated in the following manner : 'NAME OF THE INGREDIENT(ie: PIMENT JALAPENO) QUANTITY-UNIT(ie: 5LB) PROVENANCE (ie: E.U). make sure those fields are properly seperated",
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
