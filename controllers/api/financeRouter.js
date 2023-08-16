import express from "express";
import { Expense, Goal, GoalProgression, Income } from "../../models/index.js";
import withAuth from "../../utils/auth.js";

const router = express.Router();

// ================================ EXPENSE ===================================

// CREATE
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

// UPDATE
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

// DELETE
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

// CREATE
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

// UPDATE
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

// DELETE
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

router.delete("/goal/:id", deleteGoal);

// ================================ GOAL PROGRESSION ==========================

// CREATE
const createGoalProgression = async (req, res) => {
  try {
    const goalProgressionData = await GoalProgression.create(req.body);

    if (!goalProgressionData) {
      res.status(400).json({ message: "Could not create goal instance." });
      return;
    }

    res.status(201).json(goalProgressionData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.post("/goal-progression", createGoalProgression);

// UPDATE
const updateGoalProgression = async (req, res) => {
  try {
    const goalProgressionData = await GoalProgression.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!goalProgressionData) {
      res
        .status(404)
        .json({ message: "Could not find goal progression with that ID." });
      return;
    }

    res.status(201).json(goalProgressionData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.put("/goal-progression/:id", updateGoalProgression);

// DELETE
const deleteGoalProgression = async (req, res) => {
  try {
    const goalProgressionData = await GoalProgression.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!goalProgressionData) {
      res
        .status(404)
        .json({ message: "Could not find goal progression with that ID." });
      return;
    }

    res.status(201).json(goalProgressionData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.delete("/goal-progression/:id", deleteGoalProgression);

// ================================ INCOME ====================================

// CREATE
const createIncome = async (req, res) => {
  try {
    const incomeData = await Income.create(req.body);

    if (!incomeData) {
      res.status(400).json({ message: "Could not create income instance." });
      return;
    }

    res.status(201).json(incomeData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.post("/income", createIncome);

// UPDATE
const updateIncome = async (req, res) => {
  try {
    const incomeData = await Income.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!incomeData) {
      res.status(404).json({ message: "Could not find income with that ID." });
      return;
    }

    res.status(201).json(incomeData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.put("/income/:id", updateIncome);

// DELETE
const deleteIncome = async (req, res) => {
  try {
    const incomeData = await Income.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!incomeData) {
      res.status(404).json({ message: "Could not find income with that ID." });
      return;
    }

    res.status(201).json(incomeData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.delete("/income/:id", deleteIncome);

export default router;
