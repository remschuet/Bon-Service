"use server";

export default async function processReceipt(formData: FormData) {
  const headers = new Headers();
  headers.append("X-App-Name", "bonservice");
  headers.append("X-Api-Key", process.env.RECEIPT_EXTRACTOR_API_KEY as string);
  headers.append("X-Supplier", formData.get("supplier") as string);

  const data = await fetch("http://127.0.0.1:5001/api/process-receipts", {
    method: "POST",
    headers: headers,
    body: formData,
  });

  const response = await data.json();
  console.log(response);
}
