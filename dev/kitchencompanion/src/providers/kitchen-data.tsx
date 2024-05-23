"use client";

import { getNameMemberKitchen } from "@/app/[locale]/(protected)/kitchen/[kitchenId]/_action/kitchenid-action";
import { KitchenDataContext } from "@/contexts/kitchen-data";
import { getRoleStates } from "@/db/enum";
import { useState, useEffect, useMemo } from "react";

export const KitchenDataProvider = ({
  children,
  kitchenId,
}: {
  children: React.ReactNode;
  kitchenId: string;
}) => {
  const [members, setMembers] = useState<string[][]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await getNameMemberKitchen(kitchenId);
        const roleData = await getRoleStates();

        setMembers(memberData as string[][]);
        setRoles(roleData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [refetchIndex, kitchenId]);

  const value = useMemo(
    () => ({
      members,
      roles,
      refetch: () => setRefetchIndex((i) => i + 1),
    }),
    [members, roles]
  );

  return (
    <KitchenDataContext.Provider value={value}>
      {children}
    </KitchenDataContext.Provider>
  );
};
