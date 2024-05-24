import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";

export function useRedirectMembers() {
  const router = useRouter();
  const { userType } = useSession();

  useEffect(() => {
    if (userType === "MEMBER") {
      router.push("/dashboard");
    }
  }, [userType, router]);
}
