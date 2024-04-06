import { Button } from "@/components/ui/button";
import processReceipt from "@/app/[locale]/(public)/test/upload/_action/process-receipt";
import { Input } from "@/components/ui/input";

export default async function Upload() {
  return (
    <form action={processReceipt}>
      <Input
        type='file'
        name='file'
        accept='image/*, application/pdf'
      />
      <Input
        type='text'
        name='supplier'
      />
      <Button type='submit'>Upload</Button>
    </form>
  );
}
