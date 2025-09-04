import dotenv from "dotenv";
import express from "express";
import { sql } from "./config/db.js";

const app = express();
dotenv.config();

async function connectDB() {
  try {
    await sql` CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL, 
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
   )`;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  });
});
