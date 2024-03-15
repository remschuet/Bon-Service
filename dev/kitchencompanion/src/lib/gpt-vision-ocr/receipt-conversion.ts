import OpenAI from "openai";

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY!;

export async function getReceiptData(image: Buffer) {
  // On doit convertir l'image en base64 pour l'envoyer à l'API
  const imgUrl = `data:image/png;base64,${image.toString("base64")}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Convert this receipt to text.",
          },
          {
            type: "image_url",
            image_url: {
              url: imgUrl,
            },
          },
        ],
      },
    ],
  });

  return response;
}
