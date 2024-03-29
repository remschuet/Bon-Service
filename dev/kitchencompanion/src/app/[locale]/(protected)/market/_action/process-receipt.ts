"use server";

export default async function processReceipt(formData: FormData) {
  const headers = new Headers();
  headers.append("X-App-Name", "bonservice");
  headers.append("X-Api-Key", process.env.RECEIPT_EXTRACTOR_API_KEY as string);
  headers.append("X-Supplier", formData.get("supplier") as string);

  const data = fetch("http://127.0.0.1:5000/api/process-receipts", {
    method: "POST",
    headers: headers,
    body: formData,
  });

  data
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}
