"use server";
import {
  createContact,
  deleteLinkContactKitchen,
  getAllContact,
  getAllContactLinksToKitchen,
  getContact,
  linkContactKitchen,
} from "@/db/data-access/contact";
import { getKitchenByAdminAndName } from "@/db/data-access/kitchen";
import { Contact } from "@prisma/client";

// Test Rémi pour verifier les actions
// PAS ENCORE TESTÉ
export async function __test__() {}

/**
 * Creates a new contact and links it to the specified kitchens.
 * @param contact - the contact information to create
 * @param kitchenNames - the names of the kitchens to link the contact to
 * @returns Return dictionary [error-success] and status
 */
export async function addContact(contact: Contact, kitchenNames: string[]) {
  let kitchenIds: string[] = [];
  // Create contact
  const newContact = await createContact(contact);
  if (!newContact) {
    return {
      error:
        "Il existe déjà un contact portant ce nom avec ce numéro de téléphone.",
      status: 500,
    };
  }

  updateContactStatusIsPublic(kitchenNames, newContact, true);
}
/**
 * Updates the public status of a contact for a list of kitchens.
 * @param kitchenNames - the names of the kitchens to update the status for
 * @param contact - the contact object to update (with the real id)
 * @param value - the new public status value
 * @returns Return dictionary [error-success] and status
 */
export async function updateContactStatusIsPublic(
  kitchenNames: string[],
  contact: Contact,
  value: boolean
) {
  let kitchenIds: string[] = [];
  // build kitchenId array from name
  for (let i = 0; i < kitchenNames.length; i++) {
    let kitchen = await getKitchenByAdminAndName(
      contact.userId,
      kitchenNames[i]
    );
    if (kitchen === null || kitchen === undefined) {
      return {
        error:
          "Erreur interne, cuisine inexistante (théoriquement impossible).",
        status: 500,
      };
    }

    kitchenIds.push(kitchen.id);
  }
  if (value) {
    // Adding link
    for (let i = 0; i < kitchenIds.length; i++) {
      linkContactKitchen(contact.id, kitchenIds[i]);
    }
  } else {
    // Removing link
    for (let i = 0; i < kitchenIds.length; i++) {
      deleteLinkContactKitchen(contact.id, kitchenIds[i]);
    }
  }
  return {
    success: "La mise à jour du status du contact c'est executé avec succès.",
    status: 200,
  };
}

/**
 * Remove contact public status for a kitchen
 * @param kitchenId - the current kitchen id
 * @param contact - the contact object to remove (without necessery id)
 * @param userId - the current user id
 * @returns Return dictionary [error-success] and status
 */
export async function removeContactPublicStatus(
  kitchenId: string,
  contact: Contact
) {
  // get the contact for the real id
  const contactDb = await getContact(
    contact.userId,
    contact.name,
    contact.phoneNumber
  );
  if (!contactDb) {
    return {
      error: "Contact non trouvé.",
      status: 500,
    };
  }
  // remove link
  deleteLinkContactKitchen(contactDb.id, kitchenId);
  return {
    success:
      "La suppression de status public du contact c'est executé avec succès.",
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

/**
 * Returns all the contact of the user. (ADMIN)
 * @param userId - the ID of the user
 */
export async function getAllContactForAdmin(userId: string) {
  return getAllContact(userId);
}
