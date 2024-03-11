import { S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

declare global {
  var prisma: PrismaClient | undefined;
  var aws: S3Client | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
