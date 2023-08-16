import express from "express";
import { Expense, Goal, GoalProgression, Income } from "../../models/index.js";
import withAuth from "../../utils/auth.js";

const router = express.Router();

// ================================ EXPENSE ===================================

const createExpense = async (req, res) => {
  try {
    const expenseData = await Expense.create(req.body);

    if (!expenseData) {
      res.status(400).json({ message: "Could not create expense instance." });
      return;
    }

    res.status(201).json(expenseData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.post("/expense", createExpense);

const updateExpense = async (req, res) => {
  try {
    const expenseData = await Expense.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!expenseData) {
      res.status(404).json({ message: "Could not find expense with that ID." });
      return;
    }

    res.status(201).json(expenseData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
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

    if (!expenseData) {
      res.status(404).json({ message: "Could not find expense with that ID." });
      return;
    }

    res.status(201).json(expenseData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.delete("/expense/:id", deleteExpense);

// ================================ GOAL ======================================

const createGoal = async (req, res) => {
  try {
    const goalData = await Goal.create(req.body);

    if (!goalData) {
      res.status(400).json({ message: "Could not create goal instance." });
      return;
    }

    res.status(201).json(goalData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.post("/goal", createGoal);

const updateGoal = async (req, res) => {
  try {
    const goalData = await Goal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!goalData) {
      res.status(404).json({ message: "Could not find goal with that ID." });
      return;
    }

    res.status(201).json(goalData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.put("/goal/:id", updateGoal);

const deleteGoal = async (req, res) => {
  try {
    const goalData = await Goal.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!goalData) {
      res.status(404).json({ message: "Could not find goal with that ID." });
      return;
    }

    res.status(201).json(goalData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.delete("/expense/:id", deleteGoal);

export default router;
