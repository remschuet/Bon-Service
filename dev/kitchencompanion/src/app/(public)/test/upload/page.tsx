import { Button } from "@/components/ui/button";

export default async function Upload() {
  const headers = new Headers();
  headers.append("X-API-KEY", process.env.RECEIPT_EXTRACTOR_API_KEY as string);
  headers.append("X-Supplier", "hector_larivee");

  async function handleReceipt(formData: FormData) {
    "use server";

    const data = await fetch("http://127.0.0.1:5000/api/process-receipts", {
      method: "POST",
      headers: headers,
      body: formData,
    });

    const response = await data.json();
    console.log(response);
  }

  return (
    <form action={handleReceipt}>
      <input
        type='file'
        name='file'
        accept='image/*, application/pdf'
      />
      <Button type='submit'>Upload</Button>
    </form>
  );
}
