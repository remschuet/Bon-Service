import { SessionContext } from "@/contexts/session";
import { useContext } from "react";

export function useSession() {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return {
    name: session.user.name,
    email: session.user.email,
    userType: session.user.userType,
    isPremium: session.user.isPremium,
    id: session.user.id,
  };
}
