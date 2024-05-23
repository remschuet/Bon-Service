"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { Construction } from "lucide-react";

export default function MenusPage() {
  useRedirectMembers();

  return (
    <div className='container flex flex-col gap-5 mx-auto space-y-10 text-center text-2xl font-bold'>
      Cette fonctionnalité n'as pas encore été implémentée
      <Construction
        size={100}
        className='justify-self-center w-1/2 mx-auto'
      />
    </div>
  );
}
