import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getAllMemberKitchensById } from "@/hooks/_action/action";
import { MemberKitchen } from "@/lib/type";

export function useMemberKitchens(): {
  memberKitchens: MemberKitchen[];
} {
  const [memberKitchens, setMemberKitchens] = useState<MemberKitchen[]>([]);
  const { id } = useSession();

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const memberKitchens = await getAllMemberKitchensById(id);

        setMemberKitchens(memberKitchens);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKitchens();
  }, []);

  return { memberKitchens };
}
