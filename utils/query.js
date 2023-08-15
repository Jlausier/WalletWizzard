import { Sequelize } from "sequelize";
import { UserConfig } from "../models/index.js";

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
export const testUserId = "65051d46-76e1-43a0-8bda-484ae4229c4f";

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
