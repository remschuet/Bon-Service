"use server";

import { getReceiptData } from "@/lib/receipt-extraction/gpt-4-conversion";
import { convertReceiptToText } from "@/lib/receipt-extraction/receipt-extraction";

export default async function processReceipt(formData: FormData) {
  const file = formData.get("image") as File;
  const image = await file.arrayBuffer();
  const buffer = Buffer.from(image);

  const data = await convertReceiptToText(buffer);
  const gptData = await getReceiptData(data);

  const json = gptData.choices[0].message
    .content!.replace("```json\n", "")
    .replace("\n", "")
    .replace("```", "");

  return JSON.parse(json);
}
