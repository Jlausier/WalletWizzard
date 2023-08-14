import express from "express";
import { Sequelize } from "sequelize";
import withAuth from "../../utils/auth.js";
import { User } from "../../models/index.js";
import { testUserId } from "../../utils/query.js";

/**
 * @TODO Redirect when config is not correctly loaded
 */

/**
 * Express router for dashboard routes
 * @const router
 */
const router = express.Router();

// ================================ OVERVIEW ====================================

router.get("/overview", withAuth, async (req, res) => {
  /**
   * @TODO Get user's expense config
   * @TODO Get user's income config
   * @TODO Get user's goals config
   */

  res.render("overview");
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
 * @method renderDashboardBudget
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderDashboardBudget = async (req, res) => {
  try {
    res.render("budget");
  } catch (err) {
    res.status(500);
  }
};

/**
 * @summary GET /dashboard/budget
 */
router.get("/budget", renderDashboardBudget);

// ================================ GOALS =======================================

/**
 * @summary Render the dashboard goals page
 *
 * @async
 * @method renderDashboardBudget
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderDashboardGoals = async (req, res) => {
  try {
    res.render("goals", { goalsData });
  } catch (err) {
    res.status(500);
  }
};

/**
 * @summary GET /dashboard/goals
 */
router.get("/goals", withAuth, renderDashboardGoals);

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
