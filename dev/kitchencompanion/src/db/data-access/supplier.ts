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
  try {
    return await db.supplier.create({
      data: {
        name: supplier.name,
        prompt: supplier.prompt,
        description: supplier.description,
        userId: supplier.userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/supplier: createSupplier(), error: ",
      error
    );
    throw error;
  }
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
    console.error(
      "Error data-access/supplier: removeSupplier(), error: ",
      error
    );
    throw error;
  }
}

export async function removeAllSupplierByUserId(userId: string) {
  try {
    return await db.supplier.deleteMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/supplier: removeSupplierByUserId(), error: ",
      error
    );
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
  try {
    return await db.supplier.findMany({
      where: {
        name,
        userId,
      },
    });
  } catch (error) {
    console.error("Error data-access/supplier: getSupplier(), error: ", error);
    throw error;
  }
}

/**
 * Retrieves all suppliers.
 *
 * @returns A promise that resolves to an array of all suppliers, ordered by name in ascending order.
 */
export async function getAllSuppliers() {
  try {
    return await db.supplier.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/supplier: getAllSuppliers(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Links a supplier to a kitchen.
 *
 * @param supplierId - The ID of the supplier.
 * @param kitchenId - The ID of the kitchen.
 * @returns A promise that resolves to the created supplier-kitchen link.
 */
export async function getSupplierSupported(name: string) {
  try {
    return await db.supplierSupported.findUnique({
      where: {
        name,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/supplier: getSupplierSupported(), error: ",
      error
    );
    throw error;
  }
}

export async function dev_createSupplierSupported(supplier: SupplierSupported) {
  try {
    return await db.supplierSupported.create({
      data: {
        name: supplier.name,
        phoneNumber: supplier.phoneNumber,
        prompt: supplier.prompt,
        description: supplier.description,
        isPublic: supplier.isPublic,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/supplier: dev_createSupplierSupported(), error: ",
      error
    );
    throw error;
  }
}

export async function dev_createManySupplierSupported(
  supplier: SupplierSupported[]
) {
  try {
    return await db.supplierSupported.createMany({
      data: supplier,
    });
  } catch (error) {
    console.error(
      "Error data-access/supplier: dev_createSupplierSupported(), error: ",
      error
    );
    throw error;
  }
}

export async function dev_removeAllSupplierSupported() {
  try {
    return await db.supplierSupported.deleteMany();
  } catch (error) {
    console.error(
      "Error data-access/supplier: dev_removeAllSupplierSupported(), error: ",
      error
    );
    throw error;
  }
}
