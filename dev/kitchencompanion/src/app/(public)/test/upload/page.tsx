import processReceipt from "./_action/process-receipt";
import { Button } from "@/components/ui/button";

export default async function Upload() {
  async function handleReceipt(formData: FormData) {
    "use server";
    const data = await processReceipt(formData);
    console.log(data);
    // Get user to validate the data
  }

  return (
    <form action={handleReceipt}>
      <input
        type='file'
        name='image'
        accept='image/*'
      />
      <Button type='submit'>Upload</Button>
    </form>
  );
}
