import { Supplier, SupplierSupported } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Supplier
// SupplierKitchen
////////////////////////////////

/**
 * Creates a new supplier.
 *
 * @param supplier - The supplier object containing the name of the supplier.
 * @returns A promise that resolves to the created supplier.
 */
export async function createSupplier(supplier: Supplier) {
  return await db.supplier.create({
    data: {
      name: supplier.name,
      prompt: supplier.prompt,
      description: supplier.description,
      userId: supplier.userId,
    },
  });
}

/**
 * Removes a supplier.
 *
 * @param supplier - The supplier object containing the name of the supplier to be removed.
 * @returns A promise that resolves to the deleted supplier.
 */
export async function removeSupplier(supplier: Supplier) {
  try {
    return await db.supplier.deleteMany({
      where: {
        userId: supplier.userId,
        name: supplier.name,
      },
    });
  } catch (error) {
    console.error("Error data access: removeSupplier(), error: ", error);
    throw error;
  }
}

/**
 * Retrieves a supplier by name.
 *
 * @param name - The name of the supplier to retrieve.
 * @returns A promise that resolves to the retrieved supplier.
 */
export async function getSupplier(name: string, userId: string) {
  return await db.supplier.findMany({
    where: {
      name,
      userId,
    },
  });
}

/**
 * Retrieves all suppliers.
 *
 * @returns A promise that resolves to an array of all suppliers, ordered by name in ascending order.
 */
export async function getAllSuppliers() {
  return await db.supplier.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Links a supplier to a kitchen.
 *
 * @param supplierId - The ID of the supplier.
 * @param kitchenId - The ID of the kitchen.
 * @returns A promise that resolves to the created supplier-kitchen link.
 */
export async function getSupplierSupported(name: string) {
  return await db.supplierSupported.findUnique({
    where: {
      name,
    },
  });
}

export async function dev_createSupplierSupported(supplier: SupplierSupported) {
  return await db.supplierSupported.create({
    data: {
      name: supplier.name,
      phoneNumber: supplier.phoneNumber,
      prompt: supplier.prompt,
      description: supplier.description,
      isPublic: supplier.isPublic,
    },
  });
}
