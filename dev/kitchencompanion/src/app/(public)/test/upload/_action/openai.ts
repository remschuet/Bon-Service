"use server";

import { getReceiptData } from "@/lib/gpt-vision-ocr/receipt-conversion";

export default async function processReceipt(formData: FormData) {
  const file = formData.get("image") as File;
  const image = await file.arrayBuffer();
  const buffer = Buffer.from(image);

  const data = await getReceiptData(buffer);

  return data;
}
