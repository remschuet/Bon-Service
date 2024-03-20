import { Supplier } from "@prisma/client";
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
  return await db.supplier.delete({
    where: {
      name: supplier.name,
    },
  });
}

/**
 * Retrieves a supplier by name.
 *
 * @param name - The name of the supplier to retrieve.
 * @returns A promise that resolves to the retrieved supplier.
 */
export async function getSupplier(name: string) {
  return await db.supplier.findUnique({
    where: {
      name,
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
export async function linkSupplierKitchen(
  supplierId: string,
  kitchenId: string
) {
  return await db.supplierKitchen.create({
    data: {
      supplierId: supplierId,
      kitchenId: kitchenId,
    },
  });
}

export async function removelinkSupplierKitchen(
  supplierId: string,
  kitchenId: string
) {
  return await db.supplierKitchen.deleteMany({
    where: {
      supplierId: supplierId,
      kitchenId: kitchenId,
    },
  });
}
