import processReceipt from "@/app/(public)/test/upload/_action/process-receipt";
import { Button } from "@/components/ui/button";

export default async function Upload() {
  async function handleReceipt(formData: FormData) {
    "use server";
    const data = await processReceipt(formData);
    console.log(data);
    // TODO: Get user to validate the data
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
