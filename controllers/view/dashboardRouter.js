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

    const expenseData = await Expense.findAll({
      where: { userId: req.session.userId || testUserId },
      include: [{ model: ExpenseType, attributes: [] }],
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "amount"],
        [Sequelize.col("expense_type.category"), "category"],
      ],
      group: [Sequelize.col("expense_type.category")],
      raw: true,
    });

    const totalAmount = expenseData.reduce(sumData, 0);

    const percentageData = expenseData.map(({ amount, category }) => {
      return {
        category,
        percentage: Math.round((amount / totalAmount) * 100, "nearest"),
      };
    });

    console.log(totalAmount);
    console.log(percentageData);

    res.render("overview", {
      expenseData: {
        totalAmount,
        percentageData,
      },
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
    const options = getTableOptions(req.session.userId);
    console.log(options);

    const incomeData = await Income.findAll(options);
    console.log();
    const expenseData = await Expense.findAll(options);

    const goalsOptions = getGoalsOptions(req.session.userId);
    console.log(goalsOptions);
    const goalData = await Goal.findAll(goalsOptions);
    const processedGoalData = processGoalData(goalData);

    /**
     * @TODO Breakdown goals by amount remaining and months remaining.
     *   If there is no scheduled date then set a default monthly amount
     */

    res.render("budget", {
      incomeData,
      expenseData,
      goalData: processedGoalData,
      netData: {
        income: incomeData.reduce(sumData, 0),
        expenses: expenseData.reduce(sumData, 0),
        goals: processedGoalData.reduce(
          (prev, curr) => prev + parseFloat(curr.remaining),
          0
        ),
      },
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
