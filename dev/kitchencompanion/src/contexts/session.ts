import { UserSession } from "@/lib/type";
import { createContext } from "react";

export const SessionContext = createContext<UserSession | null>(null);
