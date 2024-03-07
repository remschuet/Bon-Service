-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userTypes" SET DEFAULT ARRAY['ADMIN']::"UserTypes"[];
