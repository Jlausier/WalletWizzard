import { Sequelize } from "sequelize";
import { UserConfig, GoalProgression } from "../models/index.js";

/**
 * Find or create a config object for a user
 *
 * @param {string} type Config type
 * @param {string} userId User ID string
 * @returns {UserConfig} User config object
 */
export const findOrCreateConfig = async (type, userId) => {
  const res = await UserConfig.findOrCreate({
    where: {
      userId,
      type,
    },
    defaults: {
      userId,
      type,
    },
  });

  return res;
};

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
export const sumAmount = [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"];

/** @const tableAttributes Sequelize query attributes for budget table */
export const tableAttributes = ["scheduled_date", "amount", "name"];

/** @const testUserId Test {@linkcode User} UUID string */
export const testUserId = "7f95751e-e2a9-4aeb-a866-801c0902ca21";

/**
 * Returns query options for finding objects associated with a user
 *
 * @param {string} userId
 * @returns {Object}
 */
export const queryOptionsUser = (userId) => {
  return {
    where: { userId },
    raw: true,
  };
};

// ====================================================

export const getGoalsOptions = (userId) => {
  return {
    where: { userId },
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
    group: ["goal.id", "goal.name", "goal.desired_amount"],
  };
};

export const processGoalData = (goalData) => {
  return goalData.map((data) => {
    const values = data.dataValues;
    const amountInt = parseInt(!values.amount ? "0.00" : values.amount);
    const desiredAmountInt = parseInt(values.desired_amount);

    const processed = {
      name: values.name,
      start: values.start,
      end: values.end,
      dataset: [amountInt, desiredAmountInt],
      complete: amountInt > desiredAmountInt,
    };

    return processed;
  });
};
