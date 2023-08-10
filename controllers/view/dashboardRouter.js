import express from "express";
import withAuth from "../../utils/auth.js";

const router = express.Router();

router.get("/overview", withAuth, async (req, res) => {
  /**
   * @TODO Get user's budget tracker
   * @TODO Get user's goals progress
   * @TODO Get user's monthly
   *
   * @TODO All expenses
   * - Essential
   * - Savings
   * - Fun stuff
   *
   * @TODO Render overview page
   */
});

router.get("/budget", withAuth, async (req, res) => {
  /**
   * @TODO Get user's budget data
   * - Goal expense
   * - Income
   * - Expenses
   *
   * @TODO Render budget page
   */

  try {
  } catch (err) {
    res.status(400);
  }
});

router.get("/goals", withAuth, async (req, res) => {
  /**
   * @TODO Get user's goal data
   * - Goal array
   *   - Include goal expenses
   *
   * @TODO Render goals page
   */
});

router.get("/stream", withAuth, async (req, res) => {
  /**
   * @TODO Get shared goals
   * - Goal name
   * - Goal category
   * - Timestamp reached
   * - User name
   *
   * @TODO Render stream page
   */
});

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
