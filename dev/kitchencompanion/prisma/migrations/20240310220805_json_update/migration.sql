/*
  Warnings:

  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steps` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitMeasure` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yield` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" JSONB NOT NULL,
ADD COLUMN     "objInverstment" INTEGER DEFAULT 20,
ADD COLUMN     "steps" JSONB NOT NULL,
ADD COLUMN     "unitMeasure" "UnitMeasure" NOT NULL,
ADD COLUMN     "yield" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RecipeIngredient";

-- CreateTable
CREATE TABLE "SupplierKitchen" (
    "id" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SupplierKitchen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupplierKitchen_kitchenId_name_key" ON "SupplierKitchen"("kitchenId", "name");

-- AddForeignKey
ALTER TABLE "SupplierKitchen" ADD CONSTRAINT "SupplierKitchen_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
