"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>TEST PAGE</h1>
      <Button
        onClick={() => {
          router.push("/test/kitchen");
        }}
      >
        kitchen
      </Button>
      <Button
        onClick={() => {
          router.push("/test/supplier");
        }}
      >
        supplier
      </Button>
      <Button
        onClick={() => {
          router.push("/test/linkKitchenUser");
        }}
      >
        Link kitchenUser
      </Button>
      <Button
        onClick={() => {
          router.push("/test/upload");
        }}
      >
        Link openAI upload
      </Button>
    </div>
  );
}
