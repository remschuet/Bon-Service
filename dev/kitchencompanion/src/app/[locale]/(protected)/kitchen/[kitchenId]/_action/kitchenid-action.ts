"use server";

import { getAllContactLinksToKitchen } from "@/db/data-access/contact";
import {
  getAllKitchenUserById,
  getKitchenByAdminAndName,
  linkKitchenUserById,
} from "@/db/data-access/kitchen";
import { getMenu, linkMenuToKitchen } from "@/db/data-access/menu";
import { createUser, getUser, getUserIfExist } from "@/db/data-access/user";
import { Contact, Kitchen, User, UserTypes } from "@prisma/client";

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

  let menu = null;
  try{
    menu = await getMenu(userId, menuToAdd);
    if (!menu) throw new Error
  }catch(error){
    return {
      error:
        "Le menu n'existe pas.",
      status: 500,
    };
  }
  try{
  await linkMenuToKitchen(kitchenId, menu.id);
  }catch(error){
    return {
      error:
        "La liaison n'a pas ete realise.",
      status: 500,
    };
  }
  return {
    success: "Le menu est maintenant lie.",
    status: 200,
  };
}

/**
 * Adds a member to a kitchen. If the member does not already exist he will be created in the database.
 *
 * @param form - A FormData object containing the email and userId of the member to be added.
 * @returns An object containing an error message or a success message.
 */
export async function addMemberToKitchen(form: FormData) {
  //email et userId
  const email = form.get("memberEmail") as string;
  const userId = form.get("userId") as string;
  const name = form.get("memberName") as string;
  const kitchenName = form.get("kitchenName") as string;
  let userToLinkId = undefined;
  let kitchenId = undefined;

  try {
    const isExist = await getUserIfExist(email);
    if (!isExist){
      await createMemberUser(email, name);
    }
    const user = await getUser(email);
    if (!user) {
      return {
        error:
          "Impossible de recuperer l utilisateur",
        status: 404,
      };
    }
    userToLinkId = user.id
  } catch (err) {
    return {
      error:
        "Impossible de creer ou de recuperer le membre",
      status: 500,
    };  
  }
  try {
    const kitchen = await getKitchenByAdminAndName(userId, kitchenName);
    kitchenId = kitchen?.id
    if (!kitchenId) {
      return {
        error:
          "Impossible de recuperer la cuisine",
        status: 404,
      };
    }
    // TODO: Verif si le user est deja lier a cette cuisine
    await linkKitchenUserById(userToLinkId, kitchenId);
  } catch (error) {
    return {
      error:
        "Impossible de lier le membre a la cuisine.",
      status: 500,
    };
  }
  return {
    success: "La personne à été ajouté avec succes.",
    status: 200,
  };
}


/**
 * Creates a new user with the provided email.
 *
 * @param email - The email address of the new user.
 * @returns An object containing a success message or an error message
 */
async function createMemberUser(email: string, name: string) {
    // TODO mettre un mdp ? (si pas verifier il peut pas ce connecter?)

    const user = {
    name: name,
    email: email,
    password: "undefined",
    userType: UserTypes.MEMBER,
  } as User;

  try {
    createUser(user);
    // TODO: envoyer un email
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
export async function getNameMemberKitchen(formData: FormData){
  const kitchenName = formData.get("kitchenName") as string;
  const userId = formData.get("userId") as string;  let userList = undefined;
  let kitchenId = undefined;
  let userListName: string[] = []

  try{
    const kitchen = await getKitchenByAdminAndName(userId, kitchenName);
    kitchenId = kitchen?.id
    if (!kitchenId){
      throw new Error()
    }
    userList = await getAllKitchenUserById(kitchenId);
    userList.forEach((kitchen) => {
      if (kitchen.user.name){
        userListName.push(kitchen.user.name)
      }
    });
  }catch(error){
    return{
      error:
        "Impossible de recuperer les membres de la cuisine.",
      status: 500,
    }  
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
export async function getContactForKitchen(formData: FormData){
  const kitchenName = formData.get("kitchenName") as string;
  const userId = formData.get("userId") as string;
  let contact = undefined;
  let kitchenId = undefined;
  let contactList: Contact[] = []
  try{
    const kitchen = await getKitchenByAdminAndName(userId, kitchenName);
    kitchenId = kitchen?.id
    if (!kitchenId){
      throw new Error()
    }
    contact = await getAllContactLinksToKitchen(kitchenId);
    contact.forEach((contact) => {
      if (contact.contact){
        contact.contact.id = "not given";
        contact.contact.userId = "not given";
        contact.contact.compteNumber = "private info (to do)";

        contactList.push(contact.contact)
      }
    });
  }catch(error){
    return{
      error:
        "Impossible de recuperer les contacts de la cuisine.",
      status: 500,
    }  
  }
  return contactList;
}