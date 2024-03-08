-- CreateEnum
CREATE TYPE "UnitMeasure" AS ENUM ('G', 'ML', 'PORTION', 'CUP', 'OZ', 'TBSP', 'TSP', 'LBS');

-- CreateEnum
CREATE TYPE "Alergen" AS ENUM ('LACTOSE', 'GLUTEN', 'PEANUT', 'NUT', 'EGG', 'FISH', 'CRUSTACEAN', 'MOLLUSCS', 'SOY', 'SULPHISTES', 'MUSTARD');

-- CreateEnum
CREATE TYPE "ActionMapaq" AS ENUM ('PLANK_BLUE', 'PLANK_RED', 'PLANK_YELLOW', 'COOL_QUICKY');

-- CreateEnum
CREATE TYPE "RecipeState" AS ENUM ('RECIPE', 'DISH');

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "costObjective" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitchenRole" (
    "kitchenId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "KitchenRole_pkey" PRIMARY KEY ("kitchenId","role")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_userId_key" ON "Kitchen"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_name_key" ON "Kitchen"("name");

-- AddForeignKey
ALTER TABLE "Kitchen" ADD CONSTRAINT "Kitchen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenRole" ADD CONSTRAINT "KitchenRole_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
