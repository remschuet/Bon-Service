import { createContext } from "react";
import { Contact } from "@prisma/client";

interface ContactContextType {
  contacts: Contact[];
  refetch: () => void;
}

const defaultContextValue: ContactContextType = {
  contacts: [],
  refetch: () => {},
};

export const ContactContext =
  createContext<ContactContextType>(defaultContextValue);
