import { useContext, useEffect } from "react";
import { Contact } from "@prisma/client";
import { ContactContext } from "@/contexts/contact";

export function useContacts(): { contacts: Contact[]; refetch: () => void } {
  const { contacts, refetch } = useContext(ContactContext);

  useEffect(() => {
    if (contacts.length === 0) {
      refetch();
    }
  }, [contacts, refetch]);

  return { contacts, refetch };
}
