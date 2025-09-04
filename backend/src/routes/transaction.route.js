import express from "express";

import {
  allTransactions,
  deleteTransaction,
  newTransaction,
  summaryTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/:userId", allTransactions);
router.get("/summary/:userId", summaryTransactions);
router.post("/", newTransaction);
router.delete("/:userId", deleteTransaction);

export default router;
