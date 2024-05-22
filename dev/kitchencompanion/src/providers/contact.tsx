import { ContactContext } from "@/contexts/contact";
import { getAllContactForAdmin } from "@/hooks/_action/action";
import { useSession } from "@/hooks/useSession";
import { Contact } from "@prisma/client";
import { ReactNode, useCallback, useState } from "react";

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { id } = useSession();

  const fetchContacts = useCallback(async () => {
    if (id) {
      try {
        const contacts = await getAllContactForAdmin(id);
        setContacts(contacts);
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  return (
    <ContactContext.Provider value={{ contacts, refetch: fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
