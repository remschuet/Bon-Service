"use client";

import { SessionContext } from "@/contexts/session";
import { UserSession } from "@/lib/type";

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: UserSession;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
