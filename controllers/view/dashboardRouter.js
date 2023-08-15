import express from "express";
import { Sequelize } from "sequelize";
import {
  Income,
  Expense,
  Goal,
  GoalProgression,
  User,
} from "../../models/index.js";
import withAuth from "../../utils/auth.js";

import { findOrCreateConfig, testUserId } from "../../utils/query.js";

/**
 * @TODO Redirect when config is not correctly loaded
 * @TODO Load settings page
 */

/**
 * Express router for dashboard routes
 * @const router
 */
const router = express.Router();

// ================================ OVERVIEW ====================================

router.get("/overview", withAuth, async (req, res) => {
  try {
    const incomeConfig = await findOrCreateConfig(
      "income",
      req.session.userId || testUserId
    );

    const expenseConfig = await findOrCreateConfig(
      "expense",
      req.session.userId || testUserId
    );

    const goalConfig = await findOrCreateConfig(
      "goal",
      req.session.userId || testUserId
    );

    res.render("overview", { incomeConfig, expenseConfig, goalConfig });
  } catch (err) {
    res.status(500).json({ message: "" });
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
    const options = {
      where: { userId: req.session.userId || testUserId },
      attributes: ["scheduled_date", "amount", "name"],
      raw: true,
    };

    const incomeData = await Income.findAll(options);

    const expenseData = await Expense.findAll(options);
    const goalData = await Goal.findAll({
      where: { userId: req.session.userId || testUserId },
      include: [
        {
          model: GoalProgression,
          attributes: [],
        },
      ],
      attributes: [
        [
          Sequelize.fn("SUM", Sequelize.col("goal_progressions.amount")),
          "amount",
        ],
        "id",
        "name",
        "date",
      ],
      group: ["goal.id", "goal.name", "goal.date"],
    });

    const processedGoalData = goalData.map((data) => {
      const values = data.dataValues;
      if (!values.amount) values.amount = "0.00";
      return values;
    });

    res.render("budget", {
      incomeData,
      expenseData,
      goalData: processedGoalData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
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
    const goalConfig = await findOrCreateConfig(
      "goal",
      req.session.userId || testUserId
    );

    res.render("goals", { goalsData });
  } catch (err) {
    res.status(500).json({ message: "" });
  }
};

/**
 * @summary GET /dashboard/goals
 */
router.get("/goals", withAuth, renderGoals);

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

export default router;
