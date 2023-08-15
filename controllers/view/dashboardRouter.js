import express from "express";
import { Income, Expense, Goal } from "../../models/index.js";
import withAuth from "../../utils/auth.js";

import {
  getTableOptions,
  getGoalsOptions,
  processGoalData,
  sumData,
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
     */
    res.render("overview");
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

    const netData = {
      income: incomeData.reduce(sumData, 0),
      expenses: expenseData.reduce(sumData, 0),
      goals: processedGoalData.reduce(
        (prev, curr) => prev + parseFloat(curr.remaining),
        0
      ),
    };

    console.log(netData);

    res.render("budget", {
      incomeData,
      expenseData,
      goalData: processedGoalData,
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
