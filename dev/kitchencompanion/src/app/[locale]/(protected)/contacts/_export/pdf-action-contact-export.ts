"use server";

import { getAllContact } from "@/db/data-access/contact";
import { ExportContactDTO } from "@/lib/type";

export async function exportGetContacts(id: string) {
  try {
    const contactList = await getAllContact(id);

    const exportContactList: ExportContactDTO[] = contactList.map(
      (contact) => ({
        name: contact.name,
        description: contact.description ?? " ",
        phoneNumber: contact.phoneNumber,
        compteNumber: contact.compteNumber ?? " ",
      })
    );
    return exportContactList;
  } catch (err) {
    return {
      error: "Une érreur est survenu.",
      status: 400,
    };
  }
}
