import express from "express";
import { Sequelize } from "sequelize";
import { Income, Expense, Goal, ExpenseType } from "../../models/index.js";
import withAuth from "../../utils/auth.js";

import {
  getTableOptions,
  getGoalsOptions,
  processGoalData,
  sumData,
  testUserId,
} from "../../utils/query.js";

/**
 * @TODO Render error page instead of sending 500 status
 * @TODO Load settings page
 */

/**
 * Express router for dashboard routes
 * @const router
 */
const router = express.Router();

// ================================ OVERVIEW ====================================

router.get("/overview", async (req, res) => {
  try {
    /**
     * @TODO Get overview data
     *
     * - Get expenses broken down by category type
     */

    // ================================ Expense Pie Chart ===============================
    const expenseSums = await Expense.findAll({
      where: { userId: req.session.userId || testUserId },
      include: [{ model: ExpenseType, attributes: [] }],
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "amount"],
        [Sequelize.col("expense_type.category"), "category"],
      ],
      group: [Sequelize.col("expense_type.category")],
      raw: true,
    });

    const totalAmount = expenseSums.reduce(sumData, 0);

    console.log({ totalAmount, expenseSums });

    // ================================ Goals Progress Bars =============================

    // Find goals data
    const goalsOptions = getGoalsOptions(req.session.userId);
    const goalData = await Goal.findAll(goalsOptions);
    const processedGoalData = processGoalData(goalData);

    // Render overview page with data
    res.render("overview", {
      expenseData: {
        totalAmount,
        sums: expenseSums,
      },
      goalsData: processedGoalData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ================================ BUDGET ======================================

/**
 * @summary Render the dashboard budget page
 *
 * Status Codes:
 * - 200 - Success - returns budget data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method renderBudget
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderBudget = async (req, res) => {
  try {
    // Get table options
    const options = getTableOptions(req.session.userId);

    // Find income data
    const incomeData = await Income.findAll(options);
    console.log();
    // Find expense data
    const expenseData = await Expense.findAll(options);

    // Find goals data
    const goalsOptions = getGoalsOptions(req.session.userId);
    const goalData = await Goal.findAll(goalsOptions);
    const processedGoalData = processGoalData(goalData);

    // Calculate net data
    const netData = {
      income: incomeData.reduce(sumData, 0),
      expenses: expenseData.reduce(sumData, 0),
      goals: processedGoalData.reduce((prev, curr) => {
        if (curr.end) {
          let monthsBetween =
            (new Date(curr.end) - Date.now()) / (1000 * 60 * 60 * 24 * 30);
          return prev + parseFloat(curr.remaining) / monthsBetween;
        }
        return prev;
      }, 0),
    };

    // Calculate total net income
    netData.total = netData.income - netData.total - netData.goals;

    // Render budget page with data
    res.render("budget", {
      incomeData,
      expenseData,
      goalData: processedGoalData,
      netData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * @summary GET /dashboard/budget
 */
router.get("/budget", renderBudget);

// ================================ GOALS =======================================

/**
 * @summary Render the dashboard goals page
 *
 * @async
 * @method renderGoals
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderGoals = async (req, res) => {
  try {
    const goalsOptions = getGoalsOptions(req.session.userId);
    const goalData = await Goal.findAll(goalsOptions);
    const processedGoalData = processGoalData(goalData);

    res.render("goals", processedGoalData);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * @summary GET /dashboard/goals
 */
router.get("/goals", renderGoals);

// ================================ STREAM ======================================

router.get("/stream", withAuth, async (req, res) => {
  try {
    res.render("stream");
  } catch (err) {
    res.status(500).json({ message: "" });
  }
});

// ================================ SETTINGS ====================================

router.get("/settings", withAuth, async (req, res) => {
  /**
   * @TODO Get user settings
   * - Name
   * - Email
   * - Password
   * - Dark mode
   *
   * @TODO Render settings page
   */
});

// ================================ SPLASH PAGE =================================

router.get("/", (req, res) => {
  res.render("homepage");
});

export default router;
