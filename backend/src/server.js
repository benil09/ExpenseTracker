import dotenv from "dotenv";
import express from "express";
import connectDB from "./models/transaction.model.js";
import transactionRoutes from "./routes/transaction.route.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

dotenv.config();

app.use("/api/transactions", transactionRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
