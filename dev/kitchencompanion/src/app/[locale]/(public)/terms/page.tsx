"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Terms of Service</h1>
      <p>By using our website, you agree to the Terms of Service.</p>
      <Button
        onClick={() => {
          router.push("/");
        }}>
        Accepter
      </Button>
    </div>
  );
}
