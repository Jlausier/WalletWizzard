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
    const { sum, group_by } = req.query;
    const options = queryOptionsUser(req.session.userId || testUserId);
    console.log(sum && sum === "true" ? "Sum is true" : "Sum does not exist");

    switch (group_by) {
      case "month":
        options.attributes.push(formattedMonthAttr);
        options.group = [formattedMonth];
        options.order = [[formattedMonth, "DESC"]];
        break;
      default:
        delete options.attributes;
    }

    if (sum && sum === "true") {
      options.attributes
        ? options.attributes.push(sumAmount)
        : (options.attributes = sumAmount);
    }

    const incomeData = await Income.findAll(options);

    if (!incomeData) {
      res.status(400).json({ message: "Could not find income data for user" });
    }

    const labels = incomeData.map((d) => d.label);
    let data = [];
    if (sum && sum === "true") data = incomeData.map((d) => d.sum);

    res.status(200).json({ labels, data });
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
    res.status(500);
  }
};

/**
 * @summary GET /api/goals
 */
router.get("/goals", getGoalsData);

export default router;
