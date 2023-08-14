import express from "express";
import { Sequelize } from "sequelize";
import withAuth from "../../utils/auth.js";
import { User, UserConfig } from "../../models/index.js";
import { testUserId } from "../../utils/query.js";

/**
 * @TODO Redirect when config is not correctly loaded
 */

/**
 * Express router for dashboard routes
 * @const router
 */
const router = express.Router();

const findOrCreateConfig = (type, userId) => {
  return UserConfig.findOrCreate({
    where: {
      userId,
      type,
    },
    defaults: {
      userId,
      type,
    },
  });
};

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
  } catch (err) {}
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
    res.render("budget");
  } catch (err) {
    res.status(500);
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
    res.render("goals", { goalsData });
  } catch (err) {
    res.status(500);
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
    res.status(500);
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
