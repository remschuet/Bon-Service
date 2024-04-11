"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { Test } from "./_components/test";

export default function SettingsPage() {
  useRedirectMembers();

  return (
    <>
      <h1>Parametres de compte (Le UI de Remi)</h1>
      <Test />
    </>
  );
}
