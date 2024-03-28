"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { useSession } from "@/hooks/useSession";

export default function MarketPage() {
  useRedirectMembers();

  const { id } = useSession();

  // Fetch ingredient data from database for the authentivated user

  return <div></div>;
}
