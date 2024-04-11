"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

export default function SettingsPage() {
  useRedirectMembers();

  return <div>Parametres de compte</div>;
}
