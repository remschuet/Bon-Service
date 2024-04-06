/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Kitchen` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Kitchen_name_key";

-- DropIndex
DROP INDEX "Kitchen_userId_key";

-- CreateTable
CREATE TABLE "KitchenUser" (
    "kitchenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "KitchenUser_pkey" PRIMARY KEY ("kitchenId","userId")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "unitMeasure" "UnitMeasure" NOT NULL,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeBook" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RecipeBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "versionNumber" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL,
    "recipeBookId" TEXT NOT NULL,
    "recipeCategoryId" TEXT NOT NULL,
    "recipeState" "RecipeState" DEFAULT 'RECIPE',
    "preparationTime" INTEGER,
    "cookingTime" INTEGER,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeAllergen" (
    "recipeId" TEXT NOT NULL,
    "alergen" "Alergen" NOT NULL,

    CONSTRAINT "RecipeAllergen_pkey" PRIMARY KEY ("recipeId","alergen")
);

-- CreateTable
CREATE TABLE "RecipePhoto" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "photo" INTEGER NOT NULL,

    CONSTRAINT "RecipePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,
    "isPublic" BOOLEAN DEFAULT false,
    "dishs" JSONB,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StructMenu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "StructMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneBook" (
    "id" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "compteNumber" TEXT NOT NULL,
    "isPublic" BOOLEAN DEFAULT false,

    CONSTRAINT "PhoneBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckTemp" (
    "id" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "temp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CheckTemp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_supplierId_key" ON "Ingredient"("name", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeBook_name_userId_key" ON "RecipeBook"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory_userId_category_key" ON "RecipeCategory"("userId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "RecipePhoto_recipeId_photo_key" ON "RecipePhoto"("recipeId", "photo");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_ingredientId_key" ON "RecipeIngredient"("recipeId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StructMenu_userId_category_key" ON "StructMenu"("userId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_userId_name_key" ON "Kitchen"("userId", "name");

-- AddForeignKey
ALTER TABLE "KitchenUser" ADD CONSTRAINT "KitchenUser_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenUser" ADD CONSTRAINT "KitchenUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeBookId_fkey" FOREIGN KEY ("recipeBookId") REFERENCES "RecipeBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeCategoryId_fkey" FOREIGN KEY ("recipeCategoryId") REFERENCES "RecipeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeAllergen" ADD CONSTRAINT "RecipeAllergen_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipePhoto" ADD CONSTRAINT "RecipePhoto_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StructMenu" ADD CONSTRAINT "StructMenu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneBook" ADD CONSTRAINT "PhoneBook_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckTemp" ADD CONSTRAINT "CheckTemp_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckTemp" ADD CONSTRAINT "CheckTemp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
