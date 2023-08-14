import express, { query } from "express";
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

/**
 * @const scheduledMonth Formats the `scheduled_date` column of a table
 */
const scheduledMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%Y-%m`
);

const scheduledMonthAttr = [scheduledMonth, "month"];

/**
 * @const sumAmount Sequelize aggregate function to sum a numeric amount
 */
const sumAmount = [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"];

/** @const user_id Test {@linkcode User} UUID string */
const user_id = "3c198ba1-c44f-4cb4-aad4-8351a98de927";

/**
 * Get the sequelize options for the summation of a monetary amount
 *
 * @param {string} userId {@linkcode User} UUID string
 * @returns {Object} Sequelize `findAll` options
 */
// const getSumOptions = (userId, sortByData, sortByName) => {
//   return {
//     where: { userId },
//     attributes: [
//       sumAmount,
//       sortByName === sortByData ? sortByData : [sortByData, sortByName],
//     ],
//     group: [sortByData],
//     raw: true,
//   };
// };

/**
 * Express router for chart routes
 * @const router
 */
const router = express.Router();

// ================================ INCOME ======================================

/**
 * @summary Get the income chart data
 *
 * @description
 * Status Codes:
 * - 200 - Success - returns income data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method getIncomeData
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const getIncomeData = async (req, res) => {
  try {
    const incomeData = await Income.findAll({
      where: { userId: user_id },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"],
        [scheduledMonth, "month"],
      ],
      group: [scheduledMonth],
      raw: true,
    });

    if (!incomeData) {
      res.status(400).json({ message: "Could not find income data for user" });
    }

    res.status(200).json(incomeData);
  } catch (err) {
    res.status(500);
  }
};

/**
 * @summary GET /api/income
 */
router.get("/income", getIncomeData);

// ================================ EXPENSE =====================================

/**
 * @summary Get the expense chart data
 *
 * @description
 * Status Codes:
 * - 200 - Success - returns expense data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method getExpenseData
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const getExpenseData = async (req, res) => {
  // Construct query options
  try {
    const queryOptions = {
      where: { userId: req.session.userId || user_id },
      raw: true,
      attributes: [],
    };

    if (req.query.sum === "true") queryOptions.attributes.push(sumAmount);

    switch (req.query.group_by) {
      case "type":
        queryOptions.include = [
          {
            model: ExpenseType,
            attributes: ["name"],
          },
        ];
        queryOptions.group = ["expense_type.name"];
        break;
      case "category":
        queryOptions.include = [
          {
            model: ExpenseType,
            attributes: ["category"],
          },
        ];
        queryOptions.group = ["expense_type.category"];
        break;
      case "month":
        queryOptions.attributes.push(scheduledMonthAttr);
        queryOptions.group = [scheduledMonth];
        break;
    }

    const expenseData = await Expense.findAll(queryOptions);

    if (!expenseData) {
      res.status(400).json({ message: "Could not find income data for user" });
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500);
  }
};

/**
 * @summary GET /api/expense
 */
router.get("/expense", getExpenseData);

// ================================ GOALS =======================================

/**
 * @summary Get the goals chart data
 *
 * @description
 * Status Codes:
 * - 200 - Success - returns goals data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method getGoalsData
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const getGoalsData = async (req, res) => {
  try {
    const goalsData = await Goal.findAll(getSumOptions(user_id));

    if (!goalsData) {
      res.status(400).json({ message: "Could not find income data for user" });
    }

    res.status(200).json(goalsData);
  } catch (err) {
    res.status(500);
  }
};

/**
 * @summary GET /api/goals
 */
router.get("/goals", getGoalsData);

export default router;
