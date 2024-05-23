"use client";
import Link from "next/link";

import { UpdatePassword } from "./update-password";
import { UpdateInformation } from "./update-informations";
import { UpdateAccountType } from "./update-account-type";
import { useSession } from "@/hooks/useSession";

export function GeneralSettings() {
  const { id, userType } = useSession();
  return (
    <div className='p-10 grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
      <div className='flex items-center justify-between'>
        <Link
          className='font-semibold text-primary'
          href='#'>
          Général
        </Link>
      </div>
      <div className='grid gap-6'>
        <UpdateInformation />
        {userType === "MEMBER" && <UpdateAccountType />}
        <UpdatePassword />
      </div>
    </div>
  );
}
