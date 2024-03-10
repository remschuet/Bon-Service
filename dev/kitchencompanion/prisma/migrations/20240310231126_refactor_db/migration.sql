/*
  Warnings:

  - The values [COOL_QUICKY] on the enum `ActionMapaq` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `objInverstment` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActionMapaq_new" AS ENUM ('PLANK_BLUE', 'PLANK_RED', 'PLANK_YELLOW', 'COOL_QUICKLY');
ALTER TYPE "ActionMapaq" RENAME TO "ActionMapaq_old";
ALTER TYPE "ActionMapaq_new" RENAME TO "ActionMapaq";
DROP TYPE "ActionMapaq_old";
COMMIT;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "objInverstment",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "objInvestment" DOUBLE PRECISION DEFAULT 20,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
