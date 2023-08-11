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
 * @method renderBudget
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderBudget = async (req, res) => {
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
    res.status(500);
  }
};

/**
 * @summary GET /dashboard/budget
 */
router.get("/budget", withAuth, renderBudget);

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
 * @method renderGoals
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderGoals = async (req, res) => {
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
router.get("/goals", withAuth, renderGoals);

// ================================ STREAM ======================================

/**
 * @summary Render the dashboard stream page
 *
 * @description
 * - Find all goals where:
 *   - public: true
 *   - complete: true
 * - Get the goals data
 *   - user name
 *   - category name
 *   - pregression SUM(amount)
 *
 * Status Codes:
 * - 200 - Success - returns public, completed goals data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method renderStream
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const renderStream = async (req, res) => {
  try {
    const goalsData = await Goal.findAll({
      where: {
        public: true,
        complete: true,
      },
      attributes: ["id", "name", "desiredAmount", "dateCompleted"],
      include: [
        { model: User, include: ["name"] },
        { model: GoalCategory, attributes: ["name"] },
        {
          model: GoalProgression,
          attributes: [sequelize.fn("SUM", sequelize.col("amount"))],
        },
      ],
    }).map((goal) => goal.get({ plain: true }));

    res.render("stream", { goalsData });
  } catch (err) {
    res.status(500);
  }
};

/**
 * @summary GET /dashboard/stream
 */
router.get("/stream", withAuth, renderStream);

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
