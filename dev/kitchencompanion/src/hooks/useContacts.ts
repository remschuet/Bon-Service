import { useEffect, useState } from "react";
import { Contact } from "@prisma/client";
import { useSession } from "@/hooks/useSession";
import { getAllContactForAdmin } from "@/hooks/_action/action";

export function useContacts(): { contacts: Contact[] } {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { id } = useSession();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getAllContactForAdmin(id);
        setContacts(contacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  return { contacts };
}
