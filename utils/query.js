import { Sequelize } from "sequelize";
import { UserConfig, GoalProgression } from "../models/index.js";

export const sumData = (prev, curr) => prev + parseFloat(curr.amount);

/**
 * Find or create a config object for a user
 *
 * @param {string} type Config type
 * @param {string} userId User ID string
 * @returns {UserConfig} User config object
 */
// export const findOrCreateConfig = async (type, userId) => {
//   const res = await UserConfig.findOrCreate({
//     where: {
//       userId,
//       type,
//     },
//     defaults: {
//       userId,
//       type,
//     },
//   });

//   return res;
// };

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
export const testUserId = "3b86ae51-4f08-4833-a073-7405f042befe";

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
    const amountInt = parseFloat(amount);
    const desiredAmountInt = parseFloat(values.desired_amount);
    const complete = amountInt > desiredAmountInt;

    const processed = {
      name: values.name,
      start: values.start,
      end: values.end,
      dataset: [amountInt, desiredAmountInt],
      complete,
      remaining: complete ? 0 : desiredAmountInt - amountInt,
    };

    return processed;
  });
};
