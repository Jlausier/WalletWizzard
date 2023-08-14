import { Sequelize } from "sequelize";
import { UserConfig } from "../models/index.js";

export const findOrCreateConfig = (type, userId) => {
  return UserConfig.findOrCreate({
    where: {
      userId,
      type,
    },
    defaults: {
      userId,
      type,
    },
  });
};

/** @const scheduledMonth Formats the `scheduled_date` column of a table */
export const scheduledMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%Y-%m`
);

/** @const scheduledMonthAttr Sequelize query attribute for scheduled month */
export const scheduledMonthAttr = [scheduledMonth, "month"];

/** @const sumAmount Sequelize aggregate function to sum a numeric amount */
export const sumAmount = [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"];

/** @const testUserId Test {@linkcode User} UUID string */
export const testUserId = "3c198ba1-c44f-4cb4-aad4-8351a98de927";

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
    attributes: [],
  };
};
