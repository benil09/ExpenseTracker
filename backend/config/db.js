import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const sql = neon(connectionString);
// You can now use `sql` to interact with your Neon database
 
     