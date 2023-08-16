import { Sequelize } from "sequelize";
import { GoalProgression } from "../models/index.js";

export const sumData = (prev, curr) => prev + parseFloat(curr.amount);

/** @const scheduledMonth Formats the `scheduled_date` column of a table */
export const scheduledMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%Y-%m`
);

/** @const scheduledMonthAttr Sequelize query attribute for scheduled month */
export const scheduledMonthAttr = [scheduledMonth, "month"];

/** @const Formats the `scheduled_date` column (e.g., 'Jan 23') */
export const formattedMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%b %y`
);

/** @const formattedMonthAttr Sequelize query attribute for formatted month */
export const formattedMonthAttr = [formattedMonth, "month"];

/** @const sumAmount Sequelize aggregate function to sum a numeric amount */
export const sumAmount = (tableName) => [
  Sequelize.fn("SUM", Sequelize.col(`${tableName}.amount`)),
  "sum",
];

/** @const tableAttributes Sequelize query attributes for budget table */
export const tableAttributes = ["scheduled_date", "amount", "name"];

export const getTableOptions = (userId) => {
  return {
    where: { userId: userId || testUserId },
    attributes: tableAttributes,
    raw: true,
  };
};

/** @const testUserId Test {@linkcode User} UUID string */
export const testUserId = "6d62c578-578f-448c-8e3d-e37475d25b26";

/**
 * Returns query options for finding objects associated with a user
 *
 * @param {string} userId
 * @returns {Object}
 */
export const queryOptionsUser = (userId) => {
  return {
    where: { userId: userId || testUserId },
    raw: true,
  };
};

// ====================================================

export const getGoalsOptions = (userId) => {
  return {
    where: { userId: userId || testUserId },
    include: [
      {
        model: GoalProgression,
        attributes: [],
      },
    ],
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("goal_progressions.amount")),
        "amount",
      ],
      "id",
      "name",
      "desired_amount",
      [
        Sequelize.fn(
          "date_format",
          Sequelize.col("goal.created_at"),
          `%c-%d-%Y`
        ),
        "start",
      ],
      [
        Sequelize.fn("date_format", Sequelize.col("goal.date"), `%c-%d-%Y`),
        "end",
      ],
    ],
    group: [
      "goal.id",
      "goal.name",
      "goal.desired_amount",
      "amount",
      "start",
      "end",
    ],
    raw: true,
  };
};

export const processGoalData = (goalData) => {
  return goalData.map((values) => {
    const amount = values.amount ? values.amount : "0.00";
    const amountFloat = parseFloat(amount);
    const desiredAmountFloat = parseFloat(values.desired_amount);
    const complete = amountFloat > desiredAmountFloat;

    return {
      name: values.name,
      start: values.start,
      end: values.end,
      amount: amountFloat,
      desiredAmount: desiredAmountFloat,
      complete,
      remaining: complete ? 0 : desiredAmountFloat - amountFloat,
    };
  });
};

export const processMonthlyExpenseData = (expenseData) => {
  return {
    labels: expenseData.map((e) => e.month),
    data: expenseData.map((e) => e.total_amount),
  };
};
