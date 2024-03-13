/*
  Warnings:

  - You are about to drop the column `name` on the `SupplierKitchen` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kitchenId,supplierId]` on the table `SupplierKitchen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierId` to the `SupplierKitchen` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SupplierKitchen_kitchenId_name_key";

-- AlterTable
ALTER TABLE "SupplierKitchen" DROP COLUMN "name",
ADD COLUMN     "supplierId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "isVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierKitchen_kitchenId_supplierId_key" ON "SupplierKitchen"("kitchenId", "supplierId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SupplierKitchen" ADD CONSTRAINT "SupplierKitchen_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
