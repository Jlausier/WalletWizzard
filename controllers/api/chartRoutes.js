import express from "express";
import { Sequelize } from "sequelize";
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

import {
  scheduledMonth,
  scheduledMonthAttr,
  formattedMonth,
  formattedMonthAttr,
  sumAmount,
  queryOptionsUser,
  tableAttributes,
  testUserId,
} from "../../utils/query.js";

/**
 * @TODO Save configs
 */

/**
 * Express router for chart routes
 * @const router
 */
const router = express.Router();

// ================================ INCOME ======================================

/**
 * @summary Get the income sums chart data
 *
 * @description
 * Status Codes:
 * - 200 - Success - returns income sums data
 * - 500 - Failure - could not fetch data
 *
 * @async
 * @method getIncomeData
 * @param {express.Request} req Express {@linkcode express.Request Request} object
 * @param {express.Response} res Express {@linkcode express.Response Response} object
 */
const getIncomeSums = async (req, res) => {
  try {
    const group_by = req.query.group_by || "none";
    const options = queryOptionsUser(req.session.userId || testUserId);

    options.attributes = [sumAmount];
    options.order = [[formattedMonth, "DESC"]];

    switch (group_by) {
      case "month":
        options.attributes.push(formattedMonthAttr);
        options.group = [formattedMonth];
        break;
    }

    const incomeData = await Income.findAll(options);

    if (!incomeData || incomeData.length === 0) {
      res.status(400).json({ message: "Could not find income data for user" });
      return;
    }

    switch (group_by) {
      case "month":
        res.status(200).json({
          labels: incomeData.map((d) => d.month),
          data: incomeData.map((d) => d.sum),
        });
        return;
      default:
        res.status(200).json({ total: incomeData[0].sum });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @summary GET /api/income/sum
 */
router.get("/income/sum", getIncomeSums);

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
    const group_by = req.query.group_by || "none";
    const options = queryOptionsUser(req.session.userId || testUserId);
    options.attributes = tableAttributes;

    switch (group_by) {
      case "month":
        options.attributes.push(formattedMonthAttr);
        options.group = [formattedMonth];
        options.order = [[formattedMonth, "DESC"]];
        break;
    }

    const incomeData = await Income.findAll(options);

    if (!incomeData || incomeData.length === 0) {
      res.status(400).json({ message: "Could not find income data for user" });
      return;
    }

    res.status(200).json(incomeData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
    const { sum, group_by } = req.query;
    const options = queryOptionsUser(req.session.userId || testUserId);

    switch (group_by) {
      case "type":
        options.include = [
          {
            model: ExpenseType,
            attributes: ["name"],
          },
        ];
        options.group = ["expense_type.name"];
        break;
      case "category":
        options.include = [
          {
            model: ExpenseType,
            attributes: ["category"],
          },
        ];
        options.group = ["expense_type.category"];
        break;
      case "month":
        options.attributes = [scheduledMonthAttr];
        options.group = [scheduledMonth];
        options.order = [[scheduledMonth, "DESC"]];
        break;
      default:
        delete options.attributes;
        options.order = [["scheduled_date", "DESC"]];
        break;
    }

    if (sum && sum === "true") {
      options.attributes
        ? options.attributes.push(sumAmount)
        : (options.attributes = sumAmount);
    }

    const expenseData = await Expense.findAll(options);

    if (!expenseData) {
      res.status(400).json({ message: "Could not find income data for user" });
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
 *
 * - Find the logged in user
 * - Get goals data array
 *   - Goal Category
 *   - Goal Progression
 *
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
    const goalsData = await Goal.findAll(getSumOptions(testUserId));

    if (!goalsData) {
      res.status(400).json({ message: "Could not find income data for user" });
    }

    res.status(200).json(goalsData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @summary GET /api/goals
 */
router.get("/goals", getGoalsData);

export default router;
