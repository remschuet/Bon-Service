import { createManyContact, deleteAllContact } from "@/db/data-access/contact";
import { createRecipeBook, deleteAllRecipeBook } from "@/db/data-access/recipe-book";
import { createManySupplier, deleteAllSupplierByUserId, getAllSupplierSupported } from "@/db/data-access/supplier";
import { getUserById } from "@/db/data-access/user";
import { Contact, RecipeBook, Supplier, SupplierSupported, User } from "@prisma/client";

/**
 * Initializes the recipeBook and market for a user.
 *
 * @param userId - The id of the user.
 * @returns A Promise that resolves when the data initialization is complete.
 * @throws An error if there is an issue initializing the data.
 */
export async function account_init(userId: string) {
  let user = undefined;
  try {
    // Get the user
    user = (await getUserById(userId)) as User;
  } catch (error) {
    return {
      error: "Il n'existe pas de compte lié à cet utilisateur.",
      status: 400,
    };
  }
  // Default recipeBook
  const recipeBook = {
    name: "Toutes les recettes, " + user.name,
    userId: user.id,
    description: "Toutes les recettes SAUTE"
  };

  // create recipeBook
  try {
    await createRecipeBook(recipeBook as RecipeBook);
  }catch(error){
    return {
      error: "Erreur lors de la creation du livre de recette.",
      status: 400,
    };
  }
  // Link default supplier supported
  try{
    const supplierSupported: SupplierSupported[] =
      await getAllSupplierSupported();

    let supplierToAdd: Supplier[] = [];
    let contactToAdd: Contact[] = [];

    supplierSupported.map((supplier) => {
      if (supplier.isPublic) {
        supplierToAdd.push({
          name: supplier.name,
          prompt: supplier.prompt,
          description: supplier.description,
          userId: userId,
        } as Supplier);

        contactToAdd.push({
          userId: userId,
          name: supplier.name,
          description: supplier.description,
          phoneNumber: supplier.phoneNumber,
        } as Contact);
      }
    });
    // Create all supplier based on supplierSupported
    await createManySupplier(supplierToAdd);
    // Create all Contact based on supplierSupported
    await createManyContact(contactToAdd);
  } catch (error) {
    return {
      error: "Erreur lors de la creation des fournisseur et des contacts par default.",
      status: 400,
    };
  }
  return {
    success: "L'initialiser des informations par default c'est executer avec succes.",
    status: 200,
  };
}

/**
 * Removes all data associated with a user. (dev fonction)
 * ! DANGER !: remove all recipebook, supplier, contact.
 * @param userId - The id of the user whose data should be removed.
 * @returns A Promise that resolves when the data removal is complete.
 * @throws An error if there is an issue removing the data.
 */
export async function dev_action_removeAllDataUser(userId: string) {
  try {
    const user = await getUserById(userId);

    if (user) {
      // Remove all recipeBook
      await deleteAllRecipeBook(userId);
      // Remove all Supplier
      await deleteAllSupplierByUserId(userId);
      // Remove all contact
      await deleteAllContact(userId);
    }
  } catch (error) {
    console.error(
      "Error data-access/action: action_removeUser(), error: ",
      error
    );
  }
}
