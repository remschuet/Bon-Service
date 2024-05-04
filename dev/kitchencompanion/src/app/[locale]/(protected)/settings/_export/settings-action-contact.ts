"use server";

import {
  updateUserUserType,
  updateUser,
  updateUserPremium,
} from "@/db/data-access/user";

import { User, UserTypes } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";
import { getContactForKitchen } from "../../kitchen/_action/kitchen-action";
import { getAllContact, getContact } from "@/db/data-access/contact";
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
