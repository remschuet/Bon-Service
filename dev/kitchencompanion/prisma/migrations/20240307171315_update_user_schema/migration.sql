-- AlterEnum
ALTER TYPE "UserTypes" ADD VALUE 'DEV';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userTypes" SET DEFAULT ARRAY['ADMIN']::"UserTypes"[];
