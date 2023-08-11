import express from "express";
import withAuth from "../../utils/auth.js";
import {
  User,
  Income,
  Expense,
  ExpenseType,
  ExpenseCategory,
  Goal,
  GoalCategory,
  GoalProgression,
} from "../../models/index.js";

/**
 * @TODO Redirect when data is not correctly loaded
 */

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
   */

  try {
    const budgetData = await User.findByPk(req.session.user_id, {
      attributes: [],
      include: [
        {
          model: Income,
          attributes: ["id", "name", "amount"],
        },
        {
          model: Expense,
          attributes: ["id", "name", "amount"],
          include: [
            {
              model: ExpenseType,
              attributes: ["id", "name"],
              include: [{ model: ExpenseCategory }],
            },
          ],
        },
        {
          model: Goal,
          attributes: ["id", "name", "desiredAmount", "date"],
          include: [
            { model: GoalCategory },
            { model: GoalProgression, attributes: ["id", "amount"] },
          ],
        },
      ],
    }).get({ plain: true });

    res.render("budget", { budgetData });
  } catch (err) {
    res.status(400);
  }
});

router.get("/goals", withAuth, async (req, res) => {
  try {
    const goalsData = await User.findByPk(req.session.user_id, {
      attributes: ["id", "name", "desiredAmount", "date", "reminder"],
      include: [
        {
          model: Goal,
          attributes: [],
          include: [
            {
              model: GoalCategory,
            },
            {
              model: GoalProgression,
              attributes: ["id", "amount"],
            },
          ],
        },
      ],
    }).map((goal) => goal.get({ plain: true }));

    res.render("goals", { goalsData });
  } catch (err) {
    res.status(400);
  }
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
