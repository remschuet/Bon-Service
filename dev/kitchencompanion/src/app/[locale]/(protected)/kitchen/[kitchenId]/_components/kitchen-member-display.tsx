"use client";

import { Badge } from "@/components/ui/badge";
import { MemberList } from "./members/member-list";
import { useKitchenData } from "@/hooks/useKitchenData";

export function KitchenMemberDisplay({ kitchenId }: { kitchenId: string }) {
  const { members } = useKitchenData();

  return (
    <div className='relative flex min-h-[50vh] w-full flex-col rounded-xl bg-stone-200 p-4'>
      <Badge
        variant={"secondary"}
        className='absolute right-3 top-3'>
        Membres
      </Badge>
      <div className='flex-1 my-8'>
        <MemberList members={members} />
      </div>
    </div>
  );
}
