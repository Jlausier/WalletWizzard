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
import { Sequelize } from "sequelize";

const getMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("created_at"),
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
  // res.render("budget");

  console.log("received render dashboard request");

  try {
    const budgetData = await User.findByPk(
      "051e9599-f542-433f-aae6-fe32cae09e63",
      {
        attributes: [],
        // attributes: [
        //   [Sequelize.fn("SUM", Sequelize.col("sum_incomes.amount")), "amount"],
        //   [
        //     Sequelize.fn(
        //       "date_format",
        //       Sequelize.col("sum_incomes.created_at"),
        //       `%Y-%m`
        //     ),
        //     "month",
        //   ],
        // ],
        include: [
          {
            model: Income,
          },
          {
            model: Expense,
            // attributes: [
            //   [Sequelize.fn("SUM", Sequelize.col("amount")), "amount"],
            //   [getMonth, "month"],
            // ],
            // include: [
            //   {
            //     model: ExpenseType,
            //     attributes: ["name"],
            //     include: [{ model: ExpenseCategory }],
            //     raw: true,
            //   },
            // ],
            // group: [getMonth],
            // raw: true,
          },
          {
            model: Goal,
            attributes: ["name", "desiredAmount", "date"],
            include: [
              { model: GoalCategory },
              { model: GoalProgression, attributes: ["amount", "created_at"] },
            ],
          },
        ],
        // raw: true,
        // nest: true,
      }
    );

    console.log("Finished SQL execution");

    if (!budgetData) {
      res.status(400).json({ message: "Could not find budget data for user" });
    }

    res.status(200).json(budgetData);
    // res.render("budget", { budgetData });
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
