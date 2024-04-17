import dotenv from "dotenv";
import { constrainedMemory } from "process";
import { exec } from "child_process";

export async function setup() {
  // Init the .env file to access the environment variables
  dotenv.config();
  process.env.DATABASE_URL = process.env.DATABASE_URL_JEST;
  if (process.env.DATABASE_URL === undefined) {
    console.error("Could not find the DATABASE_URL_JEST environment variable");
  }

  exec("npx prisma generate", (error, stdout, stderr) => {
    console.log("-- Generate new prisma client --");
    if (error) {
      console.error(`Error during 'npx prisma generate': ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr during 'npx prisma generate': ${stderr}`);
      return;
    }
    console.log(`stdout from 'npx prisma generate': ${stdout}`);
  });

  console.log("-- Entering in jest-test --");
}
