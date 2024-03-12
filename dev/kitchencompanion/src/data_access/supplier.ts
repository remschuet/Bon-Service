import { Supplier } from "@prisma/client";
import { db } from "@/db/prisma_db";

export async function createSupplier(supplier: Supplier) {
  return await db.supplier.create({
    data: {
      name: supplier.name,
    },
  });
}

export async function removeSupplier(supplier: Supplier) {
  return await db.supplier.delete({
    where: { 
      name: supplier.name 
    },
  });
}

export async function getSupplier(name: string) {
  return await db.supplier.findUnique({
    where: { 
      name
     },
  });
}

export async function getAllSuppliers() {
  return await db.supplier.findMany({
    orderBy: {
      name: "asc",
    },
  });
}