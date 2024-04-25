"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { Test } from "./_components/comptest";

export default function SettingsPage() {
  useRedirectMembers();

  return (
    <>
      <Test />
    </>
  );
}
