"use server";
import { createContact, linkContactKitchen } from "@/db/data-access/contact";
import { getKitchenByAdminAndName } from "@/db/data-access/kitchen";
import { Contact } from "@prisma/client";

/**
 * Creates a new contact and links it to the specified kitchens.
 * @param contact - the contact information to create
 * @param kitchenNames - the names of the kitchens to link the contact to
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

  // build kitchenId array from name
  for (let i = 0; i < kitchenNames.length; i++) {
    let kitchen = await getKitchenByAdminAndName(
      contact.userId,
      kitchenNames[i]
    );
    if (kitchen === null || kitchen === undefined) {
      return {
        error:
          "Erreur interne, cuisine inexistante (theoriquement impossible).",
        status: 500,
      };
    }

    kitchenIds.push(kitchen.id);
  }
  // Adding link
  for (let i = 0; i < kitchenIds.length; i++) {
    linkContactKitchen(newContact.id, kitchenIds[i]);
  }
  return {
    success: "La création de contact c'est executé avec succès.",
    status: 200,
  };
}
export async function action_DeleteContactPublicForKitchen() {}
export async function action_GetContactPublicForKitchenByUser(userId: string) {}
export async function action_GetContactPublicForKitchenByKitchenId(
  kitchenId: string
) {}
