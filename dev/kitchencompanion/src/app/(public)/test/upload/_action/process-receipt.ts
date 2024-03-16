"use server";

import { getReceiptData } from "@/lib/receipt-extraction/gpt-4-conversion";
// import { convertPdfToPng } from "@/lib/receipt-extraction/pdf-to-png";
import { convertReceiptToText } from "@/lib/receipt-extraction/receipt-extraction";

export default async function processReceipt(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "Aucun fichier n'a été envoyé.", status: 400 };
  }

  let buffer: Buffer;

  if (file.type === "image/jpeg" || file.type === "image/png") {
    const image = await file.arrayBuffer();
    buffer = Buffer.from(image);
  } //else if (file.type === "application/pdf") {
  //   // const pdfData = await file.arrayBuffer();
  //   // buffer = Buffer.from(pdfData);
  //   // const pdf = await convertPdfToPng(buffer);
  //   // if (pdf.length > 1) {
  //   //   return {
  //   //     error: "Le PDF ne doit contenir qu'une seule page.",
  //   //     status: 400,
  //   //   };
  //   // }
  //   // buffer = pdf[0].content;
  else {
    return {
      error:
        "Le type de fichier n'est pas supporté. Seulement les images et les PDF sont supportés.",
      status: 400,
    };
  }

  const data = await convertReceiptToText(buffer);

  console.log(data);

  const gptData = await getReceiptData(data, "birri");

  const json = gptData.choices[0].message
    .content!.replace("```json\n", "")
    .replace("\n", "")
    .replace("```", "");

  return JSON.parse(json);
}
