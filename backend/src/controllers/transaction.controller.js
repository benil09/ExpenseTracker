import { sql } from "../config/db.js";

export const allTransactions = async (req, res) => {
  const { userId } = req.params;
  // Check if user exists
  const userExists =
    await sql`SELECT id FROM transactions WHERE id = ${userId}`;
  if (userExists.length === 0) {
    return res.status(404).json({ error: "Invalid user ID" });
  }
  // Logic to fetch transactions for a specific user
  sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((error) => {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const newTransaction = async (req, res) => {
  // Logic to add a new transaction
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if user exists
    const userExists =
      await sql`SELECT id FROM transactions WHERE id = ${user_id}`;
    if (userExists.length === 0) {
      return res.status(404).json({ error: "Invalid user ID" });
    }

    const newTransaction = await sql`
          INSERT INTO transactions (user_id, title, amount, category)
          VALUES (${user_id}, ${title}, ${amount}, ${category})
          RETURNING *;
        `;
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  // Logic to delete a transaction
   try {
    const { id } = req.params;
    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *;`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const summaryTransactions = async (req, res) => {
  // Logic to fetch transactions summary for a specific user
  try {
    const { userId } = req.params;

    // Check if user exists
    const userExists =
      await sql`SELECT id FROM transactions WHERE id = ${userId}`;
    if (userExists.length === 0) {
      return res.status(404).json({ error: "Invalid user ID" });
    }

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
