import express from "express";
import { Expense, Goal, GoalProgression, Income } from "../../models/index.js";
import withAuth from "../../utils/auth.js";

const router = express.Router();

const createExpense = async (req, res) => {
  try {
    const expenseData = await Expense.create(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(expenseData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

router.post("/expense/:id", createExpense);

const updateExpense = async (req, res) => {
  try {
    const expenseData = await Expense.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(expenseData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

router.put("/expense/:id", updateExpense);

const deleteExpense = async (req, res) => {
  try {
    const expenseData = await Expense.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      res.status(404).json({ message: "Could not find expense with that ID." });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

router.delete("/expense/:id", deleteExpense);

export default router;
