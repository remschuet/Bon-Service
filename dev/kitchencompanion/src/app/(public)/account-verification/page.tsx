"use client";

import { useSearchParams } from "next/navigation";

export default function AccountVerificationPage() {
  const param = useSearchParams();
  const token = param.get("token");

  return (
    <div>
      <h1>Vérification en cours:</h1>
      <p>Nous activons votre compte.</p>
      <p>{token}</p>
    </div>
  );
}
