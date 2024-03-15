"use client";

import processReceipt from "./_action/openai";
import { Button } from "@/components/ui/button";

export default async function Upload() {
  async function handleReceipt(formData: FormData) {
    const data = await processReceipt(formData);
    console.log(data);
  }

  return (
    <main>
      <form action={handleReceipt}>
        <input
          type='file'
          name='image'
          accept='image/*'
        />
        <Button type='submit'>Upload</Button>
      </form>
    </main>
  );
}
