import express from "express";
import withAuth from "../../utils/auth.js";
import {
  User,
  Income,
  Expense,
  ExpenseType,
  Goal,
  GoalCategory,
  GoalProgression,
} from "../../models/index.js";
import { Sequelize } from "sequelize";

const getMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%Y-%m`
);

/**
 * @TODO Redirect when data is not correctly loaded
 */

/**
 * Express router for dashboard routes
 * @const router
 */
const router = express.Router();

// ================================ OVERVIEW ====================================

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

// ================================ BUDGET ======================================

/**
 * @summary Render the dashboard budget page
 *
 * @description
 * - Find the logged in user
 * - Get their budget data
 *   - Incomes array
 *   - Expenses array
 *   - Goals array
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
  const user_id = "4a1389b9-b5ea-40d8-9db4-4e8262893ad5";

  console.log("received render dashboard request");

  try {
    const incomeData = await Income.findAll({
      where: {
        userId: user_id,
      },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"],
        [getMonth, "month"],
      ],
      group: [getMonth],
      raw: true,
    });

    const expenseData = await Expense.findAll({
      where: {
        userId: user_id,
      },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"],
        [getMonth, "month"],
      ],
      group: [getMonth],
      raw: true,
    });

    res.status(200).json({ incomeData, expenseData });
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
 * @description
 * - Find the logged in user
 * - Get their goals data
 *   - Goals array
 *     - Goal Category
 *     - Goal Progression
 *
 * Status Codes:
 * - 200 - Success - returns goals data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method renderDashboardBudget
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderDashboardGoals = async (req, res) => {
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
    res.status(500);
  }
};

/**
 * @summary GET /dashboard/goals
 */
router.get("/goals", withAuth, renderDashboardGoals);

// ================================ STREAM ======================================

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
