"use server";

import { getAllContactLinksToKitchen } from "@/db/data-access/contact";
import {
  deleteLinkKitchenUser,
  getAllKitchenUserById,
  getKitchenByAdminAndName,
  linkKitchenUserById,
  getKitchenUser,
  getKitchen,
} from "@/db/data-access/kitchen";
import { deleteLinkMenuKitchen, getMenu, linkMenuToKitchen } from "@/db/data-access/menu";
import { createUser, getEmailsPattern, getUser, getUserIfExist } from "@/db/data-access/user";
import { Contact, Kitchen, User, UserTypes } from "@prisma/client";
import { tree } from "next/dist/build/templates/app-page";

// Ajouter contact , ajouter membre, ajouter menu 
/**********************************************
                    SECURITY 
 **********************************************/
//TODO: Convertir en hook ! Client component
export async function isAllowed(kitchenId: string, userId: string){
  let isAdmin = false;
  let isMember = false;
  try{
    const kitchen = await getKitchen(kitchenId);
    const kitchenUser = await getKitchenUser(kitchenId, userId);

    console.log(kitchen)

    if (kitchen !== undefined && kitchen !== null){
      if (kitchen.userId === userId){
        isAdmin = true;
      }
    }

    if (kitchenUser !== undefined && kitchenUser !== null){
      isMember = true;
    }

    return {isAdmin, isMember};
  }
  catch(err){
    isAdmin = false;
    isMember = false;
    return {isAdmin, isMember};
  }
}

/**
 * Get all email of the database containing a patern
 */
export async function getAllEmail(contain: string) {
  try{
    const emails = await getEmailsPattern(contain);
    return emails.slice(0, 4);
  }
  catch(err){
    return {
      error: "Aucun courriel trouvé.",
      status: 500,
    };
  }
}

/**********************************************
                    OTHERS 
 **********************************************/

/**
 * Link a menu to a kitchen
 *
 * @param form - FormData.
 * @returns an objet with message error or success.
 */
export async function addMenuToKitchen(form: FormData) {
  const userId = form.get("userId") as string;
  const kitchenId = form.get("kitchenId") as string;
  const menuToAdd = form.get("menuName") as string;

  try {
    const menu = await getMenu(userId, menuToAdd);

    if (menu === null || menu === undefined) throw new Error();
    
    await linkMenuToKitchen(menu.id, kitchenId);
  } catch (error) {
    return {
      error: "Une erreur est survenu lors de la liaison de votre menu.",
      status: 500,
    };
  }
}

/**
 * Removes a menu from a kitchen.
 *
 * @param form - A FormData object containing the userId, kitchenId, and menuName of the menu to be removed.
 * @returns An object containing an error message or a success message.
 */
export async function removeMenuToKitchen(form: FormData) {
  const userId = form.get("userId") as string;
  const kitchenId = form.get("kitchenId") as string;
  const menuToAdd = form.get("menuName") as string;

  try {
    const menu = await getMenu(userId, menuToAdd);

    if (menu === null || menu === undefined) throw new Error();
    
    await deleteLinkMenuKitchen(menu.id, kitchenId);
  } catch (error) {
    return {
      error: "Une erreur est survenu lors de la suppression de la liaison de votre menu.",
      status: 500,
    };
  }
}

/**
 * Adds a member to a kitchen. 
 * If the member does not already exist he will be created in the database.
 *
 * @param form - A FormData object containing the memberEmail and kitchenId.
 * @returns An object containing an error message or a success message.
 */
export async function addMemberToKitchen(form: FormData) {
  const email = form.get("memberEmail") as string;
  const kitchenId = form.get("kitchenId") as string;

  try {
    let userToLink = await getUser(email);
    if (!userToLink) {
      // Create new user
      await createMemberUser(email);
      userToLink = await getUser(email);
    }
    
    if (!userToLink) throw new Error("L'utilisateur est introuvable")
    
    const kitchen = await getKitchen(kitchenId);

    if (!kitchen) throw new Error("La cuisine est inexistante")

    // TODO: Check if the user is already link ? Will see with the visual
    await linkKitchenUserById(userToLink.id, kitchen.id);
  } catch (error) {
    return {
      error: "Impossible de lier le membre a la cuisine.",
      status: 500,
    };
  }

  return {
    success: "La personne à été ajouté avec succes.",
    status: 200,
  };
}

export async function removeMemberToKitchen(form: FormData) {
  //email et userId
  const email = form.get("memberEmail") as string;
  const userId = form.get("userId") as string;
  const kitchenName = form.get("kitchenName") as string;
  let kitchenId = undefined;
  let userToRemoveId = undefined;
  try {
    const kitchen = await getKitchenByAdminAndName(userId, kitchenName);
    kitchenId = kitchen?.id;
    if (!kitchenId) {
      return {
        error: "Impossible de recuperer la cuisine",
        status: 404,
      };
    }

    const user = await getUser(email);
    if (!user) {
      return {
        error: "Impossible de recuperer l utilisateur",
        status: 404,
      };
    }
    userToRemoveId = user.id;
  } catch (err) {
    return {
      error: "Erreur interne, impossible de recuperer l utilisateur",
      status: 500,
    };
  }
  try {
    await deleteLinkKitchenUser(userToRemoveId, kitchenId);
  } catch (err) {
    return {
      error: "Impossible de supprimer l utilisateur de cette cuisine",
      status: 500,
    };
  }
  return {
    success: "L'utilisateur à été supprimer de la cuisine",
    status: 500,
  };
}

/**
 * Creates a new user with the provided email.
 *
 * @param email - The email address of the new user.
 * @returns An object containing a success message or an error message
 */
async function createMemberUser(email: string) {
  const user = {
    email: email,
    password: crypto.randomUUID().split("-")[0],
    userType: UserTypes.MEMBER,
  } as User;

  try {
    createUser(user);
    // TODO: envoyer un email
    // TODO: email qui envoie un lien vers un password reset token. (ou un token de verification)
  } catch {
    return {
      error:
        "Une erreur interne est survenue, impossible de créer l'utilisateur.",
      status: 500,
    };
  }
  return {
    success: "L'utilisateur a été créé avec succès.",
    status: 200,
  };
}

/**
 * Retrieves the names of all members in a given kitchen.
 *
 * @param formData - A FormData object containing the id of the kitchen.
 * @returns An array of strings containing the names of the members in the kitchen.
 * @throws If the kitchenId is not provided in the formData.
 */
export async function getNameMemberKitchen(formData: FormData) {
  const kitchenName = formData.get("kitchenName") as string;
  const userId = formData.get("userId") as string;
  const userListName: string[] = [];

  try {
    const kitchen = await getKitchenByAdminAndName(userId, kitchenName);
    const kitchenId = kitchen?.id;
    if (!kitchenId) {
      throw new Error();
    }

    const userList = await getAllKitchenUserById(kitchenId);
    userList.forEach((kitchen) => {
      if (kitchen.user.name) {
        userListName.push(kitchen.user.name);
      }
      else{
        userListName.push("En attente");
      }
    });
  } catch (error) {
    return {
      error: "Impossible de recuperer les membres de la cuisine.",
      status: 500,
    };
  }
  return userListName;
}

/**
 * Retrieves the contacts for a given kitchen.
 * [UserId, id, compteNumber] are not retured
 *
 * @param formData - A FormData object containing the id of the kitchen.
 * @returns An array of Contact objects containing the contact information for the members of the kitchen.
 * @throws If the kitchenId is not provided in the formData.
 */
export async function getContactForKitchen(formData: FormData) {
  const kitchenName = formData.get("kitchenName") as string;
  const userId = formData.get("userId") as string;
  const contactList: Contact[] = [];
  try {
    const kitchen = await getKitchenByAdminAndName(userId, kitchenName);
    const kitchenId = kitchen?.id;
    if (!kitchenId) {
      throw new Error();
    }
    const contact = await getAllContactLinksToKitchen(kitchenId);
    contact.forEach((contact) => {
      if (contact.contact) {
        contact.contact.id = "not given";
        contact.contact.userId = "not given";
        contact.contact.compteNumber = "private info (to do)";

        contactList.push(contact.contact);
      }
    });
  } catch (error) {
    return {
      error: "Impossible de recuperer les contacts de la cuisine.",
      status: 500,
    };
  }
  return contactList;
}
