"use server";

import {
  createContact,
  deleteLinkContactKitchen,
  getAllContactLinksToKitchen,
  linkContactKitchen,
} from "@/db/data-access/contact";
import { createKitchen } from "@/db/data-access/kitchen";
import { Contact, Kitchen } from "@prisma/client";
import { ResponseMessage } from "@/lib/type";

/**
 * Creates a new contact and links it to the specified kitchens.
 * @param contact - the contact information to create
 * @param kitchenNames - the names of the kitchens to link the contact to
 * @returns Return dictionary [error-success] and status
 */
export async function addContact(contact: Contact, kitchenIds: string[]) {
  let newContact: Contact;

  try {
    newContact = await createContact(contact);
  } catch (error) {
    return {
      error:
        "Il existe déjà un contact portant ce nom avec ce numéro de téléphone.",
      status: 500,
    };
  }

  if (kitchenIds.length > 0) {
    const res: ResponseMessage = await updateContactStatusIsPublic(
      kitchenIds,
      newContact,
      true
    );
    if (res.error) {
      return res;
    }
  }

  return {
    success: "Le contact a été créé avec succès.",
    status: 200,
  };
}

/**
 * Updates the public status of a contact for a list of kitchens.
 * @param kitchenNames - the names of the kitchens to update the status for
 * @param contact - the contact object to update (with the real id)
 * @param value - the new public status value
 * @returns Return dictionary [error-success] and status
 */
export async function updateContactStatusIsPublic(
  kitchenIds: string[],
  contact: Contact,
  value: boolean
) {
  if (value) {
    // Adding link
    kitchenIds.forEach((kitchenId) => {
      try {
        linkContactKitchen(contact.id, kitchenId);
      } catch (error) {
        return {
          error: "Erreur interne, impossible de lier le contact à la cuisine.",
          status: 500,
        };
      }
    });
  } else {
    // Removing link
    kitchenIds.forEach((kitchenId) => {
      try {
        deleteLinkContactKitchen(contact.id, kitchenId);
      } catch (error) {
        return {
          error:
            "Erreur interne, impossible de retirer le contact de la cuisine.",
          status: 500,
        };
      }
    });
  }

  return {
    success: "La mise à jour du status du contact c'est executé avec succès.",
    status: 200,
  };
}

/**
 * Returns all the contacts linked to the specified kitchen. (MEMBER)
 * @param kitchenId - the ID of the kitchen
 */
export async function getAllContactForMember(kitchenId: string) {
  return getAllContactLinksToKitchen(kitchenId);
}

// Test Rémi pour verifier les actions
export async function __test__(userId: string) {
  // Création d'un contact
  const contact = {
    userId: userId,
    name: "__CONTACT__",
    phoneNumber: "0612345678",
  };

  // Creation de cuisine
  const kitchen1 = {
    userId: userId,
    name: "__KITCHEN1__",
  };
  const kitchen2 = {
    userId: userId,
    name: "__KITCHEN2__",
  };
  try {
    await createKitchen(kitchen1 as Kitchen);
    await createKitchen(kitchen2 as Kitchen);
  } catch (error) {
    console.log("une erreur est survenu");
  }
  await addContact(contact as Contact, ["__KITCHEN1__", "__KITCHEN2__"]);
}
